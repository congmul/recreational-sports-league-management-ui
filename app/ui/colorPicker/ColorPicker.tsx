import { hslToHex } from "@/app/lib/utils";
import React, { useState } from "react";

function ColorRange({setSelectedTeamColor}: {setSelectedTeamColor: React.Dispatch<React.SetStateAction<string>>}){
  const [hue, setHue] = useState(0);
  const [saturation, setSaturation] = useState(100); // Saturation percentage
  const [brightness, setBrightness] = useState(100); // Brightness percentage
  const [selectedColor, setSelectedColor] = useState("hsl(0, 100%, 50%)");

  const handleHueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHue(parseInt(e.target.value, 10));
  };

  const handleSquareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left; // Get X relative to the square
    const y = e.clientY - rect.top; // Get Y relative to the square
    const newSaturation = Math.round((x / rect.width) * 100);
    // const newBrightness = Math.round(50 - (y / rect.height) * 50);
    // Calculate lightness:
    // Top-left corner (Saturation=0, Lightness=100%)
    // Top-right corner (Saturation=100, Lightness=50%)
    // Bottom (Lightness=0%)
    const topLightness = 100 - (newSaturation / 2); // Lightness at the top row
    const newLightness = Math.round(
      topLightness - (y / rect.height) * topLightness
    );
    setSaturation(newSaturation);
    setBrightness(newLightness);
    updateColor(hue, newSaturation, newLightness);
  };

  const updateColor = (hue: number, saturation: number, brightness: number) => {
    const color = `hsl(${hue}, ${saturation}%, ${brightness}%)`;
    setSelectedColor(color);
    setSelectedTeamColor(hslToHex(hue, saturation, brightness).toUpperCase())
  };

  return (
    <div className="p-4">
      {/* Color Square */}
      <div
        className="relative w-64 h-40 border rounded mb-4 cursor-crosshair"
        style={{
            // linear-gradient(to right, white, hsl(${hue} 100% 50%)),
          background: `linear-gradient(to top, black, transparent 90%),
                    linear-gradient(to right, rgba(255, 255, 255, 0.5), hsl(${hue} 100% 50%))`,
        }}
        onClick={handleSquareClick}
      >
      </div>
      {/* Range Input */}
      <input
        type="range"
        min="0"
        max="360"
        value={hue}
        onChange={handleHueChange}
        className="w-full h-3 appearance-none rounded-lg outline-none focus:ring-2"
        style={{
          background: `linear-gradient(to right, 
            hsl(0, 100%, 50%), 
            hsl(60, 100%, 50%), 
            hsl(120, 100%, 50%), 
            hsl(180, 100%, 50%), 
            hsl(240, 100%, 50%), 
            hsl(300, 100%, 50%), 
            hsl(360, 100%, 50%))`,
        }}
      />

      {/* Display Selected Hue */}
      <div className="flex items-end">
        <div
          className="mt-4 w-20 h-20 rounded-md shadow-md"
          style={{ backgroundColor: selectedColor }}
        ></div>
        <p className="mt-2 ml-4 text-sm">Selected Color: {hslToHex(hue, saturation, brightness).toUpperCase()}</p>
      </div>
    </div>
  );
};

export default ColorRange;