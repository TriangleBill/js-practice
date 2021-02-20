let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://e1.edimdoma.ru/data/ingredients/0000/2374/2374-ed4_wide.jpg?1487746348'},
    {id: 2, title: 'Апельсины', price: 40, img: 'https://m.dom-eda.com/uploads/images/catalog/item/dfc9a3e974/3cbf3bd41c_1000.jpg'},
    {id: 3, title: 'Манго', price: 35, img: 'https://sbermarket.ru/spree/products/34090/preview/43507.jpg?1576746810'}
]

const toHTML = fruit => `
    <div class="col">
        <div class="card">
            <img style="height: 300px"
                 src="${fruit.img}"
                 class="card-img-top"
                 alt="${fruit.title}">
            <div class="card-body">
                <h5 class="card-title">${fruit.title}</h5>
                <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
            </div>
        </div>
    </div>
`

function render() {
    const html = fruits.map(toHTML).join('')
    document.querySelector('#fruits'). innerHTML = html
}

render()


const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler() {
                priceModal.close()
            }},
    ]
})



document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn,
          id = +event.target.dataset.id,
          fruit = fruits.find(f => f.id === id)

    if (btnType === 'price') {
        priceModal.open()

        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
    } else if (btnType === 'remove') {
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(() => {
            console.log('Cancel')
        })
    }
})



