export const todoList = [
  {
    id: `${idGenerator()}`,
    name: 'ToDo 1',
    group: 'group_1',
    comments: '',
    is_delete: false,
  },
  {
    id: `${idGenerator()}`,
    name: 'ToDo 2',
    group: 'group_2',
    comments: '',
    is_delete: false,
  },
  {
    id: `${idGenerator()}`,
    name: 'ToDo 3',
    group: 'group_3',
    comments: '',
    is_delete: true,
  },
]

export const todoBase = {
  id: `${idGenerator()}`,
  name: 'ToDo 0',
  group: 'group_0',
  comments: '',
  is_delete: false,
}

export function idGenerator() {
  var n = Math.floor(Math.random() * (91 - 65 + 1) + 65)
  var k = Math.floor(Math.random() * 1000000)
  return String.fromCharCode(n).replace(/\\/g, '') + k
}

export const groupSelected = [0]

export default todoList