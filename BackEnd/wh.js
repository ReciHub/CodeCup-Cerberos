'use strict';
const PAGE_ACCESS_TOKEN = "EAAXzV4jFGmgBAJxba2U22GFjw5brwz26SUOW1vPOiwPyBNWm5IHlgnFgZBZAQrcgDt2NZCjrdxGh4zIljML3RZC2IXHL2AUTto53NJOzXtOh95RhrV03rcxZCc4YZBKBkeByoZAM9iRiVyboUZAOEihBZBEOHTO6ZAIu3RZBOSfrNXZBo9Wz54CRERo5";
const APIAI_TOKEN = "c0b7fedfdd5d412b89c158f03f871cf0";
const WEATHER_API_KEY = "";

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const apiai = require('apiai');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const server = app.listen(process.env.PORT || 5000, () => {
  console.log('Express server listening on port %d in %s mode', server.address().port, app.settings.env);
});

const apiaiApp = apiai(APIAI_TOKEN);

/* For Facebook Validation */
app.get('/webhook', (req, res) => {
  if (req.query['hub.mode'] && req.query['hub.verify_token'] === 'icariopasswordtokenbot') {
    res.status(200).send(req.query['hub.challenge']);
  } else {
    res.status(403).end();
  }
});

/* Handling all messenges */
  app.post('/webhook', (req, res) => {
  console.log(req.body);
  if (req.body.object === 'page') {
    req.body.entry.forEach((entry) => {
      entry.messaging.forEach((event) => {
        if (event.message && event.message.text) {
          sendMessage(event);
        }
      });
    });
    res.status(200).end();
  }
});


function sendMessageWOAPIAI(event, sender, text) {

  request({
    url: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: {
      recipient: {id: sender},
      message: {text: text},
    }
  }, function (error, response) {
    if (error) {
        console.log('Error sending message: ', error);
    } else if (response.body.error) {
        console.log('Error: ', response.body.error);
    }
  });
}


/* GET query from API.ai */

function sendMessage(event) {
  let sender = event.sender.id;
  let text = event.message.text;

  let apiai = apiaiApp.textRequest(text, {
    sessionId: 'icariopasswordtokenbot'
  });

  apiai.on('response', (response) => {
    console.log("response", response)
    let aiText = response.result.fulfillment.speech;
    console.log(aiText);

    request({
      url: 'https://graph.facebook.com/v2.6/me/messages',
      qs: {access_token: PAGE_ACCESS_TOKEN},
      method: 'POST',
      json: {
        recipient: {id: sender},
        message: {text: aiText},
      }
    }, (error, response) => {
      if (error) {
          console.log('Error sending message: ', error);
      } else if (response.body.error) {
          console.log('Error: ', response.body.error);
      }
    });
  });

  apiai.on('error', (error) => {
    console.log(error);
  });

  apiai.end();
}

/* Webhook for API.ai to get response from the 3rd party API */
app.post('/ai', (req, res) => {
  console.log('*** Webhook for api.ai query ***');
  console.log(req.body.result);

  if (req.body.result.action === 'weather') {
    console.log('*** weather ***');
    let city = req.body.result.parameters['geo-city'];
    let restUrl = 'http://api.openweathermap.org/data/2.5/weather?APPID='+WEATHER_API_KEY+'&q='+city;

    request.get(restUrl, (err, response, body) => {
      if (!err && response.statusCode == 200) {
        let json = JSON.parse(body);
        console.log(json);
        let tempF = ~~(json.main.temp * 9/5 - 459.67);
        let tempC = ~~(json.main.temp - 273.15);
        let msg = 'The current condition in ' + json.name + ' is ' + json.weather[0].description + ' and the temperature is ' + tempF + ' ℉ (' +tempC+ ' ℃).'
        return res.json({
          speech: msg,
          displayText: msg,
          source: 'weather'
        });
      } else {
        let errorMessage = 'I failed to look up the city name.';
        return res.status(400).json({
          status: {
            code: 400,
            errorType: errorMessage
          }
        });
      }
    })
  }

});

var idThiago = "1398944096820247";
// sendMessageWOAPIAI(null, idThiago, "Oi, THiago");


/*
/
/
/
/
/
/
*/

var appServer = express();
var fs = require("fs");

// var bodyParser = require('body-parser');
appServer.use(bodyParser.json({ type: 'application/json' }));


var input = {};
var inputCompra = {};


