export const BASE_URL = "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0";
export let creatures = []
export async function getData() {
    await fetch(BASE_URL)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            let promises = [];

            for (const pokem of data.results) {
                promises.push(
                    fetch(pokem.url)
                        .then((response) => {
                            return response.json()
                        })
                );
            }

            return Promise.all(promises)
        })
        .then((data) => {
            creatures = data.map(obj => transformObj(obj))
        })
}
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

// {
//     id: "#001",
//     name: "Exemple",
//     type: "Feu",
//     level: "Base",
//     stats: { hp: 45, attack: 49, defence: 49 },
//     image: "https://example.com/001.png",
//     description: "Une courte description de la créature."
//   }