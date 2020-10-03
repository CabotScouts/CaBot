import discord
from discord.ext import commands

def setup(bot) :
    bot.add_cog(Roles(bot))

class Roles(commands.Cog) :

    # should we cache the Role object on init?
    roles = {
        "gamer" : 699660460546588812,
        "lgbt" : 715693259497930804,
        "politics" : 715697602087354389,
        "programmer" : 702163719269908603,
    }

    def __init__(self, bot) :
        self.bot = bot

    async def toggleRole(self, ctx, role) :
        role = ctx.guild.get_role(self.roles[role])

        if role :
            if role in ctx.author.roles :
                await ctx.author.remove_roles(role)
                await ctx.send(embed=discord.Embed(
                    description = f"Removed from <@&{role.id}>",
                    color = 1146986,
                ))

            else :
                await ctx.author.add_roles(role)
                await ctx.send(embed=discord.Embed(
                    description = f"Added to <@&{role.id}>",
                    color = 1146986,
                ))

    @commands.command()
    @commands.guild_only()
    async def gamer(self, ctx) :
        await self.toggleRole(ctx, "gamer")

    @commands.command()
    @commands.guild_only()
    async def lgbt(self, ctx) :
        await self.toggleRole(ctx, "lgbt")

    @commands.command()
    @commands.guild_only()
    async def politics(self, ctx) :
        await self.toggleRole(ctx, "politics")

    @commands.command()
    @commands.guild_only()
    async def programmer(self, ctx) :
        await self.toggleRole(ctx, "programmer")
