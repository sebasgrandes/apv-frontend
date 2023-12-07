// * Configurando un Contexto en React para compartir datos de "Pacientes" a través de tu aplicación
// PacientesContext es el contexto que estás creando para compartir datos de pacientes a través de tu aplicación. PacientesProvider es el componente que utiliza el Provider de este contexto para proporcionar los datos a todos los componentes hijos.

import { createContext, useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

// - creamos el contexto para los pacientesa
// recuerda que el contexto sirve para pasar datos a través del arbol de componentes, sin tener que pasar props manualmente en cada nivel
const PacientesContext = createContext();

// - definimos el componente PacientesProvider
// - lo exportamos porque se utilizará generalmente en un nivel alto de tu aplicación para envolver a todos los componentes que necesiten acceder al contexto de "Pacientes"
export const PacientesProvider = ({ children }) => {
    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const { auth } = useAuth();

    useEffect(() => {
        const obtenerPacientes = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) return;

                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };

                const { data } = await clienteAxios.get("/pacientes", config);

                // colocamos el array de pacientes en mi state "Pacientes"... en la parte de guardarPaciente simplemente agregamos un NUEVO PACIENTE a los que ya habian en la db y por ende a los que ya estaban en este state
                setPacientes(data);
            } catch (error) {
                console.log(error);
            }
        };

        obtenerPacientes();
        // ! le colocamos que obtenga los pacientes (se ejecute el useEffect) cada que el "auth" cambie... asi cada que cierre sesion el usuario actual e inicie sesion otro usuario se traerá los pacientes del usuario autenticado
        // si el auth que contiene la info del usuario autenticado cambia... entonces llamamos de nuevo el useeffect que nos trae los pacientes
        // de esta manera nos aseguramos de que se vuelva a llamar otra vez
        // PORQUE SINO solo se ejecutara cuando este listo el componente
        // asi cuando inicies sesion con otro usuario.. no se volvera a llamar
    }, [auth]);

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem("token");

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        // ! cuando editamos un paciente
        if (paciente.id) {
            try {
                // {data} será nuestro paciente que actualizamos con los datos que escribimos en el formulario (los cuales se almacenan o los toma el objeto paciente que pasamos a esta funcion)
                // aqui es "paciente.id" porque así es como le pasaste esta propiedad, la cual viene del state "id"... no con "_id"
                const { data } = await clienteAxios.put(
                    `/pacientes/${paciente.id}`,
                    paciente,
                    config
                );
                console.log(data);

                // nos traemos data en vez de paciente pq basicamente data es la respuesta más actualizada y completa pasada por el servidor
                // es "pacienteState._id" porque asi viene desde la db de mongo db
                const pacientesActualizados = pacientes.map((pacienteState) =>
                    pacienteState._id === data._id ? data : pacienteState
                );
                setPacientes(
                    pacientesActualizados
                ); /* al hacer esto hacemos también hacemos que en el html se renderice con los nuevos valores de mi state "pacientes" */

                // console.log(pacientes);
            } catch (error) {
                console.log(error);
            }
            /* console.log(
                "estamos editando el paciente... y nos damos cuenta de esto pq al darle click al boton de editar, se crea un state llamado paciente que incluye los datos, verificamos que tenga un id este state, y seteamos el state id con el id que jalamos del state paciente... así que como el state id esta lleno, al pasar un objeto con los datos de paciente, y el state id, a esta funcion... entonces comprobamos la existencia de ese id y entra en esta funcion. muy larga la explicacion pero por si acaso XD"
                ); */
        } else {
            // ! cuando guardamos un nuevo paciente (no editamos)
            /* console.log(
                    "NO estamos editando, estamos guardando un nuevo paciente... y nos damos cuenta de esto pq el objeto paciente que le pasamos a esta funcion, no incluye el state id que se crea al darle click al boton de editar"
                    ); */

            try {
                const { data } = await clienteAxios.post(
                    "/pacientes",
                    paciente,
                    config
                );

                // deestructuramos con truco: aqui "PacienteAlmacenado" ya no tendrá las demás propiedades
                const { __v, createdAt, updatedAt, ...pacienteAlmacenado } =
                    data;
                setPacientes([pacienteAlmacenado, ...pacientes]);
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    };

    const setEdicion = (paciente) => {
        setPaciente(paciente);
        // console.log(paciente);
    };

    const eliminarPaciente = async (id) => {
        const confirmar = confirm("¿Seguro que deseas eliminar este paciente?");
        if (confirmar) {
            const token = localStorage.getItem("token");

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            const { data } = await clienteAxios.delete(
                `/pacientes/${id}`,
                config
            );

            const pacientesActualizados = pacientes.filter(
                (pacienteState) => pacienteState._id !== id
            );

            setPacientes(pacientesActualizados);
            console.log("paciente eliminado correctamente");
        }
        console.log("eliminacion cancelada");
    };

    // este componente (PacientesProvider) usa PacientesContext.Provider para proporcionar el valor del contexto a todos los componente hijos
    // en este caso el valor del contexto es un objeto "{  }", generalmente proporcionamos datos o funciones que queremos compartir con los componentes hijos
    return (
        <PacientesContext.Provider
            value={{
                pacientes,
                guardarPaciente,
                setEdicion,
                paciente,
                eliminarPaciente,
            }}
        >
            {children}
        </PacientesContext.Provider>
    );
};

// - exportamos el contexto para que otros componentes puedan consumirlo
export default PacientesContext;

// posteriormente definimos nuestro custom hook para consumir el context con useContext
