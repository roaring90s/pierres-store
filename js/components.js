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
