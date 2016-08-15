'use strict'
const router = require('express').Router();
const { getAllArt, getArt, addArt, deleteArt } = require('../models/art_model');

// router.get('/', function(req, res) {
//   res.render('index', {user:req.session.user});
// });



router.get('/', getAllArt, function(req,res){
  res.send( {art: res.rows} );
})


router.get('/:aID', getArt, (req,res) => {
  res.send( {art: res.rows} )
});


router.post('/new', addArt, (req,res)=>{
  res.json(res.rows)
  // res.redirect()
})

router.delete('/:aID', deleteArt, (req,res)=>{
  console.log("delete route")
  res.send(req.params.aID )
})

module.exports = router;
