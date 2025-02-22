function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (!cartCountElement) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCountElement.textContent = cart.length;
}

// Atualiza o contador sempre que a página for carregada
document.addEventListener("DOMContentLoaded", updateCartCount);