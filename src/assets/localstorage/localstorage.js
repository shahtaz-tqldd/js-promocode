// ADD NEW PROMO
const addToLS = (promocode, discount) => {
    const newPromo = { promocode, discount }
    let promo = JSON.parse(localStorage.getItem('promo')) || []
    let isPromoExists = false

    for (let i = 0; i < promo.length; i++) {
        if (promo[i].promocode === promocode) {
            promo[i].discount = discount
            isPromoExists = true
            break
        }
    }

    if (!isPromoExists) {
        promo.push(newPromo)
    }

    localStorage.setItem('promo', JSON.stringify(promo))
}

const getFromLS = () => {
    const promo = localStorage.getItem('promo')
    const getPromo = JSON.parse(promo)
    return getPromo
}

const removePromo = (promocode) => {
    let promo = JSON.parse(localStorage.getItem('promo')) || []
    promo = promo.filter((item) => item.promocode !== promocode)
    localStorage.setItem('promo', JSON.stringify(promo))
}

export { addToLS, getFromLS, removePromo }
