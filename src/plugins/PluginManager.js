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
    }
    async onEnabled() {

        let folders = []

        const pluginPath = path.resolve(__dirname + '../../../plugins')
        const pluginFolder = fs.readdirSync(__dirname + '../../../plugins')

        pluginFolder.forEach(file => {
            if (file.endsWith('.js')) return
            folders.push(file)
        })

        folders.forEach(async (file) => {
            const files = (await getFiles(pluginPath + `\\${file}`)).join('-')
            if (!files.includes('config.json')) return this.bot.console.error('[PluginManager] A plugin needs a config.json file to operate!')

            const PluginConfig = require(pluginPath + `\\${file}\\config.json`)

            if (PluginConfig.filePath == undefined) return this.bot.console.error(`[PluginManager] [${PluginConfig.name}] The config.json must include "filePath"!`)

            const PluginClass = require(pluginPath + `\\${file}\\${PluginConfig.filePath}`)
            const newPlugin = new PluginClass(this.bot, PluginConfig)
            newPlugin.onEnabled()
        })
    }
}

module.exports = PluginManager