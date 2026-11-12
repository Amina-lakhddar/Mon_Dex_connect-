import { getData, creatures, incrementerOffset, decrementerOffset} from "./services/api.js";
import { afficher, section_article } from "./ui.js";

getData().then(() => {
    afficher(creatures);
});

// charger plus des  creatures
let button_charger = document.getElementById("charger-plus");

button_charger.addEventListener("click", async function () {
    incrementerOffset();

    await getData();

    afficher(creatures);
});

// revenir au precedent
let button_precedent =document.getElementById("precedent");
button_precedent.addEventListener("click",async function(){
    decrementerOffset();
    await getData();
    section_article.innerHTML = "";
    afficher(creatures)
})