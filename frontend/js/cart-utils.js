function updateCartCount() {
    const cartCountElement = document.getElementById("cart-count");
    if (!cartCountElement) return; // Evita erro se o elemento não existir

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCountElement.textContent = cart.length;
}

// Atualiza o contador sempre que a página for carregada
document.addEventListener("DOMContentLoaded", updateCartCount);