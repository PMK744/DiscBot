const getFiles = require('../utils/getFiles')
const Discord = require('discord.js')
const EventEmitter = require('events')

class CommandManager extends EventEmitter {
    constructor(bot) {
        super()
        this.bot = bot
        this.client = this.bot.client
        this.console = this.bot.console
        this.registeredCommands = []
        this.registeredConsoleCommands = []
    }
    async onEnabled() {
        let recentlyRan = []
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

            if (this.client.commands.get(command).options.classCommand) {
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
            } else {
                this.emit(command, data)
            }
        })
        this.bot.getEventManager().on('ConsoleCommandExecuted', data => {
            const command = data.command
            const args = data.args

            const availableCommands = []
            this.registeredConsoleCommands.forEach(x => {
                availableCommands.push(x.commandUsage) 
            })

            if (!availableCommands.includes(command)) return this.console.error('Invaild Command!')

            if (this.client.commands.get(command).options.classCommand) {
                try {
                    return this.client.commands.get(command).execute(args, this.client)
                } catch (err) {
                    return this.console.error(err)
                }
            } else {
                this.emit(command, data)
            }
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
            if (!newCommand.options.consoleCommand) {
                this.registeredCommands.push(cmdObject)
                this.client.commands.set(newCommand.options.commandUsage, newCommand)
                this.emit('ClassCommandRegistered', newCommand)
            } else {
                this.registeredConsoleCommands.push(cmdObject)
                this.client.commands.set(newCommand.options.commandUsage, newCommand)
                this.emit('ClassCommandRegistered', newCommand)
            }
        })
    }
    async registerCommand(command) {
        const newCommand = {
            options: {
                commandName: command.options.commandName,
                commandUsage: command.options.commandUsage,
                commandDescription: command.options.commandDescription,
                commandCooldown: command.options.commandCooldown,
                consoleCommand: command.options.consoleCommand || false,
                userPerms: new Discord.Permissions(command.options.userPerms).freeze() || this.bot.defaultPerms,
            }
        }
        const cmdObject = {
            'commandName': newCommand.options.commandName,
            'commandUsage': newCommand.options.commandUsage,
            'commandDescription': newCommand.options.commandDescription,
        }
        if (!newCommand.options.consoleCommand) {
            this.registeredCommands.push(cmdObject)
            this.client.commands.set(newCommand.options.commandUsage, newCommand)
            this.emit('ClassCommandRegistered', newCommand)
        } else {
            this.registeredConsoleCommands.push(cmdObject)
            this.client.commands.set(newCommand.options.commandUsage, newCommand)
            this.emit('ClassCommandRegistered', newCommand)
        }
        return this
    }
}

module.exports = CommandManager