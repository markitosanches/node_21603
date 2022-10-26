import { useState } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'


const App = () => {

  const [tasks, setTasks] = useState([
    {
        id:1,
        text: 'Doctos appointment',
        day: 'Feb 5th at 2:30pm',
        reminder: true,
    },
    {
        id:2,
        text: 'Meeting at scholl',
        day: 'Feb 6th at 1:30pm',
        reminder: false,
    },
    {
        id:3,
        text: 'Food shopping',
        day: 'Feb 5th at 2:30pm',
        reminder: false,
    }
  ])
const deleteTask = (id) => {
  //console.log(id)
  setTasks(tasks.filter((task) => task.id !== id))
}
const toggleReminder = (id) =>{
  //console.log('toogle', id)
  setTasks(tasks.map((task) => task.id === id ? { ...task, reminder:!task.reminder} : task))
}

const addTask = (task) =>{
  //console.log(task)
  const id = Math.floor(Math.random() * 1000)+ 1
  const newTask = {id, ...task}
  //console.log(newTask)
  setTasks([...tasks, newTask])
}

const [showAddTask, setShowAddTask] = useState(false)
  return (
    <div className="container">
        <Header title="Tasks list" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        { showAddTask && <AddTask onAdd={ addTask }  /> }
        {tasks.length > 0 ?(
          <Tasks tasks={tasks} onDelete={ deleteTask } onToggle={ toggleReminder } />
        ):(
          'No task to show'
        )}
    </div>
  );
}

export default App;
