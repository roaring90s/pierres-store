document.addEventListener("DOMContentLoaded", function() {
    function loadComponent(selector, archive) {
        fetch(archive)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error loading ${archive}: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                // Verifica se o seletor existe no DOM antes de tentar inserir o HTML
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                } else {
                    console.error(`No element found for selector: ${selector}`);
                }
            })
            .catch(error => console.error(error));
    }

    // Carrega o componente "header.html" dentro do elemento "header"
    loadComponent("header", "components/header.html");
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

function setFavicon(faviconPath) {
    let link = document.querySelector("link[rel='icon']");

    if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        link.type = "image/png";
        document.head.appendChild(link);
    }

    link.href = `${faviconPath}?v=${new Date().getTime()}`;
}

setFavicon("./img/pierres_shop.png");


function filterProducts(season) {
    fetch(`/getProducts?season=${season}`)
        .then(response => response.json())
        .then(data => {
            let productList = document.getElementById("product-list"); 
            productList.innerHTML = "";
            data.forEach(product => {
                productList.innerHTML += `<p>${product.name} - R$ ${product.price}</p>`;
            });
        })
        .catch(error => console.error("Not Found:", error));
}