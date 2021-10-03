const Command = require("../Structures/Command.js");
const { Constants } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"help",
    description:"Shows the list of commands the bot has.",
    example:"/help || /help play",
    slashCommandOptions: 
    [
        {
            name: "command",
            description: "Shows how to use the command",
            required: false,
            type: commandTypes.STRING
        }
    ],
    async run(interaction) {
        const cmdRequested = (interaction.options.getString("command")) ? interaction.options.getString("command").toLowerCase() : null;
        const embed = new MessageEmbed();
        const Commands = interaction.client.getCommands();

        let ListOfCMDs = new String();

        if (cmdRequested != null) {
            let command;

            if (Commands.has(cmdRequested)) {
                command = Commands.find(cmd => cmd.name == cmdRequested);
            }

            embed
                .setAuthor(interaction.client.user.username, interaction.client.user.avatarURL())
                .setColor('RED')
                .setTitle(`${command.name.toUpperCase()}`)
                .setDescription(`${command.description}\n\`${command.example}\``)
                .setTimestamp()
                .setFooter(`made by turon !!`)

            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            });
        } else {
            Commands.forEach(cmd => { ListOfCMDs += `\`${cmd.name}\` ` })

            embed
                .setAuthor(interaction.client.user.username, interaction.client.user.avatarURL())
                .setTitle("List of Commands!")
                .setDescription(ListOfCMDs)
                .setColor('RED')
                .setTimestamp()
                .setFooter(`do /help <command> for more info on that command!`, interaction.client.user.avatarURL({ dynamic: true }));

            return interaction.reply({
                embeds: [embed],
                ephemeral: true
            })
        }
    }
})