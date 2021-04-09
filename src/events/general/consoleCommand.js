const Event = require('../Event')

class consoleCommand extends Event {
    constructor(bot) {
        super(bot, {
            eventName: 'ConsoleCommand',
        })
        this.bot = bot

        this.bot.getConsole().on('ConsoleCommand', data => {
            if (!data.startsWith('/')) return this.bot.console.error('[ConsoleCommand] Invailed Syntax!')
            let command = data.replace('/', '').split(' ')[0]
            let args = data.replace('/', '').split(' ')
            const commandData = {
                'command': command,
                'args': args,
                'commandData': null
            }
            return this.bot.getEventManager().emit('ConsoleCommandExecuted', commandData)
        })
    }
}

module.exports = consoleCommand