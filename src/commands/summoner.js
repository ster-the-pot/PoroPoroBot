const Discord = require("discord.js");


//include for API client
const league = require('../../apis/lol/summoner');

const DEL_TIME = 6000;

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
    fetchSummonerRank(sumId) {
        league.fetchSummoner(sumId)
    }
    fetchSummoner(sumId) {
        league.fetchSummoner(sumId);
    }

    async run() {
        if (this.args.length != 2) {
            this.msg.reply('usage: ' + Summoner.command_info()['usage']).then((m) => m.delete(7000).catch(e => console.log(e)));
        }
        if (this.args[1] == 'set') {

            console.log("Setting Summoner Name is currently unavailable!");

        } else if (this.args[0] == 'get') {
            let sData = await this.fetchSummoner(this.args[1]);
            //console.log(sData);
            //let LData = await this.fetchSummonerRank(sData.id);
            let sum = new SummonerData(sData);
            //sum.displaySummoner();
        }
    }
}
class SummonerData{
    constructor(s,l ) {
        this.sData = s;
        this.lData =l;

    }
    setLData(l){
        this.lData = l;
    }  

    setSData(s){
        this.sData = s;
    }

    displaySummoner(){
        let embed = new Discord.RichEmbed();
        embed.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/profileicon/${this.sData.profileIconId}.png`)
        embed.setTitle(this.sData.name);
        embed.addField("Summoner Level:", this.sData.summonerLevel);
        embed.addField("Summoner Rank:", this.lData[0].rank);
        embed.addField("Summoner Tier:", this.lData[0].tier);
        this.msg.channel.send(embed);
    }
}


module.exports.summoner = Summoner;

