/* =============================================================================
   ⚙️  EDIT EVERYTHING HERE — THIS IS THE ONLY FILE YOU NEED TO TOUCH
   -----------------------------------------------------------------------------
   This file holds 100% of the site's content. Change a value, save, and refresh
   the browser — that's the whole workflow. You never have to touch app.js or
   styles.css.

   QUICK START (replace the placeholders below):
   • meta.name / role / email / phone / location  → your details
   • socials[].url                                 → your real GitHub, LinkedIn, etc.
   • projects.items[]                              → your projects + repo links
   • experience.jobs[] / experience.education      → your work + school history
   • theme.accent / theme.accentDeep               → recolor the whole site

   FILES TO DROP IN (see assets/README.txt):
   • Your photo:   assets/profile.jpg   (or change meta.photo)
   • Second photo: assets/profile2.jpg  (or change meta.photoBack)
   • Your resume:  assets/resume.pdf    (or change meta.resume)

   TIP: text wrapped in *stars* (e.g. in hero.headline) is shown in the accent
   color. Any link/button left as "" (empty string) is hidden automatically.
   ============================================================================= */

window.PORTFOLIO = {

  /* ---------- THEME (change the look in one place) ---------- */
  theme: {
    accent:      "#ff5a2c",   // signature accent color (try #4d7cff, #c8ff4d, #f5b54c)
    accentDeep:  "#e0431b",   // darker shade of the accent (used for hovers/gradients)
    defaultMode: "light",     // "dark" or "light" — the first thing visitors see
  },

  /* ---------- BASICS ---------- */
  meta: {
    name:      "Your Name",
    role:      "Full-Stack Developer",
    tabTitle:  "Your Name — Full-Stack Developer",   // shows in the browser tab
    photo:     "assets/profile.jpg",   // ← drop your photo here
    photoBack: "assets/profile2.jpg",  // ← second photo (revealed on scroll flip)
    resume:    "assets/resume.pdf",    // ← drop your resume PDF here
    location:  "Your City, Country",
    email:     "you@example.com",
    phone:     "+1 (555) 123-4567",
    available: true,                   // true shows an "available for work" pill
  },

  /* ---------- NAV (top menu) ---------- */
  /* Each target is the id of a section below (with a leading #). */
  nav: [
    { label: "About",      target: "#about" },
    { label: "Stack",      target: "#stack" },
    { label: "Work",       target: "#work" },
    { label: "Experience", target: "#experience" },
    { label: "Contact",    target: "#contact" },
  ],

  /* ---------- HERO (the big opening) ---------- */
  hero: {
    badge:    "Open to new opportunities",
    // How far (in px) the hero photo glides DOWN while it flips to the 2nd photo.
    // Increase for a longer descent, set to 0 to flip in place.
    flipDrop: 0,
    // Each string is one line of the giant headline. The word wrapped in *stars*
    // gets the accent color. Keep it to 2–4 lines.
    headline: ["Building software", "that solves *real*", "problems, end to end."],
    intro:    "Short 1–2 sentence elevator pitch about who you are and what you do. Mention your specialty and the kind of work you love — this is the first thing visitors read.",
    ctas: [
      // Use "__resume__" as the target to make a button download meta.resume.
      { label: "View my work",    target: "#work",      primary: true  },
      { label: "Download résumé", target: "__resume__", primary: false },
    ],
    // Big animated count-up numbers. value counts up to the number; suffix is appended.
    stats: [
      { value: 5,   suffix: "+",  label: "Years experience" },
      { value: 30,  suffix: "+",  label: "Projects shipped" },
      { value: 12,  suffix: "",   label: "Happy clients" },
      { value: 8,   suffix: "",   label: "Languages coded" },
    ],
  },

  /* ---------- ABOUT ---------- */
  about: {
    kicker: "About",
    heading: "A short, punchy headline that sums up how you work.",
    paragraphs: [
      "First paragraph — your background and where you're coming from. Mention your education, your focus area, and what gets you excited about building software.",
      "Second paragraph — proof. Talk about real things you've shipped and the impact they had (numbers help: time saved, performance gained, users served).",
      "Third paragraph — the human side. Soft skills, how you communicate, what you're like to work with.",
    ],
    signature: "— Your Name",
  },

  /* ---------- STACK / SKILLS ---------- */
  stack: {
    kicker: "Toolbox",
    heading: "The tools I reach for.",
    // Add/remove groups freely. Each group is a titled list of skills.
    groups: [
      { title: "Languages",     items: ["Python", "JavaScript", "Java", "C++", "C#", "PHP", "HTML", "CSS"] },
      { title: "Data & DB",     items: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Power BI", "Pandas"] },
      { title: "Web & Graphics",items: ["React", "Node.js", "REST APIs", "Three.js", "WebGL", "Full-Stack"] },
      { title: "Tools & Ways",  items: ["Git / GitHub", "VS Code", "Docker", "CI/CD", "Agile", "Figma"] },
    ],
    // The scrolling ribbon of words near the top of the section.
    marquee: ["Automation", "Full-Stack Development", "Software Architecture", "Data Modelling", "System Programming", "Problem-Solving"],
  },

  /* ---------- EXPERIENCE ---------- */
  experience: {
    kicker: "Experience",
    heading: "Where I've worked.",
    // Copy a { } block to add another job. Newest first reads best.
    jobs: [
      {
        role: "Your Job Title",
        company: "Company One",
        period: "Jan 2023 — Present",
        location: "City, Country",
        summary: "One-line summary of the role.",
        points: [
          "Achievement or responsibility — lead with a verb and add a number if you can.",
          "Another bullet showing impact (improved X by Y%, reduced Z, etc.).",
          "A third bullet that rounds out what you did here.",
        ],
        link: "",   // optional: company URL (leave "" to hide)
      },
      {
        role: "Earlier Job Title",
        company: "Company Two",
        period: "Jun 2020 — Dec 2022",
        location: "City, Country",
        summary: "One-line summary of the role.",
        points: [
          "Achievement or responsibility with measurable impact.",
          "Another bullet describing what you delivered.",
          "A third bullet.",
        ],
        link: "",
      },
    ],
    // Education shown alongside experience. Delete this block if you don't want it.
    education: {
      school: "Your University",
      degree: "BSc (Honours), Computer Science",
      period: "Sep 2018 — Jun 2022",
      location: "City, Country",
      gpa: "GPA 3.8 / 4.0",
      coursework: ["Web Application Development", "Database Management Systems", "Data Structures & Algorithms", "Software Architecture", "Computer Networks", "Computer Graphics", "Artificial Intelligence"],
    },
  },

  /* ---------- PROJECTS (each card has GitHub + live link) ---------- */
  projects: {
    kicker: "Selected work",
    heading: "Things I've built.",
    // Copy a { } block to add a project.
    // Leave github or demo as "" to hide that button.
    // image is optional — shown as a side panel on laptops/monitors only.
    items: [
      {
        name: "Project One",
        year: "2025",
        blurb: "Short context line — client, org, or 'Personal project'.",
        description: "Two to three sentences on what the project does, the problem it solves, and the impact it had. Lead with the outcome and back it up with specifics (tech used, numbers, scale).",
        tags: ["Python", "SQL", "Automation", "Data"],
        github: "https://github.com/yourusername/project-one",
        demo:   "",                          // e.g. "https://project-one.example.com"
        image:  "",                          // optional: "assets/projects/project-one.jpg"
      },
      {
        name: "Project Two",
        year: "2024",
        blurb: "Short context line.",
        description: "What you built and why it matters. Describe the stack and the result. Keep it concrete — reviewers skim, so front-load the most impressive detail.",
        tags: ["PHP", "JavaScript", "SQL", "Full-Stack"],
        github: "https://github.com/yourusername/project-two",
        demo:   "",
        image:  "",
      },
      {
        name: "Project Three",
        year: "2024",
        blurb: "Personal project",
        description: "A third example to show range. Swap in something you're proud of — a side project, a tool, an experiment. Mention anything technically interesting about how it works.",
        tags: ["Three.js", "WebGL", "GLSL", "JavaScript"],
        github: "https://github.com/yourusername/project-three",
        demo:   "",
        image:  "",
      },
    ],
  },

  /* ---------- CONTACT ---------- */
  contact: {
    kicker: "Contact",
    heading: "Let's build something worth remembering.",
    text:   "A friendly line inviting people to reach out, and the best way to do it.",
    email:  "you@example.com",
  },

  /* ---------- SOCIAL LINKS (used in nav, contact & footer) ---------- */
  /* Replace every url with your real profiles. Remove any line you don't use. */
  /* type controls which icon shows: "github", "linkedin", "website", "email". */
  socials: [
    { type: "github",   label: "GitHub",   url: "https://github.com/yourusername" },
    { type: "linkedin", label: "LinkedIn", url: "https://www.linkedin.com/in/yourusername/" },
    { type: "website",  label: "Website",  url: "https://your-website.example.com" },
    { type: "email",    label: "Email",    url: "mailto:you@example.com" },
  ],

  /* ---------- FOOTER ---------- */
  footer: {
    note: "A short, personal sign-off line.",
  },
};
