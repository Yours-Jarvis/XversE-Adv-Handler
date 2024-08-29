const { Client, Collection, Intents } = require("discord.js");
// const config = require("./config.json");
const config = require("./settings/config.js");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
  partials: ["GUILD", "GUILD_MEMBER", "CHANNEL", "MESSAGE", "USER"],
  allowedMentions: {
    parse: ['everyone', 'users', 'roles'],
    repliedUser: false,
  },
});

module.exports = client;

// <!-- Global Variables -->
client.aliases = new Collection();
client.commands = new Collection();
client.slashCommands = new Collection();
client.config = new require("./settings/config.js");

// <!-- Event Handler -->
client.on("ready", () => {
  client.user.setStatus("dnd");
  client.user.setActivity("XversE-Adv-Handler", { type: "WATCHING" });
  console.log(`[>] 🚀 | ${client.user.username} is Ready to use!`);
  
  client.channels.fetch(config.XversE.logChannelID).then((log) => {
    log.send(`\`\`\`xml\n🚀 I'm ready to use!\n🟢 Version :: ${config.XversE.version}\`\`\``);
  });
});;

const messageCreateEvent = require("./events/messageCreate.js");
const interactionCreateEvent = require("./events/interactionCreate.js");
const fileHandling = require("./handlers/handler.js");

messageCreateEvent(client);
interactionCreateEvent(client);
fileHandling(client);

client.login(config.TOKEN);