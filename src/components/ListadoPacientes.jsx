import usePacientes from "../hooks/usePacientes";
import Paciente from "./Paciente";

const ListadoPacientes = () => {
    const { pacientes } = usePacientes();
    // console.log(pacientes);
    return (
        <>
            {pacientes.length ? (
                <>
                    <h2 className="font-black text-3xl text-center">
                        Lista de pacientes
                    </h2>
                    <p className="text-center text-lg mb-10 mt-5 font-semibold">
                        Administra tus{" "}
                        <span className="text-indigo-600 font-bold">
                            Pacientes y Citas
                        </span>
                    </p>
                    {/* * La función map se utiliza para iterar sobre el array pacientes. Para cada paciente en el array, se crea y se renderiza un nuevo componente Paciente. */}
                    {/* El prop key se utiliza para ayudar a React a identificar qué elementos han cambiado, se han añadido o se han eliminado. Las keys deben ser únicas entre los hermanos, por eso se utiliza paciente.id, asumiendo que id es único para cada paciente. */}
                    {pacientes.map((paciente) => (
                        <Paciente key={paciente._id} paciente={paciente} />
                    ))}
                </>
            ) : (
                <>
                    <h2 className="font-black text-3xl text-center">
                        No existen pacientes
                    </h2>
                    <p className="text-center text-lg mb-10 mt-5 font-semibold">
                        Comenza agregando pacientes y{" "}
                        <span className="text-indigo-600 font-bold">
                            aparecerán en este lugar
                        </span>
                    </p>
                </>
            )}
        </>
    );
};

export default ListadoPacientes;
