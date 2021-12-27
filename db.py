import os

import peewee_async
from dotenv import load_dotenv

load_dotenv()


def db():
    db_type = os.getenv("DB", "sqlite")
    if db_type == "sqlite":
        db = peewee_async.SqliteDatabase(os.getenv("DB_FILE", ":memory:"))
    elif db_type == "mysql":
        db = peewee_async.MySQLDatabase(
            os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST", "localhost"),
            port=os.getenv("DB_PORT", 3306),
        )

    return db


def async_db():
    db_type = os.getenv("DB", "sqlite")
    if db_type == "sqlite":
        return db()
    else:
        d = db()
        d.set_allow_sync(False)
        async_db = peewee_async.Manager(d)
        return async_db
