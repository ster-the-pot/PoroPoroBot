const Discord = require("discord.js");
const token = require("../../assets/token.json");


class binfo {
    static command_info(){
        return {"name":"binfo",
        "usage":"p/binfo",
        "info":"provides basic bot information to the user"
        };
    }

    constructor(client,msg,args){
        this.client=client;
        this.msg=msg;
        this.args=args;
    }
    
      async run() {
        let tMem = 0;
        this.client.guilds.forEach(e => {
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
    
        this.msg.channel.send(infoE).then((msg) => {
            setTimeout
            msg.delete(10000).catch(err => console.log("Error: Invalid Permissions to Delete"));

        });
    }

}


module.exports.binfo = binfo;