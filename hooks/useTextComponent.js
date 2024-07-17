import { useContext } from "react";
import { Dimensions } from "react-native";
import templateContext from "../context/template/templateContext";
const { width, height } = Dimensions.get("window");

function useTextComponent() {
    const { coordXY, coordXYT, coordLn, setcoordXYT, setcoordXY, setCoordLn, translateX, translateY } = useContext(templateContext);
    
    const onAddText = (textChange, sizeT, setextModal, setTextChange) => {
    
      setcoordXYT([//conflicto con base de datos
        ...coordXYT,
        {
          nombre: textChange,
          path: "",
          rotate: 0,
          scaleX: 1,
          scaleY: 1,
          x: -translateX - 20 + width/2,
          y: -translateY + 150 + height/2,
          size: sizeT,
          type: "",
          amount: 4
        }
      ]);
      setTextChange('');
      
      setextModal(false);
    };

    const handleSizeTIncrease = (idx) => {
      const newCoordXYT = coordXYT.map((item, index) => index === idx ? {...item, size: item.size < 32 ? item.size + 1 : 32} : item);
      setcoordXYT(newCoordXYT);
    }

    const handleSizeTDecrease = (idx) => {
      const newCoordXYT = coordXYT.map((item, index) => index === idx ? {...item, size: item.size > 12 ? item.size - 1 : 12} : item);
      setcoordXYT(newCoordXYT);
    }

    return {
      coordXY,
      coordXYT,
      setcoordXYT,
      coordLn,
      setCoordLn,
      setcoordXY,
      onAddText,
      handleSizeTIncrease,
      handleSizeTDecrease
    };
}

export { useTextComponent };