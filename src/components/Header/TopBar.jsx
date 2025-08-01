import { useState } from "react";
import "./TopBar.scss";

const TopBar = () => {
  const [active, setActive] = useState(null);

  return (
    <div className="top-bar-container">
      <button
        className={`btn btn-planets ${active === "planets" ? "active" : ""}`}
        onClick={() => setActive("planets")}
      >
        Планеты
      </button>
      <button
        className={`btn btn-houses ${active === "houses" ? "active" : ""}`}
        onClick={() => setActive("houses")}
      >
        Дома
      </button>
    </div>
  );
};

export default TopBar;