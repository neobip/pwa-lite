// Fonction pour calculer l'IMC (Indice de Masse Corporelle)
function calculerIMC(poids, taille) {
    const tailleM = taille / 100; // Conversion de la taille en mètres
    return (poids / (tailleM * tailleM)).toFixed(2);
}

// Fonction pour calculer le ratio muscle / graisse
function calculerRatioMuscleGraisse(masseMusculaire, masseGrasse) {
    return (masseMusculaire / masseGrasse).toFixed(2);
}

// Fonction pour calculer le métabolisme de base (MB) en fonction du sexe, du poids, de la taille et de l'âge
function calculerMB(sexe, poids, taille, age) {
    if (sexe === "Homme") {
        return (66 + (13.75 * poids) + (5 * taille) - (6.75 * age)).toFixed(2);
    } else {
        return (655 + (9.56 * poids) + (1.85 * taille) - (4.68 * age)).toFixed(2);
    }
}

// Fonction pour calculer la dépense calorique journalière (TDEE) en fonction du niveau d'activité
function calculerTDEE(mb, niveauActivite) {
    return (mb * niveauActivite).toFixed(2);
}

// Fonction pour calculer l'âge métabolique
function calculerAgeMetabolique(mb) {
    if (mb >= 1800) {
        return "Jeune";
    } else if (mb >= 1500) {
        return "Moyenne";
    } else {
        return "Plus vieux";
    }
}

// Fonction pour ajouter une nouvelle donnée dans le tableau
function ajouterDonnee() {
    const date = document.getElementById("date").value;
    const poids = parseFloat(document.getElementById("poids").value);
    const masseGrasse = parseFloat(document.getElementById("masseGrasse").value);
    const masseMusculaire = parseFloat(document.getElementById("masseMusculaire").value);
    const masseOs = parseFloat(document.getElementById("masseOs").value);
    const tbw = parseFloat(document.getElementById("tbw").value);
    const taille = parseFloat(localStorage.getItem("taille"));
    const dateNaissance = new Date(localStorage.getItem("dateNaissance"));
    const age = new Date().getFullYear() - dateNaissance.getFullYear();
    const sexe = "Homme"; // A adapter si vous souhaitez intégrer le sexe de l'utilisateur

    if (!date || !poids || !masseGrasse || !masseMusculaire || !masseOs || !tbw) {
        return alert("Veuillez remplir tous les champs.");
    }

    const imc = calculerIMC(poids, taille);
    const ratioMuscleGraisse = calculerRatioMuscleGraisse(masseMusculaire, masseGrasse);
    const mb = calculerMB(sexe, poids, taille, age);
    const tdee = calculerTDEE(mb, parseFloat(document.getElementById("niveauActivite").value));
    const ageMetabolique = calculerAgeMetabolique(mb);

    // Stocker dans le localStorage
    let historique = JSON.parse(localStorage.getItem("historique")) || [];
    historique.push({
        date,
        poids,
        masseGrasse,
        masseMusculaire,
        masseOs,
        tbw,
        imc,
        ratioMuscleGraisse,
        mb,
        tdee,
        ageMetabolique
    });
    localStorage.setItem("historique", JSON.stringify(historique));

    afficherTableau(historique);
}

// Fonction pour afficher les données dans le tableau
function afficherTableau(historique) {
    const historiqueElement = document.getElementById("historique");
    historiqueElement.innerHTML = ''; // Réinitialiser le tableau

    historique.forEach(item => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.date}</td>
            <td>${item.poids}</td>
            <td>${item.masseGrasse}</td>
            <td>${item.masseMusculaire}</td>
            <td>${item.masseOs}</td>
            <td>${item.tbw}</td>
            <td>${item.imc}</td>
            <td>${item.ratioMuscleGraisse}</td>
            <td>${item.mb}</td>
            <td>${item.tdee}</td>
            <td>${item.ageMetabolique}</td>
            <td>${calculerCaloriesAConsommer(item.tdee)}</td>
        `;
        historiqueElement.appendChild(row);
    });
}

// Fonction pour estimer les calories à consommer pour sécher ou prendre du muscle
function calculerCaloriesAConsommer(tdee) {
    const objectif = "sécher"; // Changer selon l'objectif de l'utilisateur
    if (objectif === "sécher") {
        return (tdee - 500).toFixed(2); // Déficit calorique pour sécher
    } else if (objectif === "prendre muscle") {
        return (tdee + 500).toFixed(2); // Excédent calorique pour prendre du muscle
    }
    return tdee;
}
