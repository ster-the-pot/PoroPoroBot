const Discord = require("discord.js");

class Summoner {
    static command_info() {
        return {
            "name": "summoner",
            "usage": "p/summoner [get|set] [summoner_name]",
            "info": "provides basic bot information to the user"
        };
    }
    constructor(client, msg, args) {
        this.client = client;
        this.msg = msg;
        this.args = args;
    }

    async run(){
        if(this.args.length!=2){
            console.log(this.args.length);
            this.msg.reply('usage: ' + Summoner.command_info()['usage']).then((m)=>m.delete(7000).catch(e=>console.log(e)));
        }
        if(this.args[1] == 'set'){

        }else if(this.args[1] == 'get'){

        }
    }
}

module.exports.summoner=Summoner;