// Post da maquina
appServer.post('/addMachine', (req, res) => {
   // First read existing users.
   // The difference between the machines.json and users.json is that
   // you have a second object array, the : DADOS-COMPRA
    console.log(req.body);
    console.log("MACHINE", req.body);
    fs.readFile(__dirname + "/" + "machines.json", 'utf8', function(err, data){
        if(err) console.log(404);
        input = JSON.parse(data);
        var objectNew = {"WIFI": req.body.WIFI, "DADOS-COMPRA": req.body["DADOS-COMPRA"]}
        input["fp-machines"].push(objectNew);
        input = JSON.stringify(input, null, ' ');
        fs.writeFile(__dirname + "/" + "machines.json", input, function (err) {
            if(err) console.log(404);
        });
        
        res.json({
            errors: ['No error']
        });
    });
})


appServer.post('/addUser', (req, res) => {
   // First read existing users.
    console.log(req.body);
    console.log(req.body.WIFI);
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function(err, data){
        if(err) console.log(404);
        input = JSON.parse(data);
        var objectNew = {"WIFI": req.body.WIFI}
        console.log(objectNew);
        fs.readFile(__dirname + "/" + "machines.json", 'utf8', function(err, data){
            input = JSON.parse(data);
            console.log("TESTE");
            console.log(input);
            console.log(input['fp-machines'][input['fp-machines'].length - 1]);
            var status = cmp(input['fp-machines'][input['fp-machines'].length - 1], objectNew);
            var dadosCompra = input['fp-machines'][input['fp-machines'].length - 1]["DADOS-COMPRA"]; 
            var text = "";
            console.log("status", status);
            if(status == 1){
                text = "Compra realizada com sucesso.\n";
                text += "\nUltimos 4 digitos do cartão: " + parseFloat(dadosCompra['N-CARTAO'].split('.')[1]);
                text += "\nData e Hora: " + new Date().toLocaleString() + "\n";
                text += "\nCusto da compra: " + parseFloat(dadosCompra['PRECO'][dadosCompra['PRECO'].find('.') + 2]); 
                sendMessageWOAPIAI(null, idThiago, text);
            }else if(status == 2){
                text = "COMPRA NIVEL 2";
                sendMessageWOAPIAI(null, idThiago, text);
            }else if(status == 3){
                text = "COMPRA NIVEL 3";
                text = "COMPRA VALIDADA"
                sendMessageWOAPIAI(null, idThiago, text);
            }
            
        });
        
        input.fp.push(objectNew);
        input = JSON.stringify(input, null, ' ');
        fs.writeFile(__dirname + "/" + "users.json", input, function (err) {
            if(err) console.log(404);
        });
        res.json({
            errors: ['Failed to create photo']
        });
    });
})
    


appServer.get('/listUsers', function (req, res) {
  fs.readFile( __dirname + "/" + "users.json", 'utf8', function (err, data) {
      res.end(data);
  });
})



var serverRest = appServer.listen(8082, function () {

  var host = serverRest.address().address
  var port = serverRest.address().port

  console.log("Example appServer listening at http://%s:%s", host, port)

});

function cmp(listWebMaq, listWebUsr){
	var qtdListMaq= listWebMaq.length;
	var qtdListUsr= listWebUsr.length;
// 	console.log("Maquina ", listWebMaq);
// 	console.log("User ", listWebUsr);
	var i=0, j=0, acertos=0,total=0, nota=0;
	for(i=0;i<qtdListMaq;i++){
		for(j=0;j<qtdListUsr;j++){
			if(listWebMaq.WIFI[i].SSID == listWebUsr[j].SSID && listWebMaq.WIFI[i].BSSID== listWebUsr[j].BSSID){
				acertos++;
			}
		}
	}
  if(qtdListUsr==0 || qtdListMaq==0){
	    total==1;
	  }
  else	if(qtdListUsr< qtdListMaq){
		total = qtdListUsr;
	}
	else{
		total = qtdListMaq;
	}
	nota = (acertos/total) *100 ;
	if(nota<=60){
		return 3;// Quando a função retornar 3, o procecsso deve passar para a terceira etapa
	}
	else if(nota <=75){
		return 2;//Quando a função retornar 2, o processo deve pegar o grau de confiança da compra e tirar a media, para ver se é nescessario ou não a comunicação com o bot
	}
	else{
	    return 1;//Quando a função retorna 1, o processo deve ser aceito. O match entre as wifis locais é alto, não precisando a comunicação com bot
	}
}
