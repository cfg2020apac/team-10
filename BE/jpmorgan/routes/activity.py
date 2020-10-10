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
from datetime import datetime
import pika
from werkzeug.security import generate_password_hash, check_password_hash

logger = logging.getLogger(__name__)


#change link to own database directory
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:codeforgood10@cfg-team10.cel29riokjfx.us-east-1.rds.amazonaws.com:3306/cfg'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
CORS(app)

class Activity(db.Model):
    __tablename__ = 'activity'
    activityID = db.Column(db.String(45), primary_key=True)
    activityName = db.Column(db.String(45))
    description = db.Column(db.String(99),nullable=False)
    status = db.Column(db.String(45))
    caseOfficer = db.Column(db.String(45))
    applicant = db.Column(db.String(45))
    createdDate = db.Column(db.TIMESTAMP())
    updatedDate = db.Column(db.TIMESTAMP())
    comments =  db.Column(db.String(45))

    def __init__(self, activityID, activityName, description,status,caseOfficer,applicant,createdDate,updatedDate,comments):
        self.activityID = activityID
        self.activityName = activityName
        self.description = description
        self.status = status
        self.caseOfficer = caseOfficer
        self.applicant = applicant
        self.createdDate = createdDate
        self.updatedDate = updatedDate
        self.comments = comments

@app.route('/createActivity', methods=['POST'])
def create_activity():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    print(details)
    message = "Failed creation, please try again"

    try:
        newAct = Activity(details['activityID'],details['activityName'], details['description'],details['status'],details['caseOfficer'],details['applicant'],datetime.now(),datetime.now(),details['comments'])
        db.session.add(newAct)
        db.session.commit()
        message = "Creation success"
    except Exception as e: 
        print(e)

        db.session.rollback()

    return jsonify({"message":message})


@app.route('/getAllActivity')
def get_all_activity():

    activity = Activity.query.all()
    toReturn = []
    for i in activity:
        random = {
            "activityID" : i.activityID,
            "activityName":i.activityName,
            "description":i.description,
            "caseOfficer":i.caseOfficer,
            "applicant":i.applicant,
            "comments":i.comments,
            "status":i.status,
            "createdDate":i.createdDate,
            "updatedDate":i.updatedDate
        }
        toReturn.append(random)
    return jsonify(toReturn)

@app.route('/getAllActivityByApplicant/<string:applicant>')
def get_activity_persons(applicant):
    activity = Activity.query.filter_by(applicant=applicant).all()

    toReturn = []
    for i in activity:
        random = {
            "activityID" : i.activityID,
            "activityName":i.activityName,
            "description":i.description,
            "caseOfficer":i.caseOfficer,
            "applicant":i.applicant,
            "comments":i.comments,
            "status":i.status,
            "createdDate":i.createdDate,
            "updatedDate":i.updatedDate
        }
        toReturn.append(random)
    return jsonify(toReturn)

@app.route('/getActivityByID/<int:activityID>')
def get_activity_by_id(activityID):
    activity = Activity.query.filter_by(activityID=activityID).all()

    toReturn = []
    for i in activity:
        random = {
            "activityID" : i.activityID,
            "activityName":i.activityName,
            "description":i.description,
            "caseOfficer":i.caseOfficer,
            "applicant":i.applicant,
            "comments":i.comments,
            "status":i.status,
            "createdDate":i.createdDate,
            "updatedDate":i.updatedDate
        }
        toReturn.append(random)
    return jsonify(toReturn)



@app.route('/deleteActivity', methods=['POST'])
def delete_activity():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    id = details['activityID']
    message= "Failed"
    try:
        Activity.query.filter_by(activityID=id).delete()
        db.session.commit()
        message= "deleted"
    except Exception as e: 
        print(e)

        db.session.rollback()
    return jsonify({"message":message})
    
@app.route('/updateActivity', methods=['POST'])
def update_activity():
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    actId = details['activityID']
    
    toUpdate = Activity.query.filter_by(activityID=actId).first()
    toUpdate.activityName = details['activityName']
    toUpdate.description = details['description']
    toUpdate.status = details['status']
    toUpdate.caseOfficer = details['caseOfficer']
    toUpdate.applicant=details['applicant']
    toUpdate.updatedDate = datetime.now()
    toUpdate.comments = details['comments']
    db.session.commit()
    return jsonify({"message":"Updated"})