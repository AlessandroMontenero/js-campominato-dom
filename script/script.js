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



/* Funzione per creare la griglia quando premo il bottone */
document.getElementById("start").onclick = function createGrid() {
    /* variabile per la sconfitta */
    let loose = false
    /* contatore dei click prima della sconfitta */
    let counterClick = 0
    /* Funzione che ritorna un array con un determinato numero di numeri randomici in un certo intervallo */
    
    const randomArray = []
    function createRandomArray(length, maxNumber) {
        while(randomArray.length < length) {
            let randomNumber = Math.round(Math.random() * (maxNumber))
            if (!randomArray.includes(randomNumber) && randomNumber != 0)
            randomArray.push(randomNumber)}
            return randomArray
        }

        /* Box */
        function newBox(content, diff) {
            /* Funzione per creare un div classe "box" */
            let box = document.createElement('div') 
            box.classList.add("box") 
            box.classList.add(diff)       
            box.setAttribute('id',content)
            gridId.appendChild(box)
            
            /* quando clicco il box faccio apparire o scomparire il suo numero */
        
            box.onclick = function boxClick(){
                counterClick++
                if (loose != true) {
                this.classList.add("azure")
                if (box.innerHTML == '') {
                    console.log(content)
                    if (randomArray.includes(parseInt(content))) {
                        box.innerHTML = '<i class="fa-solid fa-bomb"></i>'
                        loose = true
                        document.getElementById("loose").style.display = "block"
                        document.getElementById("loose").innerHTML = '<h4>Hai Perso!</h4><br><h5>Il tuo score è ' + counterClick + ' click.</h5>'
                    }           
                } 
                else {
                    box.innerHTML = ''
                }
                console.log(counterClick)
                /* Perdita */
                if (loose == true) {
                    for (let i = 0; i < randomArray.length; i++) {
                        let bombIndex = randomArray[i]
                        bombBox= document.getElementById(bombIndex)
                        bombBox.innerHTML = '<i class="fa-solid fa-bomb"></i>'
                        bombBox.classList.remove("azure")
                        bombBox.classList.add("bomb")
                    }
                 }
                }
                }
            
            
        }
        
        
        /* Funzione per creare più box in base alla dimensione della griglia */
        function multipleBoxes(template, diff) {
            for (let i = 0; i < template; i++) {
                newBox(i + 1, diff)
            }
        }
        gridId.style.cssText = '' /* inizializzo CSS */
        gridId.innerHTML = ''     /* inizializzo HTML */
        document.getElementById("loose").style.display = "none" /* inizializzo display del loose */ 
        
        /* Leggo la difficoltà selezionata e in base a quello creo il giusto numero di box */
        let level = document.getElementById("selectLevel").value 
        
        if (level == 'easy'){
            gridId.style.cssText = 'grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(10,1fr);'
            multipleBoxes(100, 'easy')
            createRandomArray(16, 100)
            console.log(createRandomArray(16, 100))
            
        }
        else if (level == 'medium') {
            gridId.style.cssText = 'grid-template-columns:repeat(9,1fr);grid-template-rows:repeat(9,1fr);'
            multipleBoxes(81, 'medium')
            createRandomArray(16, 81)
            console.log(createRandomArray(16, 81))
            
        }
        
        else if (level == 'hard') {
            gridId.style.cssText = 'grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(7,1fr);'
            multipleBoxes(49, 'hard')
            createRandomArray(16, 49)
            console.log(createRandomArray(16, 49))
        }
        
        
    }
    
    
    
    
    
