import { Outlet, Navigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
// ! usamos este custom hook para sacar la informacion del context
import useAuth from "../hooks/useAuth";

const RutaProtegida = () => {
    // * la 1era vez que se carga el documento... el "auth" viene vacio porque asi lo definimos... Y SE DEMORA EN COMPLETAR EL AWAIT... por lo que una vez completado ese "await", el "auth" recien se llena
    // por lo que en esa 1era vez que se carga vacio... me redirigirá a la pagina principal, cosa que no quiero. para arreglar eso defino un state llamado "cargando", el cual se pasara a "false" recien cuando pase el await por el que se queda esperando (del async)
    const { auth, cargando } = useAuth();

    // console.log(auth);
    // console.log(cargando);

    // * si "cargando" aun es true... entonces solo muestra "cargando..." y nada mas... por el return
    // * si "cargando" se convierte en false... quiere decir que ya se terminó de ejecutar el await (de mi auth provider), por lo que setCargando(fasle) en mi provider ya se ejecuto, entonces RECIEN PODEMOS RENDERIZAR lo de abajo, lo cual verifica si auth tiene un id, lo cual sí sería cierto porque ya se manejo su valor extraido del await y esto proviene del token validad mediante la soli get al backend.
    // pequeño bug arreglado: este cargando hacia que cuando inicio sesion me rediriga a la pagina principal de login
    if (cargando) return "Cargando...";
    // en el caso de que el token sea incorrecto, cargando también pasa como fasle y el codigo de abajo se renderiza pero redirigiendo a la pagina principal

    // El operador ?. es el encadenamiento opcional. Este operador permite leer la propiedad _id de auth sin tener que verificar explícitamente si auth es null o undefined. Si auth es null o undefined, la expresión completa auth?._id devolverá undefined en lugar de lanzar un error. auth?._id es una forma segura de intentar acceder a la propiedad _id de auth, incluso si auth no está definido // * esto lo hago porque puede que a veces me de true al solo verificar si auth existe
    return (
        <>
            <Header />
            {/* con outlet renderizo el contenido de mis compoenntes de mis sub rutas */}
            {/* si auth tiene algo, renderizo mis outlets, sino... redirigelo a la principal */}
            {auth?._id ? (
                <div className="container mx-auto mt-10">
                    <Outlet />
                </div>
            ) : (
                <Navigate to="/" />
            )}
            <Footer />
        </>
    );
};

export default RutaProtegida;
