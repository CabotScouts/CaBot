import os

from dotenv import load_dotenv
import discord
from discord.ext import commands

load_dotenv()

class CaBot(commands.Bot) :

    db = None

    def __init__(self, **options) :
        self.prefix = options["command_prefix"]

        if "DB" in options :
            self.db = options["DB"]

        super().__init__(**options)


if __name__ == "__main__" :
    bot = CaBot(db=os.getenv("DB"), command_prefix=os.getenv("PREFIX"))
    bot.load_extension("cogs.base")
    # bot.load_extension("cogs.dev")
    # bot.load_extension("cogs.logger")
    bot.load_extension("cogs.roles")
    # bot.load_extension("cogs.verify_helper")
    # bot.load_extension("cogs.sanitise")
    # bot.load_extension("cogs.points")
    # bot.load_extension("cogs.social_media")
    bot.run(os.getenv("TOKEN"))
