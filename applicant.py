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

class Officer(db.Model):
    __tablename__ = "officer"

    officerID = db.Column(db.String(45), primary_key=True)
    password = db.Column(db.String(45), nullable=False)

    def __init__(self, officerID, password):
        self.officerID = officerID
        self.password = password
    
    def json(self):
        return{"officerID": self.officerID, "password": self.password}

if __name__ == '__main__':
    app.run(port=5000, debug=True)
