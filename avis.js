export function ajoutListenerAvis(){
    const piecesElements = document.querySelectorAll(".fiches article button");

    for (let i = 0; i< piecesElements.length; i++){

        piecesElements[i].addEventListener("click", async function(event){

            const id = event.target.dataset.id;
            const reponse = await fetch("http://localhost:8081/pieces/"+ id + "/avis");
            const avis = await reponse.json();
                window.localStorage.setItem(`avis-piece-${id}`, JSON.stringify(avis))
            const pieceElement = event.target.parentElement;
            if (pieceElement && avis){                
                ajouterAvis(pieceElement,avis)
            }
        });
    }
}

export function ajouterAvis(pieceElement,avis){

        const avisElement = document.createElement("p");
            for (let i=0; i < avis.length; i++){
                avisElement.innerHTML += `${avis[i].utilisateur}: <br> ${avis[i].nbEtoile} <br> ${avis[i].commentaire} <br>`;
            }
            pieceElement.appendChild(avisElement);
    }


export function ajoutListenerEnvoyerAvis(){
    const formulaireAvis = document.querySelector(".formulaire-avis")
    formulaireAvis.addEventListener("submit", function(event){
        event.preventDefault()

        // creation de l'objet du nouvel avis
        const avis = {
            pieceId: parseInt(event.target.querySelector("[name=piece-id]").value),
            nbEtoile: parseInt(event.target.querySelector("[name=nb-etoile]").value),
            utilisateur: event.target.querySelector("[name=utilisateur]").value,
            commentaire: event.target.querySelector("[name=commentaire]").value,
        }

        // creation de la charge utile au format JSON
        const chargeUtile = JSON.stringify(avis);

        fetch("http://localhost:8081/avis", {
            method: "POST",
            headers: { "content-type": "application/json"},
            body: chargeUtile
        })
        })
    }


// *** fonction pour les graphiques *** 

export async function afficherGraphiqueAvis(){


// *** graphique n°1 ***

    // Calcul du nombre total de commentaires par quantité d'étoiles attribuées
    const avis = await fetch("http://localhost:8081/avis").then(avis => avis.json());
    const nb_avis = [0, 0, 0, 0, 0];
    
    for (let commentaire of avis) {
        nb_avis[commentaire.nbEtoiles - 1]++;
    }

    // Légende qui s'affichera sur la gauche à côté de la barre horizontale
    const labels = ["5", "4", "3", "2", "1"];
    // Données et personnalisation du graphique
    const data = {
        labels: labels,
        datasets: [{
        label: "Étoiles attribuées",
        data: nb_avis.reverse(),
        backgroundColor: [
            'rgba(153, 102, 255, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
            'rgb(153, 102, 255)',
            'rgb(54, 162, 235)',
            'rgb(75, 192, 192)',
            'rgb(255, 205, 86)',
            'rgb(255, 159, 64)',
        ],
        borderWidth: 1
        }],
    };
    // Objet de configuration final
    const config = {
        type: "bar",
        data: data,
        options: {
        indexAxis: "y",
        },
    };

        // Rendu du graphique dans l'élément canvas
    new Chart(
        document.querySelector("#graphique-avis"),
        config,
    );


    // *** graphique n°2 ***

    const pieces = await fetch("http://localhost:8081/pieces").then(pieces => pieces.json());
        console.log(pieces)
    const pieceDispoId = pieces
        .filter(pieces=> pieces.disponibilite)
        .map(piecesDispo => piecesDispo.id);

    const pieceNonDispoId = pieces
        .filter(pieces=> !pieces.disponibilite)
        .map(piecesNonDispo => piecesNonDispo.id);
    
    console.log(pieceDispoId)

    let nbComDispo = 0;
    let nbComNoDispo = 0;

    for (let i=0; i< avis.length; i++){
        for(let j=0; j < pieceDispoId.length; j++){
            if (pieceDispoId[j] === avis[i].pieceId){
                nbComDispo++
            }
        }
        for(let j=0; j < pieceNonDispoId.length; j++){
            if (pieceNonDispoId[j] === avis[i].pieceId){
                nbComNoDispo++
            }
        }
    }
    console.log(nbComDispo, nbComNoDispo)


// ********************************************************
// ***     Solution de l'éxercice de OpenClassrooms     ***
// ********************************************************

// // Récupération des pièces depuis le localStorage
// const piecesJSON = window.localStorage.getItem("pieces");
// //const pieces = piecesJSON ? JSON.parse(piecesJSON) : [];
// const pieces = JSON.parse(piecesJSON)
// // Calcul du nombre de commentaires
// let nbCommentairesDispo = 0;
// let nbCommentairesNonDispo = 0;
// //if(pieces.length > 0){
// for (let i = 0; i < avis.length; i++) {
//     const piece = pieces.find(p => p.id === avis[i].pieceId);

//     if (piece) {
//         if (piece.disponibilite) {
//             nbCommentairesDispo++;
//         } else {
//             nbCommentairesNonDispo++;
//         }
//     }
// }

        // Légende qui s'affichera sur la gauche à côté de la barre horizontale
        const labelsComs = ["pièces Disponibles", "pièces non disponibles"];
        // Données et personnalisation du graphique
        const data2 = {
            labels: labelsComs,
            datasets: [{
            label: "Nombre de commentaires",
            data: [nbComDispo, nbComNoDispo],
            backgroundColor: [
                'rgba(153, 102, 255, 0.2)',
                'rgba(54, 162, 235, 0.2)'
            ],
            borderColor: [
                'rgb(153, 102, 255)',
                'rgb(54, 162, 235)'
            ],
            borderWidth: 1
            }],
        };
        // Objet de configuration final
        const config2 = {
            type: "bar",
            data: data2,
            options: {
            indexAxis: "x",
            },
        };
    
            // Rendu du graphique dans l'élément canvas
        new Chart(
            document.querySelector("#graphique-com"),
            config2,
        );
    
}

