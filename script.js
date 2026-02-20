const terminaisons = {
   indicatif : {
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
   },
   subjonctif: {
        present: {
            are: ["i","i","i","iamo","iate","ino"],
            ere: ["a","a","a","iamo","iate","ano"],
            ire: ["a","a","a","iamo","iate","ano"]
        }, 
        imparfait: {
            are: ["assi","assi","asse","assimo","aste","assero"],
            ere: ["essi","essi","esse","essimo","este","essero"],
            ire: ["issi","issi","isse","issimo","iste","issero"]
        },
         passeCompose: {
            are: ["ato"],
            ere: ["uto"],
            ire: ["ito"]
    }
   },
   conditionnel: {
        present: {
            are: ["erei","eresti","erebbe","eremmo","ereste","erebbero"],
            ere: ["erei","eresti","erebbe","eremmo","ereste",'erebbero'],
            ire: ["irei","iresti","irebbe","iremmo","ireste","irebbero"]
        },
     passeCompose: {
        are: ["ato"],
        ere: ["uto"],
        ire: ["ito"]
    }
   },
   imperatif: {
    present: {
        are: ["a","i","iamo","ate","ino"],
        ere: ["i","a","iamo","ete","ano"],
        ire: ["i","a","iamo","ite","ano"]
    }
   },
   gerondif: {
    are: ["ando"],
    ere: ["endo"],
    ire: ["endo"]
   }
};
let bonneReponse = "";

const personnes = ["io","tu","lui","noi","voi","loro"];

function getRadical(verbe, groupe, tense, mode) {

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
    const mode = document.getElementById("mode").value;

    if (!verbe.endsWith(groupe)) {
        document.getElementById("resultat").innerText =
            "Le groupe ne correspond pas au verbe.";
        return;
    }

    const radical = getRadical(verbe, groupe, tense);
    const index = personnes.indexOf(pronom);

    let terminaison;

    if (tense === "futur") {
        terminaison = terminaisons[mode][tense].all[index];
    } else {
        terminaison = terminaisons[mode][tense][groupe][index];
    }
const resultat = pronom + " " + radical + terminaison;

bonneReponse = resultat; // on stocke

document.getElementById("resultat").innerText = resultat;
}
document.getElementById("action").addEventListener("click", function() {

    const answerInput = document.getElementById("answer");
    const answer = answerInput.value.trim().toLowerCase();

    if (!bonneReponse) {
        conjuguer();
        this.innerText = "Vérifier";
        return;
    }

    if (
        answer.replace(/\s+/g, " ") === 
        bonneReponse.toLowerCase().replace(/\s+/g, " ")
    ) {
        alert("Correct !");
    } else {
        alert("Non 😈 La bonne réponse était : " + bonneReponse);
    }

    bonneReponse = "";
    answerInput.value = "";
    this.innerText = "Générer";
});
