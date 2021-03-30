const Discord = require('discord.js')
const Command = require('../Command')

class commands extends Command {
    constructor(bot) {
        super(bot, {
            commandName: "Commands",
            commandUsage: "commands",
            commandDescription: "Lists the available",
            commandCooldown: 10,
            userPerms: [],
        })
        this.bot = bot
    }
    async execute(args, commandData) {
        const CommandManager = this.bot.getCommandManager()
        let commandList = []
        CommandManager.registeredCommands.forEach(x => {
            commandList.push(`**${x.commandName}**\`\`\`${this.bot.config.botPrefix}${x.commandUsage} - ${x.commandDescription}\`\`\`\n`) 
        })
        const embed = new Discord.MessageEmbed().setTitle('Test').setColor(0xff0000).setDescription(commandList.join('\n'));
        commandData.channel.send(embed)
    }
}

module.exports = commands