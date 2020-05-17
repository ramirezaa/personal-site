from flask import Flask, session, request, jsonify,send_from_directory, Response
from flask_cors import CORS, cross_origin
from datetime import datetime
import pandas as pd
from functools import wraps
import requests
import flask
import json
import sys
import os

app = Flask(__name__)

app.config['JSON_SORT_KEYS'] = os.getenv('JSON_SORT_KEYS')
CORS(app)

@app.route("/get_host")
def get_host():
    return jsonify(os.getenv('FLASK_RUN_HOST'))


if __name__ == "__main__":    
    app.run(host='0.0.0.0',debug=os.getenv('DEBUG'))