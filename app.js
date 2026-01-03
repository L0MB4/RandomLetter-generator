console.log("SYSTEM INITIALIZED. CHECKED");
//setto il check di sessione
localStorage.setItem("checkbox01", "unchecked");
console.log(localStorage.getItem("checkbox01"));

//flag di sessione "FirstLogin"
localStorage.setItem("firstLogin", true);

//assets
const button = document.getElementById("generate");
const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "i",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "z",
];

let containerHistoryLetter = document.getElementById("container-lettere");

//GESTIONE PLACEHOLDER
let letterBox = document.getElementById("letter-generator");
const placeholder = document.getElementById("placeholder");

//lettere straniere
const foreignLetters = ["h", "j", "k", "w", "x", "y"];
let checkboxForeignLetters = document.getElementById("t1");
let counter = document.getElementById("counter");

//BOTTONE GENERA
button.addEventListener("click", () => {
  console.log("ROOT clicked button 'generate' ");

  //CAMBIO SESSIONE DI LAVORO
  localStorage.setItem("firstLogin", false); //setting to false, not already first-login.
  checkLogin();

  let letter = chooseAndRemoveLetter().toUpperCase();
  //gestione history-letter
  gestioneContainer(letter);
  document.getElementById("letter-history").style.display = "block";

  //animation

  const interval = setInterval(() => {
    letterBox.textContent =
      letters[Math.floor(Math.random() * letters.length)].toUpperCase();
  }, 40);

  setTimeout(() => {
    clearInterval(interval);
    letterBox.textContent = letter;
  }, 1200);
});

checkboxForeignLetters.addEventListener("click", () => {
  console.log("CHECKBOX CLICKED.");
  //controllo se è già stato cliccato
  const status = localStorage.getItem("checkbox01");
  if (status !== "checked") localStorage.setItem("checkbox01", "checked");
  else localStorage.setItem("checkbox01", "unchecked");
  console.log(localStorage.getItem("checkbox01"));

  //AGGIUNGO LETTERE STRANIERE
  if (localStorage.getItem("checkbox01") === "checked") {
    for (let i = 0; i < foreignLetters.length; i++)
      letters.push(foreignLetters[i]);
    console.log("SEI QUI");
    counter.innerHTML = "Lettere rimanenti: " + letters.length;
  } else {
    if (letters.length === 20) return;

    console.log("STAI PER RIMUOVERE");

    for (let i = 0; i < letters.length; i++) {
      console.log("SEI IN RIMOZIONE");
      for (let j = 0; j < foreignLetters.length; j++) {
        if (letters[i] === foreignLetters[j]) {
          letters.splice(i, 1);
          i--;
          break;
        }
      }
    }

    counter.innerHTML = "Lettere rimanenti: " + letters.length;
  }
});

//funzione scelta
function chooseAndRemoveLetter() {
  if (letters.length === 0) return null;

  console.log("GRANDEZZA ARRAY -> " + letters.length);

  let randomNumber = Math.floor(Math.random() * letters.length);
  console.log("RANDOM NUMBER -> " + randomNumber);

  let letterExtracted = letters[randomNumber];
  letters.splice(randomNumber, 1);

  counter.innerHTML = "Lettere rimanenti: " + letters.length;

  return letterExtracted;
}

//controlla sessione login
function checkLogin() {
  console.log("In funzione checkLogin");
  placeholder.style.display = "none";
  letterBox.style.display = "block";
}

//gestione letter history
function gestioneContainer(finalLetter) {
  let subcontainer = document.createElement("div");
  subcontainer.id = "subcontainer";
  subcontainer.textContent = finalLetter;
  setTimeout(() => {
    containerHistoryLetter.appendChild(subcontainer);
  }, 1200); //aggiunge delay
}
