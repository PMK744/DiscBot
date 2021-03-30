const EventEmitter = require('events')
const readline = require("readline")
const chalk = require('chalk')
const moment = require('moment')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

class ConsoleManager extends EventEmitter {
    constructor() {
      super()
        rl.on('line', (data, linecount) => {
            this.emit('ConsoleCommand', data)
        })
    }
    success(content) {
      console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.green("[SUCCESS]")} ${content}`)
    }
    
    info(content) {
      console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.cyan("[INFO]")} ${content}`)
    }
    
    warn(content) {
      console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.yellow("[WARN]")} ${content}`)
    }
    
    error(content) {
      console.log(`${chalk.gray(moment().format("HH:mm:ss"))} ${chalk.red("[ERROR]")} ${content}`)
    }
}

module.exports = ConsoleManager