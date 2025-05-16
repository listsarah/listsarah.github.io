from flask import render_template
from app.main import main_blueprint as bp_main
import json

@bp_main.route('/', methods=['GET'])
def index():
    return render_template('main.html')

@bp_main.route('/projects/retreive', methods=['GET'])
def get_projects():

    with open('projects.json') as f:
        d = json.load(f)
    projects = d
    return {"projects": projects}
