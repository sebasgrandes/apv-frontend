import { useState } from "react";
import AdminNav from "../components/AdminNav";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const CambiarPassword = () => {
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState({
        current_pass: "",
        new_pass: "",
    });
    const { guardarPassword } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Object.values devuelve un array con los valores de las propiedades enumerables del objeto que se le pasa como argumento
        // revisamos que al menos uno esté vacio... para ello tu objeto debe tener valores en sus propiedades definidas... por ello definimos el state password con propiedades de valores vacios
        if (Object.values(password).some((campo) => campo === "")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }
        if (password.current_pass.length < 6) {
            setAlerta({
                msg: "El passwor debe contener al menos 6 caracteres",
                error: true,
            });
            return;
        }
        const rpta = await guardarPassword(password);
        setAlerta(rpta);
    };
    const { msg } = alerta;
    return (
        <>
            <AdminNav />

            <h1 className="font-black text-3xl text-center mt-10">
                Cambiar Password
            </h1>
            <p className="text-xl text-center mt-5 mb-10">
                Modifica tu{" "}
                <span className="text-indigo-500 font-bold">password aqui</span>
            </p>
            <div className="flex justify-center">
                <div className="bg-white md:w-1/2 rounded-lg p-5 shadow-lg">
                    {msg && <Alerta alerta={alerta} />}
                    <form onSubmit={handleSubmit}>
                        <div className="my-5">
                            <label
                                htmlFor="current_pass"
                                className="font-bold uppercase text-gray-600"
                            >
                                Password Actual
                            </label>

                            <input
                                type="password"
                                name="current_pass"
                                id="current_pass"
                                className="bg-gray-100 rounded w-full mt-2 p-2 border"
                                placeholder="Escribe tu password actual"
                                onChange={(e) =>
                                    setPassword({
                                        ...password,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className="my-5">
                            <label
                                htmlFor="new_pass"
                                className="font-bold uppercase text-gray-600"
                            >
                                Nuevo Password
                            </label>

                            <input
                                type="password"
                                name="new_pass"
                                id="new_pass"
                                className="bg-gray-100 rounded w-full mt-2 p-2 border"
                                placeholder="Escribe tu nuevo password"
                                onChange={(e) =>
                                    setPassword({
                                        ...password,
                                        [e.target.name]: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <input
                            type="submit"
                            className="bg-indigo-600 w-full p-3 uppercase text-white font-bold rounded-lg mt-3 hover:bg-indigo-800 cursor-pointer"
                            value="Actualizar Password"
                        />
                    </form>
                </div>
            </div>
        </>
    );
};

export default CambiarPassword;
