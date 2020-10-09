from flask import Flask;
app = Flask(__name__)

import jpmorgan.routes.login
import jpmorgan.routes.sendEmail
import jpmorgan.routes.applicant


