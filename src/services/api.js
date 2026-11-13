export const limit=20;
export let offset=0;
export let BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
export let creatures = []
export async function getData() {
    await fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`)
        .then((response) => response.json())
        .then((data) => {
            let promises = [];

            for (const pokem of data.results) {
                promises.push(
                    fetch(pokem.url)
                        .then((response) => response.json())
                );
            }

            return Promise.all(promises);
        })
        .then((data) => {
            creatures = data.map(obj => transformObj(obj));
        });
}

// fonction transformer l api en objet simple
export function transformObj(obj) {
    const ob = {
        id: "#" + String(obj.id).padStart(3, "0"),
        name: obj.name,

        type: obj.types.map(function(item) {
            return item.type.name;
        }).join(" / "),

        level: "Base",

        stats: {
            hp: obj.stats.find(function(item) {
                return item.stat.name === "hp";
            }).base_stat,

            attack: obj.stats.find(function(item) {
                return item.stat.name === "attack";
            }).base_stat,

            defence: obj.stats.find(function(item) {
                return item.stat.name === "defense";
            }).base_stat
        },

        image: obj.sprites.front_default
    };

    return ob;
}



// fonction incrementer offset
export function incrementerOffset(){
    offset+=limit;
}



//fonction decrementer offset
export function decrementerOffset(){
    if(offset>=limit){
        offset-=limit
    }
}


// fonction rechercher pokemon
export async function rechercherPokemon(nom) {
    let response = await fetch(`${BASE_URL}/${nom}`);

    if (!response.ok) {
        return null;
    }

    let data = await response.json();

    return transformObj(data);
}

// fonction 
export async function getPokemonDetail(id) {
    try {
        let response = await fetch(`${BASE_URL}/${Number(id)}`);

        if (!response.ok) {
            return null;
        }

        let data = await response.json();

        console.log("API DATA:", data);
        console.log("Types:", data.types);
        console.log("Abilities:", data.abilities);

        let pokemon = transformObj(data);

        pokemon.height = data.height / 10;
        pokemon.weight = data.weight / 10;

        pokemon.abilities = (data.abilities || []).map(function (item) {
            return item.ability.name;
        });

        return pokemon;

    } catch (error) {
        console.log("Erreur API:", error);
        return null;
    }
}