var express = require('express');
var router = express.Router();
var faker = require('faker');
const fs = require('fs');
const people = require('../people.json')

/* GET users listing. */
router.get('/new', function(req, res, next) {
 res.send(createFakePerson());
});

router.get('/utenti', function(req,res,next){
    res.render('utenti', {
    title: 'Users',
    p: people //Passa il vettore alla pagina utenti.pug
  });
});

function createFakePerson()
{
 let person;
 let vett = new Array();
 var i;
 for (i = 0; i < 10; i++) {
  let randomName = faker.name.findName(); // random name
  let randomEmail = faker.internet.email(); // random mail
  let randomText = faker.lorem.text(); // random text
  let randomCountry = faker.address.country() // random country
  let randomWebSite = faker.internet.url() // random website
  let randomProfile = faker.image.avatar() //random people image
 
  person = {
   name:randomName,
   email:randomEmail,
   text: randomText,
   nazionality: randomCountry,
   website: randomWebSite,
   image: randomProfile
 }
 vett.push(person)
}

let formatted_object = {"vettore":"[]"}; //vorrei creare il solito vettore di oggetti, tipo: ppl[{name:nomea},{name:nomeb}]
formatted_object.vettore.push(vett);
 
 let data = JSON.stringify(vett);
 fs.writeFileSync('people.json', formatted_object);
 return vett;
}



module.exports = router;