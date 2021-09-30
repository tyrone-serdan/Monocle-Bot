const Discord = require("discord.js");

/**
 * 
 * @param {Discord.Interaction} interaction 
 */
function runFunction(interaction) {}

module.exports = class Command {
    /**
     * 
     * @param {{name: String, description: String, run: runFunction}} options 
     */
    constructor(options) {
        this.name = options.name;
        this.description = options.description;
        this.run = options.run;
    }
}