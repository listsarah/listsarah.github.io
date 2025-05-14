from app import db, create_app
from app.main.main_models import Catagory, Skill, Project 

import os

os.remove("portfolio.db")

app = create_app()
app.app_context().push()

db.create_all()

# add catagories
programming = Catagory(name = "Programming")
electrical = Catagory(name = "Electrical")
mechanical = Catagory(name = "Mechanical")
db.session.add(programming)
db.session.add(electrical)
db.session.add(mechanical)
db.session.commit()

# add skills
robotics = Skill(name = "Robotics")
cad = Skill(name="CAD")
machining = Skill(name="Machining")
design = Skill(name="Design")
db.session.add(robotics)
db.session.add(cad)
db.session.add(machining)
db.session.add(design)
db.session.commit()

# add a project
turtlebot = Project(title = "Turtlebot SLAM", description = "Simultaneous Localization and Mapping Implementation on a Turtlebot. Robot explores, maps, and navigates a static, unknown maze. A* Path Planning was implemented to improve navigational efficiency.")
db.session.add(turtlebot)
db.session.commit()