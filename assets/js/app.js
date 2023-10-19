
let escopo = CriarArray();

function CriarArray() {
    const numeros = [];
    const valorMaximo = 60;
    let contador = 1;

    while (contador <= valorMaximo) {
        numeros.push(contador);
        contador++;
    }

    return numeros;
}

function gerarNumeroLCG(seed, max) {
    const a = 7; //const a = 1664525;
    const c = 1; //const c = 1013904223;
    const m = 64; //const m = 4294967296; // 2^32
    seed = (a * seed + c) % m;
    return (seed % max) + 1; // Ajusta o valor para estar no intervalo [1, max]
}

function EscolherNumero(escopo, resposta, seed) {
    const escopoIn = escopo;

    while (resposta.length < 6) {
        const numero = gerarNumeroLCG(seed, escopoIn.length);
        const escolha = escopoIn.splice(numero - 1, 1)[0]; // Remover o número escolhido do escopo
        resposta.push(escolha);
        seed++; // Atualiza a semente para a próxima iteração
    }
}

function criarResposta() {
    const resposta = [];
    const seed = new Date().getTime(); // Semente inicial baseada na hora atual

    EscolherNumero(escopo, resposta, seed);

    return resposta;
}

function reiniciarEscopo() {
    escopo = CriarArray();
}




(function () {
    const numeroGerado = document.querySelector('#numerosGerados');

    function atualizarNumeros() {
        if(escopo.length === 0) {
            reiniciarEscopo();
        }

        const numeros = criarResposta(escopo);

        numeroGerado.innerHTML = ''; // Limpar os números anteriores

        numeros.forEach(numero => {
            const li = document.createElement('li');
            li.textContent = numero;
            numeroGerado.appendChild(li);
        });
    }

    atualizarNumeros();


})();
