const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"nowplaying",
    description:"shows the song playing as of this moment.",
    example:"/nowplaying",
    slashCommandOptions: [],
    async run(interaction) {
        const embed = new MessageEmbed();
        const queue = player.getQueue(interaction.guild.id);

        const track = queue.current;
        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = (timestamp.progress == 'Infinity') ? 'Infinity (live)' : track.duration;
        const methods = ['Disabled', 'Queue', 'Track'];

        if (!queue || !queue.playing) return interaction.reply({content:"There is no music playing!", ephemeral: true});

        // .setDescription(`Volume: **${queue.volume}**%\nDuration: **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by: ${track.requestedBy}`)
        embed
            .setColor('RED')
            .setImage(track.thumbnail)
            .setAuthor("Now Playing...", interaction.client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setTitle(`${track.title} by ${track.author}`)
            .setURL(track.url)
            .addFields(
                {name: "Current Volume", value: `${queue.volume}%`},
                {name: "Duration", value: trackDuration},
                {name: "Am I Looping?", value: methods[queue.repeatMode]},
                {name: "Who Requested?", value: track.requestedBy.username}
            )
            .setFooter('made by turon !!', interaction.client.user.avatarURL({ dynamic: true }))
            .setTimestamp();
        
        interaction.reply({ embeds: [embed] });
    }
})