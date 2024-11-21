const fs = require('fs');
const axios = require('axios');
const { body } = require('express-validator');

var token = "";

const url = 'https://krb-sjobs.brassring.com/GQWeb/GetAutoCompleteResults?partnerid=26059&siteid=5016';

var _id = 1;
var key1 = "code";
var key2 = "description";
function appendToJSON(filePath, newData,ind) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return;
    }

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseErr) {
      console.error('Error parsing JSON:', parseErr);
      return;
    }

    for (var i = 0; i < newData.length; i++) {

      let d = {
        "id": _id,
        "code": newData[i]["code"],
        "description": newData[i]["description"]
      };
      jsonData.push(d);
      _id++;
    }

    fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Data appended successfully -> '+ind);
      }
    });

  });
}

function Perform(i) {


  axios.post(url, {
    "TQRenderingID": "603",
    "QuestionType": "skills",
    "QuestionId": "0",
    "FieldName": "genskills",
    "LanguageId": "1",
    "LocaleId": "1033",
    "ClientID": "26059",
    "Criteria": "",
    "LanguageISOLetter": "en",
    "PageSize": 1000,
    "PageIndex": i,
    "OptQuestionId": "0",
    "SiteId": "5016"
  }, {
    headers: {
      'Content-Type': 'application/json',
      'Cookie': token,
      'host': 'krb-sjobs.brassring.com',
      'origin': 'https://krb-sjobs.brassring.com',
      'referer': 'https://krb-sjobs.brassring.com/TGnewUI/Search/Home/Home?partnerid=26059&siteid=5016',
      'Connection': 'keep-alive'
    }
  }
  )
    .then(
      response => {
        appendToJSON('./jobs.json', response.data.results,i);
      })
    .catch(error => {
      console.error(error);
    });
}

var i = 0;

setInterval(() => {
  Perform(i);
  i++;

}, 5000);
