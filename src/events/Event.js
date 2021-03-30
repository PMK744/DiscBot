class Event {
    constructor(bot, options) {
        this.client = bot.client

        this.options = {
            eventName: options.eventName || "Unnamed Event",
        }
    }
}

module.exports = Event