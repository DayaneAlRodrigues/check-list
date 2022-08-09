const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
const itens = localStorage.getItem('itens') || [];

console.log(itens)

form.addEventListener('submit', (evento) => {
    evento.preventDefault();
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade']
    criarTarefa(nome.value,quantidade.value);
    nome.value = "";
    quantidade.value = "";
})

function criarTarefa (nome, quantidade){
    const novaTarefa = document.createElement('li');
   // novaTarefa.classlist.add('item');

    const numeroDeItem = document.createElement('strong');
    numeroDeItem.innerHTML = quantidade;

    novaTarefa.appendChild(numeroDeItem);
    novaTarefa.innerHTML +=nome;

    lista.appendChild(novaTarefa);

    // criar objeto para formar o conjunto de chave valor
    const itemAtual = {
        "nome" : nome,
        "quantidade": quantidade
    }
    
    // atualizar o array com o item atual
    itens.push(itemAtual)
    // salvar dados no localStorage

    localStorage.setItem("item", JSON.stringify(itens));
}