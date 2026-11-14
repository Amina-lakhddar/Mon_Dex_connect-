import { getData, creatures, incrementerOffset, decrementerOffset} from "./services/api.js";
import { afficher, section_article ,filter, rechercher,effacerRecherche, detail, ajouter,ajouterEquipe} from "./ui.js";


async function chargerListe() {

    section_article.innerHTML = "<p>Chargement...</p>";

    try {
        await getData();

        if (creatures.length === 0) {
            section_article.innerHTML = "<p>Aucune créature trouvée.</p>";
            return;
        }

        afficher(creatures);
        detail();

    } catch (error) {
        section_article.innerHTML = `
            <p>Impossible de charger les créatures. Vérifiez votre connexion.</p>
            <button id="reessayer" type="button">Réessayer</button>
        `;
    }
}



chargerListe();

filter();
rechercher();
effacerRecherche();

ajouter();

// charger plus des  creatures
let button_charger = document.getElementById("charger-plus");

button_charger.addEventListener("click", async function () {
    incrementerOffset();

    await chargerListe();

    afficher(creatures);
    detail();
});

// revenir au precedent
let button_precedent =document.getElementById("precedent");
button_precedent.addEventListener("click",async function(){
    decrementerOffset();
    await chargerListe();
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



section_article.addEventListener("click", function(event) {

    if (event.target.id === "reessayer") {
        chargerListe();
    }

});


let panneau_detail = document.getElementById("detail");

panneau_detail.addEventListener("click", async function(event) {

    // Fermer
    if (event.target.id === "fermer-detail") {
        panneau_detail.innerHTML = "";
        panneau_detail.dataset.id = "";
        return;
    }

    // Réessayer
    if (event.target.id === "reessayer-detail") {

        let id = panneau_detail.dataset.id;

        if (id) {
            let article = Array.from(document.querySelectorAll("article")).find(
                function(element) {
                    let span = element.querySelector("span");

                    return span &&
                        Number(span.textContent.replace("#", "").trim()) === Number(id);
                }
            );

            if (article) {
                article.click();
            }
        }
    }

});