const Command = require("../Structures/Command.js");
const { Constants } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"help",
    description:"Shows the list of commands the bot has.",
    slashCommandOptions: [],
    async run(interaction) {
        // THIS IS HARD CODED, IM VERY LAZY, PLEASE CHANGE THIS WHEN YOU HAVE THE TIME
        const embed = new MessageEmbed();

            embed
                .setAuthor(interaction.client.user.username, interaction.client.user.avatarURL())
                .setTitle("List of Commands!")
                .setDescription(
                    "`Loop` `NowPlaying` `Play` `Queue` `Skip`"
                )
                .setColor("WHITE")
                .setTimestamp()
                .setFooter(`made by turon !!`, interaction.client.user.avatarURL({ dynamic: true }));

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
})