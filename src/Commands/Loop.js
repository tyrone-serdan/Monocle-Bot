const Command = require("../Structures/Command.js");
const { Constants } = require("discord.js");
const { QueueRepeatMode } = require("discord-player");
const queueModes = QueueRepeatMode;
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"loop",
    description:"loops the current song or queue",
    slashCommandOptions: [
        {
            name: "loopWhat",
            description: "chooses whether to loop a song, queue, or remove to remove the loop.",
            required: true,
            type: commandTypes.STRING
        }
    ],
    async run(interaction) {
        const whatToLoop = interaction.options.get("loopWhat").value.toLowerCase();
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({content: "There isn't any music playing in the server.", ephemeral: true});

        switch (whatToLoop) {
            case 'queue':
                if (queue.repeatMode === queueModes.TRACK) {
                    queue.setRepeatMode(queueModes.QUEUE)
                    return interaction.reply({content: "Queue was originally set to loop tracks! I have now changed it to loop the whole queue."});
                } else {
                    switch (queue.repeatMode) {
                        case queueModes.OFF:
                            queue.setRepeatMode(queueModes.QUEUE);
                            interaction.reply({content: "Set the queue to loop the whole queue!"});
                            break;
                        
                        case queueModes.QUEUE:
                            interaction.reply({content: "I'm already looping the queue, use `/loop` off to turn it off!", ephemeral: true});
                    }
                }
                break;
            
            case 'track':
                if (queue.repeatMode === queueModes.QUEUE) {
                    queue.setRepeatMode(queueModes.TRACK)
                    return interaction.reply({content: "Queue was originally set to loop the queue! I have now changed it to loop the current song."});
                } else {
                    switch (queue.repeatMode) {
                        case queueModes.OFF:
                            queue.setRepeatMode(queueModes.QUEUE);
                            interaction.reply({content: "Set the queue to loop the current song!"});
                            break;
                        
                        case queueModes.TRACK:
                            interaction.reply({content: "I'm already looping the song, use `/loop` off to turn it off!", ephemeral: true});
                    }
                }
                break;

            case 'off':
                if (queue.repeatMode != queueModes.OFF) {
                    queue.setRepeatMode(queueModes.OFF)
                    interaction.reply({content: "I have turned off the repeats for the current queue!"});
                } else {
                    interaction.reply({content: "The queue does not have an active repeat mode.", ephemeral: true})
                }
                break;
        
            default:
                interaction.reply({content: `${whatToLoop} is not a valid option, there might be a typo.`, ephemeral: true})
                break;
        }
    }
})