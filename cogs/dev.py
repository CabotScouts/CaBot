import os

import discord
from discord.ext import commands

from checks import isAdmin

def setup(bot) :
    bot.add_cog(DevCommands(bot))


class DevCommands(commands.Cog) :

    def __init__(self, bot) :
        self.bot = bot

    @commands.command()
    @commands.check(isAdmin)
    async def host(self, ctx) :
        host = os.uname()[1]
        await ctx.send(f":partying_face: CaBot v{self.bot.version} running on {host}")

    @commands.command()
    @commands.check(isAdmin)
    async def ping(self, ctx) :
        ping = round((self.bot.latency*1000), 2)
        await ctx.send(f":ping_pong: {ping}ms")

    @commands.command()
    @commands.check(isAdmin)
    async def reload(self, ctx, cog) :
        self.bot.reload_extension(f"cogs.{cog}")
        await ctx.send(f"Reloaded {cog}")
