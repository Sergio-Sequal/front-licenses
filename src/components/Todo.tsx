import { type Todo as TodoType } from "../types";

//De esta manera podemos reutilizar los types de Todo
interface Props extends TodoType {
    onRemoveTodo: (id: string) => void;
}

export const Todo: React.FC<Props> = ({ id, title, isActive, onRemoveTodo }) => {
    return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={isActive}
                onChange={() => { }}
            />
            <label>{title}</label>
            <button className="destroy" onClick={() => {
                onRemoveTodo(id)
            }} />
        </div>
    );
};
