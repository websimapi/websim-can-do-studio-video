import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Img,
  Audio,
  staticFile,
  Sequence,
  useVideoConfig
} from "remotion";
import { Gif } from "@remotion/gif";
const SHAKE_DURATION = 90;
const TILT_DURATION = 30;
const POUR_START = SHAKE_DURATION + TILT_DURATION;
const MyComposition = () => {
  const frame = useCurrentFrame();
  const jingleVolume = interpolate(frame, [0, 15, 60, 75], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const shakeVolume = interpolate(frame, [0, 15, SHAKE_DURATION - 15, SHAKE_DURATION], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#1a1a1a" }, children: [
    /* @__PURE__ */ jsxDEV(Audio, { src: staticFile("can_do_jingle.mp3"), volume: jingleVolume }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 39,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Sequence, { from: 0, durationInFrames: SHAKE_DURATION, children: /* @__PURE__ */ jsxDEV(Audio, { src: staticFile("shaker_sfx.mp3"), loop: true, volume: shakeVolume }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 42,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 41,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Can, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 46,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(Sequence, { from: POUR_START, children: /* @__PURE__ */ jsxDEV(LiquidFlow, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 49,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 48,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 38,
    columnNumber: 5
  });
};
const Can = () => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const shakeProgress = interpolate(frame, [0, SHAKE_DURATION], [1, 0], {
    extrapolateRight: "clamp"
  });
  const shakeX = Math.sin(frame * 2.5) * 12 * shakeProgress;
  const shakeRotate = Math.sin(frame * 3) * 6 * shakeProgress;
  const tiltAngle = interpolate(frame, [SHAKE_DURATION, POUR_START], [0, 95], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const finalRotation = shakeRotate + tiltAngle;
  const canStyle = {
    position: "absolute",
    left: "50%",
    bottom: "50%",
    width: 300,
    height: 400,
    transform: `translate(-50%, 50%) translateX(${shakeX}px) rotate(${finalRotation}deg)`,
    transformOrigin: "bottom center"
  };
  return /* @__PURE__ */ jsxDEV("div", { style: canStyle, children: /* @__PURE__ */ jsxDEV(
    Img,
    {
      src: staticFile("can_do_can.png"),
      style: { width: "100%", height: "100%" }
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 88,
      columnNumber: 7
    }
  ) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 87,
    columnNumber: 5
  });
};
const LiquidFlow = () => {
  const { height } = useVideoConfig();
  const liquidStyle = {
    position: "absolute",
    // Positioned to appear from the can's tilted opening
    top: height / 2 - 190,
    left: "50%",
    width: 500,
    transform: "translateX(-30%)"
  };
  return /* @__PURE__ */ jsxDEV("div", { style: liquidStyle, children: /* @__PURE__ */ jsxDEV(Gif, { src: staticFile("liquid_flow.gif") }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 112,
    columnNumber: 7
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 111,
    columnNumber: 5
  });
};
export {
  MyComposition
};
