import { Link } from "react-router-dom";
// recuerda que accedemos a los states y propiedades pasadas globalmente... a través de nuestro custom hook
import useAuth from "../hooks/useAuth";

const Header = () => {
    const { cerrarSesion } = useAuth();
    // el motivo por el que se recarga solito si doy click al button es pq desde mi RutaProtegida se identifica que auth ha cambiado, por lo tanto vuelve a renderizar, y pasa por la validación que redirige a mi pagina principal

    return (
        <header className="py-10 px-5 md:px-10 bg-indigo-600">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
                <h1 className="font-bold text-2xl text-indigo-200 text-center md:text-start">
                    APV - Administrador de Pacientes de{" "}
                    <span className="text-white font-black">Veterinaria</span>
                </h1>
                <nav className="flex flex-col md:flex-row gap-4 items-center mt-5 md:mt-0">
                    <Link
                        to="/admin"
                        className="text-white font-bold uppercase"
                    >
                        Pacientes
                    </Link>
                    <Link
                        to="/admin/perfil"
                        className="text-white font-bold uppercase"
                    >
                        Perfil
                    </Link>
                    <button
                        type="button"
                        className="text-white font-bold uppercase"
                        onClick={cerrarSesion}
                    >
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
