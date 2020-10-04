import os

from dotenv import load_dotenv
import discord
from discord.ext import commands
from peewee import SqliteDatabase

load_dotenv()

__version__ = "2.0.a"

class CaBot(commands.Bot) :

    db = None

    def __init__(self, **options) :
        self.prefix = options["command_prefix"]
        self.version = __version__

        if "db" in options :
            self.db = SqliteDatabase(options["db"])
            self.db.connect()

        super().__init__(**options)


if __name__ == "__main__" :
    bot = CaBot(db=os.getenv("DB"), command_prefix=os.getenv("PREFIX"))
    bot.load_extension("cogs.base")
    bot.load_extension("cogs.dev")
    bot.load_extension("cogs.logger")
    bot.load_extension("cogs.roles")
    bot.load_extension("cogs.verify_helper")
    # bot.load_extension("cogs.sanitise")
    bot.load_extension("cogs.points")
    bot.load_extension("cogs.social_media")
    bot.load_extension("cogs.count")
    bot.run(os.getenv("TOKEN"))
