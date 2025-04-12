import { useState } from "react";

export default function ToggleSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <label className=" flex items-center w-max cursor-pointer select-none">
      <input
        type="checkbox"
        checked={enabled}
        onChange={() => setEnabled(!enabled)}
        className="sr-only"
      />

      {/* Background track with static ON/OFF labels */}
      <div className="w-24 h-10 flex items-center justify-between rounded-full px-3 transition-colors bg-blue-500 duration-300">
        <span className="text-xs font-bold text-white">ON</span>
        <span className="text-xs font-bold text-white">OFF</span>
      </div>

      {/* White toggle ball showing the opposite of the current state */}
      <div
        className={`absolute top-0 left-0 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-xs font-bold text-black transition-transform duration-300 ${
          enabled ? "translate-x-14" : "translate-x-0"
        }`}
      >
        {enabled ? "OFF" : "ON"}
      </div>
    </label>
  );
}
