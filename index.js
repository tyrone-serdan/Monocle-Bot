const Client = require("./src/Structures/Client.js");
const client = new Client();
const {token} = require("./src/Data/Config.json");

const circleGuild = '767749277769662464';

client.on('ready', () => {
    client.user.setActivity(`/help`,{type: 'LISTENING'});
    client.setupSlash(circleGuild);

    console.log("im ready!");
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    
    const {commandName, options} = interaction;
    const command = client.commands.find(cmd => cmd.name == commandName);

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
