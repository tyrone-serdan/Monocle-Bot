const Command = require("../../Structures/Command.js");
const { Constants } = require("discord.js");
const { QueryType } = require("discord-player");
const commandTypes = Constants.ApplicationCommandOptionTypes;

module.exports = new Command({
    name:"play",
    description:"Joins the Voice Channel the user is in and plays the song provided.",
    example:"/play https://www.youtube.com/watch?v=Fc7-Oe0tj5k || /play ENHYPEN Drunk-Dazed",
    slashCommandOptions: [
        {
            name: "song",
            description: "Song link OR a search query",
            required: true,
            type: commandTypes.STRING
        }
    ],
    async run(interaction) {
        interaction.deferReply();

        let song = interaction.options.get("song").value;
        
        const songsFound = await player.search(song, {
            requestedBy: interaction.user,
        });

        // if (interaction.client.voice.channel) tbh idk why this is here it i just randomly saw it
        if (!songsFound || !songsFound.tracks.length) return interaction.editReply({content: "No results found :("});

        const queue = await player.createQueue(interaction.guild, {
            metadata: interaction.channel
        });

        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            await player.deleteQueue(interaction.guild.id);
            return interaction.editReply(`I cant seem to join the voice channel :(`);
        }

        const isPlaylist = songsFound.playlist ? true : false;
        const nowPlaying = (isPlaylist) ? songsFound.playlist.title : songsFound.tracks[0].title;

        await interaction.editReply(`Loading up the ${(isPlaylist) ? 'playlist' : 'track'} **${nowPlaying}**`);

        try {
            (isPlaylist) ? queue.addTracks(songsFound.tracks) : queue.addTrack(songsFound.tracks[0]); 
        } catch (error) {
            queue.destroy(true);
            player.deleteQueue(interaction.guild.id);
            return interaction.editReply(`There seems to be an error adding your ${isPlaylist ? 'playlist' : 'track'}\n\`\`\`ERROR: \n${error}\`\`\``)
        }

        if (!queue.playing) {
            await queue.play();
            return interaction.editReply(`**${nowPlaying}** is now added!`);
        }
            
    }
})