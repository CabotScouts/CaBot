import discord
from discord.ext import commands

def setup(bot) :
    bot.add_cog(Sanitiser(bot))


class Sanitiser(commands.Cog, name = "Discord Chat Sanitiser") :

    def __init__(self, bot) :
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, ctx) :
        pass
