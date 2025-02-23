import os
from dotenv import load_dotenv

basedir = os.path.abspath(os.path.dirname(__file__))

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'you-will-never-guess'
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        'sqlite:///' + os.path.join(basedir, 'portfolio.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    ROOT_PATH = basedir
    TEMPLATE_FOLDER_MAIN = os.path.join(basedir, 'app//main//templates')
    TEMPLATE_FOLDER_ADMIN = os.path.join(basedir, 'app//admin//templates')
    TEMPLATE_FOLDER_ERRORS = os.path.join(basedir, 'app//errors//templates') 
    MAIN_STATIC_FOLDER = os.path.join(basedir, 'app//static')    