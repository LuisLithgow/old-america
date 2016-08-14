'use strict'

const pg = require("pg-promise")({});
const pgConfig = {
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  database: 'old_america_db',
  user: process.env.PG_USER,
  password: process.env.PG_PASSWORD
};

const db = pg(pgConfig);

function getAllArt(req,res,next){
  db.any(`SELECT * FROM art`)
    .then(data=> {
      res.rows = data ;
      console.log(data);
      next();
    })
    .catch(error=>{
      console.log("error: ", error)
    })
}

function getArt(req,res,next) {
  db.one(`SELECT *
          FROM art
          WHERE art_id=$1` , [req.params.id])
    .then(data => {
      res.rows = data;
      next();
    })
    .catch( error => {
      console.log('error ', error );
    });
}

function addArt(req,res,next) {
    db.one( `INSERT INTO art ($art_title, $art_image, $art_publish_date, $art_creator)
          VALUES ($1, $2, $3, $4)`,
          [req.body.art_title, req.body.art_image, req.body.art_publish_date, req.body.art_creator] )
      .then(data => {
        console.log("added artwork print to db :" + res.rows)
        res.rows = data;
        next();
    })
    .catch( error => {
      console.log('error in adding print: ', error );
    });
}


module.exports = { getAllArt, getArt, addArt};

