import React, {useState} from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Task from "./components/Task";
import Tasks from "./components/Tasks";



const App = () => {
    const [showAddTask, setshowAddTask] = useState(false)
    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: 'Doctors Appointment',
            day: 'Feb 5th at 2:30pm',
            reminder: true
        },
        {
            id: 2,
            text: 'Meeting at school',
            day: 'Feb 5th at 2:30pm',
            reminder: false
        },
        {
            id: 3,
            text: 'Food shopping',
            day: 'Feb 5th at 2:30pm',
            reminder: false
        }
    ])

    // Add task
    const addTask = (task) => {
        // console.log('task added', task);
        const id = Math.floor(Math.random() * 1000) + 1
        const newTask = { id, ...task }
        setTasks([...tasks, newTask])
    }

    // delete task
    const deleteTask = (id) => {
        // console.log('delete', id);
        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = (id) => {
        // console.log('toggle', id);
        setTasks(
            tasks.map((task) => 
                task.id === id ? { ...task, reminder: 
                !task.reminder} : task
            )
        )
    }

    return (
        <div className="c_container">
            <Header onAdd={() => setshowAddTask(!showAddTask)}/>
            {
                showAddTask && <AddTask onAdd={addTask} />
            }
            {
                tasks.length > 0 
                ? <Tasks tasks={tasks} 
                onDelete={deleteTask}
                onToggle={toggleReminder} /> : 
                'No more Tasks to Show'
            }
        </div>
    );
}

export default App;