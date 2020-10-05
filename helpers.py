def hasRole(member, roleID) :
    role = member.guild.get_role(roleID)
    return role in member.roles

def gainedRole(before, after, roleID) :
    role = before.guild.get_role(roleID)
    return (role not in before.roles) and (role in after.roles)
