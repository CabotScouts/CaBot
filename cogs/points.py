import discord
from discord.ext import commands

from helpers import isLeader, isAdmin
from models import Member

def setup(bot) :
    bot.add_cog(Points(bot))

def pointsFromArgs(args, mentions) :
    try :
        return int(args[0]) if (len(args) > len(mentions)) else None

    except ValueError :
        return None

class Points(commands.Cog) :

    def __init__(self, bot) :
        self.bot = bot

    def addPoints(self, points, IDs) :
        for ID in IDs :
            member, _ = Member.get_or_create(discordID = ID)
            member.points += points
            member.save()

    def removePoints(self, points, IDs) :
        for ID in IDs :
            member, _ = Member.get_or_create(discordID = ID)
            member.points -= points
            member.save()

    def setPoints(self, points, IDs) :
        for ID in IDs :
            member, _ = Member.get_or_create(discordID = ID)
            member.points = points
            member.save()

    @commands.command()
    @commands.guild_only()
    @commands.check(isLeader)
    async def point(self, ctx, *args) :
        members = ctx.message.mentions
        points = pointsFromArgs(args, members) or 1
        plural = "points" if (points == 0 or points > 1) else "point"
        IDs = [ member.id for member in members ]
        mentions = ', '.join([ member.mention for member in members ])
        self.addPoints(points, IDs)

        await ctx.send(f":coin: Gave {points} {plural} to {mentions}")

    @commands.command()
    @commands.guild_only()
    @commands.check(isLeader)
    async def depoint(self, ctx, *args) :
        members = ctx.message.mentions
        points = pointsFromArgs(args, members) or 1
        plural = "points" if (points == 0 or points > 1) else "point"
        IDs = [ member.id for member in members ]
        mentions = ', '.join([ member.mention for member in members ])
        self.removePoints(points, IDs)

        await ctx.send(f":coin: Removed {points} {plural} from {mentions}")

    @commands.command()
    @commands.guild_only()
    @commands.check(isLeader)
    async def setpoints(self, ctx, *args) :
        members = ctx.message.mentions
        points = pointsFromArgs(args, members) or 0
        IDs = [ member.id for member in members ]
        mentions = ', '.join([ member.mention for member in members ])
        self.setPoints(points, IDs)

        await ctx.send(f":coin: Set points to {points} for {mentions}")

    @commands.command(aliases=['board'])
    @commands.guild_only()
    async def leaderboard(self, ctx, *arg) :
        members = Member.select().where(Member.points > 0).order_by(Member.points.desc())

        if (len(arg) == 0) or (len(arg) > 0 and arg[0] != "all") :
            members = members.limit(3)

        if members.count() > 0 :
            medals = [":first_place:", ":second_place:", ":third_place:"]
            board = discord.Embed(
                color = 3447003
            )

            i = 0
            for member in members :
                medal = medals[i] if i < 3 else ""
                plural = "points" if member.points > 1 else "point"

                board.add_field(
                    name = f"{medal}{member.points} {plural}",
                    value = f"<@!{member.discordID}>",
                    inline = False,
                )

                i += 1

            await ctx.send(embed = board)

        else :

            await ctx.send(embed = discord.Embed(
                description = "The leaderboard is empty!",
                color = 3447003
            ))

    @commands.command()
    @commands.guild_only()
    @commands.check(isAdmin)
    async def clearpoints(self, ctx) :
        Member.update(points = 0).execute()
        await ctx.send("The leaderboard has been cleared")
