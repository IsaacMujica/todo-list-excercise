import todoList, { todoBase, groupSelected } from './data.js'

export default function getAllTodo() {
  return todoList
}
export function getTodo(id) {
  return todoList.find(todo => String(todo.id) === String(id))
}
export function getTodoFilterByGroup(group = 'group_1') {
  return todoList.filter(todo => String(todo.group) === String(group))
}
export function setTodo(todo) {
  todoList.push(todo)
  return true
}
export function getTodoComment(id) {
  const newTodo = getTodo(id)
  return newTodo.comments
}
export function setTodoComment(id, comment) {
  const newTodo = getTodo(id)
  newTodo.comments = comment
  return true
}
export function deleteTodo(id) {
  const newTodo = getTodo(id)
  if (newTodo !== undefined){
    if (newTodo.is_delete) {
      todoList.splice(
        todoList.findIndex( todo => String(todo.id) === String(id)),
        1
      )
      return true
    }
  }
  return false
}
