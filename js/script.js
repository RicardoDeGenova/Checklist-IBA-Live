moment.locale('pt-br')

const checklist = document.getElementById('checklist')
const alertarAs = document.getElementById('alertarAs')
const btnPararAlerta = document.getElementById('btnPararAlerta')
const selecionarTodos = [...document.getElementsByClassName('select-input')]
const selecionarTodosOsMinimizers = [...document.getElementsByClassName('minimizerMaximizer')]

let displayTimer
let alertaRemovido = false

const infoCulto = () => {
    const day = moment().day();
    const today = moment().format('DD/MM/YYYY')

    if (day == 0 || day == 3)
        return `Culto da Família - ${today}`

    if (day == 1)
        return `Culto das Mulheres - ${today}`

    if (day == 5)
        return `Culto dos Jovens - ${today}`

    return 'Sem Culto'
}

const configInicial = {
    id: 'ConfigInicial',
    todo: [
        { title: 'Ligar Projetor' },
        { title: 'Ligar TV' },
        { title: 'Confirmar sequência de louvores' },
        { title: 'Verificar conexão com internet' },
        { title: 'Abrir OBS' },
        { title: 'Abrir Holyrics' }
    ]
}

const prepararOBS = {
    id: 'PrepararOBS',
    todo: [
        { title: 'Canal Captura de Entrada de Áudio' },
        { title: 'Projetar tela do OBS' },
        { title: 'Atualizar cache do Holyrics' },
        { title: 'Atualizar cache de Imagem' },
    ]
}

const prepararHolyrics = {
    id: 'PrepararHolyrics',
    todo: [
        { title: 'Versículo' },
        { title: 'Louvores (Caso não tenha o louvor, pesquisar com Ctrl + Shift + H)' },
        { title: 'Louvores com até 3 linhas' },
        { title: 'Checar se louvores é exibido' },
        { title: 'Flyers/Vídeos' }
    ]
}

const prepararTransmissaoYt = {
    id: 'PrepararTransmissaoYt',
    todo: [
        { title: 'Abrir transmissão do Youtube' },
        { title: 'Adicionar título: ' + infoCulto() },
        { title: 'Atualizar thumbnail' },
        { title: 'Privacidade - Público' }
    ]
}

const prepararTransmissaoFb = {
    id: 'PrepararTransmissaoFb',
    todo: [
        { title: 'Abrir transmissão do Facebook' },
        { title: 'Adicionar título: ' + infoCulto().culto },
        { title: 'Adicionar descrição (copiar do Youtube)' },
    ]
}

const minutos5 = {
    id: 'CincoMinutos',
    todo: [
        { title: 'Posicionar câmera em quem dará abertura' },
        { title: 'Esmaecer para preto' },
        { title: 'Iniciar Transmissão no OBS' },
        { title: 'Esmarcer para iniciar o timer' },
        { title: 'Verificar se transmissão iniciou' },
        { title: 'Divulgar link da transmissão' },
        { title: 'Liga câmera (bateria SEM escrito)' },
        { title: 'Colocar a bateria inicial para carregar' }
    ]
}

const abertura = {
    id: 'Abertura',
    todo: [
        { title: 'Exibir o nome do pregador por 30s' },
        { title: 'Verificar qualidade da transmissão' }
    ]
}

const dizimo = {
    id: 'Dizimo',
    todo: [
        { title: 'Ao iniciar louvor, exibir dados bancários' },
        { title: 'Após oração, remover dados bancários' }
    ]
}

const encerrarTransmissao = {
    id: 'EncerrarTransmissao',
    todo: [
        { title: 'Esmaecer para preto' },
        { title: 'Interromper transmissão no OBS' },
        { title: 'Encerrar transmissão no Youtube' },
        { title: 'Desligar câmera' },
        { title: 'Coloca bateria para carregar' },
        { title: 'Remover louvores do favoritos' },
        { title: 'Remover versículos do favoritos' },
        { title: 'Fechar Holyrics' },
        { title: 'Fechar OBS' },
        { title: 'Fechar Youtube' }
    ]
}

const todos = [
    configInicial,
    prepararOBS,
    prepararHolyrics,
    prepararTransmissaoYt,
    prepararTransmissaoFb,
    minutos5,
    abertura,
    dizimo,
    encerrarTransmissao
]

todos.forEach(item => renderizarItemDoChecklist(item))

selecionarTodos.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        checkbox.checked ?
            selecionarOuLimparTodosDoGrupo(checkbox, true) :
            selecionarOuLimparTodosDoGrupo(checkbox, false)
    })
})

selecionarTodosOsMinimizers.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const target = arrow.dataset.target
        const input = document.querySelector(`input[data-target="${target}"]`);
        const isChecked = input.checked

        minimizarOuMaximizarTodosDoGrupo(arrow, isChecked)
    })
})

btnPararAlerta.addEventListener('click', () => {
    pararAlerta()
})

alertarAs.addEventListener('change', function () {
    alertaRemovido = false;
    checklist.classList.remove('alert-hour')
})

displayTimer = setInterval(() => {
    hoje.innerHTML = moment().format('LL');
    timer.innerHTML = moment().format('HH:mm:ss');
    verificarEAplicarAlerta()
}, 1000)

function renderizarItemDoChecklist(obj) {
    const element = document.getElementById(obj.id);

    obj.todo.forEach(item => element.innerHTML += `
        <div class="form-check check-all">
            	<label class="form-check-label">
            		<input class="form-check-input" type="checkbox">  
            		${item.title}
        	</label>
        </div>`)
}

function verificarEAplicarAlerta() {
    const horarioAtual = moment().format('HH:mm')
    const horarioDoAlerta = alertarAs.value

    if (horarioDoAlerta == '')
        return false

    if (horarioAtual >= horarioDoAlerta)
        return aplicarAlerta()
}

function aplicarAlerta() {
    if (!alertaRemovido)
        checklist.classList.add('alert-hour')
}

function pararAlerta() {
    alertaRemovido = true;
    checklist.classList.remove('alert-hour')
}

function selecionarOuLimparTodosDoGrupo(e, value) {
    const target = e.dataset.target
    const elements = document.querySelectorAll(`#${target} input[type="checkbox"]`)

    elements.forEach(checkbox => {
        checkbox.checked = value
    })
}

function minimizarOuMaximizarTodosDoGrupo(arrow, isChecked) {
    const maximizeIcon = '↸'
    const minimizeIcon = '↘'
    const form = document.getElementById(arrow.dataset.target)

    if (isChecked) {
        form.classList.add('hide-checkbox')
        arrow.innerHTML = maximizeIcon
    } else {
        form.classList.remove('hide-checkbox')
        arrow.innerHTML = minimizeIcon
    }
}