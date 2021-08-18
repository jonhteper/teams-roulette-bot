const Discord = require("discord.js");
const Roulette = require("./roulette");
const data = require("./data.json");
const fs = require("fs");
const client = new Discord.Client();
const prefix = "/";
const lang = data.lang
let manual

const Language = require("./Services/LanguageSetter.js");
var messages = Language(lang);


(()=>{
    fs.readFile("./manual.md", "utf-8", (err, data)=>{
        if (err) console.error(err)
        else manual = data
    })
})()


client.on("ready", () => console.log('¡Team Roulette iniciado!'))

client.on("message", message => {

    //This could be better here so we make the validation before the initialization of 'args' and 'command' vars
    
    if (message.author.bot) return;
    if (message.content.indexOf(prefix) !== 0) return;


    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase(), roulette = new Roulette(data.names, messages)

    switch (command){
        //Restart command to make it easier to restart the bot just for testing purposes.
        //That line will be removed on the release version.
        case 'restartbot':
            message.channel.send(messages.restartMessage).then(() => process.exit(1));
            break
        case "info":
            message.channel.send(manual)
            break
        case "lista":
            message.channel.send(roulette.random())
            break
        case 'parejas':
            message.channel.send(roulette.couples())
            break
        case 'tercias':
            message.channel.send(roulette.threesomes())
            break
        case 'create':
            if(args.length > 0){
                if(Number.isInteger(parseInt(args[0]))){
                    message.channel.send(roulette.createTeams(parseInt(args[0])))
                }
                else {
                    message.channel.send(messages.wrongArgsCommand)
                }
            }
            else {
                message.channel.send(messages.wrongArgsCommand)
            }
            
            break
        default:
            message.channel.send(messages.invalidCommand)
    }
})

client.login(data.token)