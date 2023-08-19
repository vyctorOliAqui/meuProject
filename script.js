const modal = document.querySelector('.modal-container')
const tbody = document.querySelector('tbody')
const dirigente = document.querySelector('#m-dirigente')
const inicio = document.querySelector('#m-inicio')
const fim = document.querySelector('#m-fim')
const terri = document.querySelector('#m-terri')
const btnSalvar = document.querySelector('#btnSalvar')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    dirigente.value = itens[index].dirigente
    inicio.value = itens[index].inicio
    fim.value = itens[index].fim
    terri.value = itens[index].terri
    id = index
  } else {
    dirigente.value = ''
    inicio.value = ''
    fim.value = ''
    terri.value = ''
  }
  
}

function editItem(index) {

  openModal(true, index)
}

function deleteItem(index) {
  itens.splice(index, 1)
  setItensBD()
  loadItens()
}

function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.dirigente}</td>
    <td>${item.inicio}</td>
    <td>${item.fim}</td>
    <td>${item.terri}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
    </td>
    <td class="acao">
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnSalvar.onclick = e => {
  
  if (dirigente.value == '' || inicio.value == '' || fim.value == '' || terri.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    itens[id].dirigente = dirigente.value
    itens[id].inicio = inicio.value
    itens[id].fim = fim.value
    itens[id].terri = terri.value
  } else {
    itens.push({'dirigente': dirigente.value, 'inicio': inicio.value, 'fim': fim.value, 'salario': terri.value})
  }

  setItensBD()

  modal.classList.remove('active')
  loadItens()
  id = undefined
}

function loadItens() {
  itens = getItensBD()
  tbody.innerHTML = ''
  itens.forEach((item, index) => {
    insertItem(item, index)
  })

}

const getItensBD = () => JSON.parse(localStorage.getItem('dbfunc')) ?? []
const setItensBD = () => localStorage.setItem('dbfunc', JSON.stringify(itens))

loadItens()


