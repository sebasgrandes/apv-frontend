// en general se coloca "(props) => {console.log(props.alerta)}". en este caso se está realizando la destructuración de js para acceder directamente al props de alerta (que envio a al componente padre o sea registrar)
const Alerta = ({ alerta }) => {
    return (
        <div
            className={`${
                alerta.error === true
                    ? "from-red-400 to-red-600 bg-gradient-to-r"
                    : "from-indigo-400 to-indigo-600 bg-gradient-to-r"
            } p-3 text-center uppercase text-white font-bold rounded-lg mt-5 text-sm`}
        >
            {alerta.msg}
        </div>
    );
};

export default Alerta;
