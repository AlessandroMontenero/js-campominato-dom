/*****************************
 * JS-CAMPOMINATO-GRID
 * @author Alessandro Montenero 
 * 
 * @description
 * L'utente clicca su un bottone che genererà una griglia di gioco quadrata. 
 * Ogni cella ha un numero progressivo, da 1 a 100. 
 * Ci saranno quindi 10 caselle per ognuna delle 10 righe. 
 * Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro 
 * ed emetto un messaggio in console con il numero della cella cliccata.
 * @bonus
 * Aggiungere una select accanto al bottone di generazione, che fornisca 
 * una scelta tra tre diversi livelli di difficoltà:
 * - con difficoltà 1 => 100 caselle, con un numero compreso tra 1 e 100, 
 * divise in 10 caselle per 10 righe;
 * - con difficoltà 2 => 81 caselle, con un numero compreso tra 1 e 81, 
 * divise in 9 caselle per 9 righe;
 * - con difficoltà 3 => 49 caselle, con un numero compreso tra 1 e 49, 
 * divise in 7 caselle per 7 righe;
 *****************************/ 

/* Griglia */
let gridId = document.getElementById("grid")    

/* Box */
function newBox(content) {
    /* Funzione per creare un div classe "box" */
    let box = document.createElement('div') 
    box.classList.add("box")    
    gridId.appendChild(box)

    /* quando clicco il box faccio apparire o scomparire il suo numero */
    box.onclick = function boxClick(){
        console.log(this.innerHTML)
        this.classList.toggle("azure")
        if (box.innerHTML == '') {
            box.innerHTML = content            
        } 
        else {
            box.innerHTML = ''
        }
    }
}

/* Funzione che ritorna un array con un determinato numero di numeri randomici in un certo intervallo */

function randomArray(length, maxNumber) {
    const randomArray = []
    while(randomArray.length < length) {
        let randomNumber = Math.round(Math.random() * (maxNumber))
        if (!randomArray.includes(randomNumber) && randomNumber != 0)
        randomArray.push(randomNumber)}
        return randomArray
    }
    
    console.log(randomArray(14, 80))


/* Funzione per creare più box in base alla dimensione della griglia */
function multipleBoxes(template) {
    for (let i = 0; i < template; i++) {
        newBox(i + 1, i + 1)
    }
}

/* Funzione per creare la griglia quando premo il bottone */
document.getElementById("start").onclick = function createGrid() {
    gridId.style.cssText = '' /* inizializzo CSS */
    gridId.innerHTML = ''     /* inizializzo HTML */
    
    /* Leggo la difficoltà selezionata e in base a quello creo il giusto numero di box */
    let level = document.getElementById("selectLevel").value 
    
    if (level == 'easy'){
        gridId.style.cssText = 'grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(10,1fr);'
        multipleBoxes(100)
    }
    else if (level == 'medium') {
        gridId.style.cssText = 'grid-template-columns:repeat(9,1fr);grid-template-rows:repeat(9,1fr);'
        multipleBoxes(81)
    }

    else if (level == 'hard') {
        gridId.style.cssText = 'grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(7,1fr);'
        multipleBoxes(49)
    }
}





