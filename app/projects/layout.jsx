"use client";
import GradientCursor from "../components/GradientCursor";

export default function ProjectLayout({ children }) {
    return (
        <>
            <GradientCursor />
            <>{children}</>

        </>
);
  }