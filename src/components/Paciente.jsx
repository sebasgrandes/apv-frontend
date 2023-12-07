import usePacientes from "../hooks/usePacientes";

const Paciente = ({ paciente }) => {
    // console.log(paciente);
    const { nombre, email, fecha, propietario, sintomas, _id } = paciente;

    const { setEdicion, eliminarPaciente } = usePacientes();

    const formatearFecha = (fecha) => {
        // conversion (probablemente del string) a un objeto DAte
        const nuevaFecha = new Date(fecha);
        // con "Intl.DateTimeFormat" formateamos la "nuevaFecha" segun la localidad "es-MX" (español de mexico) y con un estilo "long" (largo). Finalmente, la función devuelve la fecha formateada como una cadena de texto.
        // en realidad new Intl... crea un objeto con el estilo y localidad que le definimos. y format lo formatea segun esas especificaciones. al final este también devuelve una cadena de texto que representa la fecha
        return new Intl.DateTimeFormat("es-MX", { dateStyle: "long" }).format(
            nuevaFecha
        );
    };
    return (
        <div className="bg-white rounded-lg shadow-md px-5 py-8 mx-10 my-8">
            <p className="uppercase text-indigo-700 font-bold mb-1">
                Nombre:{" "}
                <span className="text-black normal-case font-normal">
                    {nombre}
                </span>
            </p>
            <p className="uppercase text-indigo-700 font-bold mb-1">
                Propietario:{" "}
                <span className="text-black normal-case font-normal">
                    {propietario}
                </span>
            </p>
            <p className="uppercase text-indigo-700 font-bold mb-1">
                Email propietario:{" "}
                <span className="text-black normal-case font-normal">
                    {email}
                </span>
            </p>
            <p className="uppercase text-indigo-700 font-bold mb-1">
                Fecha de alta:{" "}
                <span className="text-black normal-case font-normal">
                    {formatearFecha(fecha)}
                </span>
            </p>
            <p className="uppercase text-indigo-700 font-bold mb-1">
                Sintomas:{" "}
                <span className="text-black normal-case font-normal">
                    {sintomas}
                </span>
            </p>
            {/* setEdicion(paciente) recuerda el paciente al que se hace referencia en la iteracion... por ello al pasarselo a la funcion global, esta imprime o hace lo que tenga que hacer teniendo los datos de este paciente */}
            <div className="flex flex-col gap-2 md:flex-row justify-between mt-5">
                <button
                    type="button"
                    className="bg-indigo-600 text-white uppercase font-bold px-10 py-2 rounded-lg hover:bg-indigo-800"
                    onClick={() => {
                        setEdicion(paciente);
                    }}
                >
                    Editar
                </button>
                <button
                    type="button"
                    className="bg-red-600 text-white uppercase font-bold px-10 py-2 rounded-lg hover:bg-red-800"
                    onClick={() => eliminarPaciente(_id)}
                >
                    Eliminar
                </button>
            </div>
        </div>
    );
};

export default Paciente;
