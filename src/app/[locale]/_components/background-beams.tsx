"use client";
import React from "react";
import { cn } from "@/utils/cn";

export const BackgroundBeams = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "absolute inset-0 flex h-full w-full items-center justify-center",
        className
      )}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 560"
        style={{ height: "100vh", width: "100vw" }}
      >
        <g fill="none" mask='url("#SvgjsMask1004")'>
          <path
            fill='url("#SvgjsLinearGradient1005")'
            d="M0 0H1440V560H0z"
          ></path>
          <path
            fill="rgba(255, 255, 255, .1)"
            d="M1440 0H751.39L1440 157.23z"
          ></path>
          <path
            fill="rgba(255, 255, 255, .075)"
            d="M751.39 0L1440 157.23v58.78L437.62 0z"
          ></path>
          <path
            fill="rgba(255, 255, 255, .05)"
            d="M437.62 0L1440 216.01v73.95L340.68 0z"
          ></path>
          <path
            fill="rgba(255, 255, 255, .025)"
            d="M340.68 0L1440 289.96v22.86L183.94 0z"
          ></path>
          <path fill="rgba(0, 0, 0, .1)" d="M0 560h486.37L0 311.96z"></path>
          <path
            fill="rgba(0, 0, 0, .075)"
            d="M0 311.96L486.37 560h519L0 191.47z"
          ></path>
          <path
            fill="rgba(0, 0, 0, .05)"
            d="M0 191.47L1005.37 560h178.02L0 122.57z"
          ></path>
          <path
            fill="rgba(0, 0, 0, .025)"
            d="M0 122.57L1183.39 560h56.6L0 87.17z"
          ></path>
        </g>
        <defs>
          <mask id="SvgjsMask1004">
            <path fill="#fff" d="M0 0H1440V560H0z"></path>
          </mask>
          <linearGradient
            id="SvgjsLinearGradient1005"
            x1="15.28%"
            x2="84.72%"
            y1="-39.29%"
            y2="139.29%"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#0e2a47"></stop>
            <stop offset="1" stopColor="#00459e"></stop>
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
