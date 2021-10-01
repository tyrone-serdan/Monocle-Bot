const Command = require("../Structures/Command.js");
const { Constants } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"add",
    description:"adds two numbers",
    slashCommandOptions: [
        {
            name: "num1",
            description:"First Number",
            required: true,
            type: commandTypes.NUMBER
        },
        {
            name: "num2",
            description:"Second Number",
            required: true,
            type: commandTypes.NUMBER
        }
    ],
    async run(interaction) {
        const { options } = interaction;
        const num1 = options.getNumber('num1');
        const num2 = options.getNumber('num2');

        await interaction.deferReply({
            ephemeral: true
        });

        interaction.editReply({
            content: `sum is ${num1 + num2}`
        })
    }
})