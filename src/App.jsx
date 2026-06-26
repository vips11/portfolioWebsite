import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.1 }
    )
    document.querySelectorAll('.reveal').forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <div className="color-bar" />
      <div className="container">
        <nav className="nav">
          <div className="nav-name">Vipasha Gupta</div>
          <div className="nav-right">
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
            <button className="theme-btn" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>

        <section className="hero">
          <h1>Hey, I'm <span>Vipasha</span>.</h1>
          <p className="hero-desc">
            Software developer at Amazon. UWaterloo CS grad. I build polished products — from mobile apps to large-scale distributed systems.
          </p>
          <div className="hero-links">
            <a href="https://github.com/vips11" className="pill-link filled" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://ca.linkedin.com/in/vipasha-gupta110502" className="pill-link" target="_blank" rel="noreferrer">LinkedIn</a>
            <a href="#TODO" className="pill-link" target="_blank" rel="noreferrer">Resume</a>
          </div>
        </section>

        <div className="divider" />

        <section id="experience" className="reveal">
          <p className="section-title">Experience</p>
          <div className="exp-item">
            <span className="exp-year">2023 — Now</span>
            <div>
              <h3>Software Developer</h3>
              <span className="exp-company c-purple">Amazon</span>
              <p>Building scalable services that impact millions of customers worldwide.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="exp-year">2021 — 2022</span>
            <div>
              <h3>Software Developer</h3>
              <span className="exp-company c-blue">Alida</span>
              <p>Built mobile features with React Native — push notifications, search filters, charting. Upgraded the testing infrastructure.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="exp-year">2021</span>
            <div>
              <h3>Frontend Developer</h3>
              <span className="exp-company c-pink">Inclusify — PearlHacks Winner</span>
              <p>Hackathon-winning app that replaces non-inclusive language with inclusive alternatives.</p>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="projects" className="reveal">
          <p className="section-title">Projects</p>
          <div className="projects-grid">
            <a href="https://github.com/SaikrishnaTadepalli/Cenetra" className="project-card" target="_blank" rel="noreferrer">
              <h3>Cenetra</h3>
              <p>Mobile-first daycare app for parents and caregivers.</p>
              <div className="tag-row">
                <span className="tag tag-purple">React Native</span>
                <span className="tag tag-green">Node.js</span>
              </div>
            </a>
            <a href="https://github.com/vips11/CS348Proj" className="project-card" target="_blank" rel="noreferrer">
              <h3>CS348 DB Project</h3>
              <p>Full-stack database project for UWaterloo's databases course.</p>
              <div className="tag-row">
                <span className="tag tag-blue">JavaScript</span>
                <span className="tag tag-cyan">SQL</span>
              </div>
            </a>
            <a href="https://github.com/udyding/inclusify" className="project-card" target="_blank" rel="noreferrer">
              <h3>Inclusify</h3>
              <p>Writing buddy that makes documents more inclusive and unbiased.</p>
              <div className="tag-row">
                <span className="tag tag-pink">React</span>
                <span className="tag tag-orange">APIs</span>
              </div>
            </a>
            <a href="https://github.com/vips11/TicTacToe" className="project-card" target="_blank" rel="noreferrer">
              <h3>Tic Tac Toe</h3>
              <p>Classic game built with C# and Unity.</p>
              <div className="tag-row">
                <span className="tag tag-purple">C#</span>
                <span className="tag tag-green">Unity</span>
              </div>
            </a>
          </div>
        </section>

        <div className="divider" />

        <section id="skills" className="reveal">
          <p className="section-title">Skills</p>
          <div className="skills-wrap">
            {['JavaScript','TypeScript','React','React Native','Node.js','Python','Java','C/C++','C#','Go','AWS','Docker','SQL','Git','Unity','HTML/CSS'].map((s) => (
              <span className="skill" key={s}>{s}</span>
            ))}
          </div>
        </section>

        <div className="divider" />

        <section id="contact" className="reveal">
          <p className="section-title">Get in touch</p>
          <div className="contact-row">
            <a href="mailto:vipasha2002@gmail.com" className="pill-link">Email</a>
            <a href="https://github.com/vips11" className="pill-link" target="_blank" rel="noreferrer">GitHub</a>
            <a href="https://ca.linkedin.com/in/vipasha-gupta110502" className="pill-link" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>
        </section>

        <footer className="footer">
          <p>© 2026 Vipasha Gupta</p>
        </footer>
      </div>
    </>
  )
}

export default App
