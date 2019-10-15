const Discord = require("discord.js");
const client = new Discord.Client();
const token = require("../assets/token.json");
const fs = require("fs");
const path = require("path");


let cmdMap = new Map();


const helpCommand = (msg) => {
    help = new Discord.RichEmbed();
    help.setThumbnail('https://pm1.narvii.com/5763/0bc3572cedb7ef976953855aeaf492a8b2b82a67_hq.jpg');
    help.setTitle('Poro Poro Commands');
    cmdMap.forEach((command, k) => {
        i = command[k].info();
        help.addField(i[0] + " " +  i[1], i[2]);     
    });
    return help;
}

const activity = ["against a fed Zed", "arguably better that Faker","only Riven","like a Wood Division IV","without Flash"];

const playingReset = () => {
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
    
};


//all Commands handler
let   commandHandler = (msg) => {
    if(msg.content.substr(0,2) == token.prefix && !msg.author.bot){
        let args = msg.content.substr(2,msg.content.length).split(" ");
        let cmd = args.shift();
        if(cmdMap.has(cmd)){
           command = cmdMap.get(cmd);
           exec = new command[cmd]();
        exec.run(client,msg,args);
           
           
        }else(
            msg.reply(" Command not found. Run p/help to get a list of commands!").catch(e=>console.log("Reply Failed")).then((m)=>{
                m.delete(10000).catch(e=>console.log(e));
            })
        )

       msg.delete().catch(e=>console.log("Invalid Permissions."));

       
    };
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