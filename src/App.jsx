import { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  const canvasRef = useRef(null)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Interactive particles
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId, mouse = { x: -999, y: -999 }
    const colors = ['#a855f7', '#22d3ee', '#ff6eb4', '#f97316', '#34d399']
    let particles = []

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', (e) => { mouse.x = e.clientX; mouse.y = e.clientY })

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2.5 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        // Repel from mouse
        const dx = p.x - mouse.x, dy = p.y - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          p.vx += dx / dist * 0.3
          p.vy += dy / dist * 0.3
        }
        p.vx *= 0.98; p.vy *= 0.98
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.globalAlpha = theme === 'dark' ? 0.4 : 0.6
        ctx.fill()
        ctx.globalAlpha = 1
      })
      // Connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 130) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = particles[i].color
            ctx.globalAlpha = 0.08 * (1 - dist / 130)
            ctx.stroke()
            ctx.globalAlpha = 1
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [theme])

  // Scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.08 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  const skills = [
    { name: 'JavaScript', c: 'chip-yellow' }, { name: 'TypeScript', c: 'chip-blue' },
    { name: 'React', c: 'chip-cyan' }, { name: 'Next.js', c: 'chip-purple' },
    { name: 'Node.js', c: 'chip-green' }, { name: 'Python', c: 'chip-orange' },
    { name: 'Java', c: 'chip-pink' }, { name: 'Rust', c: 'chip-orange' },
    { name: 'GraphQL', c: 'chip-pink' }, { name: 'PostgreSQL', c: 'chip-blue' },
    { name: 'MongoDB', c: 'chip-green' }, { name: 'Redis', c: 'chip-orange' },
    { name: 'AWS', c: 'chip-yellow' }, { name: 'Docker', c: 'chip-cyan' },
    { name: 'Kubernetes', c: 'chip-purple' }, { name: 'Terraform', c: 'chip-purple' },
    { name: 'Git', c: 'chip-orange' }, { name: 'Linux', c: 'chip-green' },
    { name: 'Figma', c: 'chip-pink' }, { name: 'CI/CD', c: 'chip-blue' },
  ]

  return (
    <>
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />
      <div className="blob blob-4" />
      <div className="blob blob-5" />
      <div className="grain" />
      <canvas id="particles" ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      <nav className="nav">
        <div className="nav-logo">YN.</div>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </nav>

      <section className="hero">
        <span className="hero-badge"><span className="dot" /> Open to work</span>
        <h1>
          <span className="line">I craft</span>
          <span className="line"><span className="rainbow-text">digital experiences</span></span>
          <span className="line">for the web.</span>
        </h1>
        <p className="hero-sub">
          Software engineer passionate about building stunning, accessible, and performant applications that users love.
        </p>
        <div className="hero-cta">
          <a href="#TODO" className="btn btn-rainbow" target="_blank" rel="noreferrer">View Resume ↗</a>
          <a href="#contact" className="btn btn-glass">Say Hello</a>
        </div>
        <div className="scroll-hint">
          <div className="scroll-mouse" />
        </div>
      </section>

      <div className="marquee-section">
        <div className="marquee-track">
          {'React · TypeScript · Node.js · Python · AWS · Next.js · GraphQL · Docker · Figma · Rust · '.repeat(3).split(' · ').map((t, i) => (
            <span key={i}>{t}</span>
          ))}
        </div>
      </div>

      <section id="about" className="section">
        <div className="reveal">
          <div className="section-header">
            <h2>About Me</h2>
            <div className="accent-line" />
          </div>
          <div className="about-grid">
            <div className="about-text">
              <p>Hello! I'm <strong>Your Name</strong>, a software engineer who loves turning ideas into reality through code. I focus on building products that are fast, accessible, and delightful to use.</p>
              <p>Currently at <a href="#TODO">Company Name</a>, building tools that serve millions of users. Previously worked on distributed systems, design systems, and developer tooling.</p>
              <p>Outside of work, I enjoy hiking, playing guitar, reading sci-fi, and contributing to open source.</p>
            </div>
            <div className="stats-row">
              <div className="stat-card"><div className="stat-number">3+</div><div className="stat-label">Years Exp.</div></div>
              <div className="stat-card"><div className="stat-number">15+</div><div className="stat-label">Projects</div></div>
              <div className="stat-card"><div className="stat-number">5+</div><div className="stat-label">Companies</div></div>
              <div className="stat-card"><div className="stat-number">∞</div><div className="stat-label">Curiosity</div></div>
            </div>
          </div>
        </div>
      </section>

      <section id="experience" className="section">
        <div className="reveal">
          <div className="section-header">
            <h2>Experience</h2>
            <div className="accent-line" />
          </div>
          <div className="exp-list">
            <div className="exp-card">
              <span className="exp-date">2024 — Present</span>
              <div>
                <h3>Senior Software Engineer</h3>
                <h4>Company Name</h4>
                <p>Describe your current role. What are you building? What impact have you made?</p>
                <div className="exp-tags">
                  <span className="tag-purple">React</span><span className="tag-cyan">TypeScript</span><span className="tag-orange">AWS</span><span className="tag-pink">Node.js</span>
                </div>
              </div>
            </div>
            <div className="exp-card">
              <span className="exp-date">2022 — 2024</span>
              <div>
                <h3>Software Engineer</h3>
                <h4>Company Name</h4>
                <p>Describe this role. What systems did you build? How did you grow?</p>
                <div className="exp-tags">
                  <span className="tag-orange">Python</span><span className="tag-pink">Java</span><span className="tag-cyan">Docker</span><span className="tag-purple">GraphQL</span>
                </div>
              </div>
            </div>
            <div className="exp-card">
              <span className="exp-date">2020 — 2022</span>
              <div>
                <h3>Software Developer</h3>
                <h4>Company Name</h4>
                <p>Your first role. What did you learn? What foundation did you build?</p>
                <div className="exp-tags">
                  <span className="tag-cyan">JavaScript</span><span className="tag-purple">React</span><span className="tag-pink">CSS</span><span className="tag-orange">Git</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="reveal">
          <div className="section-header">
            <h2>Featured Projects</h2>
            <div className="accent-line" />
          </div>
          <div className="projects-grid">
            <a href="#TODO" className="project-card" target="_blank" rel="noreferrer">
              <span className="project-emoji">🚀</span>
              <span className="project-type type-fullstack">Full Stack</span>
              <h3>Project One <span className="arrow">↗</span></h3>
              <p>A compelling description of the project. What problem does it solve and why is it impressive?</p>
              <div className="project-stack"><span>React</span><span>Node.js</span><span>PostgreSQL</span><span>Redis</span></div>
            </a>
            <a href="#TODO" className="project-card" target="_blank" rel="noreferrer">
              <span className="project-emoji">⚡</span>
              <span className="project-type type-backend">Backend</span>
              <h3>Project Two <span className="arrow">↗</span></h3>
              <p>A compelling description of the project. What problem does it solve and why is it impressive?</p>
              <div className="project-stack"><span>Python</span><span>FastAPI</span><span>AWS Lambda</span></div>
            </a>
            <a href="#TODO" className="project-card" target="_blank" rel="noreferrer">
              <span className="project-emoji">🎨</span>
              <span className="project-type type-frontend">Frontend</span>
              <h3>Project Three <span className="arrow">↗</span></h3>
              <p>A compelling description of the project. What problem does it solve and why is it impressive?</p>
              <div className="project-stack"><span>Next.js</span><span>Tailwind</span><span>Framer Motion</span></div>
            </a>
            <a href="#TODO" className="project-card" target="_blank" rel="noreferrer">
              <span className="project-emoji">🔧</span>
              <span className="project-type type-tool">CLI Tool</span>
              <h3>Project Four <span className="arrow">↗</span></h3>
              <p>A compelling description of the project. What problem does it solve and why is it impressive?</p>
              <div className="project-stack"><span>Rust</span><span>GitHub Actions</span><span>npm</span></div>
            </a>
          </div>
        </div>
      </section>

      <section id="skills" className="section">
        <div className="reveal">
          <div className="section-header">
            <h2>Technologies</h2>
            <div className="accent-line" />
          </div>
          <div className="skills-cloud">
            {skills.map((s) => (
              <div className={`chip ${s.c}`} key={s.name}>{s.name}</div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="contact">
        <div className="reveal">
          <h2>Let's build something <span className="rainbow-text">amazing</span></h2>
          <p>I'm always open to new opportunities, collaborations, and interesting conversations.</p>
          <div className="contact-row">
            <a href="#TODO" className="contact-pill">✉ Email</a>
            <a href="#TODO" className="contact-pill" target="_blank" rel="noreferrer">GitHub</a>
            <a href="#TODO" className="contact-pill" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#TODO" className="contact-pill" target="_blank" rel="noreferrer">Twitter</a>
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>Designed & Built by Your Name · © 2026</p>
      </footer>
    </>
  )
}

export default App
