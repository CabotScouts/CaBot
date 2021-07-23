import os
import datetime

from dotenv import load_dotenv
from peewee import SqliteDatabase, MySQLDatabase

from server import roles

load_dotenv()


def initDB():
    db_type = os.getenv("DB", "sqlite")
    if db_type == "sqlite":
        db = SqliteDatabase(os.getenv("DB_FILE", ":memory:"))
    elif db_type == "mysql":
        db = MySQLDatabase(
            os.getenv("DB_NAME"),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            host=os.getenv("DB_HOST", "localhost"),
            port=os.getenv("DB_PORT", 3306),
        )

    return db


def hasRole(member, roleID):
    role = member.guild.get_role(roleID)
    return role in member.roles


def gainedRole(before, after, roleID):
    role = before.guild.get_role(roleID)
    return (role not in before.roles) and (role in after.roles)


def isExplorer(ctx):
    return hasRole(ctx.author, roles["explorer"])


def isNetwork(ctx):
    return hasRole(ctx.author, roles["network"])


def isLeader(ctx):
    return hasRole(ctx.author, roles["leader"])


def isAdmin(ctx):
    return hasRole(ctx.author, roles["admin"])


def isBot(ctx):
    return hasRole(ctx.author, roles["bot"])


class Colours:
    DEFAULT = 0
    AQUA = 1752220
    GREEN = 3066993
    BLUE = 3447003
    PURPLE = 10181046
    GOLD = 15844367
    ORANGE = 15105570
    RED = 15158332
    GREY = 9807270
    DARKER_GREY = 8359053
    NAVY = 3426654
    DARK_AQUA = 1146986
    DARK_GREEN = 2067276
    DARK_BLUE = 2123412
    DARK_PURPLE = 7419530
    DARK_GOLD = 12745742
    DARK_ORANGE = 11027200
    DARK_RED = 10038562
    DARK_GREY = 9936031
    LIGHT_GREY = 12370112
    DARK_NAVY = 2899536
    LUMINOUS_VIVID_PINK = 16580705
    DARK_VIVID_PINK = 12320855
