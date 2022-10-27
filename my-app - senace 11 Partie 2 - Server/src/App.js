import { useState, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import { FaRProject } from 'react-icons/fa'

const App = () => {

const [tasks, setTasks] = useState([])

useEffect(()=> {
  const getTasks = async () => {
    const tasksFromServer = await fetchTasks()
    setTasks(tasksFromServer)
  }
  getTasks()
}, [])

const fetchTasks = async () => {
  const res = await fetch('http://localhost:5000/tasks')
  const data = await res.json()
  //console.log(data)
  return data
}

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
    <BrowserRouter>
      <div className="container">
          <Header title="Tasks list" onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
          { showAddTask && <AddTask onAdd={ addTask }  /> }
          {tasks.length > 0 ?(
            <Routes>
              <Route path='/' element={<Tasks tasks={tasks} onDelete={ deleteTask } onToggle={ toggleReminder } />} />
            </Routes>
            
          ):(
            'No task to show'
          )}
          <Routes>
            <Route path='/about' element={<About />}/>
          </Routes>
          <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
