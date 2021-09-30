const Command = require("../Structures/Command.js");

module.exports = new Command({
    name:"test1",
    description:"this is a test command",
    async run(interaction) {
        interaction.reply({
            content:"wa"
        })
    }
})