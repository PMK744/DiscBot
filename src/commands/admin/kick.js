const Command = require('../Command')

class kick extends Command {
    constructor(bot) {
        super(bot, {
            commandName: "Kick",
            commandUsage: "kick",
            commandDescription: "Kicks user from the server.",
            userPerms: ["ADMINISTRATOR"]
        })
    }
    async execute(args, commandData) {
        const user = commandData.mentions.users.first()
        const reason = args.join(' ').replace(`${args[0]} `, '').replace(`${args[1]} `, '')
        if (user) {
            const member = commandData.guild.member(user)
            if (member) {
                member.kick(reason).then(() => {
                    commandData.reply(`Kicked ${user.tag}`)
                }).catch(err => {
                    commandData.reply('Unable to kick this user!')
                })
            } else {
                commandData.reply("This user isn't apart of this server!")
            }
        } else {
            commandData.reply('You need to mention a user to kick!')
        }

    }
}

module.exports = kick