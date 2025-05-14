from flask import Blueprint

error_blueprint = Blueprint('errors', __name__, template_folder='templates')

from app.errors import errors