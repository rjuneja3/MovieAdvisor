
const index = require('../controllers/index.server.controller');
const passport = require('passport');
const bodyparser = require('body-parser');
const urlencodedparser = bodyparser.urlencoded({extended:false});
const movie = require('../controllers/movies.server.controller');

//this function handles routing of requests
module.exports = function (app) {
   var index = require('../controllers/index.server.controller');
   var user = require('../controllers/user.server.controller');
   var movie = require('../controllers/movies.server.controller');
   var search = require('../controllers/search.server.controller');

   app.get('/', index.render);
   app.get('/contact-us', index.contactUsPage);
   app.get('/privacy-policy', index.privacyPolicy);
   app.get('/our-team', index.ourTeamPage);
   app.get('/advance-search', search.searchPage);

   app.get('/movie-details', function(req,res){
    res.render('movie-details', {title:'Movie Details', userLogged: req.user});
   });
   
   app.get('/registration', function(req,res){
      res.render('registration', {title:'Registration', userLogged: req.user});
     });

   app.post('/registration', user.register);

   app.get('/login', function(req,res){
      res.render('login', {title:'Log In', userLogged: req.user});
     });

   
   app.post('/login', (req,res,next)=>{
      passport.authenticate('local',{
         successRedirect : '/',
         failureRedirect : '/login',
         failureFlash : true,
         })(req,res,next);
   });
   app.get('/logout', function(req,res){
      req.logout();
      res.redirect('/');
     })

   // displaying db in a list
   app.get('/list', movie.findall);

   // adding to db from Form
   app.get('/add', movie.movieadd)
      .post(urlencodedparser, movie.insert);

   // update db from /list page
   app.post('/update/:objid', urlencodedparser, movie.updt);

   //to import data from API and save to DB
   app.get('/import_data',movie.importData)

};
