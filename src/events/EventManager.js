const getFiles = require('../utils/getFiles')
const EventEmitter = require('events')

class EventManager extends EventEmitter {
    constructor(bot) {
        super()
        this.bot = bot
        this.client = this.bot.client
        this.console = this.bot.console
        this.registeredEvents = []
        this.bot.on('BotStarted', () => {
            this.loadEvents()
        })
    }
    async loadEvents() {
        const events = await getFiles(__dirname + '/general')
        events.forEach(file => {
            const EventClass = require(file)
            const newEvent = new EventClass(this.bot)
            this.registeredEvents.push(newEvent.options.eventName)
            this.emit('ClassEventRegistered', newEvent)
        })
    }
}

module.exports = EventManager