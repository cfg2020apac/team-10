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

class Applicant(db.Model):
    __tablename__ = 'applicant'
    name = db.Column(db.String(100), primary_key=True)
    applicantID = db.Column(db.String(45), primary_key=True)
    status = db.Column(db.String(45),nullable=False)
    progress = db.Column(db.String(45),nullable=False)
    officerID = db.Column(db.String(45),nullable=False)
    thirdPartyID = db.Column(db.String(45),nullable=False)

    def __init__(self, name, applicantID,status,progress,officerID,thirdPartyID):
        self.name = name
        self.applicantID = applicantID
        self.status = status
        self.progress = progress
        self.officerID = officerID
        self.thirdPartyID = thirdPartyID

@app.route("/", methods=["GET"])
def get_all_applicants():
    all_applicants = Applicant.query.all()
    return render_template("index.html", all_applicants=all_applicants)

@app.route("/addApplicant", methods=["POST"])
def create_new_applicant():

    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()

    name = details['addName'].strip().capitalize()
    officerID = details['addOfficer']
    applicantID = name[0:3] + "123"
    status = "Admission"
    progress = "Pending"
    thirdPartyID = "Not assigned"
    message = ""
    applicant = Applicant.query.filter_by(name=name).first()
    if not applicant:
        add_applicant = Applicant(name=name, officerID=officerID, applicantID=applicantID, status=status, progress=progress, thirdPartyID=thirdPartyID)
        db.session.add(add_applicant)
        db.session.commit()
        message = jsonify({"message": "User has been added"})
    else: 
        message = jsonify({"message": "User email already existed. Please go back and try again"})
    return message

#checkout trip for payment - step 2: invoke paypal API with tripdetails 
@app.route('/updateStatus/<string:applicantID>')
def update_user(process, applicantID):
    if request.is_json:
        details = request.get_json()
    else:
        details = request.get_data()
    print(details)

    user = Applicant.query.filter_by(applicantID=details['applicantID']).first()
    user.progress="Completed"
    db.session.commit()
    return "done"




