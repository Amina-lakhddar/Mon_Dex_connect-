
export const limit=20;
export let offset=0;
export let BASE_URL = `https://pokeapi.co/api/v2/pokemon`;
export let creatures = []
export async function getData() {
    return fetch(`${BASE_URL}?limit=${limit}&offset=${offset}`,
         {cache: "no-store"}
    )
        .then(function(response) {
            if (!response.ok) {
                throw new Error("Erreur lors du chargement de la liste");
            }

            return response.json();
        })
        .then(function(data) {
            let promises = [];

            for (const pokem of data.results) {
                promises.push(
                    fetch(pokem.url,{ cache: "no-store"})
                        .then(function(response) {
                            if (!response.ok) {
                                throw new Error("Erreur lors du chargement d'un Pokémon");
                            }

                            return response.json();
                        })
                );
            }

            return Promise.all(promises);
        })
        .then(function(data) {
            creatures = data.map(function(obj) {
                return transformObj(obj);
            });

            return creatures;
        })
        .catch(function(error) {
            console.log("Erreur API :", error);
            throw error;
        });
};

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



// Fonction rechercher Pokémon
export async function rechercherPokemon(nom) {

    let response = await fetch(`${BASE_URL}/${nom}`, {
        cache: "no-store"
    });

    // Pokémon introuvable
    if (response.status === 404) {
        return null;
    }

    // Autres erreurs HTTP
    if (!response.ok) {
        throw new Error("Erreur lors de la recherche");
    }

    let data = await response.json();

    return transformObj(data);
}


// Fonction récupérer le détail d'un Pokémon
export async function getPokemonDetail(id) {

    let response = await fetch(`${BASE_URL}/${Number(id)}`, {
        cache: "no-store"
    });

    // Pokémon introuvable
    if (response.status === 404) {
        return null;
    }

    // Autres erreurs HTTP
    if (!response.ok) {
        throw new Error("Erreur lors du chargement du détail");
    }

    let data = await response.json();

    let pokemon = transformObj(data);

    pokemon.height = data.height / 10;
    pokemon.weight = data.weight / 10;

    pokemon.abilities = (data.abilities || []).map(function(item) {
        return item.ability.name;
    });

    return pokemon;
};