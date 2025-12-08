import { useSettings } from "../context/SettingsContext";

export default function SettingsPanel({ close }) {
  const { lang, setLang, unit, setUnit } = useSettings();

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-2000">
      <div className="bg-slate-800 text-white w-80 p-6 rounded-2xl shadow-2xl relative animate-fadeIn">
        <h2 className="text-xl font-bold mb-4">Settings</h2>

        <div className="mb-5">
          <label className="block mb-1 text-sm text-slate-300">Language</label>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value)}
            className="w-full bg-slate-700 p-2 rounded-lg"
          >
            <option value="en">English</option>
            <option value="id">Indonesia</option>
          </select>
        </div>

        <div className="mb-5">
          <label className="block mb-1 text-sm text-slate-300">Unit</label>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full bg-slate-700 p-2 rounded-lg"
          >
            <option value="metric">Metric (°C, m/s)</option>
            <option value="imperial">Imperial (°F, mph)</option>
          </select>
        </div>

        {/* Close */}
        <button
          onClick={close}
          className="absolute top-3 right-3 text-slate-300 hover:text-white"
        >
          ✖
        </button>
      </div>
    </div>
  );
}
