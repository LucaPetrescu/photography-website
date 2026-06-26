"use client";

import { useState } from "react";

type Annotation = {
  id: string;
  num: number;
  x: number; // % from image left
  y: number; // % from image top
  label: string;
  description: string;
};

const ANNOTATIONS: Annotation[] = [
  {
    id: "body",
    num: 1,
    x: 50,
    y: 12,
    label: "Magnesium alloy body",
    description: "Weather- and dust-sealed, 840 g with battery",
  },
  {
    id: "mount",
    num: 2,
    x: 41,
    y: 54,
    label: "Nikon F-mount",
    description: "58 mm bayonet — fits all Nikon F lenses since 1959",
  },
  {
    id: "grip",
    num: 3,
    x: 80,
    y: 53,
    label: "Rubberised grip",
    description: "Deep contoured grip for one-hand control",
  },
  {
    id: "af-lamp",
    num: 4,
    x: 27,
    y: 67,
    label: "AF-assist lamp",
    description: "Fires in low-light to aid phase-detect autofocus",
  },
  {
    id: "strap",
    num: 5,
    x: 11,
    y: 30,
    label: "Strap lug",
    description: "Triangular attachment point for camera straps",
  },
];

export function CameraAnnotationCard() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="mb-10 border-t border-border pt-7">
      <div className="mb-6 flex items-baseline gap-4">
        <h2 className="font-display text-h2 font-semibold">Nikon D750</h2>
        <span className="font-mono text-mono text-muted">Full-frame DSLR · 2014</span>
      </div>

      <div
        className="relative w-full max-w-xl"
        onMouseLeave={() => setHovered(null)}
      >
        <div className="relative select-none overflow-visible">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/gear/nikon-d750.jpg"
            alt="Nikon D750 camera, front view"
            className="block w-full"
            draggable={false}
          />

          {/* Dots */}
          {ANNOTATIONS.map((ann) => {
            const active = hovered === ann.id;
            const tipLeft = ann.x > 55;

            return (
              <div
                key={ann.id}
                className="absolute"
                style={{
                  left: `${ann.x}%`,
                  top: `${ann.y}%`,
                  transform: "translate(-50%, -50%)",
                  zIndex: active ? 20 : 10,
                }}
                onMouseEnter={() => setHovered(ann.id)}
                onMouseLeave={() => setHovered(null)}
              >
                {/* Dot */}
                <div
                  className="relative flex items-center justify-center"
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: active ? "#111" : "rgba(255,255,255,0.92)",
                    border: "1.5px solid #111",
                    boxShadow: "0 1px 6px rgba(0,0,0,0.25)",
                    cursor: "default",
                    transition: "background 120ms ease",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: 9,
                      fontWeight: 600,
                      lineHeight: 1,
                      color: active ? "#fff" : "#111",
                      transition: "color 120ms ease",
                    }}
                  >
                    {ann.num}
                  </span>
                </div>

                {/* Tooltip */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    [tipLeft ? "right" : "left"]: "calc(100% + 8px)",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: 188,
                    opacity: active ? 1 : 0,
                    transition: "opacity 120ms ease",
                  }}
                >
                  <div
                    className="border border-border bg-surface p-3"
                    style={{ boxShadow: "var(--shadow-lg)" }}
                  >
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.8125rem",
                        fontWeight: 500,
                        color: "var(--color-text)",
                        lineHeight: 1.3,
                      }}
                    >
                      {ann.label}
                    </p>
                    <p
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.75rem",
                        color: "var(--color-muted)",
                        lineHeight: 1.4,
                        marginTop: 4,
                      }}
                    >
                      {ann.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <dl
        className="mt-5 grid gap-x-8 gap-y-3 border-t border-border pt-5"
        style={{ gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))" }}
      >
        {ANNOTATIONS.map((ann) => (
          <div key={ann.id} className="flex gap-3">
            <span
              className="mt-[2px] flex flex-none items-center justify-center"
              style={{
                width: 18,
                height: 18,
                borderRadius: "50%",
                border: "1.5px solid #111",
                fontFamily: "var(--font-mono)",
                fontSize: 9,
                fontWeight: 600,
              }}
            >
              {ann.num}
            </span>
            <div>
              <dt
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: "var(--color-text)",
                  lineHeight: 1.4,
                }}
              >
                {ann.label}
              </dt>
              <dd
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.75rem",
                  color: "var(--color-muted)",
                  lineHeight: 1.45,
                  marginTop: 2,
                }}
              >
                {ann.description}
              </dd>
            </div>
          </div>
        ))}
      </dl>
    </div>
  );
}
