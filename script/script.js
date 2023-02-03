/*****************************
 * JS-CAMPOMINATO-GRID
 * @author Alessandro Montenero 
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

        /* funzione per creare un div con classe box e difficoltà selezionata */
        function newBox(content, diff) {
            /* Funzione per creare un div classe "box" */
            let box = document.createElement('div') 
            box.classList.add("box") 
            box.classList.add(diff)       
            box.setAttribute('id',content)
            gridId.appendChild(box)
            
            /* al click di un box, se non ho perso, controllo se è una bomba o se ha bombe vicine
            e stampo */
        
            box.onclick = function boxClick(){
                counterClick++
                let nearBomb = 0
                if (loose != true) {
                this.classList.add("azure")
                
                if (randomArray.includes(parseInt(content))) {
                    box.innerHTML = '<i class="fa-solid fa-bomb"></i>'
                    loose = true
                    document.getElementById("loose").style.display = "block" 
                    document.getElementById("loose").innerHTML = '<h4>Hai Perso!</h4><br><h5>Il tuo score è ' + (counterClick - 1) + ' click.</h5>'
                }           
                else {
                    /* Funzione per sapere se ci sono bombe vicine */
                    
                        let nearSpots = []
                        let rightColumn = []
                        let leftColumn = []
                        if (box.classList.contains('hard')) {
                            nearSpots = [6,7,8]
                            rightColumn = [1, 8, 15,22, 29, 36, 43]
                            leftColumn = [7, 14, 21, 28, 35, 42, 49]
                        }
                        if (box.classList.contains('easy')){
                            nearSpots = [9,10,11]
                            rightColumn = [1,11,21,31,41,51,61,71,81,91]
                            leftColumn = [10,20,30,40,50,60,70,80,90,100]
                        }
                        if(box.classList.contains('medium')) {
                            nearSpots = [8,9,10]
                            rightColumn = [1,10,19,28,37,46,55,64,73]
                            leftColumn = [9,18,27,36,45,54,63,72,81]
                        }

                        if (randomArray.includes(content - nearSpots[0])&& !leftColumn.includes(content)){
                            nearBomb += 1
                        }
                        if (randomArray.includes(content - nearSpots[1])){
                            nearBomb += 1
                        }
                        if (randomArray.includes(content - nearSpots[2]) && !rightColumn.includes(content)){
                            nearBomb += 1
                        }
                        if (randomArray.includes(content - 1) && !rightColumn.includes(content)){
                            nearBomb += 1
                        }
                        if (randomArray.includes(content + 1)&& !leftColumn.includes(content)){
                            nearBomb += 1
                        }
                        if (randomArray.includes(content + nearSpots[0]) && !rightColumn.includes(content)){
                            nearBomb += 1
                        }
                        if (randomArray.includes(content + nearSpots[1])){
                            nearBomb += 1
                        }
                        if (randomArray.includes(content + nearSpots[2]) && !leftColumn.includes(content)){
                            nearBomb += 1
                        }
                        if (nearBomb != 0) {
                            box.innerHTML = nearBomb
                        }
                    
                    
                    
                }
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

        /* Inizializzo grid */
        gridId.style.cssText = '' /* inizializzo CSS della grid */
        gridId.innerHTML = ''     /* inizializzo HTML della grid */
        document.getElementById("loose").style.display = "none" /* inizializzo display del loose */ 
        
        /* Leggo la difficoltà selezionata e in base a quello creo il giusto numero di box */
        let diff = document.getElementById("selectLevel").value 
        
        if (diff == 'easy'){
            gridId.style.cssText = 'grid-template-columns:repeat(10,1fr);grid-template-rows:repeat(10,1fr);'
            multipleBoxes(100, 'easy')
            createRandomArray(16, 100)
            
        }
        else if (diff == 'medium') {
            gridId.style.cssText = 'grid-template-columns:repeat(9,1fr);grid-template-rows:repeat(9,1fr);'
            multipleBoxes(81, 'medium')
            createRandomArray(16, 81)
            
        }
        else if (diff == 'hard') {
            gridId.style.cssText = 'grid-template-columns:repeat(7,1fr);grid-template-rows:repeat(7,1fr);'
            multipleBoxes(49, 'hard')
            createRandomArray(16, 49)
        }
    }
    
    
    
    
    
