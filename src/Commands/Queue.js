const Command = require("../Structures/Command.js");
const { MessageEmbed } = require("discord.js");

module.exports = new Command({
    name:"queue",
    description:"shows the queue of songs that will be played",
    async run(interaction) {
        const embed = new MessageEmbed();
        const methods = ['', '🔁', '🔂'];
        const queue = player.getQueue(interaction.guild.id);

        if (!queue) return interaction.reply({
            ephemeral: true,
            content: "I don't think music is playing"
        })


        const tracks = queue.tracks.map((track, i) => `**${i + 1} - ${track.title} | ${track.author} (requested by : ${track.requestedBy.username})`, interaction.client.user.displayAvatarURL({size: 1024, dynamic: true}));
        const songs = queue.tracks.length;
        const nextSongs = (songs > 5) ? `And **${songs - 5}** other song(s).` : `the playlist contains **${songs}** song(s).`;

        embed
            .setAuthor(`${methods[queue.repeatMode]} ${interaction.guild.name}'s queue.`)
            .setDescription(`**Current** - ${queue.current.title}\n\n${tracks.slice(0,5).join(`\n`)}\n\n${nextSongs}`)
            .setThumbnail(interaction.guild.iconURL({size: 2048, dynamic: true}))
            .setColor("WHITE")
            .setTimestamp()
            .setFooter(`made by turon !!`, interaction.client.user.avatarURL({ dynamic: true }));

            

        interaction.reply({embeds: [embed] });
    }
})