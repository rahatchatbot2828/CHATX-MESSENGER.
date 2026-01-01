const fs = require("fs");
const path = require("path");

// Bot command collection (Map)
const commands = new Map();

// Prefix
const prefix = "/"; // change if you want

// Load all commands from cmd folder
const cmdFolder = path.join(__dirname, "cmd");
fs.readdirSync(cmdFolder).forEach(file => {
    if(file.endsWith(".js") && file !== "wingoMoney.json"){
        const command = require(path.join(cmdFolder, file));
        commands.set(command.name, command);
        console.log(`Loaded command: ${command.name} by ${command.author}`);
    }
});

// Dummy bot message event
// Replace this with your messenger/discord bot listener
async function onMessage(message){
    if(!message.body.startsWith(prefix)) return;

    const args = message.body.slice(prefix.length).trim().split(/ +/g);
    const commandName = args.shift().toLowerCase();

    if(commands.has(commandName)){
        try{
            await commands.get(commandName).execute(message,args,prefix);
        }catch(e){
            console.log(`❌ Error in command ${commandName}:`, e);
            message.reply(`❌ Error: ${e.message}`);
        }
    }
}

// Example usage (simulate message)
onMessage({
    senderID: "User123",
    body: "!wingo daily",
    reply: console.log,   // Replace reply with actual bot reply function
});
