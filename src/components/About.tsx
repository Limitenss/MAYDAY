import React from "react";
import sponsorshipProspectus from "../assets/MAYDAY_Sponsorship_Prospectus.pdf";

interface AboutPanelProps {
  onClose: () => void;
}

export const AboutPanel: React.FC<AboutPanelProps> = ({ onClose }) => {
  return (
    <div
      className="gc-module gc-module-light about-panel about-modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby="about-panel-title"
    >
      <div
        className="gc-label-sticker"
        style={{
          background: "var(--color-border-hard)",
          color: "var(--color-amber)",
          fontSize: "0.8rem",
          padding: "4px 12px",
        }}
      >
        About
      </div>

      <h1
        id="about-panel-title"
        style={{
          fontFamily: "var(--font-display)",
          textTransform: "uppercase",
          color: "var(--color-border-hard)",
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          letterSpacing: "-0.02em",
          borderBottom: "4px solid var(--color-border-hard)",
          paddingBottom: "0.5rem",
          display: "inline-block",
        }}
      >
        MAYDAY
      </h1>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
          color: "rgba(0,0,0,0.8)",
          lineHeight: "1.7",
          fontSize: "1.05rem",
          fontWeight: 500,
        }}
      >
        <p>
          MAYDAY isn't just a hackathon, it's a YSWS program open to anyone aged{" "}
          <b>
            <code style={{ color: "var(--amber)" }}>13-18</code>
          </b>
          . Earn your way in by collecting MAYDAY Currency through YSWS
          challenges to secure your ticket. Once you're on the ground, you have
          8 days to design, wire, and build a rocket. Are you ready to launch?
        </p>

        <div
          style={{
            marginTop: ".5rem",
            padding: "1.5rem",
            background: "rgba(0,0,0,0.04)",
            borderLeft: "4px solid var(--amber)",
            fontFamily: "var(--font-mono)",
            fontSize: "0.9rem",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              marginBottom: "0.5rem",
              textTransform: "uppercase",
              opacity: 0.5,
            }}
          >
            // What is YSWS
          </div>
          MAYDAY is a "You Ship, We Ship" (YSWS) program fiscally sponsored by{" "}
          <a href="https://hackclub.com/" target="_blank" rel="noreferrer">
            Hack Club
          </a>
          . All builds submitted are verified by MAYDAY reviewers.
        </div>
      </div>

      <button
        type="button"
        className="gc-btn-block about-panel-close"
        onClick={onClose}
      >
        Back
      </button>

      <a
        href={sponsorshipProspectus}
        className="about-panel-link"
        target="_blank"
        rel="noreferrer"
      >
        Sponsor Prospectus
      </a>
    </div>
  );
};

export default AboutPanel;
