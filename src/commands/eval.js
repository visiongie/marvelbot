const { Command } = require('discord-akairo');
const { inspect } = require("util")
class Eval extends Command {
    constructor() {
        super('eval', {
            aliases: ['eval', 'e'],
            ownerOnly: true,
            ratelimit: 2,
            args: [
                {
                    id: 'code',
                    match: 'rest',
                    type: 'sring',
                    prompt: {
                        start: message => `${message.author}, what would you like to evaluate?`
                    }
                },
                {
                    id: 'noreturn',
                    type: 'boolean',
                    match: 'flag',
                    flag: ['--noreturn', '-nr'],
                },
            ],
        });
    }

    async exec(message, args) {
        try {
            const client = this.client;
            const code = args.code
            const asynchr = code.includes('return') || code.includes('await');
            let output = await eval(asynchr ? `(async()=>{${code}})();` : code)

            if (typeof output !== "string") {
                output = inspect(output, { depth: 0 });
            }
            /* if (output.length > 2048) return hastebin(output, { extension: "txt" }).then(link => {
               return message.channel.send(link).then(() => message.react("📫"))
            }) */
            message.util.send(output
                .replace(new RegExp(this.client.token, 'gi'), "[TOKEN]"),
                { code: "js", split: true });
        } catch (err) {
            message.util.send(err.message
                .replace(new RegExp(this.client.token, 'gi'), "[TOKEN]"),
                { code: "js", split: true });
        }
    }
}

module.exports = Eval;