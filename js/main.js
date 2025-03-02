const contentRowEl = document.querySelector('.content-row')
const btnEl = document.querySelector('.title-btn')

// Функция для привязки обработчиков событий (вызываем после создания элемента)
function attachEventListeners(noteElement) {
    //Принимает элемент в качестве аргумента
    const editBtn = noteElement.querySelector('.edit-btn') //Находим editBtn внутри noteElement
    const deleteBtn = noteElement.querySelector('.musor-btn') //Находим deleteBtn внутри noteElement
    const starBtn = noteElement.querySelectorAll('.star-btn')
    const cardTitle = noteElement.querySelector('#card-title')
    const cardText = noteElement.querySelector('#card-text')
    const titleInput = noteElement.querySelector('#card-title-input')
    const textInput = noteElement.querySelector('#card-text-input')

    starBtn.forEach((star) => {
        star.addEventListener('click', function () {
            star.classList.toggle('starr')
            if (star.classList.contains('starr')) {
                star.querySelector('#star').setAttribute(
                    'src',
                    './img/star.png'
                )
                star.classList.toggle('star-yes')
                console.log(noteElement)
                contentRowEl.prepend(noteElement)
                saveRow()
            } else {
                star.querySelector('#star').setAttribute(
                    'src',
                    './img/star (1).png'
                )
                star.classList.toggle('star-yes')
                contentRowEl.append(noteElement)
                saveRow()
            }
        })
    })

    editBtn.addEventListener('click', function (e) {
        noteElement.classList.add('visible-overflow')

        cardTitle.classList.toggle('hidden')
        cardText.classList.toggle('hidden')
        titleInput.classList.toggle('hidden')
        textInput.classList.toggle('hidden')

        editBtn.classList.toggle('check')

        const img = editBtn.querySelector('.card-img')

        if (editBtn.classList.contains('check')) {
            titleInput.value = cardTitle.textContent
            textInput.value = cardText.textContent
            img.setAttribute('src', './img/check.png')
            saveRow()
        } else {
            cardTitle.textContent = titleInput.value
            cardText.textContent = textInput.value
            img.setAttribute('src', './img/pencil.png')
            saveRow()
        }
    })

    deleteBtn.addEventListener('click', function (e) {
        noteElement.remove()
        saveRow()
    })
}

// Функция для создания карточки
function createNote(title, text) {
    const noteEl = document.createElement('div')
    noteEl.classList.add('content-card')
    noteEl.innerHTML = `
        <div class="card-row">
            <h2 id="card-title">${title}</h2>
            <input id="card-title-input" class="hidden" type="text" value="" placeholder="${title}">
            <div class="img-row">
                <button class="card-btn star-btn"><img src="./img/star (1).png" alt="" class="card-img" id="star"></button>
                <button class="card-btn edit-btn"><img src="./img/pencil.png" alt="" class="card-img" id="check"></button>
                <button class="card-btn musor-btn"><img src="./img/bin.png" alt="" class="card-img"></button>
            </div>
        </div>
        <p id="card-text">${text}</p>
        <textarea id="card-text-input" class="hidden" value="" placeholder="${text}"></textarea>`
    //Вызываем attachEventListeners сразу после создания элемента
    attachEventListeners(noteEl)

    return noteEl
}

btnEl.addEventListener('click', function () {
    const el = createNote('Заголовок', 'Ваш текст')
    contentRowEl.append(el)
    saveRow()
})

function saveRow() {
    //Сохраняем только HTML-содержимое contentRowEl
    localStorage.setItem('row', contentRowEl.innerHTML)
}

function showRow() {
    contentRowEl.innerHTML = localStorage.getItem('row')

    //После восстановления HTML нужно заново привязать обработчики событий
    const cards = contentRowEl.querySelectorAll('.content-card') //Находим все карточки
    cards.forEach((card) => {
        attachEventListeners(card) //Привязываем обработчики к каждой карточке
    })
}

const cards = document.querySelectorAll('.content-card') //Находим все карточки
cards.forEach((card) => {
    attachEventListeners(card) //Привязываем обработчики к каждой карточке
})

showRow()
