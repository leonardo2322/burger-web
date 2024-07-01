import { cart, renderCart } from "./cart.js"

export const sendMessage = () => {
    const send = document.getElementById('send')

    send.addEventListener('click', () => {
        const data = leerLocalStorage()
        const totalCart = data.totalCart
        const products = data.productsCart
        let textoProducto = ""
        let counterProduct = Math.round(Math.random() * 2557)

        products.map(item => {
            const titulo = item.titulo
            const precio = item.precio
            const cantidad = item.quantity

            textoProducto += `Producto: ${titulo},  cantidad: ${cantidad},  Precio: $${precio} \n`

            counterProduct++
        })

        let mensage = `Orden N°: ${counterProduct} \n \n Hola Te Saluda Palerossi \n \n Tipo de servicio: Compra \n \n Estado del pago: No Pagado \n \n Descripcion: 📝\n ${textoProducto} \n \n Total Compra: $${totalCart} \n \n Gracias por comprar con nosotros enseguida te atenderemos.` 

        const tlf = '573502117928'

        const enlaceWhatsapp = `https://wa.me/${tlf}/?text=` + encodeURIComponent(mensage)

        window.open(enlaceWhatsapp, '_blank')

        cart.items = []
        renderCart()
    })
}

function leerLocalStorage() {
    let dataStorage = cart.methods.getAll()
    const totalCart = cart.methods.getTotal()
    let productsCart = []

    dataStorage.map(item => {
        productsCart.push(item)
    })

    return {
        productsCart,
        totalCart,
        dataStorage
    }
}