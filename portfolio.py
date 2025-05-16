from app import create_app
import sqlalchemy as sqla
import sqlalchemy.orm as so
from config import Config



app = create_app(Config)

@app.shell_context_processor
def make_shell_context():
    return {'so': so}


if __name__ == "__main__":
    app.run(debug=True, port=3000)

    