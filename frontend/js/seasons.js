document.addEventListener("DOMContentLoaded", () => {
    const seasonButtons = document.querySelectorAll(".season_btn");
    const seasonSelection = document.getElementById("season-selection");
    const titleSeason = document.querySelector(".title_seasons");
    const productsContainer = document.getElementById("products-container");
    const productsList = document.getElementById("products-list");

    const seasonTitle = document.getElementById("season-title");

    console.log(typeof updateCartCount);
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const displayProducts = (products) => {
        productsList.innerHTML = ""; 

        products.forEach(product => {
            const productElement = document.createElement("div");
            productElement.classList.add("product");
            productElement.innerHTML = `
                <img src="${product.image_url}" alt="${product.name}" width="100">            
                <h3>${product.name}</h3>
                <p>Price: $${product.price.toFixed(2)}</p>
                <button class="add-to-cart"> Add to Cart</button>
            `;
            productsList.appendChild(productElement);

            const addToCartButton = productElement.querySelector(".add-to-cart");
            addToCartButton.addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem('cart')) || []; 
                cart.push(product); 
                localStorage.setItem('cart', JSON.stringify(cart)); 
                updateCartCount(); 
            });           
        });


        productsContainer.style.display = "block";
        titleSeason.style.display = "none"; 
        seasonSelection.style.display = "none"; 

    };


    seasonButtons.forEach(button => {
        button.addEventListener("click", async () => {
            const season = button.id;

            seasonTitle.style.display = 'block'; 

            seasonTitle.textContent = `${season.charAt(0).toUpperCase() + season.slice(1)}`;

            seasonSelection.style.display = "none";
            titleSeason.style.display = "none"; 


            try {
                
                const response = await fetch(`https://pierres-store.onrender.com/products/${season}`);
                if (!response.ok) {
                    throw new Error("Erro ao buscar produtos");
                }
                const products = await response.json();
                displayProducts(products); 

            } catch (error) {
                console.error(error);
            }
        });
    }); 

});

function togglePage() {
    const seasonSelection = document.getElementById("season-selection");
    const productsContainer = document.getElementById("products-container");
    const titleSeason = document.querySelector(".title_seasons");
    const seasonTitle = document.getElementById("season-title");

    // Oculta a lista de produtos e o título da estação
    productsContainer.style.display = "none";
    seasonTitle.style.display = "none";

    // Exibe a seleção de estação
    seasonSelection.style.display = "block";
    titleSeason.style.display = "block";
}

document.getElementById("cart-icon").addEventListener("click", () => {
    window.location.href = "/cart.html"; 
});

window.addEventListener("pageshow", () => {
    updateCartCount(); // Atualiza o contador quando a página for mostrada novamente
});
