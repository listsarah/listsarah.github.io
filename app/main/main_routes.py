from flask import render_template, abort
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

@bp_main.route("/projects/<name>")
def project_details(name):
    with open('projects.json') as f:
        d = json.load(f)
    projects = d
    for project in projects:
        if name_snake_case(project["title"]) == name: return render_template("__project.html")
    return abort(404)

@bp_main.route("/projects/<name>/retrieve")
def get_project_details(name):
    with open('projects.json') as f:
        d = json.load(f)
    projects = d
    for project in projects:
        if name_snake_case(project["title"]) == name: return {"project": project}
    return abort(404)

def name_snake_case(name):
    words = name.split(" ")
    snake_case = ""
    for word in words:
        snake_case += "_" + word.lower()
    return snake_case[1:]