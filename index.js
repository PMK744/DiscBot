const discordBot = require('./src/DiscBot')

const bot = new discordBot()

bot.on('botStarted', data => {
    console.log(data)
})

bot.startBot()