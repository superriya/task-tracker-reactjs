import React, {useState, useEffect} from "react";
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";



const App = () => {
    const [showAddTask, setshowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])

    // Fetch Tasks
    const fetchTasks = async () => {
        const response = await fetch('http://localhost:5000/tasks')
        const data = await response.json()
        // console.log("task data.......", data);
        return data
    }

    // Fetch Task
    const fetchTask = async (id) => {
        const response = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await response.json()
        // console.log("task data.......", data);
        return data
    }

    useEffect(() => {
        const getTasks = async () => {
            const taskFromServer = await fetchTasks()
            setTasks(taskFromServer)
        } 

       getTasks();
    }, [])


    // Add task
    const addTask = async (task) => {
        const response = await fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(task),
        })

        const data = await response.json()
        setTasks([...tasks, data])

        // console.log('task added', task);
        // const id = Math.floor(Math.random() * 1000) + 1
        // const newTask = { id, ...task }
        // setTasks([...tasks, newTask])
        
    }

    // delete task
    const deleteTask = async (id) => {
        // console.log('delete', id);
        await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'DELETE',
        })

        setTasks(tasks.filter((task) => task.id !== id))
    }

    // Toggle Reminder
    const toggleReminder = async (id) => {
        // console.log('toggle', id);

        const taskToToggle = await fetchTask(id)
        const updateTask = {...taskToToggle, reminder: !taskToToggle.reminder}

        const response = await fetch(`http://localhost:5000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(updateTask)
        })

        const data = await response.json()

        setTasks(
            tasks.map((task) => 
                task.id === id ? { ...task, reminder: 
                    data.reminder} : task
            )
        )
    }

    return (
        <div className="c_container">
            <Header 
            onAdd={() => setshowAddTask(!showAddTask)}
            showAdd={showAddTask} />
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