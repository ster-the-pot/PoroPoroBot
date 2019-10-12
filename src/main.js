const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("../assets/token.json");
const fs = require("fs");
const path = require("path");


let cmdMap = new Map();


const activity = ["against a fed Zed", "arguably better that Faker","only Riven","like a Wood Division IV","without Flash"];

let playingReset = () => {
    client.user.setActivity(activity[Math.floor(Math.random() * activity.length)],'PLAYING')
    .catch(()=>{
        console.log("Failed to set Bot Activity");
    });
}


let cmdReadr = async() => {

    await new Promise((resolve,reject)=>{

        fs.readdir('./commands/',(error,dir)=>{
            if(!error){
                dir = dir.filter((f)=>{
                    return f.endsWith(".js");
                });
                
                dir.forEach(f=>{
                    cmdMap.set(f.substr(0,f.length-3), require(`./commands/${f}`));
                });
                resolve();
            }
        });

    });
    console.log(cmdMap.size);
    
};


//all Commands handler
let commandHandler = (msg) => {
    if(msg.content.substr(0,2) == token.prefix && !msg.author.bot){
        let args = msg.content.substr(2,msg.content.length).split(" ");
        let cmd = args.shift();

        if(cmd == 'binfo'){
            let tMem = 0;
            client.guilds.forEach(e=>{
                tMem+=e.memberCount;
            });
            
            info = new Discord.RichEmbed();
            info.setThumbnail('https://pm1.narvii.com/5763/0bc3572cedb7ef976953855aeaf492a8b2b82a67_hq.jpg');
            info.setURL('https://github.com/ster-the-pot/llfgProject');
            info.setColor('#3273a8');
            info.title='Poro Poro Bot!'
            info.addField("Info:",token.info);
            info.addField('Author:','Steelo!');
            info.addField('Active Members:',tMem);


            msg.channel.send(info);
            
        }
       
    }
}

 client.on('ready', async ()=>{
    console.log("Poro Poro is Online!");
    cmdReadr();
    playingReset();
    setInterval(playingReset,600000);
    
});

// Any User Message
client.on('message', (msg) => {
    commandHandler(msg);
});




client.login(token.token);