import { Link } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";

const OlvidePassword = () => {
    const [alerta, setAlerta] = useState({});
    const [email, setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || email.length < 6) {
            setAlerta({
                msg: "Introduce un email valido",
                error: true,
            });
            return;
        }
        try {
            const { data } = await clienteAxios.post(
                "/veterinarios/olvide-password",
                {
                    email,
                }
            );
            setAlerta({
                msg: data.msg,
                error: false,
            });
        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;
    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Recupera tu acceso y no pierdas{" "}
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-5 py-10 mt-10 md:mt-5">
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label
                            htmlFor=""
                            className="uppercase font-bold text-gray-600 block text-xl"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            placeholder="Email de registro"
                            className="border bg-gray-50 w-full p-3 rounded-xl mt-3"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Enviar Instrucciones"
                            className="bg-indigo-700 text-white uppercase px-10 py-3 w-full rounded-xl mt-5 hover:bg-indigo-800 font-bold hover:cursor-pointer md:w-auto"
                        />
                    </div>
                </form>
                <div className="mt-5 lg:flex lg:justify-between">
                    <Link
                        to="/"
                        className="text-center text-gray-500 block my-5"
                    >
                        ¿Ya tienes una cuenta? Inicia Sesión
                    </Link>
                    <Link
                        to="/registrar"
                        className="text-center text-gray-500 block my-5"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                </div>
            </div>
        </>
    );
};

export default OlvidePassword;
