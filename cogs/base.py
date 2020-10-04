import discord
from discord.ext import commands

from checks import isLeader

def setup(bot) :
    bot.add_cog(BaseCommands(bot))


class BaseCommands(commands.Cog) :

    def __init__(self, bot) :
        self.bot = bot
        self.bot.remove_command("help")

    @commands.command()
    async def help(self, ctx) :
        help = discord.Embed(
            color = 16580705,
            title = "Hello, I'm CaBot <:scout:693531748696326245>",
            description = "Here are some things I can do:",
        )
        help.add_field(
            name = f"{ctx.prefix}help",
            value = "shows this help message",
            inline = False,
        )
        help.add_field(
            name = f"{ctx.prefix}topic <topic>",
            value = "adds a new discussion topic",
            inline = False,
        )
        # help.add_field(
        #     name = f"{ctx.prefix}joke",
        #     value = "returns a (very bad) joke",
        #     inline = False,
        # )
        help.add_field(
            name = f"{ctx.prefix}count",
            value = "does something strange with numbers (but only in #count)",
            inline = False,
        )
        help.add_field(
            name = f"{ctx.prefix}leaderboard [all]",
            value = "where do you rank?",
            inline = False,
        )
        help.add_field(
            name = f"{ctx.prefix}gamer",
            value = "add yourself to the gamer role",
            inline = False,
        )
        help.add_field(
            name = f"{ctx.prefix}programmer",
            value = "add yourself to the programmer role",
            inline = False,
        )
        help.add_field(
            name = f"{ctx.prefix}politics",
            value = "add yourself to the politics role",
            inline = False,
        )
        help.add_field(
            name = f"{ctx.prefix}lgbt",
            value = "add yourself to the lgbt role",
            inline = False,
        )

        await ctx.send(embed=help)

    @commands.command()
    @commands.guild_only()
    @commands.check(isLeader)
    async def announce(self, ctx) :
        print("makes announcement")

    @commands.command()
    @commands.guild_only()
    @commands.check(isLeader)
    async def message(self, ctx) :
        pass

    @commands.command()
    @commands.guild_only()
    async def topic(self, ctx, *topic) :
        pass

    # @commands.command()
    # @commands.guild_only()
    # async def joke(self, ctx) :
    #     pass
