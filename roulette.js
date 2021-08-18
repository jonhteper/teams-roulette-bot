class Roulette {

    constructor(names, messages) {
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
        this.messages = messages
    }
    
    
    random(){ return Roulette.shuffle(this.names) }

    couples(){
        const r = this
        r.teams.len = r.len/2 - (r.len%2)/2
        r.over.len = r.len%2

        if(r.over.len < 2){
            r.teams.len -= 1
            r.over.len += 2
        }

        const arr = r.random()
        r.teams.arr = arr.slice(0, arr.length-(r.over.len))
        r.over.arr = arr.slice(r.teams.arr.length, arr.length)

        r.result = Roulette.makeTeams(r.teams.arr, r.teams.len, 2, r.messages)
        r.result += Roulette.makeTeams(r.over.arr, 1, 3, r.messages)
        return r.result
    }



    customTeams(teamsLen, minTeamLen){
        const r = this

        //This var is for team indexes. Like Team #1, Team #2. This because there are two calls to makeTeams()
        //So the index in the second call the index will be 0 again. Somehow we will have to save the previous index.
        //So in the next call it will be start on the lastIndex.

        var lastIndex = 0;

        
        r.teams.len = r.len/teamsLen - ((r.len%teamsLen)/teamsLen)
        r.over.len = r.len%teamsLen
        

        while(r.over.len < minTeamLen){
            r.teams.len -= 1
            r.over.len += teamsLen
        }

        const arr = r.random()
        r.teams.arr = arr.slice(0, arr.length-(r.over.len))
        r.over.arr = arr.slice(r.teams.arr.length, arr.length)

        
        r.result = Roulette.makeTeams(r.teams.arr, r.teams.len, teamsLen, r.messages, lastIndex)
        r.result += Roulette.makeTeams(r.over.arr, r.over.arr.length/minTeamLen, minTeamLen, r.messages, lastIndex)

        return r.result
    }

    createTeams(n){
        return this.customTeams(n, n)
    }



    threesomes(){
        return this.customTeams(3, 2)
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

    static makeTeams(arr, nTeams, teamsLen, messages, lastIndex) {
        let r = [], result='', Index = 0 
        
        for (let i = 0; i < nTeams; i++) {
            let v = arr.slice(Index, teamsLen+Index)
            r.push(v)
            Index += teamsLen
        }

        var teamCounter = 1;

        r.map((v, index) => {result += messages.teamMessage + teamCounter + "**\n\t- " + `${v.join("\n\t- ")}\n`; teamCounter++} )

        return result
    }
}

module.exports = Roulette