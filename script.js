import { itensData } from "./data.js"

let itemsAdicionados = []
let valorTotal = 0

const coverLayer = document.getElementById("cover")
const modalPagamento = document.getElementById("modal-pagamento")
const modalAvaliacao = document.getElementById("modal-avaliacao")
let pedidoFinalizado = false

  document.addEventListener("click", function(e){
    if (e.target.dataset.addbutton && !pedidoFinalizado){
        handleAddButton(e.target.dataset.addbutton)
    }
    else if(e.target.dataset.removeBtn){
        handleRemoveBtn(e.target.dataset.removeBtn)
    }
    else if(e.target.id === "finalizar-btn"){
        handleFinalizarBtn()
    }else if(e.target.id === "cover"){
        handleCloseModal()
    }else if(e.target.id === "submit-btn"){
        handleFinalizarPedido()
    }
    else if(e.target.classList.contains("fa-burger")){
        handleCloseModal()
    }
  })

function handleAddButton(itemId){

    const targetObj = itensData.filter(function(item){
        return item.UUID === itemId
    })[0]

    itemsAdicionados.push(
        {
            nome: targetObj.nome,
            preco: targetObj.preco,
            UUID: crypto.randomUUID(),
        },
    )
    renderTotal()
}

function handleRemoveBtn(itemId){
    itemsAdicionados = itemsAdicionados.filter(function(item){
        return item.UUID !== itemId
    })
    valorTotal -= itemsAdicionados.preco
    renderTotal()
}

function renderTotal(){
    let sum = 0
    let itensTotalHtml = ""

    if(itemsAdicionados.length){
        itemsAdicionados.forEach(function(item){
            itensTotalHtml += 
            `
                <div class="resumo-pedido-item">
                    <h3 class="resumo-pedido-item-titulo">${item.nome}</h3>
                    <p><span class="remove-btn" data-remove-btn="${item.UUID}">(remover)</span></p>
                    <h3 class="resumo-pedido-item-preco align-right">R$${item.preco}</h3>
                </div>
            `
            sum += item.preco
        })
        valorTotal = sum

        document.getElementById("resumo-itens").innerHTML = itensTotalHtml
        document.getElementById("resumo-pedido-item-preco").innerHTML = `R$ ${valorTotal.toFixed(2)}`
        document.getElementById("resumo-pedido").style.display = "flex"
    }else{
        document.getElementById("resumo-pedido").style.display = "none"
    }

}

function handleFinalizarBtn(){
    modalPagamento.style.display = "block"
    coverLayer.style.display = "block"
}

function handleCloseModal(){
    modalPagamento.style.display = "none"
    modalAvaliacao.style.display = "none"
    coverLayer.style.display = "none"
}

function handleFinalizarPedido(){
    modalPagamento.style.display = "none"
    document.getElementById("resumo-pedido").style.display = "none"

    modalAvaliacao.style.display = "block"
    document.getElementById("thanks").style.display = "block"

    itemsAdicionados = []

    pedidoFinalizado = true

    renderitens()
}

function renderitens(){
    let itensHtml = ""
    let cursor = ""

    if(pedidoFinalizado){
        cursor = "not-allowed"
    }
    
    itensData.forEach(function(itens){
        itensHtml +=
        `
        <div class="item">
            <img class="item-img" src="${itens.image}" alt="${itens.alt}">
            <div class="informacoes">
                <h2>${itens.nome}</h2>
                <p>${itens.descricao}</p>
                <h3>R$${itens.preco}</h3>
            </div>
            <i class="fa-solid fa-plus align-right ${cursor}" data-addbutton="${itens.UUID}"></i>
        </div>
        `
    })
    document.querySelector("main").innerHTML = itensHtml
}

renderitens()




  
