import { getData, creatures } from "./services/api.js";
import { afficher } from "./ui.js";

getData().then(() => {
    afficher(creatures)
})
