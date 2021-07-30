const Discord = require("discord.js");
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

class Roulette {
    constructor(names) {
        this.names = names
        this.len = names.length
        this.teams = {
            len:  0,
            arr: []
        }
        this.over = {
            len:  0,
            arr: []
        }
        this.result = []
    }

    couples(){
        const r = this
        r.teams.len = r.len/2 - (r.len%2)/2
        r.over.len = r.len%2

        if(r.over.len < 2){
            r.teams.len -= 2
            r.over.len += 2
        }

        const arr = r.random()
        r.teams.arr = arr.slice(0, arr.length-(r.over.len +1))
        r.over.arr = arr.slice(r.teams.arr.length, arr.length-1)

        r.result = Roulette.makeTeams(r.teams.arr, r.teams.len, 2)
        r.result += Roulette.makeTeams(r.over.arr, 1, 3)
        return r.result
    }

    random(){ return Roulette.shuffle(this.names) }

    threesomes(){
        return "en desarrollo..."
    }

    // From https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    static shuffle(arr){
        let i = arr.length, rI
        while (0 !== i) {
            rI = Math.floor(Math.random() * i)
            i--
            [arr[i], arr[rI]] = [arr[rI], arr[i]]

        }
        return arr
    }


    static makeTeams(arr, nTeams, teamsLen) {
        let r = [], result='', Index = 0
        for (let i = 0; i < nTeams; i++) {
            let v = arr.slice(Index, teamsLen+Index)
            r.push(v)
            Index += teamsLen
        }

        r.map(v => result += `${v.join("─")}\n` )

        return result
    }
}

client.on("ready", ()=> console.log('¡Team Roulette iniciado!'))

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