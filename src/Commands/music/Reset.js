const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
// const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"reset",
    description:"Disconnects the bot & destroys the queue.",
    example:"/reset",
    slashCommandOptions: [],
    async run(interaction) {
        const guildID = interaction.guild.id;
        const queue = player.getQueue(guildID);

        if (queue) {
            queue.destroy(true);
            return interaction.reply({
                content: `${interaction.guild.name}'s queue has now been reset!`,
            })
        } else {
            return interaction.reply({
                content: "There is no queue in the server!",
                ephemeral: true,
            })
        }
    }
})