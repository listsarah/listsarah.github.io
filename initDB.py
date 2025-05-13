from app import app, db
from app.main.main_models import Catagory, Skill, Project 

import sqlalchemy as sqla
import sqlalchemy.orm as sqlo

app.app_context().push()

db.create_all()
