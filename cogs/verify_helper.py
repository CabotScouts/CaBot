import asyncio

import discord
from discord.ext import commands

from helpers import hasRole, gainedRole

def setup(bot) :
    bot.add_cog(VerifyHelper(bot))


class VerifyHelper(commands.Cog, name = "Discord Verification Helper") :

    channels = {
        "system" : 689298055517962330,
        "verify" : 689264900044095558,
        "explorers" : 689271687078084707,
        "network" : 694613474789163038,
        "leaders" : 689552904511553591,
    }

    roles = {
        "explorer" : 689256639265636382,
        "network" : 694565693181526036,
        "leader" : 689256880836444182,
    }

    def __init__(self, bot) :
        self.bot = bot

    @commands.Cog.listener()
    async def on_member_join(self, member) :
        if not (
            hasRole(member, self.roles["explorer"])
            or hasRole(member, self.roles["network"])
            or hasRole(member, self.roles["leader"])
            ) :

            await member.guild.get_channel(self.channels["system"]).send(f":bell: {member.mention} requires verification")
            await asyncio.sleep(5)
            await member.guild.get_channel(self.channels["verify"]).send(f"<:scout:693531748696326245> Welcome to Cabot Explorers on Discord {member.mention} - before you can access the server we need to check that you're an Explorer - please reply here with your **name** and **Explorer Unit**, and wait for a leader to verify you")

    @commands.Cog.listener()
    async def on_member_update(self, before, after) :
        if gainedRole(before, after, self.roles["explorer"]) :
            await after.guild.get_channel(self.channels["explorers"]).send(f"<:scout:693531748696326245> Welcome to Cabot Explorers on Discord {after.mention} - say hello!")

            await after.guild.get_channel(self.channels["system"]).send(f":star: {after.mention} was verified as an Explorer")

        elif gainedRole(before, after, self.roles["network"]) :
            await after.guild.get_channel(self.channels["network"]).send(f"<:scout:693531748696326245> Welcome to the network chat {after.mention}")

            await after.guild.get_channel(self.channels["system"]).send(f":star: {after.mention} was verified as a Network member")

        elif gainedRole(before, after, self.roles["leader"]) :
            await after.guild.get_channel(self.channels["leaders"]).send(f"<:scout:693531748696326245> Welcome to the leaders lounge {after.mention}")

            await after.guild.get_channel(self.channels["system"]).send(f":star: {after.mention} was verified as a leader")

    @commands.Cog.listener()
    async def on_message(self, message) :
        if message.channel.id == 689264900044095558 and message.content == "<#689264900044095558>" :
            await message.channel.send(f"Nice one {message.author.mention}, that's how you send a message - please now send a message with your **name** and **Explorer Unit** so we can verify you!")
