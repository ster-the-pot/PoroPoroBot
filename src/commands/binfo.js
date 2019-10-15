const Discord = require("discord.js");
const token = require("../../assets/token.json");

 

const binfo = (client, msg) => {
        
    let tMem = 0;
    client.guilds.forEach(e=>{
            tMem+=e.memberCount;
    });    
    info = new Discord.RichEmbed();
    info.setThumbnail('https://pm1.narvii.com/5763/0bc3572cedb7ef976953855aeaf492a8b2b82a67_hq.jpg');        info.setURL('https://github.com/ster-the-pot/llfgProject');
    info.setColor('#3273a8');
    info.title='Poro Poro Bot!'
    info.addField("Info:",token.info);
    info.addField('Author:','Steelo!');
    info.addField('Active Members:',tMem);

    msg.channel.send(info);
    }

module.exports.binfo = binfo;