const Command = require("../Structures/Command.js");
const { Constants } = require("discord.js");
const { MessageEmbed } = require("discord.js");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"nowplaying",
    description:"shows the song playing as of this moment.",
    slashCommandOptions: [],
    async run(interaction) {
        const embed = new MessageEmbed();
        const queue = player.getQueue(interaction.guild.id);

        if (!queue || !queue.playing) return interaction.reply({content:"There is no music playing!", ephemeral: true});

        const track = queue.current;
        const timestamp = queue.getPlayerTimestamp();
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

        const methods = ['disabled', 'track', 'queue'];

        embed
            .setColor('RED')
            .setThumbnail(track.thumbnail)
            .setAuthor(track.title, client.user.displayAvatarURL({ size: 1024, dynamic: true }))
            .setDescription(`Volume **${queue.volume}**%\nDuration **${trackDuration}**\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`)
            .setFooter('made by turon !!', message.author.avatarURL({ dynamic: true }))
            .setTimestamp();
        
        interaction.reply({ embeds: [embed] });
    }
})