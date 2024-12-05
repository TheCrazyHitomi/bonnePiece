// // Récupération des pièces depuis le fichier JSON
// const reponse = await fetch("pieces-autos.json");
// const pieces = await reponse.json();


// for (let i=0; i < pieces.length; i++){

//  // Récupération de l'élément du DOM qui accueillera les fiches
// const sectionFiche = document.querySelector(".fiches");
//  // Création d’une balise dédiée à une pièce automobile
// const pieceElement = document.createElement("article");


// // Création des balises 
// const article = pieces[i];

// const imageElement = document.createElement("img");
// imageElement.src = article.image;

// const nomElement = document.createElement("h2");
// nomElement.innerText = article.nom;

// const prixElement = document.createElement("p");
// prixElement.innerText = `Prix ; ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;

// const categorieElement = document.createElement("p");
// categorieElement.innerText = article.categorie ?? "(aucune catégorie)";

// const descriptionElement = document.createElement("p");
// descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)";

// const stockElement = document.createElement("p");
// stockElement.innerText = (article.disponibilite === true ? "En stock" : "Rupture de stock");

// // On rattache la balise article a la section Fiches
// sectionFiche.appendChild(pieceElement);
// // On rattache les éléments à pieceElement (la balise article)
// pieceElement.appendChild(imageElement);
// pieceElement.appendChild(nomElement);
// pieceElement.appendChild(prixElement);
// pieceElement.appendChild(categorieElement);
// pieceElement.appendChild(descriptionElement);
// pieceElement.appendChild(stockElement)
// }

// // *******************************
// // *    gestion des bouttons     * 
// // *******************************

// const boutonTrier = document.querySelector(".btn-trier");

// boutonTrier.addEventListener("click", function(){
//     const  piecesOrdonnees = Array.from(pieces);

//     piecesOrdonnees.sort( function(a,b){
//         return a.prix - b.prix;
//     });
//     console.log([piecesOrdonnees]);
// });

// const boutonFiltrer = document.querySelector(".btn-filtrer");

// boutonFiltrer.addEventListener("click", function(){
//     const piecesFiltrees = pieces.filter( function(piece){
//         return piece.prix <= 35;
//     });
//     console.log(piecesFiltrees)
// }); 

// const boutonDecroissant = document.querySelector(".btn-decroissant");

// boutonDecroissant.addEventListener("click", function(){
//     const piecesOrdonnees = Array.from(pieces);

//     piecesOrdonnees.sort( function(a,b){
//         return b.prix - a.prix;
//     });
//     console.log([piecesOrdonnees]);
// });

// const boutonNoDescription = document.querySelector(".btn-nodes");

// boutonNoDescription.addEventListener("click", function(){
//     const piecesFiltrees = pieces.filter(function(piece){
//         return piece.description
//     });
//     console.log(piecesFiltrees);
// });   



// // *******************************
// // *   filtre piece abordables   * 
// // *******************************

// const noms = pieces.map(piece => piece.nom);

// for (let i = pieces.length-1; i >=0; i--){
//     if (pieces[i].prix >35){
//         noms.splice(i,1)
//     }
// }
// console.log(noms)

// // creation de la liste
// const abordableElements = document.createElement("ul");

// // ajout de chaque nom a la liste
// for (let i=0; i < noms.length; i++){
//     const nomElement= document.createElement("li");
//     nomElement.innerText = noms[i];
//     abordableElements.appendChild(nomElement)
// }

// // ajout de l'en-tete puis de la liste au bloc resultat filtres
// document.querySelector(".abordables")
//     .appendChild(abordableElements)


// // ************************************
// // *    filtre pieces disponibles     * 
// // ************************************

// const noms2 = pieces.map(piece => piece.nom);
// const prix = pieces.map(piece => piece.prix);

