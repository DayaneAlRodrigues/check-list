const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = JSON.parse(localStorage.getItem('itens')) || [];

itens.forEach( (elemento) => {
    criarTarefa(elemento)
})

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'] 
    const existe = itens.find(elemento => elemento.nome === nome.value)
    // criar objeto para formar o conjunto de chave valor
    const itemAtual = {
        "nome" : nome.value,
        "quantidade": quantidade.value
    }

    if ( existe ) {
        // criar um id de controle
        itemAtual.id = existe.id;

        atualizaElemento(itemAtual);

        // atualizar no localStorage para que cada item receba um id
        itens[itens.find(elemento => elemento.id === existe.id)] = itemAtual
    } else {

        itemAtual.id = itens[itens.length -1] ? (itens[itens.length-1]).id + 1 : 0;

        criarTarefa(itemAtual);

        // atualizar o array com o item atual
        itens.push(itemAtual)
    }

    // salvar dados no localStorage
    localStorage.setItem("itens", JSON.stringify(itens));
    
    nome.value = "";
    quantidade.value = "";
})

function criarTarefa (item){
    const novaTarefa = document.createElement('li');
   // novaTarefa.classlist.add('item');

    const numeroDeItem = document.createElement('strong');
    numeroDeItem.innerHTML = item.quantidade;
    numeroDeItem.dataset.id = item.id

    novaTarefa.appendChild(numeroDeItem);
    novaTarefa.innerHTML += item.nome;

    // Referenciar a função botaoDeleta no nó da função principal
    novaTarefa.appendChild(botaoDeleta(item.id))

    lista.appendChild(novaTarefa);   
}

function atualizaElemento(item){
    // selecionar o id do elemento para atualizar a quantidade

    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
}

function deletaElemento(tag, id) {
    tag.remove()
// remover um item do array itens
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)
 // escrever no localStorage
    localStorage.setItem("itens", JSON.stringify(itens))
}
