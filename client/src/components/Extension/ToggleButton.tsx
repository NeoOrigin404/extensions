import { useState } from "react";
import "../../styles/ToggleButton/togglebutton.css";

export default function ToggleButton({ onToggle }: ToggleButtonProps) {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    const newState = !isActive;
    setIsActive(newState);
    if (onToggle) {
      onToggle(newState);
    }
  };

  return (
    <div
      className={`toggle-container ${isActive ? "active" : ""}`}
      onClick={handleToggle}
      onKeyDown={handleToggle}
    >
      <div className="toggle-switch" />
    </div>
  );
}
