from flask import render_template

from app.errors import error_blueprint as bp_errors

@bp_errors.app_errorhandler(404)
def not_found_error(error):
    return render_template('404_error.html'), 404
