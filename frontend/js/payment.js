document.addEventListener("DOMContentLoaded", () => {
    const totalElement = document.getElementById('total');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const paymentForm = document.getElementById('payment-form');

    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum + item.price, 0).toFixed(2);
        totalElement.value = `$${total}`;
    };

    calculateTotal();

    paymentForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const formData = new FormData(paymentForm);
        const orderData = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            address: formData.get("address"),
            paymentMethod: formData.get("paymentMethod"),
            total: parseFloat(totalElement.value.replace("$", "")),
            products: cart.map(({ id }) => ({
                product_id: id
            }))
        };

        console.log(orderData);

        try {
            const response = await fetch("/api/order/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                const result = await response.json();
                localStorage.removeItem("cart"); 
                window.location.href = `receipt.html?orderId=${result.orderId}`;
            } else {
                console.error("Erro ao processar o pedido");
            }
        } catch (error) {
            console.error("Erro na requisição: ", error);
        }
    });
});

function goBack() {
    window.location.href = "cart.html";
}
