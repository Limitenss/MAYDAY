import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Rocket,
  Compass,
  Package,
  Activity,
  LogOut,
  Lightbulb,
} from "lucide-react";
import { PLACEHOLDER_DASHBOARD_STATS } from "../placeholders";
import "../App.css";

interface SidebarProps {
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);

  const menuItems = [
    { id: "launchbay", icon: <Rocket size={15} />, label: "Launch Bay" },
    { id: "missions", icon: <Compass size={15} />, label: "Missions" },
    { id: "starters", icon: <Lightbulb size={15} />, label: "Starters" },
    { id: "loadout", icon: <Package size={15} />, label: "Loadout" },
    { id: "achievements", icon: <Activity size={15} />, label: "Achievements" },
  ];

  // Missions Launched + MAYDAY Balance (indexes 0 & 1)
  const sidebarStats = PLACEHOLDER_DASHBOARD_STATS.slice(0, 2);

  return (
    <aside className="sidebar" role="navigation" aria-label="Main navigation">
      <div className="sidebar-header">
        <Link to="/" className="sidebar-wordmark">
          MAYDAY
        </Link>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={`/${item.id}`}
            className={({ isActive }) => `nav-item${isActive ? " active" : ""}`}
          >
            {item.icon}
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-support-note">
        <span className="nav-label">
          Need help? Ask in <span>#mayday-support</span> on Slack!
        </span>
      </div>

      {/* User stats pinned above logout */}
      <div className="sidebar-stats">
        {sidebarStats.map((s) => (
          <div key={s.label} className="sidebar-stat-item">
            <span className="sidebar-stat-label nav-label">{s.label}</span>
            <span className="sidebar-stat-value">{s.value}</span>
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <button
          onClick={() => setIsLogoutConfirmOpen(true)}
          className="nav-item-logout"
          type="button"
        >
          <LogOut size={14} />
          <span className="nav-label">Sign out</span>
        </button>
      </div>

      {isLogoutConfirmOpen && (
        <div
          className="sidebar-modal-backdrop"
          onClick={() => setIsLogoutConfirmOpen(false)}
          role="presentation"
        >
          <div
            className="sidebar-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="logout-confirm-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gc-label-sticker sidebar-modal-sticker">
              Confirm
            </div>
            <h3 id="logout-confirm-title" className="sidebar-modal-title">
              Sign out?
            </h3>
            <p className="sidebar-modal-copy">You sure, bro?</p>
            <div className="sidebar-modal-actions">
              <button
                type="button"
                className="btn-secondary sidebar-modal-button"
                onClick={() => setIsLogoutConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="nav-item-logout sidebar-modal-button sidebar-modal-danger"
                onClick={onLogout}
              >
                <LogOut size={14} />
                <span>Confirm</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
