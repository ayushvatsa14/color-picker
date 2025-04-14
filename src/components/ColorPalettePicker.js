import { useState, useEffect } from "react";

export default function ColorPalettePicker() {
  const [baseColors, setBaseColors] = useState(["#ff0000", "#00ff00", "#0000ff"]);
  const [mixedColor, setMixedColor] = useState("#808080");
  const [palette, setPalette] = useState(["#3498db", "#e74c3c", "#2ecc71"]);

  const hexToRgb = (hex) => {
    const bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgbToHex = ({ r, g, b }) => {
    return (
      "#" +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? "0" + hex : hex;
        })
        .join("")
    );
  };

  useEffect(() => {
    const total = baseColors.reduce(
      (acc, color) => {
        const rgb = hexToRgb(color);
        acc.r += rgb.r;
        acc.g += rgb.g;
        acc.b += rgb.b;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );

    const count = baseColors.length;
    const averaged = {
      r: Math.round(total.r / count),
      g: Math.round(total.g / count),
      b: Math.round(total.b / count),
    };

    setMixedColor(rgbToHex(averaged));
  }, [baseColors]);

  const updateBaseColor = (index, newColor) => {
    const updatedColors = [...baseColors];
    updatedColors[index] = newColor;
    setBaseColors(updatedColors);
  };

  const addMixedColorToPalette = () => {
    setPalette([...palette, mixedColor]);
  };

  const removeColor = (index) => {
    setPalette(palette.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">Interactive Color Mixer 🎨</h1>

      <div className="flex space-x-4">
        {baseColors.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <input
              type="color"
              value={color}
              onChange={(e) => updateBaseColor(index, e.target.value)}
              className="w-16 h-16 border rounded-lg"
            />
            <span className="text-sm mt-1">Color {index + 1}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center space-y-2">
        <div
          className="w-24 h-24 rounded-lg shadow-md border"
          style={{ backgroundColor: mixedColor }}
        />
        <span className="text-sm font-medium">Mixed Color: {mixedColor}</span>
      </div>

      <button
        onClick={addMixedColorToPalette}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
      >
        Add to Palette
      </button>

      <div className="grid grid-cols-3 gap-4">
        {palette.map((color, index) => (
          <div
            key={index}
            className="w-24 h-24 relative rounded-lg shadow-md"
            style={{ backgroundColor: color }}
          >
            <button
              onClick={() => removeColor(index)}
              className="absolute top-1 right-1 bg-white p-1 rounded-full text-red-500 text-xs"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
