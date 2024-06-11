const pokemonCount = 151
var pokedex ={}

window.onload = async function (){
    // getPokemon(1)
    for(let i = 1; i <= 155; i++){
        await getPokemon(i);

        let pokemon = document.createElement("div");
    pokemon.id = i;
    pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
    pokemon.classList.add("pokemon-name");
    pokemon.addEventListener("click",updatePokemon)
    document.getElementById("pokemon-list").append(pokemon);
    
    }
    // ‹div id="1" class="pokemon-name" ›BULBASAUR</div›
   
    
}


async function getPokemon(num){
    let url = `https://pokeapi.co/api/v2/pokemon/`+num.toString()

    let response = await fetch(url)
    let pokemon = await response.json()
    
    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"]
    let pokemonImg = pokemon["sprites"]["front_default"]
    

    response = await fetch(pokemon["species"]["url"])
    let pokemonDesc = await response.json()
    
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"]
    pokedex[num] = {"name" : pokemonName,"img": pokemonImg, "types" : pokemonType, "desc" : pokemonDesc}

}

// console.log(pokedex[1]["img"],"sdkllnmlkansdk")

// =>() XXXXX
function updatePokemon(){
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];

    let typesDiv =document.getElementById("pokemon-types");
    while(typesDiv.firstChild){
        typesDiv.firstChild.remove();
    }

    let types = pokedex[this.id]["types"];
    for(let i =0; i< types.length; i++){
        let type = document.createElement("span");
        type.innerText =types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"])//add background color
        typesDiv.append(type);
    }

    document.getElementById("pokemon-discription").innerText = pokedex[this.id]["desc"]
}



