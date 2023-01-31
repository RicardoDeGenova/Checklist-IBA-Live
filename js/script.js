const checklist = document.getElementById('checklist')
const alertarAs = document.getElementById('alertarAs')
const btnPararAlerta = document.getElementById('btnPararAlerta')

let alertaRemovido = false;
moment.locale('pt-br')

const configInicial = {
    id: 'ConfigInicial',
    todo: [{
            title: 'Ligar Projetor',
            popover: 'Controle no altar'
        },
        {
            title: 'Ligar TV',
        },
        {
            title: 'Confirmar sequência de louvores',
        },
        {
            title: 'Verificar conexão com internet',
        },
        {
            title: 'Abrir OBS',
        },
        {
            title: 'Abrir Holyrics'
        }
    ]
}

const prepararOBS = {
    id: 'PrepararOBS',
    todo: [
        'Canal Captura de Entrada de Áudio',
        'Projetar tela do OBS',
        'Atualizar cache do Holyrics',
        'Atualizar cache de Imagem'
    ]
}

const prepararHolyrics = {
    id: 'PrepararHolyrics',
    todo: [
        'Versículo',
        'Louvores (Caso não tenha o louvor, pesquisar com Ctrl + Shift + H)',
        'Louvores com até 3 linhas',
        'Checar se louvores é exibido',
        'Flyers/Vídeos'
    ]
}

const data = new Date(Date.now());
const cultoData =  data.toLocaleString().split(',')[0];

const cultoTitulo = () => {
    const day = (data.getDay() %7);
    
    return day === 1 ? 'Culto de Mulheres' : 
    day === 6 ? 'Culto de Jovens' : 
    'Culto da Família';
}

const prepararTransmissaoYt = {
    id: 'PrepararTransmissaoYt',
    todo: [
        'Abrir transmissão do Youtube',
        'Adicionar título: ' + cultoData + ' - ' + cultoTitulo(),
        'Atualizar thumbnail',
        'Privacidade - Público'
    ]
}

const prepararTransmissaoFb = {
    id: 'PrepararTransmissaoFb',
    todo: [        
        'Abrir transmissão do Facebook',
        'Adicionar título: ' + cultoData + ' - ' + cultoTitulo(),
        'Adicionar descrição (copiar do Youtube)',
        'Posicionar câmera em quem dará abertura'
    ]
}

const minutos5 = {
    id: 'CincoMinutos',
    todo: [{
            title: 'Esmaecer para preto',
        },
        {
            title: 'Iniciar Transmissão no OBS',
        },
        {
            title: 'Esmarcer para iniciar o timer',
        },
        {
            title: 'Verificar se transmissão iniciou',
        },
        {
            title: 'Divulgar link da transmissão',
            popover: 'Estamos Online: https://www.youtube.com/c/ibasjbv/live'
        },
        {
            title: 'Liga câmera (bateria SEM escrito)',
        },

        {
            title: 'Colocar a bateria inicial para carregar'
        }
    ]
}

const abertura = {
    id: 'Abertura',
    todo: [
        'Exibir o nome do pregador por 30s',
        'Verificar qualidade da transmissão'
    ]
}

const dizimo = {
    id: 'Dizimo',
    todo: [
        'Ao iniciar louvor, exibir dados bancários',
        'Após oração, remover dados bancários'
    ]
}

const encerrarTransmissao = {
    id: 'EncerrarTransmissao',
    todo: [
        'Esmaecer para preto',
        'Interromper transmissão no OBS',
        'Encerrar transmissão no Youtube',
        'Desligar câmera',
        'Coloca bateria para carregar',
        'Remover louvores do favoritos',
        'Remover versículos do favoritos',
        'Fechar Holyrics', 'Fechar OBS',
        'Fechar Youtube'
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

const selecionarTodos = [...document.getElementsByClassName('select-input')]
selecionarTodos.forEach(checkbox => {
    checkbox.addEventListener('click', () => {
        checkbox.checked ?
            selecionarOuLimparTodosDoGrupo(checkbox, true) :
            selecionarOuLimparTodosDoGrupo(checkbox, false)
    })
})

btnPararAlerta.addEventListener('click', () => {
    pararAlerta()
})

alertarAs.addEventListener('change', function() {
    alertaRemovido = false;
    checklist.classList.remove('alert-hour')
})

const displayTimer = setInterval(() => {
    hoje.innerHTML = moment().format('LL');
    timer.innerHTML = moment().format('HH:mm:ss');
    verificarEAplicarAlerta()
}, 1000)

function renderizarItemDoChecklist(obj) {
    const element = document.getElementById(obj.id);

    obj.todo.forEach(item => element.innerHTML += `
        <div class="form-check check-all">
            ${renderizarTitle(item)}
            ${renderizarPopover(item)}
        </div>`)
}

function renderizarTitle(item) {
    return `<label class="form-check-label">
            <input class="form-check-input" type="checkbox">  
            ${item.title ? item.title : item}
        </label>`
}

function renderizarPopover(item) {
    return item.popover ? `
        <i class="fa-solid fa-link"
            data-bs-toggle="popover" 
            data-bs-content="${item.popover}">
        </i>` :
        ''
}

function verificarEAplicarAlerta() {
    let horarioAtual = moment().format('HH:mm')
    let horarioDoAlerta = alertarAs.value

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

const selecionarTodosOsMinimizers = [...document.getElementsByClassName('minimizerMaximizer')]
selecionarTodosOsMinimizers.forEach(arrow => {
    arrow.addEventListener('click', () => {
        const target = arrow.dataset.target
        const input = document.querySelector(`input[data-target="${target}"]`);
        const isChecked = input.checked

        minimizarOuMaximizarTodosDoGrupo(arrow, isChecked)
    })
})

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