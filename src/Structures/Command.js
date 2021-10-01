const { CommandInteraction, ApplicationCommandOption } = require("discord.js");

/**
 * @param {CommandInteraction} interaction 
 */
function runFunction(interaction) {}

module.exports = class Command {
    /**
     * 
     * @param {{name: String, description: String, slashCommandOptions: ApplicationCommandOption[] ,run: runFunction}} cmd 
     */
    constructor(cmd) {
        this.name = cmd.name;
        this.description = cmd.description;
        this.slashCommandOptions = cmd.slashCommandOptions || [];
        this.run = cmd.run;
    }
}