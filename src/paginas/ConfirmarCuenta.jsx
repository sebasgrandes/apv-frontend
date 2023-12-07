import { useParams, Link } from "react-router-dom";
// import axios from "axios";
import { useEffect, useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";

const ConfirmarCuenta = () => {
    // extraemos el paramtro de ruta ":id" de mi url vinculada a este componente
    const params = useParams();
    const { id } = params;
    // console.log(id);
    // los mensajes de alerta que colocamos en nuestro objeto de alerta... en su mayoria son aquellos que el backend nos responde
    const [alerta, setAlerta] = useState({});
    const [usuarioConfirmado, setUsuarioConfirmado] = useState(false);
    const [cargando, setCargando] = useState(true);

    // lo hacemos con useEffect para que ejecute el codigo, una vez que el codigo este listo
    useEffect(() => {
        const confirmarCuenta = async () => {
            try {
                // definimos nuestra url a la que le enviaremos la soli get (al backend), usando el id extraido
                // si abres esta url en tu navegador te dira "origen no permitido" por cors, lo que definiste anteriormente... esto significa que solo tus dominios permitidos (localhost:5173) puedem hacer uso o comunicarse con esta url
                // const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`;
                // console.log(url);
                // * El método axios.get realiza una solicitud HTTP GET a la URL especificada y devuelve una promesa que se resuelve con la respuesta del servidor. La respuesta contiene información como el estado de la solicitud, los encabezados de respuesta y los datos devueltos por el servidor. Puedes acceder a los datos devueltos por el servidor utilizando la propiedad data de la respuesta
                const { data } = await clienteAxios.get(
                    `/veterinarios/confirmar/${id}`
                );
                // console.log(data.msg);
                setAlerta({
                    msg: data.msg,
                    error: false,
                });
                setUsuarioConfirmado(true);
            } catch (error) {
                // Cuando se realiza una solicitud HTTP utilizando bibliotecas como axios y la solicitud falla, se devuelve un objeto de error. Este objeto de error tiene una propiedad response que contiene la respuesta del servidor. Dentro de response, hay una propiedad data que contiene el cuerpo de la respuesta del servidor. Si el servidor devuelve un mensaje de error en un campo llamado msg dentro del cuerpo de la respuesta, puedes acceder a él con error.response.data.msg.
                // basicamente desplegamos el error enviado en el backend mediaten res.json
                setAlerta({
                    msg: error.response.data.msg,
                    error: true,
                });
                console.log(error);
            }
            setCargando(false);
        };
        confirmarCuenta();
    }, []);
    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Confirma tu cuenta y Administra{" "}
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-5 py-10 mt-10 md:mt-5">
                {/* si ya no esta cargando... (o sea si ya encontró el registro)... entonces muestra el componente de alerta */}
                {!cargando && <Alerta alerta={alerta} />}
                {usuarioConfirmado && (
                    <Link
                        to="/"
                        className="text-center text-gray-500 block my-5"
                    >
                        Inicia Sesión
                    </Link>
                )}
            </div>
        </>
    );
};

export default ConfirmarCuenta;
