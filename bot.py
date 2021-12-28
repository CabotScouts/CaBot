import os
import asyncio

from dotenv import load_dotenv
import discord
from discord.ext import commands

from db import async_db

load_dotenv()

__version__ = "2.3.6"


class CaBot(commands.Bot):
    def __init__(self, **options):
        self.prefix = options["command_prefix"]
        self.version = __version__
        self.db = async_db()
        super().__init__(**options)


if __name__ == "__main__":

    bot = CaBot(
        command_prefix=os.getenv("PREFIX", "?"),
        intents=discord.Intents.all(),
    )

    bot.loop.create_task(bot.db.connect())

    bot.load_extension("cogs.base")
    bot.load_extension("cogs.dev")
    bot.load_extension("cogs.logger")
    bot.load_extension("cogs.roles")
    bot.load_extension("cogs.verify_helper")
    bot.load_extension("cogs.sanitise")
    bot.load_extension("cogs.points")
    bot.load_extension("cogs.count")

    bot.run(os.getenv("TOKEN"))
