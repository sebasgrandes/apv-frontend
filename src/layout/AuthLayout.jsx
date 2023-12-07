import { Outlet } from "react-router-dom";

const AuthLayout = () => {
    return (
        // esto es un fragment, es como un div pero no se renderiza en el DOM
        <>
            <main className="container mx-auto md:grid md:grid-cols-2 mt-12 gap-10 p-5 items-center">
                {/* Outlet sirve para renderizar las rutas anidadas (subrutas) de los componentes hijos (login, comprobar-password, registrar, etc) */}
                <Outlet />
            </main>
        </>
    );
};

export default AuthLayout;
