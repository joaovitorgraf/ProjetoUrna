/*Variável de controle de interface*/
let seuVotoPara = document.querySelector('.info-voto-titulo span')
let cargo = document.querySelector('.info-voto-cargo')
let descricao = document.querySelector('.info-voto-detalhes')
let aviso = document.querySelector('.instrucoes')
let lateral = document.querySelector('.info-imagem')
let numeros = document.querySelector('.info-voto-numeros')

/*Variável de controle de ambiente*/
let etapaAtual = 0
let numero = ''
let votoBranco = false
let votos = []

function comecarEtapa() {
    // seleciona a etapa atual com base no valor
    // da variável etapaAtual
    let etapa = etapas[etapaAtual]

    // inicializando variáveis para armazenar o HTML
    // dos números de votação
    let numeroHtml = ''
    let numero = ''
    let votoBranco = false

    // criar os elementos HTML para exibir os números de votação
    for (let i = 0; i < etapa.numeros; i++) {
        // se for o primeiro número, adiciona a classe 'pisca' para animação
        if (i === 0) {
            numero += '<div class="numero pisca"></div>'
        } else {
            numero += '<div class="numero"></div>'
        }
    }

    // Escondendo o elemento HTML que exibe "Seu voto para..."
    seuVotoPara.style.display = 'none'

    // Atualizando o elemento HTML que exibe titulo de etapa (cargo)
    cargo.innerHTML = etapa.titulo

    // Limpa o elemento HTML que exibe a descrição do candidato
    descricao.innerHTML = ''

    // Escondendo o aviso de voto nulo/branco
    aviso.style.display = 'none'

    // Limpa o Elemento HTML que exibe as fotos dos candidatos
    lateral.innerHTML = ''

    // atualizar o elemento HTML que exibe os números de votação
    numeros.innerHTML = numeroHtml
}

function atualizarInterface() {
    // selecionado a etapa atual 
    let etapa = etapas[etapaAtual]

    // filtra os candidatos da etapa atual para encontrar
    // o candidato correspondente ao número digitado
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true
        } else {
            return false
        }
    })

    //se um candidato correspondente foi encontrado
    if (candidato.lenght > 0) {
        // seleciona o primeiro candidato da lista 
        //(pode haver apenas um candidato com o mesmo número)
        candidato = [0]

        // exibe o elemento HTML que mostra "seu voto para..."
        seuVotoPara.style.display = 'block'

        // exibe o aviso de voto branco/nulo
        aviso.style.display = 'block'

        // atualiza o elemento HTML que exibe o nome, partido e vice 
        descricao.innerHtml = `Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}<br/>Vice: ${candidato.vice}`

        // cria o HTML para exibir as fotos do candidato
        descricao.innerHtml = ''
        for (let i in candidato.fotos) {
            if (candidato.fotos[i].small) {
                // verifica se a foto é pequena (small) e adiciona a 
                //classe 'small' conforme necessário
                fotosHtml += `<div class="info-imagem small"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            } else {
                fotosHtml += `<div class="info-imagem"><img src="images/${candidato.fotos[i].url}" alt=""/>${candidato.fotos[i].legenda}</div>`
            }
        }

        //atualiza o elemento HTML que exibe as fotos do candidatos
        lateral.innerHTML = fotosHtml
    }else{ // se nenhum candidato correspondente foi encontrado
        // exibe o elemento HTML que mostra "Seu voto para..."
        seuVotoPara.style.display = 'block'

        // exibe o aviso de voto nulo/branco
        aviso.style.display = 'block'

        // atualiza o elemento HTML que exibe o aviso de voto nulo
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>'

    }
}

function clicou(n) {
    // selecionando o elemento HTML com a classe 'numero pisca'
    let elNumero = document.querySelector('.numero.pisca')

    // Verifica se o elemento foi encontrado
    if (elNumero !== null) {
        // define o valor do número no elemento HTML
        elNumero.innerHTML = n

        // concatena o número ao valor da variável 'numero'
        numero = `${numero}${n}`

        // remove a class 'pisca' do número atual
        elNumero.classList.remove('pisca')

        // verificando se existe um próximo número na sequencia
        if (elNumero.nextElementSibling !== null) {
            // adiciona a classe 'pisca' ao proximo numero na sequencia
            elNumero.nextElementSibling.classList.add('pisca')
        } else {
            // se não houver o próximo número, chama a função para atualizar a interface
            atualizarInterface()
        }
    }
}

function branco() {
    //Verificar se nenhum número foi digitado
    if(numero === ''){
        //Define a variável votoBranco como true para indicar que voto é branco
        votoBranco = true

        //Exibe o elmento HTML que mostra "seu voto parap..."
        seuVotoPara.style.display = 'block'

        //Exibe o aviso de voto branco
        aviso.style.display = 'block'

        //Atualizando HTML que exibe o aviso de voto branco
        descricao.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>'

        //Limpa o conteudo dos elementos HTML que exibe os números e as fotos dos canditados
        numero.innerHTML = ''
        lateral.innerHTML = ''
    }else{
        //Se algum número já foi digitado, exibe um alerta informando que não é possível votar em branco
        alert("Para votar em BRANCO, não é possível digitar nenhum número")

    }
}

function corrige() {
    comecarEtapa()
}

function confirma() {
    //selecionar a etapa atual
    let etapa = etapas[etapaAtual]

    //Inicializando uma variável se o voto foi confirmado
    let votoConfirmado = false

    //Verifica se o voto é em branco
    if (votoBranco == true){
        //Define o votoConfirmado como true
        votoConfirmado = true

        //Adicionar o voto em branco à lista de votos
        votos.push({
            etapa: etapas[etapaAtual].titulo,
            voto: 'branco'
        })
    }

    //Exiber uma mensagem no console confirmado o voto em branco
    console.log("Confirmando como Branco")
}

comecarEtapa()