import discord
from discord.ext import commands
from profanity_check import predict, predict_prob

from server import channels

def setup(bot) :
    bot.add_cog(Sanitiser(bot))


class Sanitiser(commands.Cog, name = "Discord Chat Sanitiser") :

    def __init__(self, bot) :
        self.bot = bot

    @commands.Cog.listener()
    async def on_message(self, message) :
        if message.channel.id != channels["system"] :
            swearing = any(predict([message.content]))
            if swearing :
                probability = round(predict_prob([message.content])[0], 2)
                await message.guild.get_channel(channels["system"]).send(f"{message.author.mention} swore in {message.channel.mention}: \"{message.content}\" ({probability})")
