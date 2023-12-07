import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";
import { useState } from "react";

const AdministrarPacientes = () => {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    return (
        <div className="flex flex-col md:flex-row">
            <button
                type="button"
                className="bg-indigo-600 py-3 rounded-lg text-white font-bold uppercase hover:bg-indigo-800 transition-colors mb-10 md:hidden"
                onClick={() => setMostrarFormulario(!mostrarFormulario)}
            >
                {mostrarFormulario
                    ? "Ocultar Formulario"
                    : "Mostrar Formulario"}
            </button>
            <div
                className={`${
                    mostrarFormulario ? "block" : "hidden"
                } md:w-1/2 lg:w-2/5 md:block`}
            >
                <Formulario />
            </div>
            <div className="md:w-1/2 lg:w-3/5">
                <ListadoPacientes />
            </div>
        </div>
    );
};

export default AdministrarPacientes;
