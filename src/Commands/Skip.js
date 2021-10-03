const Command = require("../Structures/Command.js");
const { Constants } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"skip",
    description:"skips the current song playing",
    example:"/skip",
    slashCommandOptions: [],
    async run(interaction) {
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply("There is no music in the queue!");

        const didSkip = queue.skip();

        interaction.reply({
            content: `${(didSkip) ? `**${queue.current.title}** was skipped!` : `Something went wrong, sorry!`}`
        })

    }
})