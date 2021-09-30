const Command = require("../Structures/Command.js");

module.exports = new Command({
    name:"test2",
    description:"This is another test command",
    async run(interaction) {
        console.log(interaction.member.voice.channelId);
        interaction.reply({
            content:`hello ${interaction.user.username}`,

        })
    }
})