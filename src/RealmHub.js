const EventEmitter = require('events')
const ConsoleManager = require('./utils/ConsoleManager')
const CommandManager = require('./commands/CommandManager')
const EventManager = require('./events/EventManager')
const Discord = require('discord.js')
const config = require('../config.json')

class RealmHub extends EventEmitter {
    constructor() {
        super()
        this.uptime
        this.config = config
        this.token = this.config.botToken
        this.client = new Discord.Client()
        this.client.commands = new Discord.Collection()
        this.defaultPerms = new Discord.Permissions(this.config.defaultPerms).freeze()
        this.console = new ConsoleManager()
        this.CommandManager = new CommandManager(this)
        this.EventManager = new EventManager(this)
    }
    async startBot() {
        this.client.login(this.token)
        this.client.on('ready', () => {
            this.console.info('Bot Started!')
            this.emit('BotStarted')
        })
    }
    getCommandManager() {
        return this.CommandManager
    }
    getEventManager() {
        return this.EventManager
    }
}

module.exports = RealmHub