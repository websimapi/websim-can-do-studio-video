import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useCurrentFrame, useVideoConfig, interpolate, Img, Audio, staticFile, Sequence } from "remotion";
const SHAKE_START = 0;
const SHAKE_END = 90;
const TILT_START = 90;
const TILT_END = 120;
const POUR_START = 120;
const DURATION_IN_FRAMES = 180;
const BACKGROUND_COLOR = "#0A0A0A";
const CanComponent = () => {
  const frame = useCurrentFrame();
  let shakeTranslateX = 0;
  let shakeRotateZ = 0;
  if (frame >= SHAKE_START && frame <= SHAKE_END) {
    const localFrame = frame - SHAKE_START;
    const decayFactor = interpolate(localFrame, [0, 90], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const horizontalMovement = Math.sin(localFrame * 2.5) * 8 * decayFactor;
    const rotationalMovement = Math.sin(localFrame * 3.5 + 1) * 4 * decayFactor;
    shakeTranslateX = horizontalMovement;
    shakeRotateZ = rotationalMovement;
  }
  const tiltProgress = interpolate(frame, [TILT_START, TILT_END], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const tiltRotation = interpolate(tiltProgress, [0, 1], [0, 90]);
  const finalRotation = shakeRotateZ + tiltRotation;
  const isVisible = frame < TILT_END + 30;
  return /* @__PURE__ */ jsxDEV(
    AbsoluteFill,
    {
      style: {
        justifyContent: "center",
        alignItems: "center",
        opacity: isVisible ? 1 : 0
      },
      children: /* @__PURE__ */ jsxDEV(
        "div",
        {
          style: {
            position: "relative",
            width: 300,
            height: 400,
            // Apply shake and tilt rotation/translation
            transform: `
                        translateX(${shakeTranslateX}px) 
                        rotateZ(${finalRotation}deg)
                    `,
            transformOrigin: "50% 100%"
            // Pivot from the bottom center
          },
          children: /* @__PURE__ */ jsxDEV(
            Img,
            {
              src: staticFile("can_do_can.png"),
              style: {
                width: "100%",
                height: "100%"
              }
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 64,
              columnNumber: 17
            }
          )
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 51,
          columnNumber: 13
        }
      )
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 44,
      columnNumber: 9
    }
  );
};
const LiquidShaderEffect = () => {
  const frame = useCurrentFrame();
  const { height } = useVideoConfig();
  const opacity = interpolate(frame, [POUR_START, POUR_START + 15, DURATION_IN_FRAMES - 30, DURATION_IN_FRAMES], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const flowProgress = interpolate(frame, [POUR_START, DURATION_IN_FRAMES - 30], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const layers = [
    { color: "hsl(300, 100%, 50%)", scaleMultiplier: 1, speed: 1 },
    // Magenta
    { color: "hsl(180, 100%, 50%)", scaleMultiplier: 0.8, speed: 1.5 },
    // Cyan
    { color: "hsl(60, 100%, 50%)", scaleMultiplier: 0.6, speed: 2 }
    // Yellow
  ];
  const flowYStart = height / 2;
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { opacity, overflow: "hidden" }, children: layers.map((layer, index) => {
    const scaleX = interpolate(flowProgress, [0, 1], [0.1, 2.5 + index * 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const scaleY = interpolate(flowProgress, [0, 1], [0.01, 3 + index * 0.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const translateY = interpolate(flowProgress, [0, 1], [flowYStart - height * 0.5, flowYStart + height * 0.2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const rotateZ = Math.sin(frame * layer.speed * 0.1) * 30;
    return /* @__PURE__ */ jsxDEV(
      "div",
      {
        style: {
          position: "absolute",
          width: "100%",
          height: height * 2,
          // Ensure coverage
          backgroundColor: layer.color,
          mixBlendMode: "screen",
          // Achieve vibrant overlapping colors
          filter: "blur(30px)",
          transform: `
                                translateY(${translateY}px) 
                                scaleX(${scaleX}) 
                                scaleY(${scaleY})
                                rotateZ(${rotateZ}deg)
                            `,
          transformOrigin: "50% 0%",
          top: 0,
          left: 0
        }
      },
      index,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 111,
        columnNumber: 21
      }
    );
  }) }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 96,
    columnNumber: 9
  });
};
const CanDoComposition = () => {
  const frame = useCurrentFrame();
  const shakeVolume = interpolate(frame, [0, 10, 80, 90], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const jingleVolume = interpolate(frame, [0, 10, 40, 45], [0, 1, 1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: BACKGROUND_COLOR }, children: [
    /* @__PURE__ */ jsxDEV(LiquidShaderEffect, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 152,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(
      Audio,
      {
        src: staticFile("can_do_jingle.mp3"),
        startFrom: 0,
        volume: jingleVolume
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 155,
        columnNumber: 13
      }
    ),
    /* @__PURE__ */ jsxDEV(Sequence, { from: 0, durationInFrames: SHAKE_END, children: /* @__PURE__ */ jsxDEV(
      Audio,
      {
        src: staticFile("shaker_sfx.mp3"),
        loop: true,
        volume: shakeVolume
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 164,
        columnNumber: 18
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 163,
      columnNumber: 13
    }),
    /* @__PURE__ */ jsxDEV(CanComponent, {}, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 172,
      columnNumber: 13
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 149,
    columnNumber: 9
  });
};
export {
  CanDoComposition
};
