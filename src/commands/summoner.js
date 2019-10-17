const Discord = require("discord.js");
const axios = require("axios");
const token = require('../../assets/token.json');
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

    async getSummonerID(sum) {
        try {
            let response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sum}`, {
                params: {
                    api_key: token.lToken
                }
            })
            let r2 = await axios.get(`https://na1.api.riotgames.com/lol/league/v4/entries/by-summoner/${response.data.id}`, {
                params: {
                    api_key: token.lToken
                }
            })
            let embed = new Discord.RichEmbed();
            embed.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/profileicon/${response.data.profileIconId}.png`)
            embed.setTitle(response.data.name);
            embed.addField("Summoner Level:", response.data.summonerLevel);
            console.log(r2.data);
            embed.addField("Summoner Rank:",r2.data.rank);
            embed.addField("Summoner Tier:",r2.data.tier);
            this.msg.channel.send(embed);

    }catch(err) {
        if (err.status == '404') {
            this.msg.reply(" I couldn't find the summoner you were looking for! Check for typo's and try again!").then((m) => {
                m.delete(6000).catch(err => console.log("Failed Reply Deletion"));
            });
        }
        console.log(err);
    }


}


async run() {
    if (this.args.length != 2) {
        this.msg.reply('usage: ' + Summoner.command_info()['usage']).then((m) => m.delete(7000).catch(e => console.log(e)));
    }
    if (this.args[1] == 'set') {
        console.log("Setting Summoner Name is currently unavailable!");

    } else if (this.args[0] == 'get') {
        await this.getSummonerID(this.args[1]);
    }
}
}

class SummonerData {
    constructor(eId, name, pIcon, rank) {
        this.name = name;
        this.eId = eId;
        this.pIcon = pIcon;

    }
    setRank() {
        this.rank = rank;
    }
    getRank() {
        return this.rank;
    }
    setPIcon(p) {
        this.pIcon = p;
    }
    getPIcon() {
        return this.pIcon;
    }
}

class Rank {
    constructor(level, rank, tier) {
        this.tier = tier;
        this.rank = rank;
        this.level = level;
    }
}

module.exports.summoner = Summoner;