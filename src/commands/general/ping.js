const Command = require('../Command')

class ping extends Command {
    constructor(bot) {
        super(bot, {
            commandName: "Ping",
            commandUsage: "ping",
            commandDescription: "Pings the discord bot server",
            userPerms: [],
        })
    }
    async execute(args, commandData) {
        commandData.reply('Pong!')
    }
}

module.exports = ping