//https://www.youtube.com/watch?v=QdTHUv79EZc&ab_channel=CodingWithDawid



import "./index.css";
import { useEffect, useState } from "react";

export default function App() {

  const [task, setTask] = useState([]);
  const [addTask, setAddTask] = useState('');

  useEffect(() => {
    if (task.length === 0) return;
    localStorage.setItem('task', JSON.stringify(task));
  }, [task]);

  useEffect(() => {
    const task = JSON.parse(localStorage.getItem('task'));
    setTask(task || []);
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    addTask !== '' && setTask([...task, { text: addTask, done: false }]);
    setAddTask('');
  }

  function handleDelete(id) {
    setTask(prev => {
      const newArr = prev.filter((taskObject, index) => index !== id);
      return newArr;
    });
  }


  function handleEdit(ind, name) {
    setTask((prev) => {
      const newArr = [...prev];
      newArr[ind].text = name;
      return newArr;
    });
  }

  function handleCheckboxChange(done, ind) {
    setTask(prev => {
      const newArr = [...prev];
      newArr[ind].done = done;
      return newArr;
    });
  }

  function getMessage() {
    const percentage = numberComplete / numberTotal * 100;
    if (percentage === 0) {
      return 'Try to do at least one! 🙏';
    }
    if (percentage === 100) {
      return 'Nice job for today! 🏝';
    }
    return 'Keep it going 💪🏻';
  }


  const numberComplete = task.filter(t => t.done).length;
  const numberTotal = task.length;

  return (
    <main>
      <h1>Todo Application</h1>
      <h2>{numberComplete}/{numberTotal} Complete</h2>
      <h3>{getMessage()}</h3>

      <form onSubmit={handleSubmit}>
        <button>+</button>
        <input type="text" placeholder="Enter task ..." value={addTask} onChange={(e) => setAddTask(e.target.value)} />
      </form>

      <ul>
        {
          task.map((item, ind) =>
            <Task
              handleCheckboxChange={(done) => handleCheckboxChange(done, ind)}
              done={item.done}
              handleEdit={(name) => handleEdit(ind, name)}
              handleDelete={() => handleDelete(ind)}
              key={ind}>
              {item.text}
            </Task>
          )
        }
      </ul>
    </main>
  );
}

function Task({ handleCheckboxChange, handleDelete, done, handleEdit, children }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <li>
      <input className={done ? 'checked' : ''} onChange={() => handleCheckboxChange(!done)} checked={done} type="checkbox" />
      {!editMode ? <p className={done ? 'checked' : ''} onClick={() => setEditMode(!editMode)} >{children}</p> :
        <form onSubmit={ev => { ev.preventDefault(); setEditMode(false); }}>
          <input type="text" value={children} onChange={e => handleEdit(e.target.value)} />
        </form>
      }
      <button onClick={handleDelete}>x</button>
    </li>
  );
}
