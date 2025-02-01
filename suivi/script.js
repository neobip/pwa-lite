document.addEventListener("DOMContentLoaded", () => {
    chargerFormulaire();
    chargerTableau();
});

function chargerFormulaire() {
    fetch("form.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("formulaire").innerHTML = html;
            chargerDonnees();
            afficherFormulaire();
        });
}

function chargerTableau() {
    fetch("table.html")
        .then(response => response.text())
        .then(html => {
            document.getElementById("tableau").innerHTML = html;
        });
}

function enregistrerInfos() {
    const dateNaissance = document.getElementById("dateNaissance").value;
    const taille = parseInt(document.getElementById("taille").value);
    if (!dateNaissance || !taille) {
        return alert("Veuillez remplir tous les champs.");
    }
    localStorage.setItem("dateNaissance", dateNaissance);
    localStorage.setItem("taille", taille);
    document.getElementById("initialSetup").style.display = "none";
    document.getElementById("dataInput").style.display = "block";
}

// Ajoutez ici les fonctions comme ajouterDonnee(), calculerIMC(), etc.

function clearSiteData() {
    // localStorage.clear();
    caches.keys().then(function(names) {
        names.forEach(function(name) {
            caches.delete(name);
        });
    });
    alert("Les données et le cache ont été réinitialisés.");
    window.location.reload();
}
