const { token } = require("./src/Data/Config.json");
const { Player } = require("discord-player");
const Client = require("./src/Structures/Client.js");
const client = new Client();

const debugGuild = '767749277769662464';

client.on('ready', () => {
    client.user.setActivity(`/help`,{type: 'LISTENING'});
    client.setupSlash();

    console.log(`${client.user.username} is now Ready!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    
    const command = client.commands.find(cmd => cmd.name == interaction.commandName);

    try {
        command.run(interaction);
    } catch {
        interaction.reply({
            content:"something went wrong on our end, sorry!",
            ephemeral: true
        });
    }
});

client.start(token);
