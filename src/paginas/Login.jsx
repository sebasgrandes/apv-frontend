import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import clienteAxios from "../config/axios";
import Alerta from "../components/Alerta";
import useAuth from "../hooks/useAuth";

const Login = () => {
    // console.log(auth);
    const [alerta, setAlerta] = useState({});

    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        // verificamos si alguno de ellos es una cadena vacia
        if ([email, password].includes("")) {
            setAlerta({
                msg: "Todos los campos son obligatorios",
                error: true,
            });
            return;
        }
        try {
            const { data } = await clienteAxios.post("/veterinarios/login", {
                email,
                password,
            });
            // console.log(data);
            // almacenamos en local storage... para despues poder leer este token (y verificarlo) cuando estemos en la pagina de "perfil"
            localStorage.setItem("token", data.token);
            // * este codigo es para que no me redirija al "/" cada que inicio sesión... esto es util para que se valide en "RutaProtegida"... porque por alguna razón auth no contiene nada, a pesar de haberlo añadido en el auth provider, asi que con esto de aca le damos un empujoncito
            setAuth(data);
            // lo redireccionamos a "/admin"
            navigate("/admin");
        } catch (error) {
            // * se imprimen los mensajes de error que envio desde mi backend... o sea los res.status(400)...
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
        }
    };

    const { msg } = alerta;
    // de todas formas debes poner el fragment para que funcione el codigo de adentro. porque el div o cualquier cosa que coloques no funciona por si solo. y esto es porque react no permite que se renderice mas de un elemento a la vez. por eso debes poner un fragment o un div para que funcione
    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Inicia Sesión y Administra{" "}
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
                    <div className="my-5">
                        <label
                            htmlFor=""
                            className="uppercase font-bold text-gray-600 block text-xl"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="Tu password"
                            className="border bg-gray-50 w-full p-3 rounded-xl mt-3"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Iniciar Sesión"
                            className="bg-indigo-700 text-white uppercase px-10 py-3 w-full rounded-xl mt-5 hover:bg-indigo-800 font-bold hover:cursor-pointer md:w-auto"
                        />
                    </div>
                </form>
                <div className="mt-5 lg:flex lg:justify-between">
                    {/* usamos el link para crear enlaces que interactuen de manera limpia con el enrutador... por ejemplo para que cambie de pagina sin recargarla */}
                    <Link
                        to="/registrar"
                        className="text-center text-gray-500 block my-5"
                    >
                        ¿No tienes una cuenta? Regístrate
                    </Link>
                    <Link
                        to="/olvide-password"
                        className="text-center text-gray-500 block my-5"
                    >
                        Olvidé mi password
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Login;
