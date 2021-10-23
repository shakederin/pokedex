const express = require('express');
const app = express();
const port = 8080;
const Pokedex = require('pokedex-promise-v2');
const P = new Pokedex();
const fs = require("fs");

app.listen(port, function() {
  console.log('app started');
});

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
app.get('/pokemon/get/:id', async function(req, res) {
  try {
    const userName = req.headers.username;
    buildFileForUser(userName)
    const pokimonData = await P.getPokemonByName(req.params.id); 
    res.send(pokimonData);
  } catch (error){
    console.log(error);
    res.send(error)
  }
});

//4 ii+iii
app.get('/pokemon/query', async function(req, res) {
  try {
    const userName = req.headers.username;
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
    res.send(error)
  }
});

//4 iii
app.put("/pokemon/catch/:id", async function(req, res){
  try{
    const userName = req.headers.username;
    buildFileForUser(userName)
    const pokimonData = await P.getPokemonByName(req.params.id);
    fs.access(`./users/${userName}/${req.params.id}.json`,(err)=>{     
      if(err){
        fs.writeFile(`./users/${userName}/${req.params.id}.json`, `${JSON.stringify(pokimonData)}`,(err)=>{}) 
        res.send(`${pokimonData.name}	successfully caught!`)   
      }else{
        console.log("error 403");
        res.status(403).send("Pokinom has already been caught")
      }
  })} catch (error){
    console.log(error);
    res.send(error)
  }
});

//4 iv
app.delete("/pokemon/release/:id", async function(req,res){
  try {
    const userName = req.headers.username;
    const pokimonData = await P.getPokemonByName(req.params.id);
    fs.access(`./users/${userName}/${req.params.id}.json`,(err)=>{
      if(err){
        console.log("error 403");
        res.status(403).send()
      }else{
        fs.unlinkSync(`./users/${userName}/${req.params.id}.json`)
        res.send(`${pokimonData.name}	successfully released!` )
      }
    })
  } catch (error){
    console.log(error);
    res.send(error)
  }

  })

// 4 v
app.get('/pokemon/', async function(req, res) {  
  try {
    const userName = req.headers.username;
    fs.readdir(`./users/${userName}`, (err, files)=>{
      const pokemonArray = [];
      for(let file of files){
        pokemonArray.push(file.slice(0, file.length-5))
      }
      res.send(pokemonArray);
    })
  } catch (error){
    console.log(error);
    res.send(error)
  }
});










  //************************************************************************************************************** */
  // req.on("data", (data)=>{
  //   // userName += data;
  //   console.log("49", JSON.parse(data).username);
  //   userName.push(JSON.parse(data).username);
  //   console.log("50", JSON.parse(data));
    // fs.access(`./users/${userName[0]/}`,(err, succses)=>{
    //   if(err){
    //     console.log(JSON.parse(data).catch);
    //     fs.mkdir(`./users/${userName[0]}`, (err)=>{})
    //     fs.writeFile(`./users/${userName[0]}/${JSON.parse(data).catch}.json`, `{"${JSON.parse(data).catch}" : "chatched"}`,(err)=>{})
    //     console.log("create file")
    //   } else{
    //     console.log(JSON.parse(fs.readFileSync(`./users/${userName[0]}.json`)));

    //   }
    // }); 
  //*************************************************************************************************************** */    

    // fs.stat((`./users/${userName[0]}`), (err, data)=>{
    //   if(err){
    //     fs.writeFile(`./users/${userName[0]}.json`, `{"pokinom": "chatched"}`,(err)=>{})
    //     console.log("create file")
    //     console.log(err);
    //   } if(data){
    //     console.log("is a file");

    //   }
    // });
      
  
// } )







