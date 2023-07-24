import { useContext } from "react";
import templateContext from "../context/template/templateContext";

function useLineNode() {
    const { coordLn, setCoordLn } = useContext(templateContext);
    const handleTouchDownLine = (e, idx) => {
        //configurar una barra para eliminar la linea a traves de un boton
        const newCoordLn = coordLn.filter((_, index) => index !== idx);
        setCoordLn(newCoordLn);

    };
    return {
        handleTouchDownLine
    }
}

export { useLineNode };