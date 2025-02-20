document.addEventListener("DOMContentLoaded", () => {
const totalElement = document.getElementById('total');
const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const calculateTotal = () => {
        const total = cart.reduce((sum, item) => sum +item.price, 0).toFixed(2);
        totalElement.value = `$${total}`;
    };

    calculateTotal();



});


function goBack() {
    window.location.href = "cart.html";
};