//     for (let i = pieces.length-1; i >= 0 ; i--){
//         if (pieces[i].disponibilite !== true){
//             noms2.splice(i,1)
//             prix.splice(i,1)
//         }
//     }
//     console.log(noms2,prix)
    
//     // creation de la liste
//     const disponibleElements = document.createElement("ul");
    
//     // ajout de chaque nom a la liste
//     for (let i=0; i < noms2.length; i++){
//         const nomElement= document.createElement("li");
//         nomElement.innerText = `${noms2[i]} - ${prix[i]}€` ;
//         disponibleElements.appendChild(nomElement)
//     }
    
//     // ajout de l'en-tete puis de la liste au bloc resultat filtres
//     document.querySelector(".disponible")
//         .appendChild(disponibleElements)



// ***********************************************
// *                  PARTIE 2                   * 
// *          RENDRE LE SITE INTERACTIF          *
// ***********************************************

// Récupération des pieces depuis le fichier JSON
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json())

// Fonction qui génère toute la page web

function genererPieces(pieces) {
    for (let i=0; i < pieces.length; i++){

         // Récupération de l'élément du DOM qui accueillera les fiches
        const sectionFiche = document.querySelector(".fiches");

        //  Création des balises 
        const article = pieces[i];
        // Création d'une balise dédiée à une pièce auto
        const pieceElement = document.createElement("article");
        // On cré l'´ėlément image
        const imageElement = document.createElement("img");
        // On accède à l'indice "i" de la liste pieces pour configurer la source de l'image
        imageElement.src = article.image;
        // idem pour le nom
        const nomElement = document.createElement("h2");
        nomElement.innerText = article.nom;
        // idem pour le prix
        const prixElement = document.createElement("p");
        prixElement.innerText = `Prix ; ${article.prix} € (${article.prix < 35 ? "€" : "€€€"})`;
        // idem pour la catégorie
        const categorieElement = document.createElement("p");
        categorieElement.innerText = article.categorie ?? "(aucune catégorie)";
        // idem pour la description
        const descriptionElement = document.createElement("p");
        descriptionElement.innerText = article.description ?? "(Pas de description pour le moment.)";
        // idem pour la disponibilité 
        const stockElement = document.createElement("p");
        stockElement.innerText = (article.disponibilite === true ? "En stock" : "Rupture de stock");

        // On rattache les éléments à pieceElement (la balise article)
        pieceElement.appendChild(imageElement);
        pieceElement.appendChild(nomElement);
        pieceElement.appendChild(prixElement);
        pieceElement.appendChild(categorieElement);
        pieceElement.appendChild(descriptionElement);
        pieceElement.appendChild(stockElement)

        // On rattache la balise article a la section Fiches
        sectionFiche.appendChild(pieceElement);
    }
}

// premier affichage de la page
genererPieces(pieces);

// Ajout du listener pour trier les peces par ordre de prix croissant

const boutonTrier = document.querySelector(".btn-trier");

boutonTrier.addEventListener("click", function(){
    const  piecesOrdonnees = Array.from(pieces);

    piecesOrdonnees.sort( function(a,b){
        return a.prix - b.prix;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesOrdonnees);
});

// Ajour du listener pour filtrer les pieces non abordables

const boutonFiltrer = document.querySelector(".btn-filtrer");

boutonFiltrer.addEventListener("click", function(){
    const  piecesFiltrees = pieces.filter(function(piece){
            return piece.disponibilite;
    });
    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML="";
    genererPieces(piecesFiltrees);
});

// Ajour listener pour filtrer les articles en fonction de la valeur maximale sélectionnée avec l'imput range

const rangePrix = document.querySelector("#prix-max");
    rangePrix.addEventListener("input",function(){
        const prixMaxFiltre = pieces.filter(function(piece){
            return piece.prix <= rangePrix.value;
        });

    // Effacement de l'écran et regénération de la page
    document.querySelector(".fiches").innerHTML="";
    genererPieces(prixMaxFiltre);
});
