import { useState, useEffect } from "react";
import Alerta from "./Alerta";
import usePacientes from "../hooks/usePacientes";

const Formulario = () => {
    // se recomienda colocar los states (y también los id de tu formulario) con los mismos nombres de las propiedades de los registros de tu db (pacientes)
    const [nombre, setNombre] = useState("");
    const [propietario, setPropietario] = useState("");
    const [email, setEmail] = useState("");
    const [fecha, setFecha] = useState("");
    const [sintomas, setSintomas] = useState("");
    // ! id servirá como una comprobación para saber si le dimos al botón de "editar". es decir, una vez que le demos a "editar"... entonces "id" EXISTIRÁ
    const [id, setId] = useState(null);

    const [alerta, setAlerta] = useState({});
    const { guardarPaciente, paciente } = usePacientes();

    useEffect(() => {
        // En este caso, paciente?._id intentará acceder a la propiedad _id del objeto paciente. Sin embargo, si paciente es null o undefined, la expresión no lanzará un error. En su lugar, simplemente devolverá undefined.
        if (paciente?._id) {
            setNombre(paciente.nombre);
            setPropietario(paciente.propietario);
            setEmail(paciente.email);
            setFecha(paciente.fecha);
            setSintomas(paciente.sintomas);
            // mediante el seteo del id identificamos si estamos editando o creando un nuevo registro
            setId(paciente._id);
        }
        console.log(
            "se detectó el 1er render... o se detectó que el state de paciente está lleno"
        );
    }, [paciente]);

    // validar formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({
                msg: "Todos los campos son requeridos",
                error: true,
            });
            return;
        }
        // lo destructuramos pq recordemos que el provider nos devuelve da un objeto
        // * le pasamos el state "id"... para que al ejecutarse guardarPaciente... saber si es un nuevo usuario que se va a guardar... o si es una edicion...
        guardarPaciente({ nombre, propietario, email, fecha, sintomas, id });

        setAlerta({
            msg: "Guardado correctamente",
            error: false,
        });

        // reiniciando los campos
        setNombre("");
        setPropietario("");
        setEmail("");
        setFecha("");
        setSintomas("");
        setId("");
        setTimeout(() => {
            setAlerta("");
        }, 2000);
    };

    const { msg } = alerta;

    return (
        <>
            <h2 className="font-black text-3xl text-center">
                Administrador de pacientes
            </h2>
            <p className="text-center text-lg mb-10 mt-5 font-semibold">
                Añade tus pacientes y{" "}
                <span className="text-indigo-600 font-bold">Administralos</span>
            </p>

            <form
                className="bg-white px-5 py-10 shadow-lg mb-10 md:mb-0 rounded-lg"
                onSubmit={handleSubmit}
            >
                <div className="mb-5">
                    <label
                        htmlFor="nombre"
                        className="font-bold uppercase text-gray-700"
                    >
                        Nombre Mascota
                    </label>
                    <input
                        type="text"
                        id="nombre"
                        placeholder="Nombre de la mascota"
                        className="w-full p-2 border-2 rounded-md mt-2 placeholder-gray-400"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="propietario"
                        className="font-bold uppercase text-gray-700"
                    >
                        Nombre Propietario
                    </label>
                    <input
                        type="text"
                        id="propietario"
                        placeholder="Nombre del propietario"
                        className="w-full p-2 border-2 rounded-md mt-2 placeholder-gray-400"
                        value={propietario}
                        onChange={(e) => setPropietario(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="email"
                        className="font-bold uppercase text-gray-700"
                    >
                        Email propietario
                    </label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email del propietario"
                        className="w-full p-2 border-2 rounded-md mt-2 placeholder-gray-400"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="fecha"
                        className="font-bold uppercase text-gray-700"
                    >
                        Fecha de Alta
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        className="w-full p-2 border-2 rounded-md mt-2 placeholder-gray-400"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                    />
                </div>
                <div className="mb-5">
                    <label
                        htmlFor="sintomas"
                        className="font-bold uppercase text-gray-700"
                    >
                        Síntomas
                    </label>
                    <textarea
                        id="sintomas"
                        placeholder="Describa los síntomas"
                        className="w-full p-2 border-2 rounded-md mt-2 placeholder-gray-400"
                        value={sintomas}
                        onChange={(e) => setSintomas(e.target.value)}
                    ></textarea>
                </div>
                <input
                    type="submit"
                    value={id ? "Guardar Cambios" : "Agregar paciente"}
                    className="bg-indigo-600 w-full p-3 rounded text-white font-bold uppercase hover:bg-indigo-800 transition-colors cursor-pointer"
                />
            </form>
            {msg && <Alerta alerta={alerta} />}
        </>
    );
};

export default Formulario;
