
// ========================================
// ELEMENTOS DO DOM
// ========================================

const botaosom = document.querySelector(".botao-som")
const video = document.querySelector(".video")
const botaoInfo = document.querySelector(".link-info")
const modal = document.querySelector(".modal")
const botaoFecharModal = document.querySelector(".fechar-modal")
const audio = document.querySelector(".audio")
const botaoAssistir = document.querySelector(".link-assistir")

const listaFilmes = document.querySelector("#lista-filmes")
const botaoAnterior = document.querySelector(".anterior")
const botaoProximo = document.querySelector(".proximo")


// ========================================
// CATÁLOGO DE FILMES
// ========================================

const filmes = [

    {
        titulo: "Stranger Things",
        descricao: "Uma série de ficção científica ambientada na pequena cidade de Hawkins.",
        genero: "Ficção científica",
        ano: 2016,
        imagem: "img/f1.jpg",
        video: "video/strangerthings.mp4"
    },

    {
        titulo: "Round 6",
        descricao: "Uma crítica social sobre desigualdade, competição e até onde o ser humano é capaz de chegar por dinheiro.",
        genero: "Drama",
        ano: 2023,
        imagem: "img/round6.jpg",
        video: "video/round6.mp4"
    },

    {
        titulo: "A Jaula",
        descricao: "Um drama de suspense envolvendo acontecimentos inesperados.",
        genero: "Suspense",
        ano: 2022,
        imagem: "img/jaula.jpg",
        video: "video/jaula.mp4"
    },

    {
        titulo: "Moonfall",
        descricao: "Uma força misteriosa ameaça a Terra e coloca a humanidade em risco.",
        genero: "Ficção científica",
        ano: 2022,
        imagem: "img/moonfall.jpg",
        video: "video/moonfall.mp4"
    },

    {
        titulo: "The Equalizer",
        descricao: "Um homem com habilidades excepcionais decide enfrentar criminosos perigosos.",
        genero: "Ação",
        ano: 2021,
        imagem: "img/equalizer.jpg",
        video: "video/equalizer.mp4"
    },

    {
        titulo: "Chokehold",
        descricao: "Uma história de drama e tensão envolvendo uma família em conflito.",
        genero: "Drama",
        ano: 2023,
        imagem: "img/chokehold.jpg",
        video: "video/chokehold.mp4"
    },

    {
        titulo: "Abyss",
        descricao: "Uma missão perigosa leva um grupo a enfrentar situações extremas.",
        genero: "Aventura",
        ano: 2023,
        imagem: "img/abyss.jpg",
        video: "video/abyss.mp4"
    },

    {
        titulo: "Lift",
        descricao: "Uma equipe especializada planeja um grande roubo internacional.",
        genero: "Ação",
        ano: 2024,
        imagem: "img/lift.jpg",
        video: "video/lift.mp4"
    }

]


// ========================================
// ESTADO DA APLICAÇÃO
// ========================================

let filmeSelecionado = filmes[0]

let paginaAtual = 0

let filmesPorPagina = 4

let animandoCarrossel = false

function definirFilmesPorPagina() {

    if (window.innerWidth <= 600) {

        filmesPorPagina = 2

    } else if (window.innerWidth <= 900) {

        filmesPorPagina = 3

    } else {

        filmesPorPagina = 4

    }

}

window.addEventListener("resize", function () {

    definirFilmesPorPagina()

    paginaAtual = 0

    carregarFilmes()

})


// ========================================
// CONTROLE DO SOM
// ========================================

botaosom.addEventListener("click", ligaSom)

function ligaSom() {

    video.muted = !video.muted

    if (video.muted) {
        botaosom.textContent = "🔇"
    } else {
        botaosom.textContent = "🔊"
    }

}


// ========================================
// ÁUDIO DA ABERTURA
// ========================================

function tocarAudio() {

    audio.currentTime = 0

    audio.play().catch(function () {

        console.log("O navegador bloqueou o áudio automático.")

    })

}

document.addEventListener("click", tocarAudio, { once: true })



// ========================================
// CARREGAR FILMES
// ========================================

function carregarFilmes(direcao = "direita") {

    if (animandoCarrossel) {
        return
    }

    animandoCarrossel = true


    // Define a direção da animação
    if (direcao === "direita") {

        listaFilmes.style.transform = "translateX(-20px)"

    } else {

        listaFilmes.style.transform = "translateX(20px)"

    }


    listaFilmes.classList.add("animando")


    setTimeout(function () {

        // Limpa os filmes atuais
        listaFilmes.innerHTML = ""


        const inicio = paginaAtual * filmesPorPagina

        const fim = inicio + filmesPorPagina

        const filmesPagina = filmes.slice(inicio, fim)


        filmesPagina.forEach(function (filme, index) {

            const imagem = document.createElement("img")

            imagem.src = filme.imagem

            imagem.alt = filme.titulo

            imagem.classList.add("imagem-carrossel")


            imagem.addEventListener("click", function () {

                const indiceReal = inicio + index

                selecionarFilme(indiceReal)

            })


            listaFilmes.appendChild(imagem)

        })


        atualizarBotoes()
        destacarFilmeSelecionado()


        // Remove a animação
        listaFilmes.classList.remove("animando")

        listaFilmes.style.transform = "translateX(0)"


        // Libera novos cliques
        setTimeout(function () {

            animandoCarrossel = false

        }, 300)


    }, 300)

}

