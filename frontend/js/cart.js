document.addEventListener("DOMContentLoaded", () => {
    const cartContainer = document.getElementById("cart-items");
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalElement = document.getElementById('total');
    const checkoutBtn = document.getElementById('checkout-btn');


    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        totalElement.textContent = `Total: $${total}`;
    };


    const displayCartItems = () => {
        cartContainer.innerHTML = ""; 

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

        calculateTotal(); 
    };
    
    // Função de remoção de item
    const removeItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(cart)); 
        displayCartItems();
        updateCartCount(); 
        calculateTotal();

    };


    cartContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("remove-item")) {
            const index = event.target.dataset.index;
            removeItem(index);
        }
    });

    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", () => {
            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "payment.html";
        });
    }

    displayCartItems(); 

});

function goBack() {
    window.history.back(); 
    setTimeout(() => {
        updateCartCount(); 
    }, 100);
}
