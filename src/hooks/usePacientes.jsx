// ! este código define un hook personalizado que los componentes pueden utilizar para acceder fácilmente a los datos del contexto PacientesContext. En lugar de tener que usar useContext(PacientesContext) en cada componente que necesita acceder a estos datos, los componentes pueden simplemente usar el hook usePacientes.

import { useContext } from "react";
import PacientesContext from "../context/PacientesProvider";

// definimos el hook "usePacientes", este hook utiliza el hook de "useContext" de react para acceder a los datos del contexto "PacientesContext"
// el hook useContext acepta un objeto de contexto (devuelto por React.createContext) y devuelve el valor actual del contexto para el componente actual... en este caso useContext(PacientesContext) devuelve el valor actual del contexto PacientesContext
// ! usamos este custom hook para sacar la informacion del context
const usePacientes = () => {
    return useContext(PacientesContext);
};

// exportamos el custom hook para que otros componentes puedan usarlo
export default usePacientes;