// ========================================
// DESTACAR FILME SELECIONADO
// ========================================

function destacarFilmeSelecionado() {

    const inicio = paginaAtual * filmesPorPagina
    const fim = inicio + filmesPorPagina

    const imagens = document.querySelectorAll(".imagem-carrossel")

    imagens.forEach(function (imagem, index) {

        const indiceReal = inicio + index

        if (indiceReal === filmes.indexOf(filmeSelecionado)) {

            imagem.classList.add("selecionado")

        } else {

            imagem.classList.remove("selecionado")

        }

    })

}

// ========================================
// NAVEGAÇÃO - BOTÃO ANTERIOR
// ========================================

botaoAnterior.addEventListener("click", function () {

    if (paginaAtual > 0) {

        paginaAtual--

        carregarFilmes("esquerda")

    }

})


// ========================================
// NAVEGAÇÃO - BOTÃO PRÓXIMO
// ========================================

botaoProximo.addEventListener("click", function () {

    const totalPaginas =
        Math.ceil(filmes.length / filmesPorPagina)


    if (paginaAtual < totalPaginas - 1) {

        paginaAtual++

        carregarFilmes("direita")

    }

})


// ========================================
// ATUALIZAR BOTÕES
// ========================================

function atualizarBotoes() {

    const totalPaginas =
        Math.ceil(filmes.length / filmesPorPagina)


    botaoAnterior.disabled =
        paginaAtual === 0


    botaoProximo.disabled =
        paginaAtual === totalPaginas - 1

}


// ========================================
// SELECIONAR FILME
// ========================================

function selecionarFilme(index) {

    filmeSelecionado = filmes[index]


    // ========================================
    // DESTAQUE DO FILME SELECIONADO
    // ========================================

    const inicio = paginaAtual * filmesPorPagina
    const posicaoNaPagina = index - inicio

    const imagens = document.querySelectorAll(".imagem-carrossel")

    imagens.forEach(function (imagem) {

        imagem.classList.remove("selecionado")

    })

    if (imagens[posicaoNaPagina]) {

        imagens[posicaoNaPagina].classList.add("selecionado")

    }


    // ========================================
    // ATUALIZA TÍTULO
    // ========================================

    document.querySelector(".capa-titulo").textContent =
        filmeSelecionado.titulo


    // ========================================
    // ATUALIZA DESCRIÇÃO
    // ========================================

    document.querySelector(".capa-descricao").textContent =
        filmeSelecionado.descricao


    // ========================================
    // INICIA A TRANSIÇÃO
    // ========================================

    video.classList.add("trocando")


    setTimeout(function () {

        // Para o vídeo atual
        video.pause()


        // Mantém o vídeo sem som
        // para permitir o autoplay
        video.muted = true

        botaosom.textContent = "🔇"


        // Atualiza o vídeo
        video.src = filmeSelecionado.video

        video.load()


        // Reproduz o novo vídeo
        video.play().catch(function (erro) {

            console.log(
                "Não foi possível reproduzir o vídeo:",
                erro
            )

        })


        // Atualiza o botão
        botaoAssistir.textContent = "Pausar"


        // Faz o vídeo reaparecer
        video.classList.remove("trocando")

    }, 500)

}
// ========================================
// BOTÃO ASSISTIR
// ========================================

botaoAssistir.addEventListener("click", assistirFilme)

function assistirFilme() {

    if (video.paused) {

        video.muted = false

        botaosom.textContent = "🔊"

        video.play()

        botaoAssistir.textContent = "Pausar"

    } else {

        video.pause()

        botaoAssistir.textContent = "Assistir"

    }

}

// ========================================
// MODAL
// ========================================

botaoInfo.addEventListener("click", mostrarModal)


function mostrarModal() {

    document.querySelector(".modal-titulo").textContent =
        filmeSelecionado.titulo


    document.querySelector(".modal-descricao").textContent =
        filmeSelecionado.descricao


    document.querySelector(".modal-genero").textContent =
    filmeSelecionado.genero || "Não informado"


    document.querySelector(".modal-ano").textContent =
        filmeSelecionado.ano


    modal.style.display = "block"

}


// ========================================
// FECHAR MODAL
// ========================================

botaoFecharModal.addEventListener("click", esconderModal)

modal.addEventListener("click", esconderModal)


function esconderModal(event) {

    if (
        event.target === modal ||
        event.target === botaoFecharModal
    ) {

        modal.style.display = "none"

    }

}

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {

        modal.style.display = "none"

    }

})

// ========================================
// INICIALIZAÇÃO
// ========================================

definirFilmesPorPagina()
carregarFilmes()