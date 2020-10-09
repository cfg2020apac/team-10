from flask import Flask, request, jsonify
from flask import render_template, flash, redirect, url_for, session
from flask_cors import CORS
import sqlite3
from flask_sqlalchemy import SQLAlchemy
import time
import datetime
import requests

model = None
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://admin:codeforgood10@cfg-team10.cel29riokjfx.us-east-1.rds.amazonaws.com:3306/cfg'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)

class Applicant(db.Model):
    __tablename__ = "applicant"

    name = db.Column(db.String(100), primary_key=True)
    applicantID = db.Column(db.String(45), primary_key=True)
    status = db.Column(db.String(45), nullable=False)
    progress = db.Column(db.String(45), nullable=False)
    officerID = db.Column(db.String(45), nullable=False)
    thirdPartyID = db.Column(db.String(45), nullable=False)

    def __init__(self, name, applicantID, status, progress, officerID, thirdPartyID):
        self.name = name
        self.applicantID = applicantID
        self.status = status
        self.progress = progress
        self.officerID = officerID
        self.thirdPartyID = thirdPartyID
    
    def json(self):
        return{"name": self.name, "applicantID": self.applicantID, "status": self.status, "progress": self.progress, "officerID": self.officerID, "thirdPartyID": self.thirdPartyID}

@app.route("/", methods=["GET"])
def get_all_applicants():
    all_applicants = Applicant.query.all()
    return render_template("index.html", all_applicants=all_applicants)

@app.route("/addApplicant", methods=["POST"])
def create_new_applicant():
    name = request.form['addName'].strip().capitalize()
    officerID = request.form['addOfficer']
    applicantID = name[0:3] + "123"
    status = "Admission"
    progress = "Pending"
    thirdPartyID = "Not assigned"

    applicant = Applicant.query.filter_by(name=name).first()
    if not applicant:
        add_applicant = Applicant(name=name, officerID=officerID, applicantID=applicantID, status=status, progress=progress, thirdPartyID=thirdPartyID)
        db.session.add(add_user)
        db.session.commit()
    else: 
        message = jsonify({"message": "Applicant already existed. Please go back and try again"})
        return message
    return render_template("index.html")

@app.route("/", methods=["POST"])
def update_applicant():
    if request.method == "POST":
        applicantID = request.form['updateApplicantID']
        name = request.form['updateName'].strip().capitalize()
        status = request.form['updateStatus'].strip().capitalize()
        progress = request.form['updateProgress'].strip().lower()
        officerID = request.form['updateOfficerID']
        thirdPartyID = request.form['updateThirdPartyID']

        applicant = Applicant.query.filter_by(name=name).first()
        if not applicant:
            applicantUpdate = Applicant.query.filter_by(name=name).first()
            applicantUpdate.name = name
            applicantUpdate.applicantID = applicantID
            applicantUpdate.status = status
            applicantUpdate.progress = progress
            applicantUpdate.officerID = officerID
            applicantUpdate.thirdPartyID = thirdPartyID      
            db.session.commit()
        else:
            message = jsonify({"message": "User email already existed. Please go back and try again"})
            return message
    return render_template("index.html")

@app.route("/delete_applicant/<string:applicantID>")
def delete_applicant(applicantID):
    Applicant.query.filter_by(applicantID=applicantID).delete()
    db.session.commit()
    return redirect(request.referrer)

if __name__ == '__main__':
    app.run(port=5000, debug=True)
