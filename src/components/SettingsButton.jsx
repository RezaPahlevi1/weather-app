import { useState } from "react";
import SettingsPanel from "./SettingsPanel";

export default function SettingsButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-18 z-999 bg-slate-800 text-white px-4 py-2 rounded-xl shadow-lg hover:cursor-pointer"
      >
        ⚙️
      </button>

      {open && <SettingsPanel close={() => setOpen(false)} />}
    </>
  );
}
