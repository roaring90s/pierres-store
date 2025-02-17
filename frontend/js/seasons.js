document.addEventListener("DOMContentLoaded", () => {
    const seasonButtons = document.querySelectorAll(".season_btn");
    const seasonSelection = document.getElementById("season-selection");
    const productsContainer = document.getElementById("products-container");
    const productsList = document.getElementById("products-list");
    const backBtn = document.getElementById("back-btn");

    // Array para armazenar os produtos no carrinho
    let cart = [];

    // Função para atualizar o contador do carrinho (pode ser exibido no cabeçalho)
    const updateCartCount = () => {
        document.getElementById("cart-count").textContent = cart.length;
    };

    // Função para exibir os produtos na tela
    const displayProducts = (products) => {
        productsList.innerHTML = ""; // Limpa a lista de produtos

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <img src="${product.image_url}" alt="${product.name}" width="100">
                <button class="add-to-cart">Add to Cart</button>
            `;
            productsList.appendChild(productElement);

            // Adiciona produto ao carrinho ao clicar no botão
            const addToCartButton = productElement.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", () => {
                cart.push(product);  // Adiciona ao carrinho
                updateCartCount();   // Atualiza contador
            });
        });

        // Exibe o container com os produtos
        productsContainer.style.display = "block";
    };

    // Lógica para quando o usuário clicar em uma estação
    seasonButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const season = button.id;

            // Esconde a seleção de estação
            seasonSelection.style.display = "none";

            try {
                // Faz a requisição para obter produtos filtrados pela estação
                const response = await fetch(`/products/${season}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar produtos");
                }
                const products = await response.json();
                displayProducts(products); // Exibe os produtos

            } catch (error) {
                console.error(error);
            }
        });
    });

    // Lógica para o botão "Return"
    backBtn.addEventListener("click", () => {
        // Esconde a lista de produtos
        productsContainer.style.display = "none";
        // Exibe novamente a seleção de estação
        seasonSelection.style.display = "block";
    });
});
