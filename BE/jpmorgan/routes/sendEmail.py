from flask import Flask,request
from flask_mail import Mail, Message
import os,sys
import json
from os import environ
import urllib.parse
from urllib.parse import urlparse
import pika 
from jpmorgan import app;


app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = ''
app.config['MAIL_PASSWORD'] = 'Constiislyf3#'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True


@app.route("/acknowledgement/<string:emailAddress>",methods=["POST"])
def send_email(emailAddress):
    print("LASDA")
    if request.is_json:
        content = request.get_json()
    else:
        content = request.get_data()
    mail = Mail(app)
    msg = Message('Hello', sender = '', recipients = [''])
    msg.body = "Hello Flask message sent from Flask-Mail"
    mail.send(msg)
    return "Sent"

