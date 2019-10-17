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

    async getSummoner(sum) {
        try {
            let response = await axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${sum}`, {
                params: {
                    api_key: token.lToken
                }
            }).catch(()=>console.log("error"));


            let embed = new Discord.RichEmbed();
            embed.setThumbnail(`http://ddragon.leagueoflegends.com/cdn/9.20.1/img/profileicon/${response.data.profileIconId}.png`)
            embed.setTitle(response.data.name);
            embed.addField("Summoner Level:", response.data.summonerLevel);
            this.msg.channel.send(embed);


        } catch (err) {
            if(err.status=='404'){
                this.msg.reply("Sorry! We couldn't find that summoner. Please check your spelling and try again!");
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
            await this.getSummoner(this.args[1]);
        }
    }
}

module.exports.summoner = Summoner;