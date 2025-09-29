import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@remotion/player";
import { MyComposition } from "./composition.jsx";
const DURATION_IN_FRAMES = 180;
const FPS = 30;
const COMP_WIDTH = 540;
const COMP_HEIGHT = 960;
const App = () => /* @__PURE__ */ jsxDEV("div", { style: { maxWidth: "100vw", maxHeight: "100vh", aspectRatio: `${COMP_WIDTH} / ${COMP_HEIGHT}` }, children: /* @__PURE__ */ jsxDEV(
  Player,
  {
    component: MyComposition,
    durationInFrames: DURATION_IN_FRAMES,
    fps: FPS,
    compositionWidth: COMP_WIDTH,
    compositionHeight: COMP_HEIGHT,
    loop: true,
    controls: true,
    autoplay: true,
    style: {
      width: "100%",
      height: "100%"
    }
  },
  void 0,
  false,
  {
    fileName: "<stdin>",
    lineNumber: 14,
    columnNumber: 5
  }
) }, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 13,
  columnNumber: 3
});
createRoot(document.getElementById("app")).render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 31,
  columnNumber: 51
}));
