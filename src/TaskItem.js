import React, { useState } from 'react'
import EditTask from './EditTask'
import axios from 'axios'

const TaskItem = (props) =>{
    const { id, title, status, removeItem, editItem } = props
    const [ toggle , setToggle ] = useState(false)

    const handleToggle = () =>{
         const result = !toggle
         setToggle(result)
    }

    const handleRemove = (id) =>{
        const confirmRemove = window.confirm('Are you Sure?')
        if(confirmRemove){
            axios.delete(`http://localhost:3033/api/tasks/${id}`)
            .then((response)=>{
                const result = response.data
                removeItem(result.id)
            })
            .catch((err)=>{
                alert(err.message)
            })
        }
    }

    
    return (
        <div>
            {
                toggle ? (
                    <div>
                        <EditTask  
                            id={id}
                            title={title}
                            status={status}
                            editItem={editItem}
                            handleToggle={handleToggle}
                        />
                        <button onClick={handleToggle}> Cancel </button>
                    </div>
                ) : (
                    <div>
                        <h2> { title } </h2>
                        <button onClick={handleToggle} > Edit </button>
                        <button onClick={() =>{
                            handleRemove(id)
                        }} > Remove </button>
                    </div>
                )
            }
            
        </div>
    )
}

export default TaskItem