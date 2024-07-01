import { renderCart } from "./components/cart.js"
import { cartMenu } from "./components/cartMenu.js"
import { findProductModal } from "./components/findProductModal.js"
import { modal } from "./components/modal.js"
import { navBarMenu, scrollToTop } from "./components/navBar.js"
import { renderProducts } from "./components/products.js"
import { sendMessage } from "./components/sendMessageInfo.js"
import { swiper } from "./helpers/swipperJS.js"

document.addEventListener('DOMContentLoaded', () => {
    swiper
    navBarMenu()
    scrollToTop()
    cartMenu()
    renderProducts()
    renderCart()
    modal()
    sendMessage()
    findProductModal()
})