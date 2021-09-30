const Command = require("../Structures/Command.js");

module.exports = new Command({
    name:"test2",
    description:"This is another test command",
    async run(interaction) {
        interaction.reply({
            content:`hello ${interaction.user.username}`,

        })
    }
})