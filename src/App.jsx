import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layout/AuthLayout";
import RutaProtegida from "./layout/RutaProtegida";

import Login from "./paginas/Login";
import ConfirmarCuenta from "./paginas/ConfirmarCuenta";
import OlvidePassword from "./paginas/OlvidePasswordk";
import NuevoPassword from "./paginas/NuevoPassword";
import Registrar from "./paginas/Registrar";
import AdministrarPacientes from "./paginas/AdministrarPacientes";
import EditarPerfil from "./paginas/EditarPerfil";
import CambiarPassword from "./paginas/CambiarPassword";

import { AuthProvider } from "./context/AuthProvider";
import { PacientesProvider } from "./context/PacientesProvider";

// t odo tiene que estar rodeado por BR, Routes te permite agrupar diferentes rutas. y routes es para una ruta en especifico

function App() {
    return (
        // con ese route puedes definir ciertos diseños para diferentes paginas y el routing que tendra cada una de ellas
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>
                    <Routes>
                        {/* cuando el usuario visite "/" se renderiza el componente AuthLayout y dentro de este (también gracias al Outlet) se renderiza el componente login */}
                        <Route path="/" element={<AuthLayout />}>
                            ^
                            {/* esta linea define una subruta para la ruta anterior. index quiere decir que es la ruta por defecto cuando se visita la ruta padre "/" */}
                            <Route index element={<Login />} />
                            {/* todas las paginas que agregue aqui tendrán como pagina principal al AuthLayout */}
                            {/* todas estas subrutas se renderizaran dentro del componente authlayout (debido al Outlet) cuando se visite su ruta correspondiente */}
                            <Route
                                path="confirmar/:id"
                                element={<ConfirmarCuenta />}
                            />
                            <Route
                                path="olvide-password"
                                element={<OlvidePassword />}
                            />
                            <Route
                                path="olvide-password/:token"
                                element={<NuevoPassword />}
                            />
                            <Route path="registrar" element={<Registrar />} />
                        </Route>
                        {/* * nuevo grupo de rutas... estas son para el area privada y requiere que el usuario este autenticado */}
                        <Route path="/admin" element={<RutaProtegida />}>
                            <Route index element={<AdministrarPacientes />} />
                            <Route path="perfil" element={<EditarPerfil />} />
                            <Route
                                path="cambiar-password"
                                element={<CambiarPassword />}
                            />
                        </Route>
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
