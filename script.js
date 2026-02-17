const terminaisons = {
    present: {
        are: ["o","i","a","iamo","ate","ano"],
        ere: ["o","i","e","iamo","ete","ono"],
        ire: ["o","i","e","iamo","ite","ono"]
    },
    imparfait: {
        are: ["avo","avi","ava","avamo","avate","avano"],
        ere: ["evo","evi","eva","evamo","evate","evano"],
        ire: ["ivo","ivi","iva","ivamo","ivate","ivano"]
    },
    futur: {
        all: ["ò","ai","à","emo","ete","anno"]
    },
    passeCompose: {
        are: ["ato"],
        ere: ["uto"],
        ire: ["ito"]
    }
};

const personnes = ["io","tu","lui","noi","voi","loro"];

function getRadical(verbe, groupe, tense) {

    if (tense === "futur") {
        if (groupe === "are") {
            return verbe.slice(0, -3) + "er";
        }
        return verbe.slice(0, -1);
    }

    return verbe.slice(0, -3);
}

function conjuguer() {

    const verbe = document.getElementById("verbe").value.trim().toLowerCase();
    const tense = document.getElementById("tense").value;
    const groupe = document.getElementById("groupe").value;
    const pronom = document.getElementById("pronom").value;

    if (!verbe.endsWith(groupe)) {
        document.getElementById("resultat").innerText =
            "Le groupe ne correspond pas au verbe.";
        return;
    }

    const radical = getRadical(verbe, groupe, tense);
    const index = personnes.indexOf(pronom);

    let terminaison;

    if (tense === "futur") {
        terminaison = terminaisons.futur.all[index];
    } else {
        terminaison = terminaisons[tense][groupe][index];
    }

    const resultat = pronom + " " + radical + terminaison;

    document.getElementById("resultat").innerText = resultat;
}

document.getElementById("valider").addEventListener("click", conjuguer);
