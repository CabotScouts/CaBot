roles = {
    "explorer" : 0,
    "network" : 0,
    "leader" : 0,
    "admin" : 0,
    "bot" : 0,
}

def needsRole(ctx, role) :
    role = ctx.guild.get_role(roles[role])
    return (role in ctx.author.roles)

def needsExplorer(ctx) :
    return needsRole(ctx, "explorer")

def needsNetwork(ctx) :
    return needsRole(ctx, "network")

def needsLeader(ctx) :
    return needsRole(ctx, "leader")

def needsAdmin(ctx) :
    return needsRole(ctx, "admin")

def needsBot(ctx) :
    return needsRole(ctx, "bot")
