import discord
from discord.ext import commands

def setup(bot) :
    bot.add_cog(SocialTracker(bot))


class SocialTracker(commands.Cog, name = "Cabot Explorers Social Media Tracker") :

    def __init__(self, bot) :
        self.bot = bot
