import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";

const EditarPerfil = () => {
    // auth tiene mis credenciales de veterinario
    const { auth, actualizarPerfil } = useAuth();
    // perful será una copia modificable de auth
    const [perfil, setPerfil] = useState({});

    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { nombre, email } = perfil;
        if ([nombre, email].includes("")) {
            setAlerta({
                msg: "Email y nombre están vacíos",
                error: true,
            });
            return;
        }
        // bloqueamos la peticion hasta que se complete
        const resultado = await actualizarPerfil(perfil);
        setAlerta(resultado);
    };

    useEffect(() => {
        setPerfil(auth);
    }, [auth]);
    // console.log(perfil);

    const { msg } = alerta;
    return (
        <>
            <AdminNav />

            <h1 className="font-black text-3xl text-center mt-10">
                Editar Perfil
            </h1>
            <p className="text-xl text-center mt-5 mb-10">
                Modifica tu{" "}
                <span className="text-indigo-500 font-bold">
                    información aqui
                </span>
            </p>

            <div className="flex justify-center">
                <div className="bg-white md:w-1/2 rounded-lg p-5 shadow-lg">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label
                                htmlFor="nombre"
                                className="font-bold uppercase text-gray-600"
                            >
                                Nombre
                            </label>
                            {/* 1. con "...perfil" tomamos todas las propiedades existentes del objeto perfil y las propagamos en el nuevo objeto.
                            2. con "[e.target.name]: e.target.value" actualizamos una propiedad específica en el objeto perfil */}
                            {/* con 'perfil.nombre || ""' establecemos el valor de un elemento de entrada en perfil.nombre si existe y tiene un valor truthy, o en una cadena de texto vacía si no.
                            Y ESTO LO HACEMOS PORQUE si solo colocamos "perfil.nombre"...
                            la 1era vez el campo estará en ""
                            la 2da vez recien estará con "perfil.nombre"...
                            y eso no se puede hacer... PORQUE EN RESUMEN EL INPUT ESTÁ CAMBIANDO DE UN ESTADO NO CONTROLADO A UN ESTADO CONTROLADO
                            PARA MAS Y MEJOR INFO CHECA la nota de 27 input no controlado*/}
                            <input
                                type="text"
                                name="nombre"
                                id="nombre"
                                className="bg-gray-100 rounded w-full mt-2 p-2 border"
                                value={perfil.nombre || ""}
                                onChange={(e) => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="my-5">
                            <label
                                htmlFor="email"
                                className="font-bold uppercase text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-100 rounded w-full mt-2 p-2 border"
                                value={perfil.email || ""}
                                onChange={(e) => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="my-5">
                            <label
                                htmlFor="telefono"
                                className="font-bold uppercase text-gray-600"
                            >
                                Teléfono
                            </label>
                            <input
                                type="text"
                                name="telefono"
                                id="telefono"
                                className="bg-gray-100 rounded w-full mt-2 p-2 border"
                                value={perfil.telefono || ""}
                                onChange={(e) => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className="my-5">
                            <label
                                htmlFor="web"
                                className="font-bold uppercase text-gray-600"
                            >
                                Sitio Web
                            </label>
                            <input
                                type="text"
                                name="web"
                                id="web"
                                className="bg-gray-100 rounded w-full mt-2 p-2 border"
                                value={perfil.web || ""}
                                onChange={(e) => {
                                    setPerfil({
                                        ...perfil,
                                        [e.target.name]: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <input
                            type="submit"
                            className="bg-indigo-600 w-full p-3 uppercase text-white font-bold rounded-lg mt-3 hover:bg-indigo-800 cursor-pointer"
                            value="Guardar Cambios"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default EditarPerfil;
