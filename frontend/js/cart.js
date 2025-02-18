document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalElement = document.getElementById('total');

    // Função para calcular e atualizar o total
    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        totalElement.textContent = `Total: $${total}`;
    };

    // Exibe os itens no carrinho
    const displayCartItems = () => {
        cartContainer.innerHTML = ""; // Limpa a lista existente de itens no carrinho

        cart.forEach((item, index) => {
            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
                <img src="${item.image_url}" alt="${item.name}" width="100">
                <h3>${item.name}</h3>
                <p>Price: $${item.price.toFixed(2)}</p>
                <button class="remove-item" data-index="${index}">Remove</button>
            `;
            cartContainer.appendChild(itemElement);
        });

        calculateTotal(); // Atualiza o total ao exibir os itens
    };
    
    // Função de remoção de item
    const removeItem = (index) => {
        cart.splice(index, 1); // Remove o item do array do carrinho
        localStorage.setItem('cart', JSON.stringify(cart)); // Atualiza o localStorage
        displayCartItems(); // Atualiza a exibição dos itens no carrinho
        updateCartCount(); 
        calculateTotal();

    };

    // Adiciona event listeners para os botões de remoção
    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            removeItem(index);
        }
    });

    displayCartItems(); // Chamada única da função ao carregar a página
});

function goBack() {
    window.history.back(); 
    setTimeout(() => {
        updateCartCount(); // Atualiza o contador ao voltar
    }, 100); // Pequeno delay para garantir a atualização
}
