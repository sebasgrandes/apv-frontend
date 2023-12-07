import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
// import axios from "axios";
import clienteAxios from "../config/axios";

// ! la funcion "Registrar" es mi COMPONENTE, definido en este caso como una funcion (también puede definirse como una clase)... el cual está ubicado en el archivo Registrar.jsx y el cual estoy exportando con "export default".
// este componente embebe tanto mi codigo js como mi html renderizado (lo den "return")
const Registrar = () => {
    const [nombre, setNombre] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repetirPassword, setRepetirPassword] = useState("");

    // alerta es un objeto
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({ msg: "Los campos están vacíos", error: true });
            // console.log(alerta);
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({ msg: "Los passwords no coinciden", error: true });
            return;
        }
        if (password.length < 6) {
            setAlerta({
                msg: "El password es demasiado corto. Debe tener al menos 6 caracteres",
                error: true,
            });
            return;
        }
        setAlerta({});

        // Crear el usuario en la api
        try {
            // * esta parte es IGUAL a como si realizaras tus solicitudes http en postman
            // const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`;
            /* colocamos el url del backend a la que queremos realizar la soli http */
            // realizamos una solicitud post a nuestro backend
            // le decimos la url y el cuerpo de la solicitud que se enviara al backend
            // * a parte de enviar datos al servidor, esta operacion también ESPERA UNA RESPUESTA DEL SERVIDOR (o sea un RES.SEND O RES.JSON) para que la promesa se resuelva... porque sino la promesa generada por axios.post quedaría en pending indefinidamente (y el codigo que está despues no se ejecutaría)
            // Es una práctica común en el desarrollo web asegurarse de que el servidor siempre envíe alguna forma de respuesta, ya sea un éxito, un error, o algún otro tipo de información relevante, para mantener el flujo de comunicación adecuado entre el cliente y el servidor.
            // usamos la instancia configurada de axios
            await clienteAxios.post("/veterinarios", {
                nombre,
                email,
                password,
            });
            // console.log(resultado);

            setAlerta({
                msg: "Usuario creado correctamente, revisa tu email para activar tu cuenta",
                error: false,
            });
            // console.log(resultado);
            // reset a los campos
            setNombre("");
            setEmail("");
            setPassword("");
            setRepetirPassword("");
        } catch (error) {
            // error.response.data.msg hace referencia al mensaje de error definido en el backend mediante res.status y res.json
            setAlerta({
                msg: error.response.data.msg,
                error: true,
            });
            // console.log(error);
        }
    };

    // Cuando se actualiza la variable "alerta", la variable "msg" también se actualiza porque están vinculadas por desestructuración.
    const { msg } = alerta;

    return (
        <>
            <div>
                <h1 className="text-6xl font-black text-indigo-600">
                    Crea tu cuenta y Administra{" "}
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-5 py-10 mt-10 md:mt-5">
                {/* le paso mi prop cuyo nombre es "alerta" (1) y cuyo valor es "alerta" (2) */}
                {/* esta sintaxis se llama short-circuit evaluation, sirve para realizar acciones condicionales concisas en js o jsx. en este caso el codigo se lee como: si msg es "truthy" entonces renderiza el componente "Alerta"... si no, pues no */}
                {msg && <Alerta alerta={alerta} />}
                <form onSubmit={handleSubmit}>
                    <div className="my-5">
                        <label
                            htmlFor=""
                            className="uppercase font-bold text-gray-600 block text-xl"
                        >
                            Nombre
                        </label>
                        <input
                            type="text"
                            placeholder="Tu nombre"
                            className="border bg-gray-50 w-full p-3 rounded-xl mt-3"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="my-5">
                        <label
                            htmlFor=""
                            className="uppercase font-bold text-gray-600 block text-xl"
                        >
                            Repite tu Password
                        </label>
                        <input
                            type="password"
                            placeholder="Repite tu password"
                            className="border bg-gray-50 w-full p-3 rounded-xl mt-3"
                            value={repetirPassword}
                            onChange={(e) => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <input
                            type="submit"
                            value="Crear Cuenta"
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

export default Registrar;
