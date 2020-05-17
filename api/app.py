from flask import Flask, session, request, jsonify,send_from_directory, Response
from flask_cors import CORS, cross_origin
from datetime import datetime
import pandas as pd
from functools import wraps
import requests
import flask
import json
import sys

print('-=-=-=-=-=- Starting API -=-=-=-=-=-')
sys.stdout.flush()

app = Flask(__name__)
# app.config['JSON_SORT_KEYS'] = False
# app.debug = True
# app.secret_key = 'development'
# app.config['ENV'] = 'localhost'
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/contact")
def contact():
    # return jsonify({"success":True})
    return jsonify(app.config['ENV'])


if __name__ == "__main__":    
    app.run(host='0.0.0.0')

print('-=-=-=-=-=- API Started -=-=-=-=-=-')
sys.stdout.flush()
