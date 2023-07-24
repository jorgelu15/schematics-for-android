import * as React from "react"
import { SvgUri } from "react-native-svg";

export default function ComponentDiagram({
  isSelected,
  path,
  sizeSquare,
  scaleX,
  scaleY,
  ...props
}) {
  return (
    <SvgUri
      uri={path ? path : null}
      width={(sizeSquare * 2) * scaleX}
      height={(sizeSquare * 2) * scaleY}
      style={{
        backgroundColor: "transparent",
      }}
    />
  );
}
