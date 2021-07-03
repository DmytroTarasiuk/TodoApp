const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')
const completedEl = document.querySelector('.complete')
const activeEl = document.querySelector('.active')
const allEl = document.querySelector('.all')
const clearComplete = document.querySelector('.clear')
const lightImg = document.querySelector('.light-img')
const darkImg = document.querySelector('.dark-img')
const moonIc = document.querySelector('.moon-icon')
const sunIc = document.querySelector('.sun-icon')
const body = document.body

moonIc.addEventListener('click', ()=> {
    moonIc.style.display = 'none'
    sunIc.style.display = 'block'
    lightImg.style.display = 'none'
    darkImg.style.display = 'block'
    body.style.backgroundColor = '#181824'
    input.classList.add('dark')
    todosUL.classList.add('dark')
})

sunIc.addEventListener('click', ()=> {
    moonIc.style.display = 'block'
    sunIc.style.display = 'none'
    lightImg.style.display = 'block'
    darkImg.style.display = 'none'
    body.style.backgroundColor = '#fafafa'
    input.classList.remove('dark')
    todosUL.classList.remove('dark')
})

clearComplete.addEventListener('click', ()=> {
    const listEl = document.querySelectorAll('li')
    listEl.forEach(list=> {
        if(list.classList.contains('completed')) {
            list.remove()
            updateLS()
        }
    })
})

completedEl.addEventListener('click', ()=> {
    activeEl.classList.remove('selected')
    allEl.classList.remove('selected')
    completedEl.classList.add('selected')
    const listEl = document.querySelectorAll('li')
    listEl.forEach(list=> {
        if(list.classList.contains('completed')) {
            list.style.display ='flex'
        } else {
            list.style.display = 'none'
        }
    })
})

allEl.addEventListener('click', ()=> {
    activeEl.classList.remove('selected')
    completedEl.classList.remove('selected')
    allEl.classList.add('selected')
    const listEl = document.querySelectorAll('li')
    listEl.forEach(list=> list.style.display = 'flex')
})

activeEl.addEventListener('click', ()=> {
    activeEl.classList.add('selected')
    completedEl.classList.remove('selected')
    allEl.classList.remove('selected')
    const listEl = document.querySelectorAll('li')
    listEl.forEach(list=> {
        if(list.classList.contains('completed')) {
            list.style.display ='none'
        } else {
            list.style.display = 'flex'
        }
    })
})


const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}


form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        let sen = 'hi'      
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerHTML =  `<div class="ball"></div> ${todoText} <img src="images/icon-cross.svg" alt="icon-cross" class="close">`
        const ballEl = todoEl.querySelector('.ball')
        const closeEl = todoEl.querySelector('.close')
        ballEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        })

        closeEl.addEventListener('click', (e) => {
            e.preventDefault()
            todoEl.remove()
            let d= +todosUL.childElementCount.toString()
            leftItems.innerHTML = `${d}/5`
            updateLS()
        }) 

        todosUL.appendChild(todoEl)
        const leftItems = document.querySelector('.item-left')
        let counter = 5
        let res = counter -= todosUL.children.length
        if(res < 0) {
            res = 0
            while (todosUL.firstChild) {
                todosUL.removeChild(todosUL.lastChild);
            }
           
        }
        let result = res.toString()
        leftItems.innerHTML = result
        
        input.value = ''
        updateLS()
    }
}
function updateLS() {
    const todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains('completed')
        })
    })

    localStorage.setItem('todos', JSON.stringify(todos))
}