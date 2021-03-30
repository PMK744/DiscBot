const discordBot = require('./src/RealmHub')

const bot = new discordBot()

bot.on('botStarted', data => {
    console.log(data)
})

bot.startBot('12345')