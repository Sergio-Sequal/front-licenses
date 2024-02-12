import { useState } from "react";
import Layout from "./layout/Layout";

const mockTodos = [
  {
    id: "1",
    title: "todo 1",
    completed: false,
  },
  {
    id: "2",
    title: "todo 2",
    completed: false,
  },
  {
    id: "3",
    title: "todo 3",
    completed: false,
  },
];

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos);

  const handleRemove = (id: string): void => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div><Layout/></div>
    // <div className="todoapp">
    //   <Todos
    //   onRemoveTodo={handleRemove}
    //   todos={todos}
    //   />
    // </div>
  );
};

export default App;
