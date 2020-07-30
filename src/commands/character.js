const { Command } = require("discord-akairo")
const { MessageEmbed } = require("discord.js")

class Character extends Command {
    constructor() {
        super("character", {
            aliases: ["character", "ch"],
            channel: "guild",
            args: [
                {
                    id: "character",
                    match: "rest",
                    prompt: {
                        start: message => `${message.author}, which character you want to get information about?`
                    }
                }
            ],

        })
    }

    async exec(message, args) {
       message.client.marvel.characters.name(args.character).get(function(err, res){
           if (err) return console.error(err)
           const ch = res[0];
           const embed = new MessageEmbed()
           .setTitle(ch.name)
           .setDescription(ch.description)
           .setThumbnail(`${ch.thumbnail.path}${ch.thumbnail.extension}`)
        return message.util.send(embed)
       })
    }

}
module.exports = Character;