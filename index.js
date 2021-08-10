// Incluimos los módulos necesarios
const http = require("http");
const fs = require("fs");
const path = require("path");
const express = require('express');
var nodemailer = require('nodemailer');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');
var requestPost = require('request');
var port = process.env.PORT || 3000;
const respuesta = require('./respuestas');
const app = express();
app.use(express.static(__dirname));
// Hacemos nuestra peticion HTTP
app.use(express.json());
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'cesar@ptree.com.mx',
        pass: 'desarrollo2019'
    }
});
app.post('/weebHook', function(request, response) {
    var apiScriptUrl = "https://script.google.com/macros/s/AKfycbzzNxBN4N6AszC4ATt_3yFGqmu1Xi70HiXS7sZO1Kbsm3zs7sh83zBM9YyLG0qUyBf6/exec?page=";
    contexto = request.body.queryResult.action;
    console.log(contexto, "contexto");
    if (contexto == "isCFL") {
        var fly;
        var nowTime = new Date().getTime();
        var correo = request.body.queryResult.parameters.email;
        var name = request.body.queryResult.parameters.person.name;
        var options = {
            'method': 'POST',
            'url': 'https://www.escadmin.com/ws/freshbot/customer?userId=' + correo,
            'headers': {
                'signature': nowTime + ':4237437739:dfkjweg34edbWE3rede3rSDWewf',
            }
        };
        console.log("ENtro", nowTime);
        requestPost(options, function(error, responses) {
            console.log(responses, "responses");
            if (correo.indexOf("gmail") > -1 || correo.indexOf("hotmail") > -1 || correo.indexOf("yahoo") > -1) {
                resultado = respuesta.sinCop(name);
                response.json(resultado);
            } else {
                var respuestaAPI = JSON.parse(responses.body);
                if (respuestaAPI.response) {
                    respuestaAPI = JSON.parse(respuestaAPI.response);
                    fly = respuestaAPI.isCFL;
                } else {
                    fly = false;
                }
                resultado = respuesta.isCFL(fly, name);
                // respuesta.addSugerencias(resultado, opciones);
                console.log(resultado, "RES");
                response.json(resultado);
            }

        });
    } else if (contexto == "sinCFL") {
        resultado = respuesta.sinCFL();
        response.json(resultado);
    } else if (contexto == "newContact") {
        //var correos = request.body.queryResult.parameters.email;
        //var names = request.body.queryResult.parameters.person.name;
        /*
        var mailOptions = {
            from: 'sergio@ptree.com.mx',
            to: 'sergio@ptree.com.mx',
            subject: 'Contactar usuario',
            text: "Favor de contactar a la persona:  " + names + " correo" + correos
        };
        */
        // transporter.sendMail(mailOptions, function(error, info) {
        resultado = respuesta.contactarUsuario();
        response.json(resultado);
        // });
    } else if (contexto == "AyudaAPI") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "ayuda",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            let data = JSON.parse(responses2.body).data.array;
            let resultado = respuesta.getAyuda(data);
            response.json(resultado);
        });
    } else if (contexto == "HerramientasAPI") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "herramientas",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            let data = JSON.parse(responses2.body).data.array;
            let resultado = respuesta.getAyuda(data);
            response.json(resultado);
        });
    } else if (contexto == "CertificacionAPI") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "getCertificacion",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            let data = JSON.parse(responses2.body).data.arrayType;
            let resultado = respuesta.getChips(data);
            response.json(resultado);
        });
    } else if (contexto == "Colaboración") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "getCertificacion",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            var dataAPI = JSON.parse(responses2.body).data.array;
            let data = [];
            for (var i = 0; i < dataAPI.length; i++) {
                if (dataAPI[i].tipo == "Colaboración") {
                    data.push({ tipo: dataAPI[i].contenido, link: dataAPI[i].link });
                }
            }
            let resultado = respuesta.getAyuda2(data);
            response.json(resultado);
        });
    } else if (contexto == "Comunicación") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "getCertificacion",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            var dataAPI = JSON.parse(responses2.body).data.array;
            let data = [];
            for (var i = 0; i < dataAPI.length; i++) {
                if (dataAPI[i].tipo == "Comunicación") {
                    data.push({ tipo: dataAPI[i].contenido, link: dataAPI[i].link });
                }
            }
            let resultado = respuesta.getAyuda2(data);
            response.json(resultado);
        });
    } else if (contexto == "clasesAPI") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "clases",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            let data = JSON.parse(responses2.body).data.arrayType;
            let resultado = respuesta.getChips(data);
            response.json(resultado);
        });
    } else if (contexto == "PróximosWebinar") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "clases",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            var dataAPI = JSON.parse(responses2.body).data.array;
            let data = [];
            for (var i = 0; i < dataAPI.length; i++) {
                if (dataAPI[i].tipo == "Próximos Webinar") {
                    data.push(dataAPI[i]);
                }
            }
            let resultado = respuesta.getChips2(data);
            response.json(resultado);
        });
    } else if (contexto == "PróximosWebinarEspeciales") {
        let options = {
            'method': 'GET',
            'url': apiScriptUrl + "clases",
            'headers': {}
        };
        requestPost(options, function(error, responses2) {
            var dataAPI = JSON.parse(responses2.body).data.array;
            let data = [];
            for (var i = 0; i < dataAPI.length; i++) {
                if (dataAPI[i].tipo == "Próximos Webinar Especiales") {
                    data.push(dataAPI[i]);
                }
            }
            let resultado = respuesta.getChips2(data);
            response.json(resultado);
        });
    }
});
console.log(port);
app.listen(port); //llama el puerto