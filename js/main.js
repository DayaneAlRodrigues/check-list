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
    
    // criar objeto para formar o conjunto de chave valor
    const itemAtual = {
        "nome" : nome.value,
        "quantidade": quantidade.value
    }

    criarTarefa(itemAtual);

    // atualizar o array com o item atual
    itens.push(itemAtual)

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

    novaTarefa.appendChild(numeroDeItem);
    novaTarefa.innerHTML += item.nome;

    lista.appendChild(novaTarefa);

   
}