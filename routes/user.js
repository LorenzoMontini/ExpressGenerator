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
    p: people
  });
});

router.get('/poeti/person', function(req,res,next){
    const person = people.find((m) => m.name === req.query.name);;
    res.render('poeti', {
    title: person.name,
    pt: person
  });
});


router.get('/info/person', function(req,res,next){
    const information = people.find((m) => m.name === req.query.name);;
    res.render('info', {
    title: information.name,
    ipt: information
  });
});

function createFakePerson()
{
 people.json=new Object;
 let person;
 let vett = new Array();
 let texts = new Array();
 var i;
 for (i = 0; i < 10; i++) {
  let randomName = faker.name.findName(); // random name
  let randomEmail = faker.internet.email(); // random mail
  for (n = 0; n < 5; n++) {
   let randomText = faker.lorem.text(); // random text
   texts.push(randomText)
  }
  let randomCountry = faker.address.country() // random country
  let randomWebSite = faker.internet.url() // random website
  let randomProfile = faker.image.avatar() //random people image
 
  person = {
   name:randomName,
   email:randomEmail,
   text:texts,
   nazionality: randomCountry,
   website: randomWebSite,
   image: randomProfile
 }
 vett.push(person)
}

 let data = JSON.stringify(vett);
 fs.writeFileSync('people.json', data);
 return vett;
}

module.exports = router;