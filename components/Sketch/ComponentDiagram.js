import * as React from "react"
import { Image } from "react-native";
// import { SvgUri } from "react-native-svg";
import { imageURI } from "./imagesURI";

export default function ComponentDiagram({
  isSelected,
  path,
  sizeSquare,
  scaleX,
  scaleY,
  ...props
}) {
  const filename = imageURI.filter((item) => item.nombre === path.split("/")[7]);

  return (
    <Image
      source={filename[0].path}
      style={{
        backgroundColor: "transparent",
        width: (sizeSquare * 2) * scaleX,
        height: (sizeSquare * 2) * scaleY
      }}
    />
  );
}
