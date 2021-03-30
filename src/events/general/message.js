const Event = require('../Event')

class message extends Event {
    constructor(bot) {
        super(bot, {
            eventName: 'Message',
        })
        this.bot = bot
        this.bot.client.on('message', data => {
            let message = data.content
            if (data.member.user.bot) return
            if (!message.startsWith(this.bot.config.botPrefix)) return this.bot.getEventManager().emit('MessageSent', data)
            let command = message.replace(this.bot.config.botPrefix, '').split(' ')[0]
            let args = message.replace(this.bot.config.botPrefix, '').split(' ')
            const commandData = {
                'command': command,
                'args': args,
                'commandData': data
            }
            return this.bot.getEventManager().emit('CommandExecuted', commandData)
        })
    }
}

module.exports = message