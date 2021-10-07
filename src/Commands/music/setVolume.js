const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"volume",
    description:"changes the volume of the music bot",
    example:"/volume 45",
    slashCommandOptions: [
        {
            name:"number",
            description:"a number between 0 to 100",
            required: true,
            type: commandTypes.INTEGER
        }
    ],
    async run(interaction) {
        const chosenVolume = interaction.options.getInteger("number")
        const volume = (chosenVolume >= 0 && chosenVolume <= 100) ? chosenVolume : null;
        const queue = player.getQueue(interaction.guild.id);

        if (queue) {
            if (volume == null) {
                interaction.reply({
                    ephemeral: true,
                    content: `The volume selected ${chosenVolume}% is either too large or too small.`
                });
            } else {
                queue.setVolume(volume);
                interaction.reply({
                    content: `Volume has been set to **${volume}%**!`
                });
            }
        } else {
            interaction.reply({
                ephemeral: true,
                content: "There is no queue in the server."
            })
        }
    }
})