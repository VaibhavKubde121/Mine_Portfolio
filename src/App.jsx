import { useEffect, useRef, useState } from 'react'
import emailjs from '@emailjs/browser'
import {
  ArrowDown,
  ArrowLeftRight,
  ArrowRight,
  ArrowUpRight,
  Cable,
  Check,
  Database,
  Layers3,
  Mail,
  MapPin,
  Menu,
  Phone,
  Send,
  Moon,
  Sun,
  X,
  ShoppingCart,
  Utensils,
  Dumbbell,
} from 'lucide-react'
import './Portfolio.css'
import heroImage from './assets/myPhoto.webp'

const projects = [
  {
    number: '01',
    name: 'Spotify Data Engineering Pipeline',
    category: 'DATA ENGINEERING',
    description: 'An end-to-end pipeline for Spotify 2023 data, from AWS ingestion and PySpark transformations to analytics-ready datasets.',
    tools: ['AWS Glue', 'PySpark', 'SQL', 'S3'],
    icon: Database,
    theme: 'project-spotify',
    url: 'https://drive.google.com/file/d/1kFfNXZpRcX50O6Q19SqhWJ3b85gLFiFg/view',
  },
  {
    number: '02',
    name: 'KavyaLearn',
    category: 'FULL-STACK PRODUCT',
    description: 'A role-based learning platform for admins, instructors, and students, with course enrollment and real-time communication.',
    tools: ['React.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    icon: Layers3,
    theme: 'project-kavya',
    url: 'https://github.com/adityamahajan785/kavya-learn',
  },
  {
    number: '03',
    name: 'MenteeTrack',
    category: 'MENTORSHIP PLATFORM',
    description: 'A focused mentor–mentee experience with secure accounts, searchable profiles, and streamlined matching workflows.',
    tools: ['Java', 'Spring Boot', 'MySQL', 'JavaScript'],
    icon: ArrowUpRight,
    theme: 'project-mentee',
    url: 'https://github.com/VaibhavKubde121/DBMS_Project',
  },
  {
    number: '04',
    name: 'E-Commerce Product Management System',
    category: 'FULL-STACK APPLICATION',
    description: 'A responsive product management system with CRUD workflows, validated data, and live search.',
    tools: ['Java', 'Spring Boot', 'ReactJS', 'H2'],
    icon: ShoppingCart,
    theme: 'project-commerce',
    url: 'https://github.com/VaibhavKubde121/Spring_Boot_Ecommerce_Application',
    date: 'AUG 2025',
    highlights: [
      'Built backend services with Spring Boot and an H2 in-memory database, reducing backend processing time by 40%.',
      'Created an interactive ReactJS interface with dynamic search and real-time updates, improving product discoverability by 60%.',
      'Implemented validated CRUD workflows, improving data accuracy and user engagement by 35%.',
    ],
  },
  {
    number: '05',
    name: 'Food Website',
    category: 'FRONTEND APPLICATION',
    description: 'A food discovery website with live API data, search, category browsing, pagination, and nutrition details.',
    tools: ['ReactJS', 'Tailwind CSS', 'Food API'],
    icon: Utensils,
    theme: 'project-food',
    url: 'https://github.com/VaibhavKubde121/Food-Website',
    date: 'NOV 2023',
    highlights: [
      'Integrated a food API to present more than 25 food items in real time.',
      'Added intelligent search and category browsing, improving content accessibility by 40% and search speed by 30%.',
      'Refined interaction with pagination and nutritional breakdowns, boosting engagement by 50%.',
    ],
  },
  {
    number: '06',
    name: 'Gym Management System',
    category: 'WEB APPLICATION',
    description: 'A gym management platform for membership handling and class scheduling, built with a team of three.',
    tools: ['HTML', 'CSS', 'JavaScript', 'Bootstrap'],
    icon: Dumbbell,
    theme: 'project-gym',
    url: 'https://github.com/VaibhavKubde121/Webathon_2.O',
    date: 'JUNE 2023',
    highlights: [
      'Automated membership handling and class scheduling.',
      'Produced the platform within a 12-hour Webathon, ranking in the top 5% among 50+ teams.',
      'Collaborated with two developers to reduce page load time by 35% and improve responsiveness.',
    ],
  },
]

const skills = [
  { label: 'Languages', values: ['Java', 'Python', 'JavaScript', 'SQL'] },
  { label: 'Frontend', values: ['React.js', 'HTML', 'CSS', 'Tailwind CSS'] },
  { label: 'Backend', values: ['Node.js', 'Spring Boot', 'JDBC', 'REST APIs'] },
  { label: 'Data & cloud', values: ['PySpark', 'AWS', 'Databricks', 'ETL'] },
  { label: 'Tools', values: ['GitHub', 'MongoDB', 'Bootstrap', 'MySQL'] },
]

const skillLogos = {
  Java: ['J', '#E76F00', '#fff0df'], Python: ['Py', '#3776AB', '#e9f3fb'], JavaScript: ['JS', '#323330', '#F7DF1E'],
  'React.js': ['⚛', '#149ECA', '#e6f7fb'], HTML: ['</>', '#fff', '#E34F26'], CSS: ['#', '#fff', '#1572B6'], 'Tailwind CSS': ['≈', '#06B6D4', '#e4f9fc'],
  'Node.js': ['JS', '#43853D', '#eaf5e8'], 'Spring Boot': ['S', '#6DB33F', '#edf7e8'],
  PySpark: ['✦', '#E25A1C', '#fff0e8'], AWS: ['aws', '#232F3E', '#fff3dc'], Databricks: ['DB', '#FF3621', '#fff0ee'],
  GitHub: ['GH', '#181717', '#eeeeef'], MongoDB: ['M', '#47A248', '#ebf7eb'], Bootstrap: ['B', '#7952B3', '#f2ebfb'], MySQL: ['SQL', '#00758F', '#e8f6f8'],
}

const genericSkillIcons = { SQL: Database, JDBC: Cable, 'REST APIs': Cable, ETL: ArrowLeftRight }

const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim(),
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim(),
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim(),
}

