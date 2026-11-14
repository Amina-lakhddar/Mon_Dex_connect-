import { getData, creatures, incrementerOffset, decrementerOffset} from "./services/api.js";
import { afficher, section_article ,filter, rechercher,effacerRecherche, detail, ajouter,ajouterEquipe} from "./ui.js";

getData().then(() => {
    afficher(creatures);
    filter();
     rechercher();
     effacerRecherche();
     detail()
     
});

ajouter();

// charger plus des  creatures
let button_charger = document.getElementById("charger-plus");

button_charger.addEventListener("click", async function () {
    incrementerOffset();

    await getData();

    afficher(creatures);
    detail();
});

// revenir au precedent
let button_precedent =document.getElementById("precedent");
button_precedent.addEventListener("click",async function(){
    decrementerOffset();
    await getData();
    section_article.innerHTML = "";
    afficher(creatures)
    detail();
});


// boutton ajouter equipe
section_article.addEventListener("click", function (event) {

    let bouton = event.target.closest("button[data-action='ajouter']");

    if (!bouton) {
        return;
    }

    let id = bouton.dataset.id;

    let creature = creatures.find(function (element) {
        return String(element.id) === id;
    });

    if (creature) {
        ajouterEquipe(creature);
    }
});