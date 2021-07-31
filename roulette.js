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

        r.result = Roulette.makeTeams(r.teams.arr, r.teams.len, 2)
        r.result += Roulette.makeTeams(r.over.arr, 1, 3)
        return r.result
    }



    customTeams(teamsLen, minTeamLen){
        const r = this
        r.teams.len = r.len/teamsLen - ((r.len%teamsLen)/teamsLen)
        r.over.len = r.len%teamsLen

        while(r.over.len < minTeamLen){
            r.teams.len -= 1
            r.over.len += teamsLen
        }

        const arr = r.random()
        r.teams.arr = arr.slice(0, arr.length-(r.over.len))
        r.over.arr = arr.slice(r.teams.arr.length, arr.length)

        r.result = Roulette.makeTeams(r.teams.arr, r.teams.len, teamsLen)
        r.result += Roulette.makeTeams(r.over.arr, r.over.arr.length/minTeamLen, minTeamLen)

        return r.result
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


    static makeTeams(arr, nTeams, teamsLen) {
        let r = [], result='', Index = 0
        for (let i = 0; i < nTeams; i++) {
            let v = arr.slice(Index, teamsLen+Index)
            r.push(v)
            Index += teamsLen
        }

        r.map(v => result += `${v.join("─")}\n\n` )

        return result
    }
}

module.exports = Roulette