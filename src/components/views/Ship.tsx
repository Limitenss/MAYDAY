import React, { useRef, useState } from "react";
import {
  Rocket,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Upload,
  Plus,
  ExternalLink,
  GitBranch,
  BookOpen,
  Clock,
  ChevronRight,
  FolderOpen,
  ArrowLeft,
} from "lucide-react";
import { PLACEHOLDER_PROJECTS } from "../../placeholders";
import type { Project } from "../../placeholders";
import "../../App.css";

const statusMeta: Record<Project["status"], { label: string; cls: string }> = {
  deployed: { label: "Deployed", cls: "deployed" },
  reviewing: { label: "Reviewing", cls: "reviewing" },
  rejected: { label: "Rejected", cls: "rejected" },
};

const Ship: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [view, setView] = useState<"list" | "create">("list");
  const [projects, setProjects] = useState<Project[]>(PLACEHOLDER_PROJECTS);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [repo, setRepo] = useState("");
  const [readme, setReadme] = useState("");
  const [readmeAutoFilled, setReadmeAutoFilled] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const charLimit = 200;

  const resetForm = () => {
    setName("");
    setDescription("");
    setRepo("");
    setReadme("");
    setReadmeAutoFilled(false);
    setImageUrl("");
    setImageName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleRepoChange = (val: string) => {
    setRepo(val);
    const trimmed = val.trim().replace(/\/+$/, "");
    const match = trimmed.match(/^https:\/\/github\.com\/([^/]+)\/([^/]+)$/);
    if (match) {
      const [, user, repoName] = match;
      setReadmeAutoFilled(true);
      setReadme(
        `https://raw.githubusercontent.com/${user}/${repoName}/main/README.md`,
      );
    } else {
      if (readmeAutoFilled) {
        setReadme("");
      }
      setReadmeAutoFilled(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 10 * 1024 * 1024) {
      setImageName("");
      setImageUrl("");
      return;
    }

    setImageName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImageUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name.length < 3) {
      setFeedback({
        type: "error",
        message: "Project name too short - min 3 characters.",
      });
      return;
    }

    if (description.length < 10) {
      setFeedback({
        type: "error",
        message: "Add a bit more detail about your project!",
      });
      return;
    }

    if (!repo) {
      setFeedback({
        type: "error",
        message: "Please enter a repository or project link.",
      });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    setTimeout(() => {
      const newProject: Project = {
        id: Date.now().toString(),
        name,
        description,
        repo,
        readme,
        imageUrl,
        status: "reviewing",
        submittedAt: "just now",
      };

      setProjects((prev) => [newProject, ...prev]);
      setIsSubmitting(false);
      setFeedback({
        type: "success",
        message: "Project submitted - review underway shortly.",
      });
      resetForm();
      setTimeout(() => {
        setFeedback(null);
        setView("list");
      }, 2000);
    }, 1500);
  };

  if (view === "list") {
    return (
      <div className="view-content">
        <div className="view-header-row">
          <div className="view-header" style={{ marginBottom: "1.25rem" }}>
            <span className="section-code">Your Missions</span>
            <p>Ship your projects for review and earn MAYDAY Points!</p>
          </div>
          <button
            className="btn-primary"
            onClick={() => setView("create")}
            aria-label="Stage a new mission"
            id="create-project-btn"
          >
            <Plus size={17} />
            <span>Stage Mission</span>
          </button>
        </div>

        {projects.length === 0 ? (
          <div className="ship-empty-state">
            <FolderOpen
              size={40}
              strokeWidth={1.5}
              className="empty-state-icon"
            />
            <p className="empty-state-label">No projects yet</p>
            <p className="empty-state-hint">
              Stage your first mission to get reviewed and earn MAYDAY Points
              (LP).
            </p>
            <button className="btn-primary" onClick={() => setView("create")}>
              <Plus size={16} />
              <span>Stage Your First Mission</span>
            </button>
          </div>
        ) : (
          <div className="ship-project-list">
            {projects.map((proj) => (
              <div
                className={`ship-project-card${proj.id === "placeholder-1" ? " ship-project-card-placeholder" : ""}`}
                key={proj.id}
              >
                <div className="ship-project-card-body">
                  <div className="ship-project-card-top">
                    {proj.id === "placeholder-1" ? (
                      <>
                        <div className="ship-project-placeholder-header">
                          <div
                            className="skeleton"
                            style={{ width: "42%", height: "1.1rem", borderRadius: 0 }}
                          />
                          <div
                            className="skeleton"
                            style={{ width: 76, height: 18, borderRadius: 0 }}
                          />
                        </div>
                        <div
                          className="skeleton"
                          style={{ width: 54, height: "0.7rem", borderRadius: 0 }}
                        />
                      </>
                    ) : (
                      <>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.625rem",
                          }}
                        >
                          <span className="card-title">{proj.name}</span>
                          <span
                            className={`status-tag ${statusMeta[proj.status].cls}`}
                          >
                            {statusMeta[proj.status].label}
                          </span>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "0.5rem",
                            color: "var(--text-light)",
                            fontSize: "var(--fs-xs)",
                          }}
                        >
                          <Clock size={12} />
                          <span>{proj.submittedAt}</span>
                        </div>
                      </>
                    )}
                  </div>
                  {proj.id === "placeholder-1" ? (
                    <>
                      <div className="ship-project-placeholder-copy">
                        <div
                          className="skeleton"
                          style={{ width: "100%", height: "0.8rem", borderRadius: 0 }}
                        />
                        <div
                          className="skeleton"
                          style={{ width: "88%", height: "0.8rem", borderRadius: 0 }}
                        />
                        <div
                          className="skeleton"
                          style={{ width: "64%", height: "0.8rem", borderRadius: 0 }}
                        />
                      </div>
                      <div className="ship-project-links">
                        <div
                          className="skeleton"
                          style={{ width: 104, height: 24, borderRadius: 0 }}
                        />
                        <div
                          className="skeleton"
                          style={{ width: 92, height: 24, borderRadius: 0 }}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="ship-project-desc">{proj.description}</p>
                      <div className="ship-project-links">
                        {proj.repo && (
                          <a
                            href={proj.repo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ship-link-chip"
                            aria-label={`Repository for ${proj.name}`}
                          >
                            <GitBranch size={13} />
                            <span>Repository</span>
                            <ExternalLink size={11} style={{ opacity: 0.55 }} />
                          </a>
                        )}
                        {proj.readme && (
                          <a
                            href={proj.readme}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ship-link-chip"
                            aria-label={`README for ${proj.name}`}
                          >
                            <BookOpen size={13} />
                            <span>README</span>
                            <ExternalLink size={11} style={{ opacity: 0.55 }} />
                          </a>
                        )}
                      </div>
                    </>
                  )}
                </div>
                <button
                  className="ship-card-chevron"
                  aria-label={
                    proj.id === "placeholder-1"
                      ? `${proj.name} placeholder action`
                      : `${proj.name} details`
                  }
                  type="button"
                  disabled={proj.id === "placeholder-1"}
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const isOver = description.length >= charLimit;

  return (
    <div className="view-content">
      <div className="view-header-row" style={{ marginBottom: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.875rem" }}>
          <button
            className="btn-secondary ship-back-btn"
            onClick={() => {
              setView("list");
              setFeedback(null);
            }}
            aria-label="Back to projects"
          >
            <ArrowLeft size={15} />
            <span>Back</span>
          </button>
          <div className="view-header" style={{ marginBottom: 0 }}>
            <span className="section-code">Stage a Mission</span>
            <p>Submit your project for review and earn MAYDAY Points.</p>
          </div>
        </div>
      </div>

      <div className="ship-form-grid">
        <form className="ship-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="projectName">Project Name</label>
            <input
              id="projectName"
              type="text"
              placeholder="e.g. flight-computer-rig"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              maxLength={40}
              autoComplete="off"
            />
          </div>

          <div className="input-group">
            <label htmlFor="description">Mission Brief</label>
            <textarea
              id="description"
              placeholder="Describe your mission - what it does, hardware involved, and what problem it solves..."
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isSubmitting}
              maxLength={charLimit}
            />
            <div className={`char-hint ${isOver ? "over" : ""}`}>
              <span>
                {description.length < 10 && description.length > 0
                  ? `Need ${10 - description.length} more chars`
                  : ""}
              </span>
              <span>
                {description.length}/{charLimit}
              </span>
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="repoUrl">
              <GitBranch
                size={12}
                style={{
                  display: "inline",
                  marginRight: 4,
                  verticalAlign: "middle",
                }}
              />
              Repository / Project Link
            </label>
            <input
              id="repoUrl"
              type="url"
              placeholder="https://github.com/your-username/your-repo"
              value={repo}
              onChange={(e) => handleRepoChange(e.target.value)}
              disabled={isSubmitting}
              autoComplete="off"
            />
            <span className="input-hint">
              This link will appear on the mission detail page.
            </span>
          </div>

          <div className="input-group">
            <label htmlFor="readmeUrl">
              <BookOpen
                size={12}
                style={{
                  display: "inline",
                  marginRight: 4,
                  verticalAlign: "middle",
                }}
              />
              README URL
              <span className="auto-filled-badge">auto-filled</span>
            </label>
            <input
              id="readmeUrl"
              type="url"
              placeholder="Auto-fills from repo URL above"
              value={readme}
              onChange={(e) => {
                setReadme(e.target.value);
                setReadmeAutoFilled(false);
              }}
              disabled={isSubmitting}
              autoComplete="off"
            />
            {readme && (
              <a
                href={readme}
                target="_blank"
                rel="noopener noreferrer"
                className="readme-preview-link"
              >
                <ExternalLink size={11} />
                Preview README
              </a>
            )}
          </div>

          <div
            style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}
          >
            <button
              type="submit"
              className="btn-primary"
              disabled={isSubmitting || !name || !description || !repo}
              style={{ width: "100%", marginTop: "1.5rem" }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="spinning" size={18} />
                  <span>Launching...</span>
                </>
              ) : (
                <>
                  <Rocket size={18} />
                  <span>Ship</span>
                </>
              )}
            </button>

            {feedback && (
              <div className={`feedback-msg ${feedback.type}`}>
                {feedback.type === "success" ? (
                  <CheckCircle2 size={15} />
                ) : (
                  <AlertCircle size={15} />
                )}
                {feedback.message}
              </div>
            )}
          </div>
        </form>

        <div className="image-upload-area">
          <label style={{ marginBottom: "0.5rem" }}>
            Mission Screenshot / Cover
          </label>
          <div
            className="placeholder-box"
            role="button"
            tabIndex={0}
            aria-label="Upload project screenshot or cover image"
            onClick={() => fileInputRef.current?.click()}
            onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          >
            <Upload size={28} aria-hidden="true" />
            <span className="placeholder-box-label">
              {imageName || "Drop image here"}
            </span>
            <span className="upload-hint">
              {imageName ? "Click to replace image" : "or click to browse"}
            </span>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <p className="upload-hint">
            Screenshots or demo GIFs. Max 10MB per file.
          </p>

          <div className="surface-box" style={{ marginTop: "0.5rem" }}>
            <div className="stat-label" style={{ marginBottom: "0.5rem" }}>
              Launch Checklist
            </div>
            {[
              "Project is publicly accessible (URL or repo)",
              "Built during the hackathon YSWS window",
              "Written by you - not fully AI-generated",
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  fontSize: "var(--fs-small)",
                  color: "var(--text-muted)",
                  padding: "4px 0",
                }}
              >
                <div
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 99,
                    border: "2px solid var(--border-strong)",
                    flexShrink: 0,
                  }}
                />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ship;
