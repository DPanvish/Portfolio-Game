import { 
  mockBio, 
  mockExperiences, 
  mockEducation, 
  mockProjects, 
  mockStartup, 
  mockFootprint, 
  mockSkills, 
  mockContact 
} from '@/lib/data';
import { GitHubCalendar } from 'react-github-calendar';
import Link from 'next/link';

export default function SkipView() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-accent pb-20">
      
      {/* Sticky Top Nav / Return to Game */}
      <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md p-4 flex justify-between items-center">
        <h1 className="font-heading font-bold text-xl tracking-tight">Portfolio</h1>
        <Link href="/" className="text-sm font-medium text-accent hover:underline underline-offset-4">
          Return to Game Experience &rarr;
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-24">
        
        {/* HERO / BIO */}
        <section className="space-y-4">
          <h1 className="text-5xl font-bold tracking-tight font-heading sm:text-7xl">
            {mockBio.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {mockBio.tagline}
          </p>
          <p className="text-base text-foreground/80 max-w-3xl leading-relaxed">
            {mockBio.bioText}
          </p>
          <div className="flex gap-4 pt-4 text-sm font-medium">
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-accent border border-accent/20">
              {mockBio.location}
            </span>
            <span className="inline-flex items-center rounded-full bg-accent/10 px-3 py-1 text-accent border border-accent/20">
              {mockBio.availability}
            </span>
          </div>
        </section>

        {/* KINETIC STRIP (CSS Marquee) */}
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] flex overflow-hidden border-y border-border bg-card py-4">
          <div className="animate-marquee whitespace-nowrap flex gap-8 items-center text-xl font-heading font-semibold uppercase tracking-widest text-muted-foreground">
            <span>Design</span> <span>&bull;</span>
            <span>Develop</span> <span>&bull;</span>
            <span>Ship</span> <span>&bull;</span>
            <span>Full Stack</span> <span>&bull;</span>
            <span>Design</span> <span>&bull;</span>
            <span>Develop</span> <span>&bull;</span>
            <span>Ship</span> <span>&bull;</span>
            <span>Full Stack</span> <span>&bull;</span>
            <span>Design</span> <span>&bull;</span>
            <span>Develop</span> <span>&bull;</span>
            <span>Ship</span> <span>&bull;</span>
            <span>Full Stack</span>
          </div>
        </div>

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">Experience</h2>
          <div className="space-y-12">
            {mockExperiences.map(exp => (
              <div key={exp.id} className="grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4">
                <div className="text-muted-foreground text-sm font-medium pt-1">
                  {exp.startDate} — {exp.endDate || 'Present'}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                  <h4 className="text-lg text-accent mb-4">{exp.company}</h4>
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* EDUCATION */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">Education</h2>
          <div className="space-y-8">
            {mockEducation.map(edu => (
              <div key={edu.id} className="rounded-xl border border-border bg-card p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-bold">{edu.institution}</h3>
                  <span className="text-sm text-muted-foreground">{edu.startDate} — {edu.endDate}</span>
                </div>
                <h4 className="text-lg text-accent mb-4">{edu.degree}</h4>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-muted-foreground">{edu.location}</span>
                  <span className="rounded-full bg-accent/10 px-3 py-1 text-accent">Score: {edu.score}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STARTUP */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">Startup</h2>
          <div className="rounded-2xl border border-destructive/30 bg-card p-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-destructive"></div>
            <h3 className="text-3xl font-bold mb-2">{mockStartup.name}</h3>
            <h4 className="text-xl text-destructive mb-6 font-medium">{mockStartup.tagline}</h4>
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-2xl">{mockStartup.description}</p>
            <blockquote className="border-l-2 border-border pl-4 italic text-foreground/80 mb-6">
              "{mockStartup.vision}"
            </blockquote>
            <div className="flex gap-2 flex-wrap">
              {mockStartup.techStack.map(tech => (
                <span key={tech} className="rounded-md border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">Selected Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mockProjects.filter(p => p.category === 'work').map(proj => (
              <div key={proj.id} className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-accent">
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">{proj.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-3">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.techStack.map(tech => (
                    <span key={tech} className="rounded border border-border/50 bg-background/50 px-2 py-1 text-xs text-muted-foreground">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 text-sm font-medium">
                  {proj.liveUrl && <a href={proj.liveUrl} target="_blank" className="text-accent hover:underline">Live Site &nearr;</a>}
                  {proj.repoUrl && <a href={proj.repoUrl} target="_blank" className="text-foreground hover:underline">GitHub &nearr;</a>}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MULTIVERSE */}
        <section>
          <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">Design Multiverse</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {mockProjects.filter(p => p.category === 'multiverse').map(proj => (
              <div key={proj.id} className="rounded-xl border border-dashed border-border bg-card/30 p-6">
                <h3 className="text-lg font-bold mb-2">{proj.title}</h3>
                <p className="text-muted-foreground text-sm">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTPRINT & SKILLS */}
        <section className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">
          
          <div>
            <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">Coding Footprint</h2>
            <div className="rounded-xl border border-border bg-card p-6 overflow-x-auto">
              <h3 className="text-lg font-medium mb-4">Live GitHub Contributions</h3>
              <GitHubCalendar username={mockFootprint.githubUsername} colorScheme="dark" />
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold font-heading mb-8 border-b border-border pb-4">Skills</h2>
            <div className="space-y-6">
              {mockSkills.map(skill => (
                <div key={skill.id}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-xs text-muted-foreground">{skill.category}</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${skill.level}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </section>

        {/* CONTACT */}
        <section className="text-center bg-card rounded-2xl border border-border p-12">
          <h2 className="text-4xl font-bold font-heading mb-4">Let's Build Together</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
            My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a href={`mailto:${mockContact.email}`} className="inline-flex h-12 items-center justify-center rounded-md bg-foreground px-8 font-medium text-background transition-colors hover:bg-foreground/90">
              Say Hello
            </a>
            <a href={mockContact.resumeUrl} target="_blank" className="inline-flex h-12 items-center justify-center rounded-md border border-border bg-transparent px-8 font-medium hover:bg-muted">
              View Résumé
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
