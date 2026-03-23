// components/BorderAnimatedContainer.jsx
import React from "react";

function BorderAnimatedContainer({ children, className = "" }) {
  return (
    <div className={`border-animated-container w-full rounded-2xl border border-transparent p-[1px] ${className}`}>
      {children}
    </div>
  );
}

export default BorderAnimatedContainer;
