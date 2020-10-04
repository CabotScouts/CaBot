import discord
from discord.ext import commands

def setup(bot) :
    bot.add_cog(VerifyHelper(bot))


class VerifyHelper(commands.Cog, name = "Discord Verification Helper") :

    def __init__(self, bot) :
        self.bot = bot
