from flask import render_template
from app.main import main_blueprint as bp_main

@bp_main.route('/', methods=['GET'])
def index():
    return render_template('main.html')