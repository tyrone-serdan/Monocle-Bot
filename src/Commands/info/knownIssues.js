const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"knownissues",
    description:"shows a list of known issues with the bot.",
    slashCommandOptions: [],
    async run(interaction) {
        const embed = new MessageEmbed();

        embed
            .setAuthor(`I promise i'll work on them soon`, interaction.client.user.avatarURL())
            .setTitle(`Known Issues with ${interaction.client.user.username}`)
            .setDescription(
                `Playlists dont seem to get added to bot **FIX OTW**\n
                Bot may randomly crash mid-song **UNSURE IF FIX WORKS**\n
                `
            )
            .setColor('RED')
            .setTimestamp()
            .setFooter(`PM turon if you find any more weird bugs.`, interaction.client.user.avatarURL());

        return interaction.reply({embeds: [embed], ephemeral: true});
    }
})