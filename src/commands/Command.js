const Discord = require('discord.js')

class Command {
    constructor(bot, options) {
        this.client = bot.client

        this.options = {
            commandName: options.commandName || "Unnamed Command",
            commandUsage: options.commandUsage || "Unnamed-Command",
            commandDescription: options.commandDescription || "Default Description.",
            commandCooldown: options.commandCooldown * 1000 || -1 * 1000,
            userPerms: new Discord.Permissions(options.userPerms).freeze() || bot.defaultPerms,
        }
    }
}

module.exports = Command