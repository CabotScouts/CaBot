import asyncio

import discord
from discord.ext import commands

from helpers import hasRole, gainedRole, isAdmin
from server import roles, channels, units
from models import Verifier


def setup(bot):
    bot.add_cog(VerifyHelper(bot))


class VerifyHelper(commands.Cog, name="Discord Verification Helper"):
    def __init__(self, bot):
        self.bot = bot

    @commands.Cog.listener()
    async def on_member_join(self, member):
        if not (
            hasRole(member, roles["explorer"])
            or hasRole(member, roles["network"])
            or hasRole(member, roles["leader"])
        ):

            verifier = Verifier.get_or_none(Verifier.discordID == member.id)

            if verifier:
                role = member.guild.get_role(roles[verifier.role])
                await member.edit(nick=verifier.name)
                await member.add_roles(role)

                if verifier.unit and verifier.unit in units:
                    unit = member.guild.get_role(roles[verifier.unit])
                    await member.add_roles(unit)

                verifier.delete_instance()

            else:

                await member.guild.get_channel(channels["system"]).send(
                    f":bell: {member.mention} requires verification"
                )
                await asyncio.sleep(5)
                await member.guild.get_channel(channels["verify"]).send(
                    f"<:scout:693531748696326245> Welcome to Cabot Explorers on Discord {member.mention} - before you can access the server we need to check that you're an Explorer - please reply here with your **name** and **Explorer Unit**, and wait for a leader to verify you"
                )

    @commands.Cog.listener()
    async def on_member_update(self, before, after):
        if gainedRole(before, after, roles["explorer"]):
            await after.guild.get_channel(channels["explorers"]).send(
                f"<:scout:693531748696326245> Welcome to Cabot Explorers on Discord {after.mention} - say hello!"
            )

            await after.guild.get_channel(channels["system"]).send(
                f":star: {after.mention} was verified as an Explorer"
            )

        elif gainedRole(before, after, roles["network"]):
            await after.guild.get_channel(channels["network"]).send(
                f"<:scout:693531748696326245> Welcome to the network chat {after.mention}"
            )

            await after.guild.get_channel(channels["system"]).send(
                f":star: {after.mention} was verified as a Network member"
            )

        elif gainedRole(before, after, roles["leader"]):
            await after.guild.get_channel(channels["leaders"]).send(
                f"<:scout:693531748696326245> Welcome to the leaders lounge {after.mention}"
            )

            await after.guild.get_channel(channels["system"]).send(
                f":star: {after.mention} was verified as a leader"
            )

    @commands.Cog.listener()
    async def on_message(self, message):
        if (
            message.channel.id == channels["verify"]
            and message.content == "<#689264900044095558>"
        ):
            await message.channel.send(
                f"Nice one {message.author.mention}, that's how you send a message - please now send a message with your **name** and **Explorer Unit** so we can verify you!"
            )

    @commands.group()
    @commands.check(isAdmin)
    async def verify(self, ctx):
        pass

    @verify.command()
    @commands.check(isAdmin)
    async def list(self, ctx):
        """List currently setup verifiers"""

        verifiers = Verifier.select()

        if verifiers.count() > 0:
            list = ""
            for verifier in verifiers:
                unit = f" ({verifier.unit})" if verifier.unit else ""
                list += f"{verifier.discordID} - <@{verifier.discordID}> ({verifier.name}) - {verifier.role}{unit}\n"

            await ctx.send(list)

        else:
            await ctx.send("No offline verifiers currently pending")

    @verify.command()
    @commands.check(isAdmin)
    async def add(self, ctx, id, name, role, unit=None):
        """Add a new offline user verifier"""

        if role in ["explorer", "leader", "network"]:
            unit = unit if unit in units else None

            verifier, created = Verifier.get_or_create(
                discordID=id, defaults={"name": name, "role": role, "unit": unit}
            )

            if not created:
                verifier.name = name
                verifier.role = role
                verifier.unit = unit
                verifier.save()

            unitStr = f", {unit}" if unit else ""
            await ctx.send(
                f"<@{id}> will be verified when they next join the server ({name}, {role}{unitStr})"
            )

            try:
                user = await ctx.bot.fetch_user(id)
                await user.send(
                    "Hello there, you've now been verified on the Cabot Explorers' Discord Server - when you next visit you'll be able to access the server. If you need it, the link to re-join is https://cabotexplorers.org.uk/go/discord"
                )

            except (discord.HTTPException, discord.Forbidden) as e:
                await ctx.send(
                    f"*Oops, I tried to send a DM to <@{id}> but couldn't... ({e})*"
                )

        else:
            await ctx.send(
                f"Role {role} is not a valid role! Choose from `explorer`, `leader`, `network`."
            )

    @verify.command()
    @commands.check(isAdmin)
    async def remove(self, ctx, id):
        """Remove an offline user verifier"""

        verifier = Verifier.get(Verifier.discordID == id)

        if verifier:
            verifier.delete_instance()
            await ctx.send(f"Verifier for <@{id}> ({verifier.name}) cleared")

        else:
            await ctx.send(f"No verifier found using with that user ID")
