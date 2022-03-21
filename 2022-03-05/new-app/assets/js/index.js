//GET parametrai URL nuorodose
//http://localhost/?test=Labas&test2=Ate&test3=Hello

const app = document.querySelector('#app')
const pager = app.querySelector('.pagination')
const results = app.querySelector('#results')

let currentPage = 3

fetch('https://newsapi.org/v2/everything?q=bitcoin&pageSize=50&page=' + currentPage + '&sortBy=publishedAt&apiKey=29ce49294e2f4ceeab64d6e744d39467')
    //ES6 funkciju aprasymas
    .then(atsakymas => atsakymas.json())
    .then(atsakymas => {
        if (atsakymas.status === 'ok') {
            let posts = atsakymas.articles
            let html = ''
            let pagerHtml = ''
            let totalPages = Math.floor(atsakymas.totalResults / 50)

            posts.forEach((value, index) => {
                let image = ''
                if (value.urlToImage != null)
                    image = `<div class="image card-img-top">
                            <img src="${value.urlToImage}" alt="${value.title}" />
                        </div>`

                let date = ''
                if (value.publishedAt != '') {
                    date = new Date(value.publishedAt)
                    date = date.toLocaleDateString('lt-LT')
                }

                html += `<div class="col news-article">
                        <div class="card shadow-sm">
                            ${image}
                            <div class="card-body">
                                <a href="#" class="open-modal">
                                    <h2>${value.title}</h2>
                                </a>
                                <p class="card-text">${value.description}</p>
                                <div class="d-flex justify-content-between align-items-center">
                                    <small class="text-muted date-container">${date}</small>
                                </div>
                            </div>
                            <div class="content">${value.content}</div>
                        </div>
                    </div>`
            })

            results.innerHTML = html

            for (let i = 1; i <= totalPages; i++) {
                pagerHtml += `<li class="page-item"><a class="page-link" data-page="${i}" href="#">${i}</a></li>`
            }

            pager.innerHTML = pagerHtml

            document.querySelectorAll('.open-modal').forEach((element) => {
                element.addEventListener('click', (event) => {
                    event.preventDefault()

                    let title = element.querySelector('h2').textContent
                    let date = element.parentElement.querySelector('.date-container').textContent
                    let image = element.parentElement.parentElement.querySelector('.image img')
                    image = image ? image.getAttribute('src') : ''

                    let content = element.parentElement.parentElement.querySelector('.content').textContent

                    if (image) {
                        image = `<div class="image">
                                <img src="${image}" />
                            </div>`
                    }

                    app.querySelector('.modal-view').style.display = 'block'

                    app.querySelector('.modal-wrapper').innerHTML = `
                    <h1>${title}</h1>
                    ${image}
                    <div class="date">${date}</div>
                    <div class="content">${content}</div>
                `
                })
            })



        }
    })

app.querySelector('.modal-overlay').addEventListener('click', () => {
    app.querySelector('.modal-view').style.display = 'none'
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape')
        app.querySelector('.modal-view').style.display = 'none'
})




//Klasikiniu budu aprasomi callback metodai
// .then(function(atsakymas) {
//     return atsakymas.json()
// })
// .then(function(atsakymas) {
//     console.log(atsakymas)
// })