document.addEventListener("DOMContentLoaded", function() {
    function carregarComponente(seletor, arquivo) {
        fetch(arquivo)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar ${arquivo}`);
                }
                return response.text();
            })
            .then(data => {
                document.querySelector(seletor).innerHTML = data;
            })
            .catch(error => console.error(error));
    }

    carregarComponente("header", "components/header.html");
});


let currentPage = 1;

function togglePage() {
    const page1 = document.querySelector('.page1');
    const page2 = document.querySelector('.page2');
    const arrow = document.querySelector('.arrow');

    page1.classList.toggle('active');
    page2.classList.toggle('active');

    if (currentPage === 1) {
        arrow.textContent = '◀'; 
        arrow.classList.remove('right');
        arrow.classList.add('left');
        currentPage = 2;
    } else {
        arrow.textContent = '▶'; 
        arrow.classList.remove('left');
        arrow.classList.add('right');
        currentPage = 1;
    }
}