function sinCFL() {
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    "Gracias por contactarnos."
                ]
            }
        }]
    };
    return respuesta;
}

function sinCop() {
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    "No podré ayudarte si no me compartes tu correo corporativo."
                ]
            }
        }]
    };
    return respuesta;
}

function isCFL(fly, name) {
    var respuesta = {};
    if (fly) {
        respuesta = {
            "fulfillmentText": "name",
            "fulfillmentMessages": [{
                    "text": {
                        "text": [
                            name + " me da mucho gusto que cuentes con el servicio de Customer for Life de eSource Capital."
                        ]
                    }
                },
                {
                    "text": {
                        "text": [
                            "¿Quieres saber lo que tenemos para ti?"
                        ]
                    }
                },
                {
                    "payload": {
                        "richContent": [
                            [{
                                "type": "chips",
                                "options": [{
                                        "link": "",
                                        "text": "Si, conocer mas",
                                        "image": {
                                            "src": {
                                                "rawUrl": "https://media-exp3.licdn.com/dms/image/C560BAQHgPGEzoxqWmw/company-logo_200_200/0/1620754141634?e=2159024400&v=beta&t=SloLUlBZrUOmlk-iQ8cyOdcvBWdMvDBZ5ZJYArhKX-Y"
                                            }
                                        }
                                    },
                                    {
                                        "link": "",
                                        "text": "No, gracias",
                                        "image": {
                                            "src": {
                                                "rawUrl": "https://media-exp3.licdn.com/dms/image/C560BAQHgPGEzoxqWmw/company-logo_200_200/0/1620754141634?e=2159024400&v=beta&t=SloLUlBZrUOmlk-iQ8cyOdcvBWdMvDBZ5ZJYArhKX-Y"
                                            }
                                        }
                                    }
                                ]
                            }]
                        ]
                    }
                }
            ]
        };
    } else {
        var text = name + "Todavía estoy aprendiendo," +
            "No consigo tu correo en mi base de datos." +
            "Te podemos contactar si lo requieres.";
        respuesta = {
            "fulfillmentText": "name",
            "fulfillmentMessages": [{
                "text": {
                    "text": [
                        text
                    ]
                }
            }, {
                "payload": {
                    "richContent": [
                        [{
                            "type": "chips",
                            "options": [{
                                    "link": "",
                                    "text": "SI, quiero que me contacten",
                                    "image": {
                                        "src": {
                                            "rawUrl": "https://media-exp3.licdn.com/dms/image/C560BAQHgPGEzoxqWmw/company-logo_200_200/0/1620754141634?e=2159024400&v=beta&t=SloLUlBZrUOmlk-iQ8cyOdcvBWdMvDBZ5ZJYArhKX-Y"
                                        }
                                    }
                                },
                                {
                                    "link": "",
                                    "text": "No gracias",
                                    "image": {
                                        "src": {
                                            "rawUrl": "https://media-exp3.licdn.com/dms/image/C560BAQHgPGEzoxqWmw/company-logo_200_200/0/1620754141634?e=2159024400&v=beta&t=SloLUlBZrUOmlk-iQ8cyOdcvBWdMvDBZ5ZJYArhKX-Y"
                                        }
                                    }
                                }
                            ]
                        }]
                    ]
                }
            }]
        };
    }
    return respuesta;
}

function contactarUsuario() {
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "text": {
                "text": [
                    "Gracias por contactarnos."
                ]
            }
        }, {
            "text": {
                "text": [
                    "Un agente te contactara lo antes posible."
                ]
            }
        }]
    };
    return respuesta;
}

function addSugerencias(res, opciones) {
    res.fulfillmentMessages.push({
        "platform": "ACTIONS_ON_GOOGLE",
        "suggestions": {
            "suggestions": listaOpcionesGoogle(opciones)
        }
    });
}

