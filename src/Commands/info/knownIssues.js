const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"knownissues",
    description:"shows a list of known issues with the bot.",
    example:"/knownissues",
    slashCommandOptions: [],
    async run(interaction) {
        const embed = new MessageEmbed();

        embed
            .setAuthor(`I promise i'll work on them soon`, interaction.client.user.avatarURL())
            .setTitle(`Known Issues with ${interaction.client.user.username}`)
            .setDescription(
                `\n
                Bot may randomly crash mid-song **UNSURE IF FIX WORKS**\n
                The thing i'm using to get audio \`ytdl-core\` seems buggy, songs might not play, so be careful. **I'M LAZY SO I FIX LATER**\n
                `
            )
            .setColor('RED')
            .setTimestamp()
            .setFooter(`PM turon if you find any more weird bugs.`, interaction.client.user.avatarURL());

        return interaction.reply({embeds: [embed], ephemeral: true});
    }
})