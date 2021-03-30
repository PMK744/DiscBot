const Event = require('../Event')

class guildMemberAdd extends Event {
    constructor(bot) {
        super(bot, {
            eventName: 'guildMemberAdd',
        })
        this.bot = bot
        this.bot.client.on('guildMemberAdd', member => {
            return this.bot.getEventManager().emit('MemberJoined', member)
        })
    }
}

module.exports = guildMemberAdd