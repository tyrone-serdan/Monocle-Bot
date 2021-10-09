const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"info",
    description:"shows info on the bot",
    example:"/info",
    slashCommandOptions: [],
    async run(interaction) {
        const embed = new MessageEmbed();

        embed
            .setTitle(`I'm ${interaction.client.user.username}!`)
            .setDescription(`A personal project made by turon#3413, say hi to him for me!\n use /help for a list of commands!`)
            .setColor('RED')
            .setTimestamp()
            .setFooter(`${interaction.user.username} !!`);

        return interaction.reply({
            embeds: [embed],
            ephemeral: true
        })
    }
})