function App() {
  const [formStatus, setFormStatus] = useState('idle')
  const [formError, setFormError] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('portfolio-theme') || 'dark'
    } catch {
      return 'dark'
    }
  })
  const isProjectsPage = window.location.pathname === '/projects'
  const skillsRef = useRef(null)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'dark' ? '#111713' : '#f7f8f4')
    try { localStorage.setItem('portfolio-theme', theme) } catch { /* Storage may be disabled. */ }
  }, [theme])

  useEffect(() => {
    document.title = isProjectsPage
      ? 'Projects | Vaibhav Kubde'
      : 'Vaibhav Kubde | Software Engineer'
    const description = document.querySelector('meta[name="description"]')
    description?.setAttribute('content', isProjectsPage
      ? 'Selected software engineering, data engineering, and full-stack projects by Vaibhav Kubde.'
      : 'Vaibhav Kubde is a software engineer building reliable data pipelines and thoughtful web applications.')
  }, [isProjectsPage])

  useEffect(() => {
    const rows = skillsRef.current?.querySelectorAll('.skill-row')
    if (!rows?.length) return undefined

    if (!('IntersectionObserver' in window)) {
      rows.forEach((row) => row.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, { threshold: 0.18 })

    rows.forEach((row) => observer.observe(row))
    return () => observer.disconnect()
  }, [])

  if (isProjectsPage) {
    return (
      <div className="site-shell">
        <header className="site-header">
          <a className="wordmark" href="/" aria-label="Vaibhav Kubde, home">VK<span>.</span></a>
          <div className="projects-header-actions">
            <a className="text-link projects-back-link" href="/"><ArrowRight className="back-arrow" size={15} /> Back to portfolio</a>
            <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
              <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </header>
        <main className="all-projects-section section-wrap page-gutter">
          <div className="section-heading">
            <div><p className="eyebrow">A SELECTION OF THINGS I&apos;VE MADE</p><h1 className="projects-page-title">All projects<span>.</span></h1></div>
            <p className="section-aside">Six projects across data engineering, full-stack products, and the web.</p>
          </div>
          <div className="project-grid all-projects-grid">
            {projects.map((project) => {
              const ProjectIcon = project.icon
              return (
                <article className={`project-card ${project.theme}`} key={project.number}>
                  <div className="project-art" aria-hidden="true">
                    <div className="mentee-art all-projects-art"><div className="mentee-badge"><ProjectIcon size={20} /></div><span>{project.category}</span><strong>{project.name}</strong><div className="mentee-orbit"><i /><i /><i /></div></div>
                  </div>
                  <div className="project-info">
                    <div className="project-kicker"><span>{project.category}</span><span className="project-card-actions"><span>{project.date || project.number}</span><a className="project-repo-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} ${project.url.includes('github.com') ? 'GitHub repository' : 'project link'}`} title={project.url.includes('github.com') ? 'View GitHub repository' : 'View project'}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg></a></span></div>
                    <h2>{project.name}</h2>
                    <p>{project.description}</p>
                    <div className="project-tools">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                    {project.highlights && <ul className="project-highlights">{project.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>}
                  </div>
                </article>
              )
            })}
          </div>
        </main>
        <footer className="site-footer page-gutter"><a className="wordmark" href="/">VK<span>.</span></a><span>Designed &amp; built with care · 2026</span><a href="/">Back to portfolio <ArrowUpRight size={14} /></a></footer>
      </div>
    )
  }

  async function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      const subject = formData.get('subject')
      const body = [
        `From: ${formData.get('name')} (${formData.get('email')})`,
        '',
        formData.get('message'),
      ].join('\n')
      window.location.href = `mailto:vaibhavkubde2003@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      setFormStatus('email')
      return
    }

    setFormError('')
    setFormStatus('sending')

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          userName: formData.get('name'),
          from_name: formData.get('name'),
          email: formData.get('email'),
          from_email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
          reply_to: formData.get('email'),
        },
        { publicKey: emailConfig.publicKey },
      )
      form.reset()
      setFormStatus('sent')
    } catch (error) {
      setFormError(error?.text?.includes('Invalid grant')
        ? 'The email service needs to reconnect to Gmail. Please '
        : 'Email couldn’t be sent. Please ')
      setFormStatus('error')
    }
  }

  function closeMenu() {
    setMenuOpen(false)
  }

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#home" aria-label="Vaibhav Kubde, home" onClick={closeMenu}>VK<span>.</span></a>
        <button className="menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        <nav className={`main-nav${menuOpen ? ' is-open' : ''}`} id="main-navigation" aria-label="Main navigation">
          <a href="#work" onClick={closeMenu}>Work</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>
          <a href="#about" onClick={closeMenu}>About</a>
          <a className="nav-contact" href="#contact" onClick={closeMenu}>Let&apos;s talk <ArrowUpRight size={15} /></a>
          <button className="theme-toggle" type="button" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            <span>{theme === 'dark' ? 'Light' : 'Dark'}</span>
          </button>
        </nav>
      </header>

      <main>
        <section className="hero-section page-gutter" id="home">
          <div className="hero-copy">
            <div className="availability"><span /> OPEN TO OPPORTUNITIES</div>
            <h1>Building useful things, <em>one thoughtful detail</em> at a time.</h1>
            <p className="hero-intro">I&apos;m Vaibhav, a software engineer interested in reliable data systems and friendly, full-stack products.</p>
            <div className="hero-actions">
              <a className="button button-dark inline-flex items-center" href="#work">Explore my work <ArrowDown size={16} /></a>
              <a className="text-link" href="mailto:vaibhavkubde2003@gmail.com">Get in touch <ArrowUpRight size={15} /></a>
            </div>
            <div className="hero-meta">
              <span><MapPin size={14} /> Pune, Maharashtra, India</span>
              <span className="meta-divider" />
              <a href="tel:+919022346854"><Phone size={14} /> +91 90223 46854</a>
            </div>
          </div>

          <div className="hero-visual" aria-label="Featured project visual">
            <img className="hero-image" src={heroImage} alt="Portrait of Vaibhav Kubde" fetchPriority="high" decoding="async" />
          </div>
        </section>

        <section className="signal-strip page-gutter" aria-label="Career highlights">
          <div><strong>10<span>+</span></strong><span>application features shipped</span></div>
          <div><strong>90<span>%</span></strong><span>sprint completion rate</span></div>
          <div><strong>40<span>%</span></strong><span>less manual data handling</span></div>
          <div className="strip-note">A little better, every iteration.</div>
        </section>

        <section className="work-section section-wrap page-gutter" id="work">
          <div className="section-heading">
            <div><p className="eyebrow">A FEW THINGS I&apos;VE MADE</p><h2>Selected work<span>.</span></h2></div>
            <p className="section-aside">From thoughtful interfaces to data that&apos;s ready to work.</p>
          </div>
          <div className="project-grid">
            {projects.slice(0, 3).map((project) => {
              const ProjectIcon = project.icon
              return (
                <article className={`project-card ${project.theme}`} key={project.number}>
                  <div className="project-art" aria-hidden="true">
                    {project.theme === 'project-spotify' ? (
                      <div className="pipeline-art">
                        <div className="pipeline-head"><span>SPOTIFY ANALYTICS</span><span>LIVE <i /></span></div>
                        <div className="chart-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div>
                        <div className="pipeline-flow"><span>AMAZON S3</span><ArrowRight size={13} /><span>GLUE</span><ArrowRight size={13} /><span>PYSPARK</span></div>
                      </div>
                    ) : project.theme === 'project-kavya' ? (
                      <div className="learn-art"><div className="learn-sidebar"><b>K</b><i /><i /><i /></div><div className="learn-main"><span>YOUR LEARNING SPACE</span><strong>Good morning,<br />let&apos;s keep learning.</strong><div className="learn-tiles"><i /><i /><i /></div></div></div>
                    ) : (
                      <div className="mentee-art"><div className="mentee-badge"><ProjectIcon size={20} /></div><span>BETTER TOGETHER</span><strong>Find your<br />next mentor.</strong><div className="mentee-orbit"><i /><i /><i /></div></div>
                    )}
                  </div>
                  <div className="project-info">
                    <div className="project-kicker"><span>{project.category}</span><span className="project-card-actions"><span>{project.number}</span><a className="project-repo-link" href={project.url} target="_blank" rel="noreferrer" aria-label={`Open ${project.name} ${project.url.includes('github.com') ? 'GitHub repository' : 'project link'}`} title={project.url.includes('github.com') ? 'View GitHub repository' : 'View project'}><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 .5a12 12 0 0 0-3.79 23.39c.6.11.82-.26.82-.58v-2.05c-3.34.73-4.04-1.42-4.04-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.75.08-.74.08-.74 1.2.09 1.83 1.23 1.83 1.23 1.07 1.83 2.8 1.3 3.49.99.11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.66 1.65.25 2.87.13 3.17.77.84 1.23 1.91 1.23 3.22 0 4.62-2.8 5.64-5.48 5.94.43.37.81 1.1.81 2.22v3.29c0 .32.22.69.83.57A12 12 0 0 0 12 .5Z" /></svg></a></span></div>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <div className="project-tools">{project.tools.map((tool) => <span key={tool}>{tool}</span>)}</div>
                  </div>
                </article>
              )
            })}
          </div>
          <div className="projects-see-all"><a className="button button-dark" href="/projects">See all projects <ArrowRight size={16} /></a></div>
        </section>

        <section className="experience-section section-wrap page-gutter" id="experience">
          <div className="section-heading">
            <div><p className="eyebrow">WHERE I&apos;VE BEEN</p><h2>Experience<span>.</span></h2></div>
            <p className="section-aside">Curiosity, collaboration, and a bias for getting it done.</p>
          </div>
          <article className="experience-row">
            <div className="experience-mark">K</div>
            <div className="experience-main">
              <div className="experience-title"><h3>Associate Software Engineer Intern</h3><span>OCT 2025 — APR 2026</span></div>
              <p className="company-name">Kavya Infoweb Pvt. Ltd. <span>·</span> Nagpur, Maharashtra</p>
              <ul>
                <li>Adapted to a varied stack of 4+ frameworks and tools while delivering evolving project requirements.</li>
                <li>Engineered and maintained 10+ application features, contributing to a 90%+ sprint completion rate.</li>
                <li>Resolved 50+ merge conflicts and helped keep cross-functional collaboration moving.</li>
              </ul>
            </div>
          </article>
        </section>

        <section className="about-section section-wrap page-gutter" id="about">
          <div className="about-copy">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>Engineer by training.<br /><em>Builder by nature.</em></h2>
            <p>I enjoy taking a problem from its first rough sketch to something people can rely on. Lately, that has meant building full-stack learning tools, improving data workflows, and learning a lot along the way.</p>
            <a className="text-link" href="mailto:vaibhavkubde2003@gmail.com">Say hello <ArrowUpRight size={15} /></a>
          </div>
          <div className="about-details">
            <div className="detail-heading"><span>EDUCATION</span><span>01 / 02</span></div>
            <article className="education-item">
              <div><h3>Savitribai Phule Pune University</h3><span>Bachelor of Engineering · Computer Engineering</span></div>
              <strong>8.68 CGPA</strong>
              <small>2021 — 2025</small>
            </article>
            <article className="education-item">
              <div><h3>Dr. M.K. Umathe College, Nagpur</h3><span>Class XII · 91.17%</span></div>
              <small>2020 — 2021</small>
            </article>
            <article className="education-item">
              <div><h3>St. John&apos;s High School, Hinganghat</h3><span>Class X · 80.60%</span></div>
              <small>2018 — 2019</small>
            </article>
          </div>
        </section>

        <section className="skills-section section-wrap page-gutter">
          <div className="section-heading">
            <div><p className="eyebrow">TOOLS OF THE TRADE</p><h2>My toolkit<span>.</span></h2></div>
            <p className="section-aside">The right tool for the problem, and always room for one more.</p>
          </div>
          <div className="skill-list" ref={skillsRef}>
            {skills.map((group) => (
              <div className="skill-row" key={group.label}>
                <div className="skill-card-heading"><span className="skill-label">{group.label}</span><span className="skill-count">{String(group.values.length).padStart(2, '0')} SKILLS</span></div>
                <div className="skill-values">{group.values.map((skill) => {
                  const logo = skillLogos[skill]
                  const GenericIcon = genericSkillIcons[skill]
                  return <span className="skill-chip" key={skill}>
                    <span className="skill-symbol" aria-hidden="true" style={logo ? { '--skill-logo-color': logo[1], '--skill-logo-bg': logo[2] } : undefined}>
                      {logo ? <svg viewBox="0 0 64 64" focusable="false"><text x="50%" y="53%" textAnchor="middle" dominantBaseline="central">{logo[0]}</text></svg> : <GenericIcon size={27} strokeWidth={2} />}
                    </span>
                    {skill}
                  </span>
                })}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="contact-section page-gutter" id="contact">
          <div className="contact-copy">
            <p className="eyebrow">HAVE A GOOD ONE IN MIND?</p>
            <h2>Let&apos;s make<br /><em>something matter.</em></h2>
            <p>I&apos;m always up for a thoughtful conversation about software, data, or a role where I can contribute and grow.</p>
            <a className="contact-email" href="mailto:vaibhavkubde2003@gmail.com"><Mail size={16} /> vaibhavkubde2003@gmail.com <ArrowUpRight size={15} /></a>
            <div className="contact-place"><MapPin size={14} /> Currently in Pune, India</div>
          </div>
          <form className="contact-form" onSubmit={handleSubmit} aria-busy={formStatus === 'sending'}>
            <div className="form-row">
              <label>Your name<input name="name" autoComplete="name" placeholder="Jane Smith" required /></label>
              <label>Email address<input name="email" type="email" autoComplete="email" placeholder="jane@company.com" required /></label>
            </div>
            <label>What&apos;s this about?<input name="subject" maxLength="120" autoComplete="off" placeholder="A project, opportunity, or just hello" required /></label>
            <label>Your message<textarea name="message" rows="4" minLength="10" maxLength="5000" placeholder="A little context goes a long way..." required /></label>
            <div className="form-submit-row">
              <button className="button button-lime" type="submit" disabled={formStatus === 'sending'}>
                {formStatus === 'sending' ? 'Sending…' : formStatus === 'sent' ? 'Message sent' : 'Send a message'}
                {formStatus === 'sent' ? <Check size={16} /> : <Send size={15} />}
              </button>
              <span className={`form-feedback${formStatus === 'error' || formStatus === 'unconfigured' ? ' is-error' : ''}`} role="status" aria-live="polite">
                {formStatus === 'sent' && "Thanks for reaching out. I'll be in touch soon."}
                {formStatus === 'email' && <>Your email app should open with your message ready. If it doesn&apos;t, <a href="mailto:vaibhavkubde2003@gmail.com">email me directly</a>.</>}
                {formStatus === 'error' && <>{formError}<a href="mailto:vaibhavkubde2003@gmail.com">email me directly</a>.</>}
              </span>
            </div>
          </form>
        </section>
      </main>

      <footer className="site-footer page-gutter">
        <a className="wordmark" href="#home">VK<span>.</span></a>
        <span>Designed &amp; built with care · 2026</span>
        <a href="#home">Back to top <ArrowUpRight size={14} /></a>
      </footer>
    </div>
  )
}

export default App
