# Mon Dex — dépôt de départ

Sprint 2 — Brief 1. Une page Tailwind **statique** à rendre interactive avec JavaScript, pour l'univers de  Pokémon.

## Installation

Prérequis : [Node.js](https://nodejs.org) (version 18 ou plus).

```bash
npm install
npm run dev
```

`npm run dev` surveille vos fichiers et régénère `dist/output.css` à chaque modification. Ouvrez ensuite `index.html` dans votre navigateur (ou avec l'extension Live Server).

Avant de mettre en ligne sur GitHub Pages :

```bash
npm run build
```

Puis committez `dist/output.css` : GitHub Pages ne lance pas Tailwind pour vous.

## Contenu du dépôt

| Fichier | Rôle |
| --- | --- |
| `index.html` | La page Dex, statique, avec 6 cartes écrites à la main |
| `tailwind.config.js` | Le thème neutre à remplacer par celui de votre univers |
| `src/input.css` | Les directives Tailwind et quelques classes de composants |
| `dist/output.css` | Le CSS généré par Tailwind (ne pas modifier à la main) |
| `data.js` | Le tableau `creatures`, à remplir avec au moins 12 créatures |
| `script.js` | Votre JavaScript, avec la liste des fonctionnalités à coder |
| `design/` | La maquette de la version finale |

## À compléter par vous

- **Univers choisi :** Pokémon
- **Lien GitHub Pages :** https://amina-lakhddar.github.io/Mon_Dex/
- **Sources des images :** https://www.pokebip.com/pokedex
- **Tests des expressions régulières :** 
- Valide : 
    regexId.test("#001") 
    regexNom.test("Amina") 
- Invalide :
    regexId.test("1234")
    regexNom.test("a")
- **Bonus réalisés :** [liste]

