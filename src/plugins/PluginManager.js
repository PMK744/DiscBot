const getFiles = require('../utils/getFiles')
const fs = require('fs')
const path = require('path')
const EventEmitter = require('events')

class PluginManager extends EventEmitter {
    constructor(bot) {
        super()
        this.bot = bot
        this.client = this.bot.client
        this.console = this.bot.console
        this.registeredEvents = []
        this.bot.on('BotStarted', () => {
            this.loadPlugins()
        })
    }
    async loadPlugins() {

        let folders = []

        const pluginPath = path.resolve(__dirname + '../../../plugins')
        const pluginFolder = fs.readdirSync(__dirname + '../../../plugins')

        pluginFolder.forEach(file => {
            if (file.endsWith('.js')) return
            folders.push(file)
        })

        folders.forEach(async (file) => {
            const files = (await getFiles(pluginPath + `\\${file}`)).join('-')
            if (!files.includes('config.json') || !files.includes('index.js')) return this.bot.console.error('A plugin needs a config.json and a index.js files to operate!')

            const PluginConfig = require(pluginPath + `\\${file}\\config.json`)
            const PluginClass = require(pluginPath + `\\${file}\\index.js`)
            const newPlugin = new PluginClass(this.bot, PluginConfig)
            newPlugin.onEnabled()
        })
    }
}

module.exports = PluginManager