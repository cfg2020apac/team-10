import logging
import json

from flask import request, jsonify;

from jpmorgan import app;

from flask import Flask, request, jsonify, render_template
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

logger = logging.getLogger(__name__)


#change link to own database directory
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


#checkout trip for payment - step 2: invoke paypal API with tripdetails 
@app.route('/createUser', methods=['POST'])
def create_user():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    print(details)
    message = "Failed creation, please try again"

    try:
        newUser = Officer(details['officerID'],generate_password_hash(details['password']), details['officerType'], details['name'], details['organisationName'], details['designation'])
        db.session.add(newUser)
        db.session.commit()
        message = "Creation success"
    except:
        db.session.rollback()

    return jsonify({"message":message})

@app.route('/login', methods=['POST'])
def login_user():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    # print(details)
    message = "Failed authentication, please try again"
    user = Officer.query.filter_by(officerID=details['officerID']).first()
    if(check_password_hash(user.password,details['password'])):
        message = "Authentication success"
    return jsonify({"message":message})
    # if check_password_hash(user.password,details['password']):
    #     print("Authenticated")


