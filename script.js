// =============================================================
// script.js — Mon Dex
// =============================================================
// Les données viennent de data.js (la constante `creatures`).
// Écrivez votre code ici, fonctionnalité par fonctionnalité.
// Une carte GitHub Projects et au moins un commit par fonctionnalité.

// -------------------------------------------------------------
// 1. AFFICHAGE
let section_article=document.getElementById("grid");
function afficher(creatures){
    section_article.innerHTML=creatures.map(function(creature){
        return`<article class="flex flex-col gap-3  h-100 rounded-card w-[80%] bg-white border-2 border-orange-500 p-3 pb-4 transition-transform duration-300 hover:-translate-y-1 lg:w-[30%]">
          <div class="relative flex h-36 items-center justify-center rounded-xl bg-brand-light">
            <img src=${creature.image} alt="" class="img_card">
            <span class="span-card">${creature.id}</span>
          </div>
          <div class="flex items-center justify-between gap-2">
            <h3 class="font-display text-xl font-semibold">${creature.name}</h3>
            <span class="rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">${creature.type}</span>
          </div>
          <p class="text-transition-transform duration-300 hover:-translate-y-1sm text-muted">${creature.level}</p>
          <button
              type="button"
              class="btn-outline"
              data-action="ajouter"
              data-id="${creature.id}">
              Ajouter à l'équipe
          </button>
        </article>`
        
    })
};
afficher(creatures);

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
// Supprimez les cartes écrites à la main dans index.html et
// construisez la grille à partir du tableau `creatures`.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 2. DÉTAIL
function detail(){
  // let liste_article =document.getElementById("grid");
  // console.log(liste_article.textContent);
  
  let panneau_detail=document.getElementById("detail");
  let articles=document.querySelectorAll("article");
  
  articles.forEach(function(article){
    article.addEventListener("click",function(){
      let id_crature=article.querySelector("span");
      let detail_creature=creatures.filter(function(creature){
        return creature.id===id_crature.textContent;
      })
      return panneau_detail.innerHTML=`<div class="flex items-center justify-between">
            <span class="font-mono text-sm text-ink">${detail_creature[0].id} · Détail</span>
            <button type="button" aria-label="Fermer le détail" class="btn-outline w-11 px-0">✕</button>
          </div>
          <div class="flex h-48 items-center justify-center rounded-2xl bg-brand-light">
            <img src="${detail_creature[0].image}" alt="" class="img_card">
          </div>
          <div class="flex items-center justify-between">
            <h2 class="font-display text-3xl font-extrabold text-orange-700">${detail_creature[0].name}</h2>
            <span class="rounded-full bg-orange-500 px-3 py-1 text-sm font-bold text-white">${detail_creature[0].type}</span>
          </div>
          <p class="text-gray-700">${detail_creature[0].description}
          </p>
          <div class="flex flex-col gap-2 text-sm">
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold text-orange-700">PV</span><span
                class="h-3 rounded-full bg-ground"><span
                  class="block h-3 w-[30%] rounded-full bg-orange-500" style="width: ${detail_creature[0].stats.hp}%"></span></span><span
                class="text-right font-mono">${detail_creature[0].stats.hp}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold text-orange-700">Attaque</span><span
                class="h-3 rounded-full bg-ground"><span
                  class="block h-3 w-[33%] rounded-full bg-orange-500" style="width: ${detail_creature[0].stats.attack}%"></span></span><span
                class="text-right font-mono">${detail_creature[0].stats.attack}</span></div>
            <div class="grid grid-cols-[80px_1fr_40px] items-center gap-2"><span class="font-bold text-orange-700">Défense</span><span
                class="h-3 rounded-full bg-ground"><span
                  class="block h-3 w-[43%] rounded-full bg-orange-500" style="width: ${detail_creature[0].stats.defence}%"></span></span><span
                class="text-right font-mono">${detail_creature[0].stats.defence}</span></div>
          </div>
          <button type="button" class="btn-primary">Ajouter à l'équipe</button>`
      
    })
  })

}
detail();
// Un clic sur une carte ouvre le panneau de détail :
// image, description, et statistiques affichées en barres.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 3. RECHERCHE
function rechercher() {
    let search = document.querySelector("#search");

    search.addEventListener("input", function () {
        let valeur = search.value.toLowerCase();

        let resultat = creatures.filter(function (creature) {
            return creature.name.toLowerCase().includes(valeur);
        });

        afficher(resultat);
        detail();
    });
}

rechercher();
// La liste se met à jour pendant la saisie d'un nom
// (sans tenir compte des majuscules).
// -------------------------------------------------------------


