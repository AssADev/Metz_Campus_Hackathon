// Stockage de liens et variables
let links_var = {
    links : {
        contact : "http://www.polesup.fr/contact.html",
    },
    commands : {
        prefix : "!",
    },
}

// Stockage des mots-clefs
let keywords = {
    greetings : [
        "bonjour",
        "est-ce qu'il y a quelqu'un",
    ],
    help : [
        "aide",
        "aider",
        "assistance",
    ],
    contact : [
        "prendre contact",
        "contacter",
        "contact",
    ],
    localisation : [
        "se situe",
        "est situé",
    ],
    formation : [
        "formations",
        "formation",
        "forme",
        "diplôme",
        "diplome",
    ],
    goodbye : [
        "au revoir",
        "++",
        "a+",
    ],
}

// Stockage des réponses
let rep = {
    cmd_undef : [
        "La commande n'a pas été trouvée. Vous pouvez faire !aide pour avoir une liste des commandes.",
    ],
    msg_undef : [
        `Votre demande n'a pas pu aboutir, nous vous proposons de prendre contact directement en cliquant <a href="${links_var.links.contact}" target="_blank">ici</a>.`,
    ],
    greetings : [
        "Bonjour, merci de visiter notre site ! Comment puis-je vous aider ? Tapez !help pour voir la liste des commandes.",
    ],
    help : [
        "Les commandes disponibles sont : bonjour, contact, formation, diplôme, help, aide.",
    ],
    contact : [
        `Pour prendre contact, vous pouvez vous rendrez sur la page de contact en cliquant <a href="${links_var.links.contact}" target="_blank">ici</a>.`,
    ],
    formation : [
        "Les formations et les diplômes sont présentés sur ce site. Vous les découvrirez en y continuant votre visite.",
    ],
    goodbye : [
        "Merci d'avoir visité notre site !",
        "À une prochaine fois !",
        "À très bientôt !",
        "Au revoir !",
    ],
}

// Stockage de commandes - réponses
let commands = {
    greetings : [
        "bonjour",
    ],
    contact : [
        "contact",
        "contacter",
    ],
    formation : [
        "formations",
        "formation",
        "diplôme",
        "diplome",
    ],
    help : [
        "help",
        "aide",
    ],
}

// Fonction qui analise le message et renvoie la réponse la plus adaptée
function analyze(message) {
    // Passage en texte et en minuscule pour simplifier le traitement.
    message = message.toString().toLowerCase();

    // Suppression des espaces devant le message (s'il y en a)
    while (message.startsWith(" ")) {
        message = message.substring(1);
    }

    // Si le message commence par le préfix = est une commande
    if (message.startsWith(links_var.commands.prefix)) {
        // On enlève le préfix
        message = message.substring(1);
        // On récupère la commande
        let cmd = message.split(" ")[0];
        // clef temporaire, si la commande n'est pas trouvée elle n'est pas remplacée
        let lkey = "cmd_undef";
        // Pour chaque type de commande disponible
        for (key in commands) {
            // Si la commande entrée fait partie des syntaxes d'un des types de commandes
            if (commands[key].includes(cmd)) {
                // La clef prend la valeur en conséquence
                lkey = key;
            }
        }
        // On renvoie une réponse aléatoire issue des réponses adaptées à la clef temporaire
        return rep[lkey][Math.floor(Math.random() * rep[lkey].length)];
    
    // Si le message ne commence pas par le préfix = pas une commande
    } else {
        // clef temporaire, si aucun mot clef n'est trouvé elle n'est pas remplacée
        let lkey = "msg_undef";

        // Pour chaque type de commande disponible
        for (key in keywords) {

            // Pour chaque mot clef disponible dans ce type de commande
            keywords[key].forEach(keyword => {
                // Si le message contient ce mot clef
                if (message.includes(keyword)) {
                    // La clef prend la valeur en conséquence
                    lkey = key;
                }
            })
        };
        // On renvoie une réponse aléatoire issue des réponses adaptées à la clef temporaire
        return rep[lkey][Math.floor(Math.random() * rep[lkey].length)];
    }
}

// Fonction pour publier la réponse en fonction du message
function answer(message) {
    // On récupère la chatbox
    let chatbox_msg = document.querySelector(".chatbox_msg");
    // On créer un élément p de réponse
    let ht_answer = document.createElement("p");
    // On utilise notre fonction pour recevoir la réponse adaptée
    let text = analyze(message);
    // On insère la réponse dans l'élément p
    ht_answer.innerHTML = text;
    // On attribue à l'élément p la classe "answer"
    ht_answer.className = "answer";
    // On ajoute l'élément p à l'intérieur de la chatbox
    chatbox_msg.appendChild(ht_answer);
    // On scroll en bas du div
    var objDiv = document.querySelector(".chatbox_msg");
    objDiv.scrollTop = objDiv.scrollHeight;
}

// Fonction quand un utilisateur envoie le message
function onPublish() {
    // On récupère la chatbox
    let chatbox_msg = document.querySelector(".chatbox_msg");
    // On récupère l'élément input où le message se situe
    let chatbox_input = document.getElementById("chatbox_input");
    if (!/\S/.test(chatbox_input.value.toString())) {
        chatbox_input.value = ""
        return;
    }
    // On crée un élément p de question
    let ht_question = document.createElement("p");
    // On insère le message dans l'élément p
    ht_question.innerHTML = chatbox_input.value;
    // On attribue à l'élément p la classe "question"
    ht_question.className = "question";
    // On ajoute l'élément p à l'intérieur de la chatbox
    chatbox_msg.appendChild(ht_question);
    // On appelle notre fonction pour la suite...
    answer(chatbox_input.value);
    // On reset l'élément input
    chatbox_input.value = "";
}

// On prend le bouton pour l'envoi
sender = document.querySelector(".send");
// On listen pour les events click
sender.addEventListener("click", onPublish);
// On listen pour les events keyup sur l'élément input où le message se situe
document.getElementById("chatbox_input").addEventListener("keyup", event => {
    // Si la touche est la touche Entrée
    if (event.keyCode === 13) {
        // Désactive les exécutions par défaut
        event.preventDefault();
        // Agit comme si le bouton pour l'envoi était pressé (envoi du message)
        sender.click();
    }
});