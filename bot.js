const Discord = require("discord.js");
const Roulette = require("./roulette");
const data = require("./data.json");
const fs = require("fs");
const client = new Discord.Client();
const prefix = "/";
let manual

(()=>{
    fs.readFile("./manual.md", "utf-8", (err, data)=>{
        if (err) console.error(err)
        else manual = data
    })
})()


client.on("ready", () => console.log('¡Team Roulette iniciado!'))

client.on("message", message => {
    const command =message.content, roulette = new Roulette(data.names)
    if (message.author.bot || !message.content.startsWith(prefix)) return
    switch (command){
        case "/info":
            message.channel.send(manual)
            break
        case "/lista":
            message.channel.send(roulette.random())
            break
        case '/parejas':
            message.channel.send(roulette.couples())
            break
        case '/tercias':
            message.channel.send(roulette.threesomes())
            break
        default:
            message.channel.send(`Comando desconocido.\n ${manual}`)
    }
})

client.login(data.token)