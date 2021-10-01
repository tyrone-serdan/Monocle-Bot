const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"NAME HERE",
    description:"DESCRIPTION HERE",
    slashCommandOptions: [
        {
            name:"option name here", // MUST BE LOWERCASE !!
            description: "option desc here",
            required: false, // EITHER TRUE OR FALSE HERE
            type: commandTypes.STRING // TYPE OF COMMAND MUST BE SPECIFIED HERE
        }
    ],
    async run(interaction) {
        // GET THE OPTIONS GIVEN FROM SLASHCOMMANDOPTIONS
        const getOption = interaction.options.get("option name here").value;

        // IF YOU THINK INTERACTION IS QUICK, USE THIS
        interaction.reply({
            content: `your text was ${getOption}`,
            ephemeral: true
        })

        // IF YOU THINK INTERACTION TAKES LONGER THAN 3 SECONDS, USE THIS
        interaction.deferReply({ ephemeral: true });
        interaction.editReply({
            content: `your text was ${getOption}`
        })
    }
})