from app import db
import sqlalchemy as sqla
import sqlalchemy.orm as sqlo


class Catagory(db.Model):
    #fields
    __tablename__='catagory'
    id : sqlo.Mapped[int] = sqlo.mapped_column(primary_key=True)
    name : sqlo.Mapped[str]  = sqlo.mapped_column(sqla.String(20),index=True,unique=True)

    #methods
    def __repr__(self):
        return "<Cataory: #{} {}>".format(self.id,self.name)
    def get_name(self):
        return self.name
    def export(self):
        return {"name":self.name}
    
class Skill(db.Model):
    #fields
    __tablename__='skill'
    id : sqlo.Mapped[int] = sqlo.mapped_column(primary_key=True)
    name : sqlo.Mapped[str]  = sqlo.mapped_column(sqla.String(20),index=True,unique=True)
    
    #methods
    def __repr__(self):
        return "<Skill: #{} {}>".format(self.id,self.name)
    def get_name(self):
        return self.name
    def export(self):
        return {"name":self.name}


class Project(db.Model):
    #fields
    __tablename__='project'
    id : sqlo.Mapped[int] = sqlo.mapped_column(primary_key=True)
    title : sqlo.Mapped[str]  = sqlo.mapped_column(sqla.String(20),unique=True)
    description : sqlo.Mapped[str]  = sqlo.mapped_column(sqla.String(200),unique=True)

    #methods
    def __repr__(self):
        return "<Project:  #{} {}>".format(self.id,self.title)
    def get_title(self):
        return self.title
    def get_description(self):
        return self.description
    def export(self):
        return {"title":self.title, "description": self.description}
