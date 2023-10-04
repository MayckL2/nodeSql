// import deleta from './deleta.js'

let retorno = document.querySelector('#retorno')

// REQUISIÇÃO TIPO GET
window.addEventListener('load', () => {
    carregaDados()
})

async function carregaDados(){
    const res = await fetch('http://localhost:3000/filmes', {
        method: 'GET',
        headers: {
            "Content-Type": "application/json",
        },
    })
    const dados = await res.json()

    console.log(dados)

    retorno.innerHTML = ''

    // REDERIZA TODOS OS DADOS NA TELA
    for (let i = 0; i < dados.data.length; i++) {
        retorno.innerHTML += `
        <div class='border-b-2 border-purple-900 relative'>
            <p>Titulo: ${dados.data[i].titulo}</p> 
            <p>Conteudo: ${dados.data[i].conteudo}</p>
            <button onclick='deleta(${dados.data[i].id})' class='absolute top-4 right-4 bg-red-700 hover:bg-red-900 px-4 py-2 text-white'><img src="img/trash.png" class="w-4" alt="lapis de edição"></button>
            <button onclick='editar(${dados.data[i].id})' class='absolute top-4 right-28 bg-orange-500 hover:bg-orange-700 px-4 py-2 text-white'><img src="img/pencil.png" class="w-4" alt="lapis de edição"></button>   
        </div>
        `;
    }
}

// REQUISIÇÃO TIPO POST
document.querySelector('#salvaFilme').addEventListener('click', async ()=>{
    let nomeFilme = document.querySelector('#nomeFilme').value
    let sinopseFilme = document.querySelector('#sinopseFilme').value

    const res = await fetch('http://localhost:3000/filmes', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status: 'sucess', nome: nomeFilme, sinopse: sinopseFilme})
    })
    const dados = await res.json()

    if(dados.status == 'sucesso'){
        document.querySelector('#modalCadastro').classList.add('hidden')
        carregaDados()
    }

    console.log(dados)
})

// ABRE MODAL DE CADASTRO
document.querySelector('#post').addEventListener('click', () => {
    document.querySelector('#modalCadastro').classList.remove('hidden')
})

// FECHA MODAL DE CADASTRO
document.querySelector('#fechaAside').addEventListener('click', ()=>{
    document.querySelector('#modalCadastro').classList.add('hidden')
})

// REQUISIÇÃO TIPO PUT
document.querySelector('#put').addEventListener('click', async () => {
    let nome = document.querySelector('#nomeFilmeEd').value
    let sinopse = document.querySelector('#sinopseFilmeEd').value

    const res = await fetch('http://localhost:3000/filmes', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status: 'sucess', id: sessionStorage.getItem('id'), nome: nome, sinopse: sinopse})
    })
    const dados = await res.json()

    if(dados.status == 'sucesso'){
        document.querySelector('#modalEdicao').classList.add('hidden')
        carregaDados()
    }

    console.log(dados)
})

// MODAL DE EDIÇÃO
async function editar(e){
    const res = await fetch('http://localhost:3000/filmesConsulta', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status: 'sucess', id: e})
    })
    const dados = await res.json()

    console.log(dados)

    document.querySelector('#modalEdicao').classList.remove('hidden')

    document.querySelector('#nomeFilmeEd').value = dados.data[0].titulo
    document.querySelector('#sinopseFilmeEd').value = dados.data[0].conteudo
    sessionStorage.setItem("id", e)
}

// FECHA MODAL DE EDIÇÃO
document.querySelector('#fechaAsideEdicao').addEventListener('click', ()=>{
    document.querySelector('#modalEdicao').classList.add('hidden')
    sessionStorage.removeItemItem("id")
})

// REQUISIÇÃO TIPO DELETE
async function deleta(e) {

    console.log(e)

    const res = await fetch('http://localhost:3000/filmes', {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({status: 'sucess', id: e})
    })
    const dados = await res.json()

    if(dados.status == 'sucesso'){
        carregaDados()
    }

    console.log(dados)
}
