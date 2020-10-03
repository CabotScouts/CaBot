import discord
from discord.ext import commands

class Points(commands.Cog) :

    def __init__(self) :
        # create DB tables if they don't exist?
        pass


    @commands.command()
    # leader only
    async def point(self, ctx, arg) :
        pass

    @commands.command()
    async def depoint(self, ctx, arg) :
        pass

    @commands.command()
    async def setpoint(self, ctx, arg) :
        pass

    @commands.command(aliases=['board'])
    async def leaderboard(self, ctx) :
        pass
