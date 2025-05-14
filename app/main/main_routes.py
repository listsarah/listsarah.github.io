from flask import render_template
from app import db
import sqlalchemy as sqla
from app.main.main_models import Project
from app.main import main_blueprint as bp_main

@bp_main.route('/', methods=['GET'])
def index():
    return render_template('main.html')

@bp_main.route('/projects/retreive', methods=['GET'])
def get_projects():
    projects = db.session.scalars(sqla.select(Project))
    return # make projects as json
