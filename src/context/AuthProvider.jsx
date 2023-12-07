import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";

// con createContext podemos acceder a los states de forma global y compartir valores (como el estado de autenticacion o funciones para iniciar o cerrar sesion) entre componentes, sin necesidad de pasar props manualmente a cada nivel
/* createContext tiene ciertas funciones para habilitar contextAPI */
// aqui supuestamente viven los datos
const AuthContext = createContext();
// definimos nuestro context (AuthContext) de este provider (AuthProvider)

// AuthProvider es un componente que actúa como proveedor del contexto creado (AuthContext).
// * provider es de donde viene o nace todo el estado global de la aplicación. es como la fuente de datos del state global
// creamos una funcion, similar a un componente, que tendrá como hijos a todos los componentes de nuestra app
// deestructuras children que pertenece a "props"
const AuthProvider = ({ children }) => {
    // * la 1era vez que se carga el documento... el "auth" viene vacio porque asi lo definimos... Y SE DEMORA EN COMPLETAR EL AWAIT... por lo que una vez completado ese "await", el "auth" recien se llena
    // por lo que en esa 1era vez que se carga vacio... EN MI PAGINA "RUTA PROTEGIDA" me redirigirá a la pagina principal, cosa que no quiero. para arreglar eso defino un state llamado "cargando", el cual se pasara a "false" recien cuando pase el await por el que se queda esperando
    const [auth, setAuth] = useState({});
    const [cargando, setCargando] = useState(true);
    useEffect(() => {
        const autenticarUsuario = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setCargando(false);
                return;
            }
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const { data } = await clienteAxios.get(
                    "/veterinarios/perfil",
                    config
                );
                // console.log(data);
                // ! lo almacenamos en el state global
                setAuth(data);
            } catch (error) {
                console.log(error.response.data.msg);
                // ! esto lo coloco en caso haya un error... para que se mantenga vacio y no este autenticado el usuario... porque sino seguiria autenticado si esque ya se ha guardado previamente el auth
                setAuth({});
            }
            // una vez que pasa por todo lo de arriba (INCLUIDO EL AWAIT EN DONDE SE DETIENE ESTA RAMA del async), "cargando" sera finalmente "false"
            setCargando(false);
        };
        autenticarUsuario();
    }, []);
    // children hace referencia a todos los componentes hijos en mi provider de App.jsx (porque ahi lo coloque)
    // con el value indicas que estará disponible (o a disposición) para que se puede acceder en los componentes (hijos rodeados por el context)... en este caso mandamos un objeto con "auth" y "setAuth" // no tiene sentido que definas un context si no vas a pasar nada... también puedes pasar funciones, resultados producto de un useEffect por ejemplo, etc.
    // ! entonces, la ventaja de esto es que, tan solo importando este hook a los componentes (hijos) de mi app.jsx (rodeados)... ya puedo acceder directamente a mi "auth" y "setAuth"... sin necesidad de estar importando manualmente mediando props en caaada uno de los componentes

    // también puedes crear tus propias funciones y pasarlas al context para hacerla disponible en cualquier lugar
    const cerrarSesion = () => {
        localStorage.removeItem("token");
        setAuth({});
    };

    const actualizarPerfil = async (perfil) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };
        try {
            const { data } = await clienteAxios.put(
                `/veterinarios/perfil/${perfil._id}`,
                perfil,
                config
            );
            return {
                msg: "Cambios guardados correctamente",
                error: false,
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            };
        }
    };

    const guardarPassword = async (datos) => {
        const token = localStorage.getItem("token");
        if (!token) {
            setCargando(false);
            return;
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        };

        try {
            const { data } = await clienteAxios.put(
                "/veterinarios/actualizar-password",
                datos,
                config
            );
            return {
                msg: data.msg,
                error: false,
            };
        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true,
            };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };
export default AuthContext;
