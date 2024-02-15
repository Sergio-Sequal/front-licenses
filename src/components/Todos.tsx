import { type ListOfTodos } from "../types";
import { Todo } from "./Todo";

interface Props {
  todos: ListOfTodos;
  onRemoveTodo: (id: string) => void;
}

export const Todos: React.FC<Props> = ({ todos, onRemoveTodo }) => {
  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id} className={`${todo.isActive ? "completed" : ""}`}>
          <Todo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            isActive={todo.isActive}
            onRemoveTodo={onRemoveTodo}
          />
        </li>
      ))}
    </ul>
  );
};
