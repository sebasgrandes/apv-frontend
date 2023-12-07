import axios from "axios";

// * creamos una instancia personalizada de axios con una URL base predefinida.
// axios.create es una función que permite crear una nueva instancia de axios con configuración personalizada.
// En este caso, se está configurando la propiedad baseURL, que define la URL base que se utilizará para todas las solicitudes realizadas con esta instancia de axios.
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
});

export default clienteAxios;
