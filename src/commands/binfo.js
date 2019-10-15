const Discord = require("discord.js");
const token = require("../../assets/token.json");
const CommandInterface = require('../CommandInterface.js');


class binfo {
    
    static info(){
        return ["binfo","usage: p/binfo","provides basic bot information to the user"];
    }

      run(client, msg, args) {
        let tMem = 0;
        client.guilds.forEach(e => {
            tMem += e.memberCount;
        });
        let infoE = new Discord.RichEmbed();
        infoE.setThumbnail('https://pm1.narvii.com/5763/0bc3572cedb7ef9769538ß55aeaf492a8b2b82a67_hq.jpg');
        infoE.setURL('https://github.com/ster-the-pot/llfgProject');
        infoE.setColor('#3273a8');
        infoE.title = 'Poro Poro Bot!'
        infoE.addField("Info:", token.info);
        infoE.addField('Author:', 'Steelo!');
        infoE.addField('Active Members:', tMem);
    
        msg.channel.send(infoE).then((msg) => {
            setTimeout
            msg.delete(10000).catch(err => console.log("Error: Invalid Permissions to Delete"));

        });

    }

}

module.exports.binfo = binfo;