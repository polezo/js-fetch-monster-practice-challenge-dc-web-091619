console.log('Hi')

const init = () => {
    formHolder = document.querySelector('#create-monster');
    forward = document.querySelector('#forward');
    forward.addEventListener('click',pageForward);
    backward = document.querySelector('#back');
    backward.disabled = true;
    backward.addEventListener('click',pageBackward)
    buildForm(formHolder)
    getMonsters()
}

document.addEventListener("DOMContentLoaded",init);


const buildForm = formHolder => {
    const monsterForm = document.createElement("form");
    monsterForm.id = "monster-form"
    monsterForm.innerHTML = `<input id="name" placeholder="name..."><input id="age" placeholder="age..."><input id="description" placeholder="description..."><input type="submit" value="Create">`
    formHolder.append(monsterForm)
    monsterForm.addEventListener("submit",createMonster)
}

let page = 1;

function getMonsters() {
    fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    .then(response => response.json())
    .then(json => json.forEach(renderMonster))
}

let columnCounter = 0;
let rowCounter = 0;

//keeping bc this was fun to figure out but I don't need it with my new styling
// function decideRow(x) {
//    let monstersBucket = document.getElementById("monster-container")
//     if (x === 0 || x % 3 === 0) {
//         let row = document.createElement('div')
//         let y = rowCounter + 1
//         row.id = `row-${y}`
//         row.classList.add('row')
//         monstersBucket.append(row);
//         rowCounter++
//         return row 
//     } else {
//         let rowy = document.querySelector(`#row-${rowCounter}`)
//         return rowy
//     }
// }

function renderMonster(monster){ 
    //don't need to limit cols per row as bootstrap does that for me
    // row = decideRow(columnCounter)
    let row = document.getElementById('free-monsters')
    monsterHolder = document.createElement('div')
    monsterHolder.classList.add('col-sm-6','col-md-3','p-3')
    monsterHolder.style.border = "1px solid rgba(0,0,0,.125)"
    monsterHolder.innerHTML = 
        `<h2 class="text-center">${monster.name}</h2>
        <h4 class="text-center">Age: ${Math.round(monster.age)}</h4>
        <p class="text-center">${monster.description}</p>`
    row.append(monsterHolder)
    columnCounter++
}

function createMonster(e){
    e.preventDefault()
    let name = e.target[0].value
    let age = e.target[1].value
    let description = e.target[2].value
    e.target.reset()
    fetch('http://localhost:3000/monsters', {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name,
                age,
                description
    })})
            .then(response => response.json())
            .then(renderMonster)
}

function pageForward() {
    let row = document.getElementById('free-monsters')
    row.innerHTML=""
    page++
    backward.disabled = false;
    getMonsters()
}

function pageBackward(){
    let row = document.getElementById('free-monsters')
    row.innerHTML=""
    page--
    if (page === 1) {
        back.disabled = true;
    }
    getMonsters()
}