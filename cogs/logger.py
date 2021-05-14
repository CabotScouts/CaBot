import discord
from discord.ext import commands

from models import Message, Member, Channel
from helpers import isAdmin


def setup(bot):
    bot.add_cog(Logger(bot))


class Logger(commands.Cog, name="Discord Chat Logger"):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message):
        member, _ = Member.get_or_create(
            discordID=message.author.id, defaults={"name": message.author.display_name}
        )

        name = (
            message.channel.name
            if isinstance(message.channel, discord.TextChannel)
            else "DM"
        )

        channel, _ = Channel.get_or_create(
            discordID=message.channel.id, defaults={"name": name}
        )

        message = Message.create(
            discordID=message.id,
            member=member,
            channel=channel,
            message=message.content,
            # embed = str(message.embeds),
        )

    @commands.group()
    @commands.check(isAdmin)
    async def log(self, ctx):
        pass

    @log.command()
    @commands.check(isAdmin)
    async def tail(self, ctx, num=5):
        messages = Message.select().order_by(Message.timestamp.desc()).limit(num)

        for message in messages:
            await ctx.send(f"{message.message}")
