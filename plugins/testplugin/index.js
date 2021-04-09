class testplugin {
    constructor(bot, config) {
        this.bot = bot
        this.config = config
    }
    async onEnabled() {
        this.bot.console.info(`Successfuly loaded '${this.config.name}'!`)

        const command = {
            options: {
                commandName: "Bean",
                commandUsage: "bean",
                commandDescription: "Beans ya",
                commandCooldown: 20 * 1000,
                userPerms: "VIEW_CHANNEL",
            }
        }

        this.bot.getCommandManager().registerCommand(command)
        this.bot.getCommandManager().on(command.options.commandUsage, data => {
            const command = data.command
            const args = data.args

            console.log('bean')

        })
    }
}

module.exports = testplugin