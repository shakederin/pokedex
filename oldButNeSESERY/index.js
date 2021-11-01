//API resorces
const dataApi = " https://pokeapi.co/api/v2/pokemon/";
const dataApiType = " https://pokeapi.co/api/v2/type/"; 

//create Dom

let pokimondata;
let pokimondataType;
const inputValue = document.getElementById("input");
const searchButton = document.getElementById("button");
const pokimonImg = document.getElementById("pokimonImg"); 
// const errorMsg = document.getElementById("errorMsg");
let lastId = inputValue.value;
getPokimonInfoByInput(1)

//EventListeners
inputValue.addEventListener("keyup",function(event){
    if (event.keyCode === 13) {
        if(inputValue.value === "") {                                           // make sure that the input aint empty
            alert("Please Enter an ID or a name ");
            return;
        }
        useInput()
        inputValue.value = "";
        };
})

searchButton.addEventListener("click", function(){
    if(inputValue.value === "") {                                           // make sure that the input aint empty
        alert("Please Enter an ID or a name ");
        return;
    }
    useInput()
    inputValue.value = "";
});

pokimonImg.addEventListener("mouseover", function(){
    changeToBackImg(lastId);
})

pokimonImg.addEventListener("mouseleave", function(){
    addFrontImg(lastId);
})

//Functions
function useInput(){
    getPokimonInfoByInput(inputValue.value);
    
}

async function getPokimonInfoByInput(input){
        try {
                pokimondata = await axios.get(dataApi + input + "/");
                lastId = input;
                addName();
                addHeight();
                addWeight();
                addTypes();
                addFrontImg();
        } catch (error) {  
                document.getElementById("errorMsg").innerText = "Pokinom not found...";
                setTimeout(function(){ document.getElementById("errorMsg").innerText=""; }, 2500);
                return;
        }
}

function getUrlFrontImg(pokimondata){
   return pokimondata.data.sprites.front_default;
}

function getUrlBackImg(pokimondata){
    return pokimondata.data.sprites.back_default;
 }

function addName(num){
    document.getElementById("name").innerText = "Name: " + pokimondata.data.name.toUpperCase();
}

function addHeight(num){
    document.getElementById("height").innerText = "Height: " +  pokimondata.data.height*10 +"cm";
}

function addWeight(num){
    document.getElementById("weight").innerText = "Weight: " + pokimondata.data.weight + "kg";
}

function addTypes(num){
    const types = document.getElementById("types");
    let stingOfTypes = "Types: "
    for(let i = 0 ; i < pokimondata.data.types.length; i++){
        let typeTest = pokimondata.data.types[i].type.name;
        stingOfTypes += `<div class="types" id= "type${i}" style="cursor: pointer" onclick="getTypeList('${typeTest}')" >${typeTest}</div>`;
    }
    types.innerHTML = stingOfTypes; 
}

function addFrontImg(num){
    document.getElementById("pokimonImg").src = pokimondata.data.sprites.front_default ;
}

function changeToBackImg(num){
    document.getElementById("pokimonImg").src = pokimondata.data.sprites.back_default ;
}
// onmouseover="changePokimonData('${pokimondataType.data.pokemon[i*10+j].pokemon.name}')"          copy and add after line 114
async function getTypeList(type){
    try {
        pokimondataType = await axios.get(dataApiType + type + "/");
        console.log(pokimondataType);
        let typesTable = ``;
        for(let i = 0; i < Math.floor(pokimondataType.data.pokemon.length/10) + 1; i++ ){
            typesTable += `<tr>`
            for(let j = 0; j < 10; j++ ){
                if(i*10+j<pokimondataType.data.pokemon.length){
                    typesTable += `<td style="cursor: pointer";
                    onclick="changePokimonData('${pokimondataType.data.pokemon[i*10+j].pokemon.name}')">
                    ${pokimondataType.data.pokemon[i*10+j].pokemon.name}</td>`
                }
            }
            typesTable +=`</tr>`
        }
        console.log(typesTable);
        document.getElementById("typeTable").innerHTML = typesTable;
    } catch (error) {
        k = 1;
        console.log(error);
        alert ("Type not found...");
        return;
    }
}

async function changePokimonData(name){
    lastId = name;
   await getPokimonInfoByInput(name);
    console.log("clicked")
} 
