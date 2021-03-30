const getFiles = require('../utils/getFiles')
const EventEmitter = require('events')

class CommandManager extends EventEmitter {
    constructor(bot) {
        super()
        this.bot = bot
        this.client = this.bot.client
        this.console = this.bot.console
        this.registeredCommands = []
        let recentlyRan = []
        this.bot.on('BotStarted', () => {
            this.loadCommands()
            this.bot.getEventManager().on('CommandExecuted', data => {
                const command = data.command
                const args = data.args
                const commandData = data.commandData

                const availableCommands = []
                this.registeredCommands.forEach(x => {
                    availableCommands.push(x.commandUsage) 
                })

                if (!availableCommands.includes(command)) return commandData.reply('Invaild Command!')

                const cooldown = this.client.commands.get(command).options.commandCooldown

                const commandPerms = this.client.commands.get(command).options.userPerms
                const userPermsCheck = commandPerms ? this.bot.defaultPerms.add(commandPerms) : this.client.defaultPerms

                if (userPermsCheck) {
                    const missing = commandData.channel.permissionsFor(commandData.member).missing(userPermsCheck)
                    if (missing.length) {
                        return commandData.reply(`You don't have permission to use this command!`)
                    }
                }

                let cooldownString = `${commandData.guild.id}-${commandData.member.id}-${command}`
                if (cooldown > 0 && recentlyRan.includes(cooldownString)) return commandData.reply(`Please wait...`)
                recentlyRan.push(cooldownString)
                if (cooldown > 0 ) {
                    setTimeout(() => {
                        recentlyRan = recentlyRan.filter((string) => {
                            return string !== cooldownString
                        })
                    }, cooldown)
                }

                try {
                    return this.client.commands.get(command).execute(args, commandData)
                } catch (err) {
                    return this.console.error(err)
                }
            })
        })
    }
    async loadCommands() {
        const commands = [
            ...await getFiles(__dirname + '/general'),
            ...await getFiles(__dirname + '/admin')
        ]
        commands.forEach(file => {
            const CommandClass = require(file)
            const newCommand = new CommandClass(this.bot)
            const cmdObject = {
                'commandName': newCommand.options.commandName,
                'commandUsage': newCommand.options.commandUsage,
                'commandDescription': newCommand.options.commandDescription,
            }
            this.registeredCommands.push(cmdObject)
            this.client.commands.set(newCommand.options.commandUsage, newCommand)
            this.emit('ClassCommandRegistered', newCommand)
        })
    }
}

module.exports = CommandManager