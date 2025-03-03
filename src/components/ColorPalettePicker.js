import { useState } from "react";

export default function ColorPalettePicker() {
  const [colors, setColors] = useState(["#3498db", "#e74c3c", "#2ecc71"]);
  const [selectedColor, setSelectedColor] = useState("#ffffff");

  const addColor = () => {
    setColors([...colors, selectedColor]);
  };

  const removeColor = (index) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  return (
    <div className="p-6 flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold">Color Palette Picker 🎨</h1>
      <input
        type="color"
        value={selectedColor}
        onChange={(e) => setSelectedColor(e.target.value)}
        className="w-16 h-16 border rounded-lg"
      />
      
      <button onClick={addColor} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        Add Color
      </button>

      <div className="grid grid-cols-3 gap-4">
        {colors.map((color, index) => (
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