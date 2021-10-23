const express = require('express');
const router = express.Router();
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require("fs");


function buildFileForUser(userName){
    fs.access(`./users/${userName}/`, (err)=>{
      if(err){
      fs.mkdir(`./users/${userName}`, (err)=>{})
      }else{
        return
      }
    });
  }
  
  // 4 i
  router.get('/pokemon/get/:id', async function(req, res, next) {
    try {
      const userName = req.headers.username;
      if(!userName){
        next(401);
    }
      buildFileForUser(userName)
      const pokimonData = await P.getPokemonByName(req.params.id); 
      res.send(pokimonData);
    } catch (error){
        console.log(error.message);
        next(404);
    }
  });
  
  //4 ii+iii
  router.get('/pokemon/query', async function(req, res, next) {
    try {
      const userName = req.headers.username;
      if(!userName){
        next(401);
    }
      buildFileForUser(userName)
      const pokimondata = await P.getPokemonByName(req.query.query);
      const pokimonTypes = [];
      for( let type in pokimondata.types){
        pokimonTypes.push(pokimondata.types[type].type.name)
      }
      console.log(pokimonTypes)
      res.send(JSON.stringify({
        name: pokimondata.name,
        height: pokimondata.height,
        weight: pokimondata.weight,
        types: pokimonTypes,
        front_pic: pokimondata.sprites.front_default,
        back_pic: pokimondata.sprites.back_default,
        abilities: pokimondata.abilities,
     }));
    } catch (error){
      console.log(error);
      next(404);
    }
  });
  
  //4 iii
  router.put("/pokemon/catch/:id", async function(req, res, next){
    try{
      const userName = req.headers.username;
      if(!userName){
        next(401);
    }
      buildFileForUser(userName)
      const pokimonData = await P.getPokemonByName(req.params.id);
      fs.access(`${__dirname}/../users/${userName}/${req.params.id}.json`,(err)=>{     
        if(err){
          fs.writeFile(`${__dirname}/../users/${userName}/${req.params.id}.json`, `${JSON.stringify(pokimonData)}`,(err)=>{}) 
          res.send(`${pokimonData.name}	successfully caught!`)   
        }else{
         next(403);
        }
    })} catch (error){
      next(500)
    }
  });
  
  //4 iv
  router.delete("/pokemon/release/:id", async function(req, res, next){
    try {
        const userName = req.headers.username;
        if(!userName){
            next(401);
        }
      const pokimonData = await P.getPokemonByName(req.params.id);
      fs.access(`${__dirname}/../users/${userName}/${req.params.id}.json`,(err)=>{
        if(err){
          console.log("error 403");
          next(403)
        }else{
          fs.unlinkSync(`${__dirname}/../users/${userName}/${req.params.id}.json`)
          res.send(`${pokimonData.name}	successfully released!` )
        }
      })
    } catch (error){
      next(500);
    }
  
    })
  
  // 4 v
  router.get('/pokemon/', async function(req, res, next) {  
    try {
      const userName = req.headers.username;
      if(!userName){
        next(401);
    }
      fs.readdir(`../users/${userName}`, (err, files)=>{
        const pokemonArray = [];
        for(let file of files){
          pokemonArray.push(file.slice(0, file.length-5))
        }
        res.send(pokemonArray);
      })
    } catch (error){
      next(500);
    }
  });

  module.exports = router;