from app import create_app, db
import sqlalchemy as sqla
import sqlalchemy.orm as so
from config import Config



app = create_app(Config)

@app.shell_context_processor
def make_shell_context():
    return {'sa': sqla, 'so': so}


@app.before_request
def initDB(*args, **kwargs):
    if app._got_first_request:
        db.create_all()

if __name__ == "__main__":
    app.run(debug=True, port=3000)

    