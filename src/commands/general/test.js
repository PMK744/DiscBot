const Command = require('../Command')

class test extends Command {
    constructor(bot) {
        super(bot, {
            commandName: "Test",
            commandUsage: "test",
            commandDescription: "test command for console",
            consoleCommand: true,
            userPerms: [],
        })
    }
    async execute(args, commandData) {
        console.log('Howdy')
    }
}

module.exports = test