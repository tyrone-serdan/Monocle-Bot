const Command = require("./Command.js");
const Discord = require("discord.js");
const { readdirSync } = require("fs");

const intents = new Discord.Intents(641);

module.exports = class Client extends Discord.Client {
    constructor() {
        super({ intents });
        /**
         * @type {Discord.Collection<String, Command>}
         */
        this.commands = new Discord.Collection();
    }
    /**
     * 
     * @param {String} token for logging in the bot
     */
    start(token) {
        this.login(token);

        readdirSync('./src/Commands')
            .filter(file => file.endsWith(".js"))
            .forEach(cmd => {

                /**
                 * @type {Command}
                 */
                const command = require(`../Commands/${cmd}`);
                console.log(`setting up ${command.name}`);

                // const registerCMD = this.application?.commands;

                // registerCMD.create({
                //     name: command.name,
                //     description: command.description,
                // })

                this.commands.set(command.name, command);
            })
    }
    /**
     * @param {String} debugGuild if true, sets up commands only for that server, else, make commands global
     */
    setupSlash(debugGuild) {
        this.commands.forEach(cmd => {
            const guild = this.guilds.cache.get(debugGuild);
            const registerCmd = (guild) ? guild.commands : this.application?.commands;

            console.log(`cmd name = ${cmd.name}.`);

            registerCmd.create({
                name: cmd.name,
                description: cmd.description,
            })
        })
    }
}

