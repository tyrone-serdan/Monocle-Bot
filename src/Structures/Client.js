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
            .forEach(folder => {
                readdirSync(`./src/Commands/${folder}`)
                    .filter(file => file.endsWith(".js"))
                    .forEach(cmd => {
                        /**
                         * @type {Command}
                         */
                        const command = require(`../Commands/${folder}/${cmd}`);
                        console.log(`putting ${command.name.toUpperCase()} from ${folder} in client.commands\n`);

                        this.commands.set(command.name, command);
                    })
            })
    }

    /**
     * @param {String} debugGuild if debugGuild has value, setup commands for that server only, else, make commands global.
     */
    setupSlash(debugGuild) {
        let guild;
        let registerCmd;

        if (debugGuild) {
            guild = this.guilds.cache.get(debugGuild);
        }
        
        registerCmd = (guild) ? guild.commands : this.application?.commands;

        this.commands.forEach(cmd => {

            console.log(`now registering command ${cmd.name.toUpperCase()} to guildID ${debugGuild}\n`);
            registerCmd.create({
                name: cmd.name,
                description: cmd.description,
                options: cmd.slashCommandOptions
            })
        })
    }
}

