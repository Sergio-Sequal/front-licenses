// Esta es una buena práctica al momento de declarar los types en ts dado que me permite reutilizarlos

export interface Todo {
    id: string
    title: string
    completed: boolean
}

export type ListOfTodos = Todo[]