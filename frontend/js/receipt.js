document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const orderId = urlParams.get("orderId");

    if (!orderId) {
        document.querySelector(".receipt-container").innerHTML = "<h2>Order not found</h2>";
        return;
    }

    try {
        const response = await fetch(`/api/order/details/${orderId}`);
        const data = await response.json();

        if (response.ok) {
            const receiptContainer = document.querySelector(".receipt-container");

            // Estrutura completa
            receiptContainer.innerHTML = `
                <h1>Order Receipt</h1>
                <p><strong>Order ID:</strong> ${orderId}</p>
                <p><strong>Name:</strong> ${data.order.name}</p>
                <p><strong>Phone:</strong> ${data.order.phone}</p>
                <p><strong>Email:</strong> ${data.order.email}</p>
                <p><strong>Address:</strong> ${data.order.address}</p>                           
                <p><strong>Total:</strong> $${data.order.total.toFixed(2)}</p>

                <h2>Products</h2>
                <ul id="product-list" class="product-list"></ul>

                <button id="return-to-store">Return to Store</button>
            `;


            const productList = document.getElementById("product-list");

            data.products.forEach(product => {
                const item = document.createElement("li");
                item.classList.add("product-item");
                item.innerHTML = `
                    <strong>${product.name}</strong> - 
                    Qty: ${product.quantity} - 
                    Price: $${(product.price * product.quantity).toFixed(2)}
                `;
                productList.appendChild(item);
            });

            document.getElementById("return-to-store").addEventListener("click", () => {
                window.location.href = "index.html";
            });

        } else {
            document.querySelector(".receipt-container").innerHTML = `<h2>${data.error}</h2>`;
        }
    } catch (error) {
        console.error("Couldn't load the order data:", error);
        document.querySelector(".receipt-container").innerHTML = "<h2>Couldn't load the order</h2>";
    }
});
