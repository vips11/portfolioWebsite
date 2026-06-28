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
            Software developer at Amazon. UWaterloo CS grad (Minor in Psychology). I love learning about new technology and building things with it.
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
            <span className="exp-year">Jun 2026 — Now</span>
            <div>
              <h3>Software Developer</h3>
              <span className="exp-company c-purple">Amazon — Alexa AI</span>
              <p>Working on evals and LLM integrations with AI, building evaluation frameworks for large language model performance and reliability.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="exp-year">Sep 2025 — May 2026</span>
            <div>
              <h3>Software Developer</h3>
              <span className="exp-company c-purple">AWS — Route 53 Domains</span>
              <p>Built and maintained scalable domain registration services impacting millions of AWS customers worldwide.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="exp-year">May — Aug 2024</span>
            <div>
              <h3>Software Developer Intern</h3>
              <span className="exp-company c-purple">AWS — Route 53 Domains</span>
              <p>Reduced CheckDomainAvailability API latency from 3s to 1s via Elasticache. Improved registrar performance by 20% with SQS batching. Built real-time CloudWatch dashboard for monitoring.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="exp-year">May — Aug 2023</span>
            <div>
              <h3>Software Developer Intern</h3>
              <span className="exp-company c-purple">AWS — Route 53 Domains</span>
              <p>Created a "Mock Registrar" system with Java, Spring, and DynamoDB for testing domain operations. Integrated canary service saving ~$158K annually. Reduced customer errors by 30%.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="exp-year">Sep — Dec 2022</span>
            <div>
              <h3>Software Engineering Intern</h3>
              <span className="exp-company c-blue">Ford Motor Company</span>
              <p>Worked on the SYNC infotainment system with a team of 20. Built features and custom React hooks using React, Flow, and MQTT. Implemented vehicle logic (towing, climate control) with Redux. Wrote Jest unit tests across car motion states.</p>
            </div>
          </div>
          <div className="exp-item">
            <span className="exp-year">Sep 2021 — Apr 2022</span>
            <div>
              <h3>Software Engineering Intern</h3>
              <span className="exp-company c-blue">Alida</span>
              <p>Built push notification scheduling in React Native (25% satisfaction increase). Created real-time filter/sort with Redux (30% usage increase). Implemented FusionCharts visualizations and Jest testing.</p>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="projects" className="reveal">
          <p className="section-title">Projects</p>
          <div className="projects-grid">
            <a href="https://github.com/vips11/FinTrack" className="project-card" target="_blank" rel="noreferrer">
              <h3>FinTrack</h3>
              <p>Personal finance dashboard with Plaid bank sync, budgets, and recurring tracking.</p>
              <div className="tag-row">
                <span className="tag tag-blue">React</span>
                <span className="tag tag-green">Node.js</span>
                <span className="tag tag-purple">MongoDB</span>
              </div>
            </a>
            <a href="https://github.com/SaikrishnaTadepalli/Cenetra" className="project-card" target="_blank" rel="noreferrer">
              <h3>Cenetra</h3>
              <p>Preschool management app enabling 100+ teachers to update parents on daily activities. React Navigation, Redux, AsyncStorage, and GitHub Actions CI/CD.</p>
              <div className="tag-row">
                <span className="tag tag-purple">React Native</span>
                <span className="tag tag-green">Node.js</span>
              </div>
            </a>
            <a href="https://github.com/udyding/inclusify" className="project-card" target="_blank" rel="noreferrer">
              <h3>Inclusify — PearlHacks Winner</h3>
              <p>Writing buddy that replaces non-inclusive language with inclusive alternatives.</p>
              <div className="tag-row">
                <span className="tag tag-pink">React</span>
                <span className="tag tag-orange">APIs</span>
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
          </div>
        </section>

        <div className="divider" />

        <section id="skills" className="reveal">
          <p className="section-title">Skills</p>
          <div className="skills-wrap">
            {['TypeScript','JavaScript','Java','Python','C/C++','C#','BASH','SQL','React','React Native','Node.js','Next.js','Express','AWS','MongoDB','MySQL','Docker','Git','HTML/CSS'].map((s) => (
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
