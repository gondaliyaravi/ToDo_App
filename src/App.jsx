import { useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingTodo, setEditingTodo] = useState('');

  // Add a new todo
  const addTodo = () => {
    if (newTodo.trim() === '') return;
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  // Edit an existing todo
  const startEditTodo = (index) => {
    setEditingIndex(index);
    setEditingTodo(todos[index]);
  };

  const saveEditedTodo = () => {
    if (editingTodo.trim() === '') return;
    const updatedTodos = [...todos];
    updatedTodos[editingIndex] = editingTodo;
    setTodos(updatedTodos);
    setEditingIndex(null);
    setEditingTodo('');
  };

  // Delete a todo
  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>Todo List</h1>

      {/* Add Todo Section */}
      <input
        type="text"
        placeholder="Add a new todo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      />
      <button onClick={addTodo}>Add Todo</button>

      {/* Todo List Table */}
      {todos.length > 0 && (
        <table border="1" style={{ marginTop: '20px', width: '100%' }}>
          <thead>
            <tr>
              <th>#</th>
              <th>Todo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      value={editingTodo}
                      onChange={(e) => setEditingTodo(e.target.value)}
                    />
                  ) : (
                    todo
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <button onClick={saveEditedTodo}>Save</button>
                  ) : (
                    <>
                      <button onClick={() => startEditTodo(index)}>Edit</button>
                      <button onClick={() => deleteTodo(index)}>Delete</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default App;