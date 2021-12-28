import json

import discord
from discord.ext import commands

from models import Channel, KeyValue, Member, Message
from helpers import isAdmin


def setup(bot):
    bot.add_cog(Logger(bot))


class Logger(commands.Cog, name="Discord Chat Logger"):
    def __init__(self, bot):
        self.bot = bot

        self.store, stored = KeyValue.get_or_create(
            key="logger_channels_ignore", defaults={"value": "[]"}
        )

        self.ignore = json.loads(self.store.value)

    def cog_unload(self):
        self.store.value = json.dumps(self.ignore)
        self.store.save()

    @commands.Cog.listener()
    async def on_message(self, message):
        if (
            isinstance(message.channel, discord.TextChannel)
            and message.channel.id in self.ignore
        ):
            return

        member, _ = await self.bot.db.get_or_create(
            Member,
            discordID=message.author.id,
            defaults={"name": message.author.display_name},
        )

        name = (
            message.channel.name
            if isinstance(message.channel, discord.TextChannel)
            else "DM"
        )

        channel, _ = await self.bot.db.get_or_create(
            Channel, discordID=message.channel.id, defaults={"name": name}
        )

        message = await self.bot.db.create(
            Message,
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
        messages = await self.bot.db.execute(
            Message.select().order_by(Message.timestamp.desc()).limit(num)
        )

        for message in messages:
            await ctx.send(f"{message.message}")

    @log.command()
    @commands.check(isAdmin)
    async def exclude(self, ctx, mention=None):
        if mention:
            channel = discord.utils.get(ctx.guild.channels, mention=mention)

        else:
            channel = ctx.channel

        if (
            channel
            and isinstance(channel, discord.TextChannel)
            and channel.id not in self.ignore
        ):
            self.ignore.append(channel.id)
            await ctx.send(f"{channel.mention} will now be ignored by the logger")

    @log.command()
    @commands.check(isAdmin)
    async def include(self, ctx, mention=None):
        if mention:
            channel = discord.utils.get(ctx.guild.channels, mention=mention)

        else:
            channel = ctx.channel

        if (
            channel
            and isinstance(channel, discord.TextChannel)
            and channel.id in self.ignore
        ):
            self.ignore.remove(channel.id)
            await ctx.send(f"{channel.mention} will now be included by the logger")

    @log.command()
    @commands.check(isAdmin)
    async def channels(self, ctx):
        if len(self.ignore) > 0:
            channels = ", ".join(
                [
                    discord.utils.get(ctx.guild.channels, id=id).mention
                    for id in self.ignore
                ]
            )

            await ctx.send(f"Currently excluding {channels} from the chat logs")

        else:
            await ctx.send("No channels currently excluded from the chat logs")