function getChips(data) {
    let arrays = [];
    for (var i = 0; i < data.length; i++) {
        arrays.push({
            "type": "chips",
            "options": [{
                "link": "",
                "text": data[i],
                "image": {
                    "src": {
                        "rawUrl": "https://media-exp3.licdn.com/dms/image/C560BAQHgPGEzoxqWmw/company-logo_200_200/0/1620754141634?e=2159024400&v=beta&t=SloLUlBZrUOmlk-iQ8cyOdcvBWdMvDBZ5ZJYArhKX-Y"
                    }
                }
            }]
        });
    }


    let respuesta = {};
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "payload": {
                "richContent": [
                    arrays
                ]
            }
        }]
    };
    return respuesta;
}

function getChips2(data) {
    let arrays = [];
    for (var i = 0; i < data.length; i++) {
        arrays.push({
            "type": "chips",
            "options": [{
                "link": data[i].link,
                "text": data[i].contenido,
                "image": {
                    "src": {
                        "rawUrl": "https://media-exp3.licdn.com/dms/image/C560BAQHgPGEzoxqWmw/company-logo_200_200/0/1620754141634?e=2159024400&v=beta&t=SloLUlBZrUOmlk-iQ8cyOdcvBWdMvDBZ5ZJYArhKX-Y"
                    }
                }
            }]
        });
    }


    let respuesta = {};
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "payload": {
                "richContent": [
                    arrays
                ]
            }
        }, {
            "text": {
                "text": [
                    "Gracias por contactarnos. Te esperamos todas las semanas con nuevos temas y horarios."
                ]
            }
        }]
    };
    return respuesta;
}

function getAyuda(data) {
    let datasForm = [];
    for (var i = 0; i < data.length; i++) {
        datasForm.push(
            [{
                "type": "info",
                "title": data[i].tipo,
                "subtitle": "",
                "text": "Cambio",
                "image": {
                    "src": {
                        "rawUrl": "https://example.com/images/logo.png"
                    }
                },
                "actionLink": data[i].link
            }]);
    }
    var respuesta = {};
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "payload": {
                "richContent": datasForm,
            }
        }]
    };
    return respuesta;
}

function getAyuda2(data) {
    let datasForm = [];
    for (var i = 0; i < data.length; i++) {
        datasForm.push(
            [{
                "type": "info",
                "title": data[i].tipo,
                "subtitle": "",
                "text": "Cambio",
                "image": {
                    "src": {
                        "rawUrl": "https://example.com/images/logo.png"
                    }
                },
                "actionLink": data[i].link
            }]);
    }
    var respuesta = {};
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "payload": {
                "richContent": datasForm,
            }
        }, {
            "text": {
                "text": [
                    "Gracias por contactarnos. "
                ]
            }
        }, {
            "text": {
                "text": [
                    "Comparte con tus colegas estos cursos. "
                ]
            }
        }, {
            "text": {
                "text": [
                    "Los esperamos"
                ]
            }
        }]
    };
    return respuesta;
}

function getAyuda3(data) {
    let datasForm = [];
    for (var i = 0; i < data.length; i++) {
        datasForm.push(
            [{
                "type": "info",
                "title": data[i].tipo,
                "subtitle": "",
                "text": "Cambio",
                "image": {
                    "src": {
                        "rawUrl": "https://example.com/images/logo.png"
                    }
                },
                "actionLink": data[i].link
            }]);
    }
    var respuesta = {};
    respuesta = {
        "fulfillmentText": "name",
        "fulfillmentMessages": [{
            "payload": {
                "richContent": datasForm,
            }
        }]
    };
    return respuesta;
}

function listaOpcionesGoogle(opciones) {
    let res = [];
    for (let i = 0; i < opciones.length; i++) {
        res.push({ "title": opciones[i] });
    }
    return res;
}

module.exports = {
    isCFL: isCFL,
    sinCFL: sinCFL,
    sinCop: sinCop,
    contactarUsuario: contactarUsuario,
    getAyuda: getAyuda,
    getChips: getChips,
    getChips2: getChips2,
    getAyuda2: getAyuda2,
    getAyuda3: getAyuda3
};