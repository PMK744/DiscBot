const Command = require('../Command')

class ping extends Command {
    constructor(bot) {
        super(bot, {
            commandName: "Test",
            commandUsage: "test",
            userPerms: ["ADMINISTRATOR"]
        })
    }
    async execute(args, commandData) {
        console.log('Ran test command')
    }
}

module.exports = ping