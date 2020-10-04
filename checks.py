roles = {
    "explorer" : 689256639265636382,
    "network" : 694565693181526036,
    "leader" : 689256880836444182,
    "admin" : 689257161733308419,
    "bot" : 689506347409997955,
}

def isRole(ctx, role) :
    role = ctx.guild.get_role(roles[role])
    return (role in ctx.author.roles)

def isExplorer(ctx) :
    return isRole(ctx, "explorer")

def isNetwork(ctx) :
    return isRole(ctx, "network")

def isLeader(ctx) :
    return isRole(ctx, "leader")

def isAdmin(ctx) :
    return isRole(ctx, "admin")

def isBot(ctx) :
    return isRole(ctx, "bot")
