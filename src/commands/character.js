const { Command } = require("discord-akairo")
const { MessageEmbed } = require("discord.js")
const moment = require("moment")
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
           console.log(ch)
           const embed = new MessageEmbed()
           .setTitle(ch.name)
           .setURL(ch.urls[1].url)
           .setColor("#a11a1a")
           .setDescription(ch.description)
           .setImage(`${ch.thumbnail.path}.${ch.thumbnail.extension}`)
           .addField("Modified", moment(ch.modified).format("LL"))
           .addField("Comics", `[${ch.comics.available}](${ch.urls[2].url})`, true)
           .addField("Series", ch.series.available, true)
           .addField("Stories", ch.stories.available, true)
           .addField("Events", ch.events.available, true)
        return message.util.send(embed)
       })
    }

}
module.exports = Character;