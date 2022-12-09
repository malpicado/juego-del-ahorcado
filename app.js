//Variables de referencias
const letterContainer = document.getElementById("letter-container");
const optionsContainer = document.getElementById("options-container");
const userInputSection = document.getElementById("user-input-section");
const newGameContainer = document.getElementById("new-game-container");
const newGameButton = document.getElementById("new-game-button");
const resultText = document.getElementById("result-text");
const canvas = document.getElementById("canvas");

//Opciones para adivinar
let options = {
    fruits: ["Manzana","Arandanos","Mandarina","Melocoton","Pitahaya","Mango","Durazno","Pepino","Naranja","Sandia","Albaricoque","Guanabana","Tamarindo","Chirimoya","Tomate","Palta","Uva","Platano","Melon","Maracuya"],
    animals: ["Rinoceronte","Pez Bruja","Vaca","Ajolote","Tiburon Martillo","Tiburon Espada","Cangrejo","Perro","Gato","Canario","Raton","Picozapato","Kiwi","Ornitorrinco","Oso","Gacela","Murcielago","Dromedario","Guanaco","Carpas","Langosta","Atun","Almeja","Tortuga","Bacalao","Salmon","Garrobo","Bagre","Fugu","Capibara","Iguana","Vieja del agua","Orca","Mejillon","Coral","Pez Gota","Pulpo","Pejerrey","Jirafa"],
    countries: ["Estados Unidos","Mexico","Chile","Canada","Emiratos Arabes","Portugal","Francia","Azerbaiyan","Nauru","Vanuatu","Kazajistan","Letonia","Mauritania","Aruba","Sri Lanka","Nicaragua","Tayikistan","Palaos","Tonga","Granada","Trinidad y Tobago","Mongolia","Turkmenistan","Uzbekistan","Bangladesh","Madagascar","Zimbabue","Argentina","Peru","Guatemala","Venezuela","Groenlandia","Colombia","Uruguay","Brazil","Paraguay","Bolivia"],
};

//Contadores
let winCount = 0;
let count = 0;
let chosenWord = "";

//Mostrar botones de opciones del juego
const displayOptions = () => {
    optionsContainer.innerHTML += `<h3>Elije una opcion</h3>`;
    let buttonCon = document.createElement("div");
    for (let value in options) {
        buttonCon.innerHTML += `<button class="options" onclick="generateWord('${value}')">${value}</button>`;
    }
    optionsContainer.appendChild(buttonCon);
};

//Bloqueamos los botones
const blocker = () => {
    let optionsButtons = document.querySelectorAll(".options");
    let letterButtons = document.querySelectorAll(".letters");

    //Deshabilitar las opciones
    optionsButtons.forEach((button)=>{
        button.disabled = true;
    });

    //Deshabilitar las letras
    letterButtons.forEach((button)=>{
        button.disabled.true;
    });
    newGameContainer.classList.remove("hide");
};

//Generar la palabra
const generateWord = (optionValue) => {
    let optionsButtons = document.querySelectorAll(".options");
    optionsButtons.forEach((button) =>{
        if (button.innerText.toLowerCase()=== optionValue){
            button.classList.add("active");
        }
        button.disabled = true;
    });

    //Ocultamos las letras y eliminamos la palabra del juego anterior
    letterContainer.classList.remove("hide");
    userInputSection.innerText = "";
    let optionArray = options[optionValue];

    //Palabra aleatoria
    chosenWord = optionArray[Math.floor(Math.random() * optionArray.length)];
    chosenWord = chosenWord.toUpperCase();

    //Reemplazar por guiones
    let displayItems = chosenWord.replace(/./g, `<span class="dashes">_</span>`);
    //Mostramos los elemento en el SPAN
    userInputSection.innerHTML = displayItems;
};

//Ejecutamos la funcion inicial cuando hacemos clic en el boton "Nuevo Juego"

const initializer = () =>{
    winCount = 0;
    count = 0;

    userInputSection.innerHTML = "";
    optionsContainer.innerHTML = "";
    letterContainer.classList.add("hide");
    newGameContainer.classList.add("hide");
    letterContainer.innerHTML = "";

    //Creando el teclado del juego
    for (let i = 65; i < 91; i++){
        let button = document.createElement("button");
        button.classList.add("letters");
        button.innerText = String.fromCharCode(i);
        //Añadiendo caracteres a los botones
        button.addEventListener("click", () =>{
            let charArray = chosenWord.split("");
            let dashes = document.getElementsByClassName("dashes");
            //Dibujando el ahorcado
            if(charArray.includes(button.innerText)){
                charArray.forEach((char,index)=>{
                    if(char === button.innerText){
                        dashes[index].innerText = char;
                        winCount += 1;
                        if(winCount == charArray.length){
                            resultText.innerHTML = `<h2 class="win-msg">¡GANASTE!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
                            blocker();
                        }
                    }
                });
            }else {
                count += 1;
                drawMan(count);
                if (count == 6){
                    resultText.innerHTML = `<h2 class="lose-msg">¡PERDISTE!</h2><p>La palabra era <span>${chosenWord}</span></p>`;
                    blocker();
                }
            }
            button.disabled = true;
        });
        letterContainer.append(button);
    }
    displayOptions();
    let { initialDrawing } = canvasCreator();
    initialDrawing();
}

//Empezamos a dibujar en el canvas
const canvasCreator = () => {
    let context = canvas.getContext("2d");
    context.beginPath();
    context.strokeStyle = "#000";
    context.lineWidth = 3;

    const drawLine = (fromX, fromY, toX, toY) => {
        context.moveTo(fromX, fromY);
        context.lineTo(toX, toY);
        context.stroke();
    };

    const head  = () => {
        context.beginPath();
        context.arc(70, 30, 10, 0, Math.PI * 2, true);
        context.stroke();
    };

    const body = () => {
        drawLine(70, 40, 70, 80);
    };

    const leftArm = () => {
        drawLine(70, 50, 50, 70);
    };

    const rightArman = () => {
        drawLine(70,50,90,70);
    };

    const leftLeg = () => {
        drawLine(70,80,50,110);
    };

    const rightLeg = () =>{
        drawLine(70,80,90,110);
    };

    const initialDrawing = () => {
        context.clearRect(0,0, context.canvas.width,context.canvas.height);
        //Linea base
        drawLine(10,130,130,130);
        //linea izquierda
        drawLine(10,10,10,131);
        //Linea de cabecera
        drawLine(10,10,70,10);
        //colgante
        drawLine(70,10,70,20);
    };
    return { initialDrawing, head, body, leftArm, rightArman, leftLeg, rightLeg };
}

//Dibujando al condenado
const drawMan = (count) => {
    let { head, body, leftArm, rightArman, leftLeg, rightLeg } = canvasCreator();
    switch (count){
        case 1:
            head();
            break;
        case 2:
            body();
            break;
        case 3:
            leftArm();
            break;
        case 4:
            rightArman();
            break;
        case 5:
            leftLeg();
            break;
        case 6:
            rightLeg();
            break;
        default:
            break;
    }
}


newGameButton.addEventListener("click", initializer);
window.onload = initializer;