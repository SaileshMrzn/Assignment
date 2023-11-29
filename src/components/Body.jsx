import { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineDelete } from "react-icons/ai";

export default function Body() {
  const [todos, setTodos] = useState([]);
  const [tasks, setTasks] = useState("");

  //get tasks from mock api
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((result) => {
        setTodos(result.data);
      })
      .catch((err) => console.log(err));
  }, []);

  //Task addition
  const handleAdd = () => {
    const newId = `task_${todos.length}`;
    sessionStorage.setItem(newId, tasks);
    setTodos([...todos, { id: todos.length + 1, title: tasks }]);
    setTasks("");
  };

  //Task deletion
  const handleDelete = (id) => {
    console.log(id);
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    sessionStorage.removeItem(`task_${id}`);
    setTodos(updatedTodos);
  };

  //Update task status on hovering checkbox
  const handleDone = (e) => {
    const checkboxes = document.querySelectorAll(".check");

    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        checkbox.title = "completed";
        checkbox.parentElement.classList.add("line-through");
      } else {
        checkbox.title = "pending";
        checkbox.parentElement.classList.remove("line-through");
      }
    });
  };

  //styling
  return (
    <>
      <div className="bg-slate-900 h-screen text-white text-center flex items-center flex-col justify-center">
        <h1 className="my-6">Task Manager</h1>
        <div className="bg-slate-800 h-[30rem] w-[25rem] rounded-md p-4">
          <h2>Enter a new task</h2>
          <div className="flex items-center m-2">
            <input
              type="text"
              className="h-[3rem] w-[85%] rounded-md my-2 text-black pl-3"
              value={tasks}
              required
              onChange={(e) => setTasks(e.target.value)}
            ></input>
            <button
              className="bg-green-500 h-[3rem] w-[2.75rem] rounded-md ml-2"
              onClick={handleAdd}
            >
              Add
            </button>
          </div>

          <h2>Your list:</h2>

          <div className="overflow-y-scroll overflow-x-hidden no-scrollbar h-[20rem]">
            {todos.length === 0 ? (
              <div className="m-2">
                <h2>No todos yet</h2>
              </div>
            ) : (
              todos
                .filter((todo) => todo.id < 4 || todo.id > 200)
                .map((todo) => {
                  return (
                    <div
                      key={todo.id}
                      className="bg-violet-900 h-[3.5rem] w-100 rounded-md m-2 text-left pl-3 flex items-center justify-between group"
                    >
                      <input
                        type="checkbox"
                        className="check"
                        id="check"
                        title="pending"
                        onClick={handleDone}
                      />
                      {todo.title === ""
                        ? (todo.title = "Untitled")
                        : todo.title.charAt(0).toUpperCase() +
                          todo.title.slice(1)}
                      <div
                        onClick={() => handleDelete(todo.id)}
                        className="bg-red-600 h-[3.5rem] w-[2rem] flex items-center justify-center relative right-0 rounded-md
                        cursor-pointer translate-x-[3rem] invisible group-hover:translate-x-0 group-hover:visible transition-all duration-400 ease-in-out"
                      >
                        <AiOutlineDelete />
                      </div>
                    </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
    </>
  );
}
