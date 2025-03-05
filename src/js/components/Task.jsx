import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

const Task = () => {
    // Estado para almacenar la lista de tareas
    const [lista, setLista] = useState([]);
    // Estado para almacenar el valor del input
    const [task, setTask] = useState("");

    // Función para agregar una nueva tarea
    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.trim() === "") return; // Evitar agregar tareas vacías

        // Crear un nuevo objeto de tarea
        const nuevaTarea = {
            id: Date.now(), // Usamos el timestamp como ID único
            label: task,
            is_done: false
        };

        // Agregar la nueva tarea al arreglo
        setLista([...lista, nuevaTarea]);
        // Limpiar el input
        setTask("");
    };

    // Función para eliminar una tarea
    const handleDeleteTask = (id) => {
        // Filtrar el arreglo para eliminar la tarea con el ID correspondiente
        const nuevasTareas = lista.filter((tarea) => tarea.id !== id);
        setLista(nuevasTareas);
    };

    return (
        <>
            <h1>To Do List</h1>
            <div className="container-md">
                {/* Input para agregar tareas */}
                <input
                    className="rounded-pill mb-2"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    type="text"
                /><br />
                {/* Botón para agregar tareas */}
                <Button className="mb-2" variant="success" onClick={handleAddTask}>
                    Agregar Tarea
                </Button>
                {/* Lista de tareas */}
                <ListGroup as="ol" numbered>
                    {lista.map((tarea) => (
                        <ListGroup.Item as="li" className="mb-2" key={tarea.id}>
                            {tarea.label}
                            {/* Botón para eliminar tareas */}
                            <Button variant="secondary" onClick={() => handleDeleteTask(tarea.id)}>
                            <i className="fa-solid fa-trash mb-2 fs-6"></i>
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                {/* Alerta con el número de tareas pendientes */}
                <Alert variant="warning">
                    <Alert.Heading>Pending Tasks: {lista.length}</Alert.Heading>
                </Alert>
            </div>
        </>
    );
};

export default Task;