// -------------------------------------------------------------
// 4. FILTRE
function filter(){
  let type_creature=document.getElementById("filters");
    type_creature.addEventListener("click", function (event) {
      if (event.target.tagName === "BUTTON") {
          if(event.target.textContent==="Tous"){
            afficher(creatures);
            detail();
          }else{
            let resultat_type=creatures.filter(function(creature){
              return creature.type===event.target.textContent;
            })
            afficher(resultat_type) 
            detail();
          }
      }
    });
}
filter();
// Les boutons de type n'affichent que les créatures de ce type ;
// « Tous » réinitialise le filtre.
// La recherche et le filtre fonctionnent ENSEMBLE.
// -------------------------------------------------------------


// -------------------------------------------------------------
// 5. CRÉER UNE CRÉATURE
function ajouter(){
  let formulaire=document.querySelector("#creature-form");
  let level=document.getElementById("level");
  let id=document.getElementById("id");
  let nom=document.getElementById("name");
  let stat1=document.getElementById("stat1");
  let stat2=document.getElementById("stat2");
  let stat3=document.getElementById("stat3");
  let image=document.getElementById("image");
  let description=document.getElementById("description");
  let type=document.getElementById("type");

  let regexId=/^#\d{3}$/;
  let regexNom=/^[A-Za-zÀ-ÿ0-9][A-Za-zÀ-ÿ0-9 .'-]{1,29}$/;
  let regexStats=/^\d{1,3}$/;
  let regexImage=/^https:\/\/\S+\.(png|jpe?g|webp|gif)$/i;
  let regexDescription=/^[\s\S]{10,200}$/;


 //Validation id :

id.addEventListener("input",function(event){
  let message=document.getElementById("error-message-id");
    if(event.target.tagName==="INPUT"){
      if(regexId.test(id.value)){
        id.classList.remove("error");
        id.classList.add("success");
         
        message.textContent = "Numéro valide !";

        message.classList.remove("message-error");
        message.classList.add("message-success");

      }else {
        id.classList.remove("success");
        id.classList.add("error");

        message.textContent = "Numéro invalide !";

        message.classList.remove("message-success");
        message.classList.add("message-error");
      }
      verifierFormulaire()
    }
  });
  // Validation name :

  nom.addEventListener("input",function(event){
    let message=document.getElementById("error-message-name")
    if(event.target.tagName==="INPUT"){
      if(regexNom.test(nom.value)){
        nom.classList.add("success");
        nom.classList.remove("error");
        message.textContent="Nom Valide !";
        message.classList.remove("message-error");
        message.classList.add("message-success");
      }else{
        nom.classList.remove("success");
        nom.classList.add("error");

        message.textContent="Nom Invalide !";

        message.classList.remove("message-success");
        message.classList.add("message-error");
      }
      verifierFormulaire()
    }
  });

  // Validation statistique 1 :
  stat1.addEventListener("input",function(event){
    let message=document.getElementById("error-message-stat1")
    if(event.target.tagName==="INPUT"){
      if(regexStats.test(stat1.value)){
        stat1.classList.add("success");
        stat1.classList.remove("error");

        message.textContent="Statistique valide !";

        message.classList.add("message-success");
        message.classList.remove("message-error");
      }else{
        stat1.classList.remove("success");
        stat1.classList.add("error");

        message.textContent="Statistique invalide !";

        message.classList.remove("message-success");
        message.classList.add("message-error");
      }
      verifierFormulaire()
    }
  });

  // Validation statistique 2 :
  stat2.addEventListener("input",function(event){
    let message=document.getElementById("error-message-stat2");
    if(event.target.tagName==="INPUT"){
      if(regexStats.test(stat2.value)){
        stat2.classList.add("success");
        stat2.classList.remove("error");
       
        message.textContent="Statistique valide !";

        message.classList.add("message-success");
        message.classList.remove("message-error");
      }else{
        stat2.classList.remove("success");
        stat2.classList.add("error");

        message.textContent="Statistique invalide !";

        message.classList.remove("message-success");
        message.classList.add("message-error");
      }
      verifierFormulaire()
    }
  });

  // Validation statistique 3 :
  stat3.addEventListener("input",function(event){
    let message=document.getElementById("error-message-stat3")
    if(event.target.tagName==="INPUT"){
      if(regexStats.test(stat3.value)){
        stat3.classList.add("success");
        stat3.classList.remove("error");

        message.textContent="Statistique valide !";

        message.classList.add("message-success");
        message.classList.remove("message-error");
      }else{
        stat3.classList.remove("success");
        stat3.classList.add("error");

        message.textContent="Statistique invalide !";

        message.classList.remove("message-success");
        message.classList.add("message-error");
      }
      verifierFormulaire()
    }
  });

  // Validation image :
  image.addEventListener("input",function(event){
    let message=document.getElementById("error-message-image")
    if(event.target.tagName==="INPUT"){
      if(regexImage.test(image.value)){
        image.classList.add("success");
        image.classList.remove("error");

        message.textContent="Image valide !";

        message.classList.add("message-success");
        message.classList.remove("message-error");
      }else{
        image.classList.remove("success");
        image.classList.add("error");

        message.textContent="Image invalide !";

        message.classList.remove("message-success");
        message.classList.add("message-error");
      }
      verifierFormulaire()
    }
  });

  // Validation description :
  description.addEventListener("input",function(event){
    let message=document.getElementById("error-message-description")
    if(event.target.tagName==="TEXTAREA"){
      if(regexDescription.test(description.value)){
        description.classList.add("success");
        description.classList.remove("error");

        message.textContent="Description valide !";

        message.classList.add("message-success");
        message.classList.remove("message-error");
      }else{
        description.classList.remove("success");
        description.classList.add("error");

        message.textContent="Description invalide !";

        message.classList.remove("message-success");
        message.classList.add("message-error");
      }
      verifierFormulaire()
    }
  });



  let btn = document.querySelector("#btn");

function verifierFormulaire() {
    if (
        regexId.test(id.value) &&
        regexNom.test(nom.value) &&
        regexStats.test(stat1.value) &&
        regexStats.test(stat2.value) &&
        regexStats.test(stat3.value) &&
        regexImage.test(image.value) &&
        regexDescription.test(description.value)
    ) {
        btn.hidden = false;
    } else {
        btn.hidden = true;
    }
}
function ajouterCreature() {
    if (
        regexId.test(id.value) &&
        regexNom.test(nom.value) &&
        regexStats.test(stat1.value) &&
        regexStats.test(stat2.value) &&
        regexStats.test(stat3.value) &&
        regexImage.test(image.value) &&
        regexDescription.test(description.value)
    ) {
        let nouvelleCreature = {
            id: id.value,
            name: nom.value,
            type: type.value,
            level: level.value,
            stats: {
                hp: Number(stat1.value),
                attack: Number(stat2.value),
                defence: Number(stat3.value)
            },
            image: image.value,
            description: description.value
        };

        creatures.push(nouvelleCreature);

        console.log(creatures);
    }
}
  formulaire.addEventListener("submit",function(event){
    event.preventDefault();
    ajouterCreature();
    afficher(creatures);
    detail();
  })
}
ajouter();

// Validez chaque champ du formulaire avec une expression régulière
// (voir le tableau du brief). Affichez le message d'erreur sous le
// champ, et n'ajoutez jamais une créature invalide.
// -------------------------------------------------------------



// -------------------------------------------------------------
// 6. MON ÉQUIPE
// Boutons « Ajouter à l'équipe » et « Retirer », gérés avec UN SEUL
// écouteur sur la grille et UN SEUL sur l'équipe (délégation).
// -------------------------------------------------------------
let equipe = [];

let section_team = document.querySelector("#team");
let compteur = document.querySelector("#compteur");
let message_regles = document.querySelector("#message-regles");
let emplacements = document.querySelector("#emplacements");

function ajouterEquipe(creature) {

    if (equipe.some(function (element) {
        return element.id === creature.id;
    })) {
        message_regles.textContent = "Cette créature est déjà dans l'équipe.";
        return;
    }

    if (equipe.length >= 6) {
        message_regles.textContent = "L'équipe est complète ! Maximum 6 créatures.";
        return;
    }

    equipe.push(creature);

    afficherEquipe();
}



function afficherEquipe() {

    compteur.textContent = equipe.length + "/6";

    emplacements.innerHTML = "";

    for (let i = 0; i < 6; i++) {

        if (i < equipe.length) {

            let creature = equipe[i];

            emplacements.innerHTML += `
                <div class="flex flex-col items-center gap-1 rounded-xl border border-orange-300 p-2">
                    <img src="${creature.image}"
                         alt="${creature.name}"
                         class="h-12 w-12 object-contain">

                    <span class="text-sm font-bold">${creature.name}</span>
                    <button
                        type="button"
                        data-action="retirer"
                        data-id="${creature.id}"
                        class="btn-outline">
                        Retirer
                    </button>
                </div>
            `;

        } else {

            emplacements.innerHTML += `
                <div class="flex h-20 items-center justify-center rounded-xl border-2 border-dashed border-orange-300">
                    +
                </div>
            `;
        }
    }

    message_regles.textContent =
        "Maximum 6 créatures. Chaque créature ne peut être ajoutée qu'une seule fois.";
}

afficherEquipe();

let bouton_detail = document.querySelector("#detail-add");

bouton_detail.addEventListener("click", function () {

    if (creatureSelectionnee === null) {
        message_regles.textContent = "Sélectionne d'abord une créature.";
        return;
    }

    ajouterEquipe(creatureSelectionnee);
});
// -------------------------------------------------------------
// 7. RÈGLES DE L'ÉQUIPE
// 6 créatures au maximum, pas de doublon, un message clair quand
// une action est refusée, et un compteur (x/6).
// -------------------------------------------------------------


// -------------------------------------------------------------
// BONUS : LocalStorage, Fetch API, tri, comparaison
// -------------------------------------------------------------
