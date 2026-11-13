# Mon Dex

Un Pokédex interactif réalisé en HTML, Tailwind CSS et JavaScript (modules ES). Les créatures sont chargées depuis une API publique, on peut les rechercher, les filtrer par type, voir leur détail, en créer de nouvelles avec un formulaire validé, composer une équipe de 6 et gérer des favoris.

> Projet de fans réalisé dans le cadre d'une formation. Images : https://www.pokebip.com/pokedex

---

## Fonctionnalités

- **Liste paginée** : 20 créatures par page, boutons « Précédent » et « Charger plus + ».
- **Détail** : un clic sur une carte ouvre un panneau avec l'image, le type, les statistiques (barres), la taille, le poids et les capacités.
- **Recherche par nom** avec bouton « Effacer ».
- **Filtre par type** (Feu, Eau, Plante…) et filtre « Favoris ». Le bouton « Tous » réinitialise le filtre.
- **Création d'une créature** : chaque champ est validé par une expression régulière, le message d'erreur s'affiche sous le champ et aucune créature invalide n'est ajoutée.
- **Mon équipe** : 6 créatures maximum, pas de doublon, messages clairs quand une action est refusée, compteur `x/6`.
- **Favoris** : bouton étoile ★/☆ sur chaque carte, sauvegardés dans le `LocalStorage` (toujours là après rechargement).
- **Dernière recherche** : sauvegardée dans le `SessionStorage` et remise dans le champ au rechargement (elle disparaît à la fermeture de l'onglet).

### Les 4 états d'une requête

| État | Quand | Ce que l'écran montre |
|---|---|---|
| Chargement | La requête est en cours | Cartes grises animées, boutons de pagination désactivés |
| Succès | Les données sont arrivées | Les cartes ou le détail |
| Vide | La recherche ne trouve rien (erreur 404) | « Aucune créature trouvée pour … » |
| Erreur | Pas d'Internet, serveur en panne | Message clair et bouton « Réessayer » |

Ces états sont gérés pour la liste, la recherche et le détail.
Pour tester l'état d'erreur : DevTools › onglet Réseau › « Hors connexion », puis cliquer sur « Charger plus ».

---

## API utilisée

**[PokéAPI](https://pokeapi.co/)** : API REST gratuite, sans clé, en lecture seule.

| Usage | Requête |
|---|---|
| Liste d'une page | `GET https://pokeapi.co/api/v2/pokemon?limit=20&offset=0` |
| Données d'une créature (liste) | `GET` sur l'`url` renvoyée pour chaque élément de la liste |
| Recherche par nom | `GET https://pokeapi.co/api/v2/pokemon/{nom}` |
| Détail | `GET https://pokeapi.co/api/v2/pokemon/{id}` |

Les réponses brutes sont transformées par `transformObj()` en un objet simple :

```js
{
  id: "#025",
  name: "pikachu",
  type: "electric",            // plusieurs types : "grass / poison"
  level: "Base",
  stats: { hp: 35, attack: 55, defence: 40 },
  image: "https://…/25.png"
}
```

Le détail ajoute `height` (m), `weight` (kg) et `abilities` (tableau).

### Gestion des erreurs réseau

- Le premier `.then()` de chaque `fetch()` vérifie `response.ok` et fait `throw new Error(...)` sinon, car `fetch` ne passe pas dans `.catch()` pour une erreur 404 ou 500.
- Chaque chaîne se termine par un `.catch()` (ou un `try/catch` avec `await`) qui affiche le message d'erreur et le bouton « Réessayer ».
- Pour la recherche, un 404 est traité comme l'état « vide » (la fonction renvoie `null`), pas comme une erreur.

---

## Structure du projet

```
mon-dex/
├── index.html
├── package.json
├── dist/
│   └── output.css        # CSS généré par Tailwind (ne pas modifier à la main)
└── src/
    ├── input.css         # Styles source (Tailwind + classes perso)
    ├── main.js           # Point d'entrée
    ├── ui.js             # Affichage et interactions
    └── services/
        └── api.js        # Appels à l'API
```

### Rôle de chaque fichier

| Fichier | Rôle |
|---|---|
| `index.html` | Structure de la page : en-tête, recherche, filtres par type, grille des créatures, panneau de détail, équipe, formulaire de création. Charge `dist/output.css` et `src/main.js` (`type="module"`). |
| `src/input.css` | Fichier source de Tailwind : directives Tailwind et classes personnalisées (`.chip`, `.btn-primary`, `.btn-outline`, `.field`, `.success`, `.error`, `.message-success`, `.message-error`, `.img_card`…). |
| `dist/output.css` | CSS final généré par la commande Tailwind à partir de `input.css` et des classes utilisées dans le HTML et le JS. |
| `src/main.js` | Point d'entrée. Lance l'application et branche les boutons « Charger plus » et « Précédent » (modification de l'offset puis rechargement de la liste). |
| `src/ui.js` | Tout ce qui touche à l'écran : affichage des cartes, panneau de détail, recherche, filtres, formulaire et validations, équipe et ses règles, favoris, états chargement / vide / erreur. Utilise la délégation d'événements (un seul écouteur sur la grille, un sur le détail, un sur l'équipe). |
| `src/services/api.js` | Tout ce qui touche à l'API : `getData()` (liste d'une page), `rechercherPokemon(nom)`, `getPokemonDetail(id)`, `transformObj()`, ainsi que la pagination (`limit`, `offset`, `incrementerOffset()`, `decrementerOffset()`). |

> Si votre fichier d'affichage s'appelle encore `script.js`, adaptez l'import dans `main.js` (`import … from "./script.js"`) ou renommez-le en `ui.js`.

---

## Lancer le projet

### Prérequis

- [Node.js](https://nodejs.org/) (pour Tailwind CSS)
- Une connexion Internet (pour l'API et les images)

### 1. Installer les dépendances

```bash
npm install
```

### 2. Générer le CSS Tailwind

Dans un premier terminal, laissez tourner la commande de build en mode surveillance. Elle regénère `dist/output.css` à chaque modification :

```bash
npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch
```

(Avec Tailwind v4, la commande est `npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch`. Si votre `package.json` contient un script, vous pouvez aussi utiliser `npm run dev` ou `npm run build`.)

### 3. Ouvrir la page avec un serveur local

Le projet utilise des modules ES (`<script type="module">`) : **ouvrir `index.html` directement par double-clic (`file://`) ne fonctionne pas**. Il faut un petit serveur local, au choix :

- **VS Code** : extension *Live Server*, puis clic droit sur `index.html` › « Open with Live Server ».
- **Node** : `npx serve .`
- **Python** : `python -m http.server 8000`, puis ouvrir http://localhost:8000

---

## Règles de validation du formulaire

| Champ | Règle |
|---|---|
| Numéro | `#` suivi de 3 chiffres (ex. `#010`), unique |
| Nom | 2 à 30 caractères : lettres, chiffres, espace, `.`, `'`, `-` |
| Type | Obligatoire (liste déroulante) |
| Niveau | Libre, « Base » par défaut |
| Statistiques 1 à 3 | Entier de 1 à 3 chiffres (0 à 999) |
| Lien de l'image | URL en `https://` finissant par `.png`, `.jpg`, `.jpeg`, `.webp` ou `.gif` |
| Description | 10 à 200 caractères |

Le bouton « Ajouter la créature » n'apparaît que lorsque tous les champs sont valides. Les créatures créées vivent en mémoire : elles disparaissent au rechargement de la page.

---

## Technologies

- HTML5, JavaScript (modules ES, `fetch`, `async/await`)
- [Tailwind CSS](https://tailwindcss.com/)
- [PokéAPI](https://pokeapi.co/)
- `LocalStorage` (favoris) et `SessionStorage` (dernière recherche)
