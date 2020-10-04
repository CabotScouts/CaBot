import os

from dotenv import load_dotenv
from peewee import *

load_dotenv()

db = SqliteDatabase(os.getenv("DB"))

class Base(Model) :
    class Meta :
        database = db

class KeyValue(Base) :
    key = TextField(unique = True)
    value = TextField(null = True)

    class Meta :
        table_name = "values"

class Member(Base) :
    discordID = IntegerField(unique = True)
    points = IntegerField(default = 0)

class Channel(Base) :
    discordID = IntegerField(unique = True)
    name = TextField()

class Message(Base) :
    member = ForeignKeyField(Member, backref="member")
    channel = ForeignKeyField(Channel, backref="channel")
    message = TextField(null = True)
    embed = TextField(null = True)
