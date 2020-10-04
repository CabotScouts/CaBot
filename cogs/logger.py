import discord
from discord.ext import commands

def setup(bot) :
    bot.add_cog(Logger(bot))


class Logger(commands.Cog, name = "Discord Chat Logger") :

    def __init__(self, bot) :
        self.bot = bot
