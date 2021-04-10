from flask import Flask
from flask_cors import CORS
from flask_mysqldb import MySQL
from settings import MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB, MYSQL_HOST


app = Flask(__name__)

app.config["MYSQL_USER"] = MYSQL_USER
app.config["MYSQL_PASSWORD"] = MYSQL_PASSWORD
app.config["MYSQL_DB"] = MYSQL_DB
app.config["MYSQL_CURSORCLASS"] = "DictCursor"
app.config["MYSQL_HOST"] = MYSQL_HOST


db = MySQL(app)

from auth import authentication
from user_log import userlog

app.register_blueprint(authentication, url_prefix="/api/auth")
app.register_blueprint(userlog, url_prefix="/api/userlog")
