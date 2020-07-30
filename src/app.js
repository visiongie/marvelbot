const { AkairoClient, CommandHandler, ListenerHandler } = require("discord-akairo")
const { token, marvelpublic, marvelprivate } = require("./config")
const Marvel = require("marvel")
class Marvelcord extends AkairoClient {
    constructor() {
        super({
            ownerID: "534099893979971584"
        })
        this.commandHandler = new CommandHandler(this, {
            prefix: "m.",
            directory: "./commands/",
            handleEdits: true,
            commandUtil: true,
            allowMention: true
        })
        this.listenerHandler = new ListenerHandler(this, {
            directory: "./events/"
        })
        this.marvel = new Marvel({
            publicKey: marvelpublic,
            privateKey: marvelprivate
        })
    }

    async start() {
        this.commandHandler.useListenerHandler(this.listenerHandler);
        this.commandHandler.loadAll();
        this.listenerHandler.loadAll();
        this.login(token)
    }
}

const client = new Marvelcord();
client.start();