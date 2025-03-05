import React, { useState } from "react";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Alert from 'react-bootstrap/Alert';

const Task = () => {
    const [lista, setLista] = useState([]);
    const [task, setTask] = useState("");

    const handleAddTask = (e) => {
        e.preventDefault();
        if (task.trim() === "") return;

        const nuevaTarea = {
            id: Date.now(),
            label: task,
            is_done: false
        };

        setLista([...lista, nuevaTarea]);
        setTask("");
    };

    const handleDeleteTask = (id) => {
        const nuevasTareas = lista.filter((tarea) => tarea.id !== id);
        setLista(nuevasTareas);
    };

    return (
        <>
            <h1>To Do List</h1>
            <div className="container-md">
                <input
                    className="rounded-pill mb-2"
                    value={task}
                    onChange={(e) => setTask(e.target.value)}
                    type="text"
                /><br />
                <Button className="mb-2" variant="success" onClick={handleAddTask}>
                    Agregar Tarea
                </Button>
                <ListGroup as="ol" numbered>
                    {lista.map((tarea) => (
                        <ListGroup.Item
                            as="li"
                            className="mb-2 d-flex justify-content-between align-items-center task-item"
                            key={tarea.id}
                        >
                            {tarea.label}
                            {/* Botón de basurero (oculto por defecto) */}
                            <Button
                                variant="secondary"
                                onClick={() => handleDeleteTask(tarea.id)}
                                className="delete-button"
                            >
                                <i className="fa-solid fa-trash mb-2 fs-6"></i>
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <Alert variant="warning">
                    <Alert.Heading>Pending Tasks: {lista.length}</Alert.Heading>
                </Alert>
            </div>

            {/* Estilos CSS */}
            <style>
                {`
                    .task-item {
                        cursor: pointer;
                        transition: background-color 0.3s;
                    }

                    .task-item:hover {
                        background-color: #f8f9fa; /* Cambia el fondo al hacer hover */
                    }

                    .delete-button {
                        opacity: 0; /* Oculto por defecto */
                        transition: opacity 0.3s; /* Transición suave */
                    }

                    .task-item:hover .delete-button {
                        opacity: 1; /* Muestra el botón al hacer hover sobre la tarea */
                    }
                `}
            </style>
        </>
    );
};

export default Task;