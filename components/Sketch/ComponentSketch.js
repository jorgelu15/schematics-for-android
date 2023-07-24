import { View } from "react-native";

export default function ComponentSketch({idx, rotate, type, coordXY, sizeSquare, handleTouchDownElement, handleTouchMoveElement, handleTouchUpElement, scaleX, scaleY, isSelected, children, textWidth, ...props}) {
    return (
      <View
        onTouchStart={(e) => handleTouchDownElement(e, idx)}
        onTouchMove={(e) => handleTouchMoveElement(e, idx)}
        onTouchEnd={(e) => handleTouchUpElement(e, idx)}
        style={{
          position: "absolute",
          zIndex: 20,
          backgroundColor: "transparent",
          shadowColor: isSelected ? "#171717" : "#fff",
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.2,
          shadowRadius: 3,
          elevation: 5,
          width: textWidth ? "auto" : (sizeSquare * 2) * parseInt(scaleX) || 0,
          height: textWidth ? "auto" : (sizeSquare * 2) * parseInt(scaleY) || 0,
          top: parseFloat(coordXY[idx]?.y) || 0,
          left: parseFloat(coordXY[idx]?.x) || 0,
          transform: [{ rotate: `${parseInt(rotate)}deg` }],
          zIndex: type === 3 ? 10000 : 10
        }}
      >
        {children}
      </View>
    );
}