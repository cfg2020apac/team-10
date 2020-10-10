import logging
import json

from flask import request, jsonify;

from jpmorgan import app;

from flask import Flask, request, jsonify, render_template, make_response

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import update
from flask_cors import CORS
import json
import sys
import os
import random
import datetime
import pika
from werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
import datetime
from functools import wraps

logger = logging.getLogger(__name__)


#change link to own database directory
app.config['SECRET_KEY']='Th1s1ss3cr3t'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:codeforgood10@cfg-team10.cel29riokjfx.us-east-1.rds.amazonaws.com:3306/cfg'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Officer(db.Model):
    __tablename__ = 'officer'
    officerID = db.Column(db.String(45), primary_key=True)
    password = db.Column(db.String(99),nullable=False)
    officerType = db.Column(db.String(45))
    name = db.Column(db.String(45))
    organisationName = db.Column(db.String(45))
    designation = db.Column(db.String(45))

    def __init__(self, officerID, password, officerType, name, organisationName, designation):
        self.officerID = officerID
        self.password = password
        self.officerType = officerType
        self.name = name
        self.organisationName = organisationName
        self.designation = designation

    def json(self):
        return {"officerID": self.officerID, "officerType": self.officerType, "name": self.name, "organisationName": self.organisationName, "designation":self.designation }

def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):

        token = None

        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']

        if not token:
            return jsonify({'message': 'a valid token is missing'})

        try:
            data = jwt.decode(token, app.config[SECRET_KEY])
            current_user = Users.query.filter_by(officerID=data['officerID']).first()
        except:
            return jsonify({'message': 'token is invalid'})

        return f(current_user, *args, **kwargs)
    return decorator

@app.route('/login', methods=['GET', 'POST'])
def login_user_now():

  auth = request.get_json()
  print(auth)
  if not auth or not auth['officerID'] or not auth['password']:
     return make_response('could not verify', 401, {'WWW.Authentication': 'Basic realm: "login required"'})

  user = Officer.query.filter_by(officerID=auth['officerID']).first()
  print(user)
  if check_password_hash(user.password, auth['password']):
     token = jwt.encode({'officerID': user.officerID, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
     return jsonify({'token' : token.decode('UTF-8')})

  return make_response('could not verify',  401, {'WWW.Authentication': 'Basic realm: "login required"'})

@app.route('/createUser', methods=['POST'])
def create_user():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    message = "Failed creation, please try again"
    try:
        newUser = Officer(details['officerID'],generate_password_hash(details['password']), details['officerType'], details['name'], details['organisationName'], details['designation'])
        db.session.add(newUser)
        print(newUser)
        db.session.commit()
        token = jwt.encode({'officerID': newUser.officerID, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(minutes=30)}, app.config['SECRET_KEY'])
        return jsonify({'token' : token.decode('UTF-8')})
    except:
        db.session.rollback()
    
    return make_response('could not verify',  401, {'WWW.Authentication': 'Basic realm: "login required"'})

@app.route('/getDetails/<string:officerID>')
def getDetails(officerID):
    activity = Officer.query.filter_by(officerID=officerID).all()

    toReturn = []
    for i in activity:
        random = {
            "officerID" : i.officerID,
            "officerType":i.officerType,
            "name":i.name,
            "organisationName":i.organisationName,
            "designation":i.designation
        }
        toReturn.append(random)
    return jsonify(toReturn)

@app.route('/getAllOfficers')
def getAllDetails():
    activity = Officer.query.all()

    toReturn = []
    for i in activity:
        random = {
            "officerID" : i.officerID,
            "officerType":i.officerType,
            "name":i.name,
            "organisationName":i.organisationName,
            "designation":i.designation
        }
        toReturn.append(random)
    return jsonify(toReturn)

@app.route('/updateOfficerDetails', methods=['POST'])
def update_officer():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    officerID = details['officerID']
    
    toUpdate = Officer.query.filter_by(officerID=officerID).first()

    toUpdate.officerType = details['officerType']
    toUpdate.name = details['name']
    toUpdate.organisationName = details['organisationName']
    toUpdate.designation=details['designation']
    db.session.commit()
    return jsonify({"message":"Updated"})

@app.route('/deleteOfficer', methods=['POST'])
def delete_officer():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    id = details['officerID']
    message= "Failed"
    try:
        Officer.query.filter_by(officerID=id).delete()
        db.session.commit()
        message= "deleted"
    except Exception as e: 
        print(e)

        db.session.rollback()
    return jsonify({"message":message})