const express = require('express');
// Router need Capital
const router = express.Router();
const passport = require('passport');


const player_coll = require('../models/player');

router.get('/', (req, res) => {
  player_coll.find({}, (err, data) => {
    if (err) { throw err; }
    res.send(data);
  });
});

router.get('/register', (req, res) => {
  // res.send({type:'GET'});
  res.render('register', console.log('signup Message'));
});

// router.post('/register',function(req, res, next){
//     // var player = new player_coll(req.body);
//     // player.save()
//     player_coll.create(req.body).then(function(player){
//         res.send(player);
//     }).catch(next);
//     // res.send(req.body);
// });

router.post('/register',
  passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '/register',
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect('/');
  });


router.get('/login', (req, res) => {
  // res.send({type: 'GET'});
  res.render('login', console.log('login Message'));
});

router.post('/login',
  passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect('/');
  });


// update(edit)
router.put('/player/:id', (req, res) => {
  res.send({ type: 'PUT' });
});

// delete
router.delete('/player/:id', (req, res) => {
  res.send({ type: 'Delete' });
});

module.exports = router;
