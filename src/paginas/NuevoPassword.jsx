import clienteAxios from "../config/axios";
import { useState, useEffect } from "react";
import Alerta from "../components/Alerta";
import { Link, useParams } from "react-router-dom";

const NuevoPassword = () => {
    const [alerta, setAlerta] = useState({});
    const [password, setPassword] = useState("");
    const [tokenConfirmado, setTokenConfirmado] = useState(false);
    // tomo el token de la url
    const [passwordModificado, setPasswordModificado] = useState(false);
    const params = useParams();
    const { token } = params;
    // console.log(token);
    // ! para el get
    useEffect(() => {
        const confirmarToken = async () => {
            try {
                const { data } = await clienteAxios.get(
                    `/veterinarios/olvide-password/${token}`
                );
                setAlerta({
                    msg: "Coloca tu nuevo password",
                    error: false,
                });
                setTokenConfirmado(true);
            } catch (error) {
                setAlerta({
                    msg: "Hubo un error con el enlace",
                    error: true,
                });
            }
        };
        confirmarToken();
    }, []);

    // ! para el post
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password === "") {
            setAlerta({
                msg: "El password no debe estar vacío",
                error: true,
            });
            return;
        }
        if ([password].includes("")) {
            setAlerta({
                msg: "El password no debe incluir espacios",
                error: true,
            });
            return;
        }
        if (password.length < 6) {
            setAlerta({
                msg: "La longitud del password debe ser mayor a 6",
                error: true,
            });
            return;
        }
        try {
            const { data } = await clienteAxios.post(
                `/veterinarios/olvide-password/${token}`,
                {
                    password,
                }
            );
            setAlerta({
                msg: data.msg,
                error: false,
            });
            setPasswordModificado(true);
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
                    Reestablece tu password y administra{" "}
                    <span className="text-black">tus Pacientes</span>
                </h1>
            </div>
            <div className="bg-white rounded-xl shadow-lg px-5 py-10 mt-10 md:mt-5">
                {msg && <Alerta alerta={alerta} />}
                {tokenConfirmado && (
                    // se coloca el <> </> para agrupar el codigo en un unico elemento jsx... ya que si o si debe devolver un unico elemento
                    // es necesario porque JSX espera un único elemento padre en cada expresión.

                    <>
                        <form onSubmit={handleSubmit}>
                            <div className="my-5">
                                <label
                                    htmlFor=""
                                    className="uppercase font-bold text-gray-600 block text-xl"
                                >
                                    Nuevo Password
                                </label>
                                <input
                                    type="password"
                                    placeholder="Nuevo password"
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
                                    value="Guardar nuevo password"
                                    className="bg-indigo-700 text-white uppercase px-10 py-3 w-full rounded-xl mt-5 hover:bg-indigo-800 font-bold hover:cursor-pointer md:w-auto"
                                />
                            </div>
                        </form>
                    </>
                )}
                {passwordModificado && (
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

export default NuevoPassword;
