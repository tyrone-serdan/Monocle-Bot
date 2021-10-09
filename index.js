const { token } = require("./src/Data/Config.json");
const { Player } = require("discord-player");
const Client = require("./src/Structures/Client.js");
const client = new Client();

const debugGuild = '767749277769662464';
globalThis.player = new Player(client);
globalThis.clientCMDs = client.commands;


process.on('unhandledRejection', (err) => {
    console.log(`I think an error happened\nERROR: ${err}`)
})

// * PLAYER EVENTS

client.on('ready', async () => {
    client.user.setActivity(`/help`,{type: 'LISTENING'});
    await client.setupSlash(debugGuild);

    console.log(`${client.user.username} is now Ready!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    
    const command = client.commands.find(cmd => cmd.name == interaction.commandName);
    
    try {
        command.run(interaction);
    } catch (error) {
        interaction.reply({
            content:`sorry! something went wrong. please send this error message to turon.\n\`${error}\``,
            ephemeral: true
        });
    }
});


// * PLAYER EVENTS

player.on('error', async (queue, error) => {
    if (error) {
        queue.metadata.send(`Our music player crashed when playing the current song, skipping it!\n\`ERROR MSG : ${error.message}\``);
    } else {
        queue.metadata.send("Our music player has suddenly broke, we are skipping to the next song. Sorry about that!");
    }
    queue.skip();
});

player.on('trackStart', async (queue, track) => {
    queue.metadata.send(`Now playing **${track.title}!**`);
});

client.start(token);
