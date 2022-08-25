import { groupSelected, todoBase, idGenerator } from './src/helpers/data.js'
import
  getAllTodo, {
    getTodoFilterByGroup,
    setTodo,
    deleteTodo,
    getTodoComment,
    setTodoComment
} from './src/helpers/helper.js'

const $groupSelection = document.getElementById('groupSelection')
const $toDoList       = document.getElementById('toDoList')
const $groupButton    = document.querySelectorAll('.group_button')
const $createToDo     = document.getElementById('createToDo')
const $selectGroup    = document.getElementById('selectGroup')

$groupButton.forEach(function(button) {
  button.addEventListener('click', function(e) {
    handlerGroupSelected(this.dataset.id)
  })
})

$createToDo.addEventListener('click', function(e) {
  handlerCreateToDo()
})

$selectGroup.addEventListener('click', function(e) {
  handlerSelectGroup()
})

function handlerGroupSelected(id) {
  groupSelected[0] = id
  const $titleGroup     = document.getElementById('titleGroup')

  $titleGroup.textContent = `Grupo de trabajo ${id}`
  loadToDoList()
  handlerSelectGroup()
}

function createToDoHTML(data) {
  const $element      = document.createElement('tr')
  const $childName    = document.createElement('td')
  const $childDelete  = document.createElement('td')
  const $childComment = document.createElement('td')
  const $button       = document.createElement('button')
  const $input       = document.createElement('input')
  const $buttonInput = document.createElement('button')

  $button.setAttribute('data-id', data.id)
  $button.setAttribute('class', 'btn btn-danger')
  $button.addEventListener('click', function(e) {
    handlerDeleteToDo(this.dataset.id)
  })
  $button.textContent = 'Eliminar'

  $input.setAttribute('data-id', data.id)
  $input.setAttribute('type', 'text')
  $input.setAttribute('placeholder', 'Escribe un comentario')
  $buttonInput.setAttribute('data-id', data.id)
  $buttonInput.setAttribute('class', 'btn btn-success')
  $buttonInput.addEventListener('click', function(e) {
    handlerInsertComment(this.dataset.id)
  })
  $buttonInput.textContent    = 'Enviar comentario'

  $childName.textContent = data.name
  $element.append($childName)
  if (data?.is_delete)
    $childDelete.append($button)
  else
    $childDelete.textContent = 'No se puede eliminar'
  if (data.comments !== '')
    $childComment.textContent = getTodoComment(data.id)
  else {
    $childComment.append($input)
    $childComment.append($buttonInput)
  }
  $element.append($childComment)
  $element.append($childDelete)
  return $element
}

function handlerCreateToDo() {
  const newTodo = {...todoBase}
  const $nameToDo   = document.getElementById('nameToDo').value
  const $deleteToDo = document.querySelector('#deleteToDo').checked
  const group       = `group_${groupSelected}`

  if ($nameToDo !== '') {
    newTodo.id        = `${idGenerator()}`
    newTodo.name      = $nameToDo
    newTodo.group     = group
    newTodo.is_delete = $deleteToDo

    if(setTodo(newTodo))
      loadToDoList()
  }
}

function handlerDeleteToDo(id) {
  if(deleteTodo(id))
    loadToDoList()
}

function loadToDoList() {
  const $listDisplay = document.querySelector('#listDisplay > tbody')
  const newTodoList  = getTodoFilterByGroup(`group_${groupSelected[0]}`)
  $listDisplay.innerHTML = ''
  newTodoList.forEach(todo => {
    const todoHTML = createToDoHTML(todo)
    $listDisplay.append(todoHTML)
  })
}

function handlerSelectGroup() {
  $groupSelection.classList.toggle('d-none')
  $toDoList.classList.toggle('d-none')
}

function handlerInsertComment(id) {
  const $comment = document.querySelector(`input[type="text"][data-id="${id}"]`).value
  if ($comment !== '')
    if (setTodoComment(id, $comment))
      loadToDoList()
}