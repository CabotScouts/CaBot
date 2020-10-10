from models import db, KeyValue, Member, Channel, Message, Verifier

db.connect()
db.create_tables([KeyValue, Member, Channel, Message, Verifier])
