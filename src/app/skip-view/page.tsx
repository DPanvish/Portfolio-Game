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
import { ArrowRight, MapPin, Briefcase, GraduationCap, Code2, Rocket, Activity, CheckCircle2, Calendar, Mail, FileText, ExternalLink, GitBranch } from 'lucide-react';

export default function SkipView() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-amber-500/30 selection:text-amber-200 pb-32">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] mix-blend-screen"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[150px] mix-blend-screen"></div>
      </div>

      {/* Sticky Top Nav */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/5 bg-slate-950/60 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/40">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-slate-950 font-bold tracking-tighter">
              {mockBio.name.charAt(0)}
            </div>
            <h1 className="font-heading font-bold text-xl tracking-tight text-white">{mockBio.name}</h1>
          </div>
          <Link href="/" className="group flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:border-white/20 hover:bg-white/10">
            Return to Game 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16 space-y-32 relative z-10">
        
        {/* HERO / BIO (Glass Bento) */}
        <section className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div className="rounded-3xl border border-white/10 bg-slate-900/50 p-10 md:p-14 backdrop-blur-md shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight font-heading text-white mb-6">
              Hi, I'm {mockBio.name}.
            </h1>
            <p className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500 mb-8 font-medium">
              {mockBio.tagline}
            </p>
            <p className="text-lg text-slate-400 max-w-2xl leading-relaxed font-light">
              {mockBio.bioText}
            </p>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex-1 rounded-3xl border border-white/10 bg-slate-900/50 p-8 backdrop-blur-md flex flex-col justify-center items-center text-center group hover:bg-white/5 transition-colors">
              <MapPin className="w-8 h-8 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-1">Base</h3>
              <p className="text-xl text-white font-semibold">{mockBio.location}</p>
            </div>
            <div className="flex-1 rounded-3xl border border-white/10 bg-gradient-to-br from-emerald-900/40 to-slate-900/50 p-8 backdrop-blur-md flex flex-col justify-center items-center text-center group hover:from-emerald-800/40 transition-colors relative overflow-hidden">
              <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]" />
              <Activity className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-sm font-medium text-emerald-500/80 uppercase tracking-widest mb-1">Status</h3>
              <p className="text-xl text-emerald-100 font-semibold">{mockBio.availability}</p>
            </div>
          </div>
        </section>

        {/* KINETIC STRIP (CSS Marquee) */}
        <div className="w-[100vw] relative left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] flex overflow-hidden border-y border-white/5 bg-slate-950 py-6">
          <div className="animate-marquee whitespace-nowrap flex gap-12 items-center text-2xl font-heading font-black uppercase tracking-[0.2em] text-slate-800/80">
            <span className="text-white/20">Design</span> <span>&bull;</span>
            <span className="text-white/20">Develop</span> <span>&bull;</span>
            <span className="text-white/20">Ship</span> <span>&bull;</span>
            <span className="text-amber-500/30">Full Stack</span> <span>&bull;</span>
            <span className="text-white/20">Design</span> <span>&bull;</span>
            <span className="text-white/20">Develop</span> <span>&bull;</span>
            <span className="text-white/20">Ship</span> <span>&bull;</span>
            <span className="text-blue-500/30">Frontend</span> <span>&bull;</span>
            <span className="text-white/20">Design</span> <span>&bull;</span>
            <span className="text-white/20">Develop</span> <span>&bull;</span>
            <span className="text-white/20">Ship</span> <span>&bull;</span>
            <span className="text-purple-500/30">Backend</span>
          </div>
        </div>

        {/* STARTUP (Featured) */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <Rocket className="w-8 h-8 text-red-500" />
            <h2 className="text-4xl font-bold font-heading text-white">Current Focus</h2>
          </div>
          <div className="rounded-3xl border border-red-500/20 bg-gradient-to-br from-slate-900 to-red-950/20 p-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-10 opacity-10 blur-3xl pointer-events-none group-hover:opacity-20 transition-opacity duration-1000">
              <Rocket className="w-64 h-64 text-red-500" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
              <div>
                <h3 className="text-5xl font-black mb-4 text-white">{mockStartup.name}</h3>
                <h4 className="text-2xl text-red-400 mb-8 font-medium">{mockStartup.tagline}</h4>
                <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl">{mockStartup.description}</p>
                
                <div className="flex gap-3 flex-wrap mb-8">
                  {mockStartup.techStack.map(tech => (
                    <span key={tech} className="rounded-full border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col justify-center border-l border-white/10 pl-10">
                <blockquote className="text-xl italic text-slate-400 leading-relaxed font-light border-l-2 border-red-500/50 pl-6">
                  "{mockStartup.vision}"
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE & EDUCATION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <section>
            <div className="flex items-center gap-4 mb-10">
              <Briefcase className="w-8 h-8 text-amber-500" />
              <h2 className="text-4xl font-bold font-heading text-white">Experience</h2>
            </div>
            <div className="space-y-6">
              {mockExperiences.map(exp => (
                <div key={exp.id} className="rounded-3xl border border-white/5 bg-slate-900/30 p-8 hover:bg-slate-900/60 transition-colors hover:border-white/10 group">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-amber-400 transition-colors">{exp.title}</h3>
                      <h4 className="text-lg text-slate-400">{exp.company}</h4>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-white/5 px-4 py-2 text-sm text-slate-300 border border-white/5">
                      <Calendar className="w-4 h-4 text-amber-500/70" />
                      {exp.startDate} — {exp.endDate || 'Present'}
                    </div>
                  </div>
                  <p className="text-slate-400 leading-relaxed font-light">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <GraduationCap className="w-8 h-8 text-purple-500" />
              <h2 className="text-4xl font-bold font-heading text-white">Education</h2>
            </div>
            <div className="space-y-6">
              {mockEducation.map(edu => (
                <div key={edu.id} className="rounded-3xl border border-white/5 bg-slate-900/30 p-8 hover:bg-slate-900/60 transition-colors hover:border-white/10 group">
                  <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-purple-400 transition-colors">{edu.institution}</h3>
                      <h4 className="text-lg text-slate-400">{edu.degree}</h4>
                    </div>
                    <div className="flex items-center gap-2 rounded-full bg-purple-500/10 px-4 py-2 text-sm font-bold text-purple-300 border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.1)]">
                      GPA: {edu.score}
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-slate-500 mt-6 pt-6 border-t border-white/5">
                    <span className="flex items-center gap-2"><MapPin className="w-4 h-4"/> {edu.location}</span>
                    <span className="flex items-center gap-2"><Calendar className="w-4 h-4"/> {edu.startDate} — {edu.endDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* FOOTPRINT & SKILLS */}
        <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-16">
          
          <section>
            <div className="flex items-center gap-4 mb-10">
              <Activity className="w-8 h-8 text-green-500" />
              <h2 className="text-4xl font-bold font-heading text-white">Coding Footprint</h2>
            </div>
            <div className="rounded-3xl border border-white/5 bg-slate-900/30 p-8">
              <h3 className="text-lg font-medium text-slate-400 mb-8">Live GitHub Contributions for <span className="text-white">@{mockFootprint.githubUsername}</span></h3>
              <div className="overflow-x-auto overflow-y-hidden custom-scrollbar pb-4">
                <GitHubCalendar username={mockFootprint.githubUsername} colorScheme="dark" />
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-8 border-t border-white/5">
                {mockFootprint.leetcodeUsername && (
                  <div className="flex items-center justify-between rounded-2xl bg-black/40 p-5 border border-white/5 hover:border-amber-500/30 transition-colors">
                    <span className="text-slate-400 font-medium">LeetCode</span>
                    <span className="text-white font-bold">{mockFootprint.leetcodeUsername}</span>
                  </div>
                )}
                {mockFootprint.codeforcesUsername && (
                  <div className="flex items-center justify-between rounded-2xl bg-black/40 p-5 border border-white/5 hover:border-blue-500/30 transition-colors">
                    <span className="text-slate-400 font-medium">Codeforces</span>
                    <span className="text-white font-bold">{mockFootprint.codeforcesUsername}</span>
                  </div>
                )}
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-4 mb-10">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
              <h2 className="text-4xl font-bold font-heading text-white">Skills</h2>
            </div>
            <div className="rounded-3xl border border-white/5 bg-slate-900/30 p-8 space-y-8">
              {mockSkills.map(skill => (
                <div key={skill.id} className="group">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-medium text-white group-hover:text-emerald-400 transition-colors">{skill.name}</span>
                    <span className="text-xs uppercase tracking-widest text-slate-500">{skill.category}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-black/50 overflow-hidden shadow-inner border border-white/5">
                    <div 
                      className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-1000 ease-out" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

        </div>

        {/* PROJECTS */}
        <section>
          <div className="flex items-center gap-4 mb-10">
            <Code2 className="w-8 h-8 text-blue-500" />
            <h2 className="text-4xl font-bold font-heading text-white">Selected Work</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mockProjects.filter(p => p.category === 'work').map(proj => (
              <div key={proj.id} className="group rounded-3xl border border-white/5 bg-slate-900/30 p-8 transition-all hover:bg-slate-900/60 hover:border-blue-500/30 hover:shadow-[0_0_40px_rgba(59,130,246,0.1)] flex flex-col">
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors">{proj.title}</h3>
                <p className="text-slate-400 mb-8 font-light leading-relaxed flex-1">{proj.description}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {proj.techStack.map(tech => (
                    <span key={tech} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-sm text-slate-300">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-6 border-t border-white/5">
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" className="flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors">
                      <ExternalLink className="w-4 h-4" /> Live Site
                    </a>
                  )}
                  {proj.repoUrl && (
                    <a href={proj.repoUrl} target="_blank" className="flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors">
                      <GitBranch className="w-4 h-4" /> Source
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* MULTIVERSE */}
        <section>
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold font-heading text-slate-400">Design Multiverse</h2>
            <span className="text-sm font-medium text-slate-500 uppercase tracking-widest px-4 py-1 rounded-full border border-white/5">Experiments</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {mockProjects.filter(p => p.category === 'multiverse').map(proj => (
              <div key={proj.id} className="rounded-2xl border border-dashed border-white/10 bg-black/20 p-6 hover:bg-white/5 transition-colors group cursor-crosshair">
                <h3 className="text-lg font-bold mb-3 text-slate-300 group-hover:text-white transition-colors">{proj.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 p-16 text-center backdrop-blur-md">
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent pointer-events-none" />
          <h2 className="text-5xl font-bold font-heading mb-6 text-white relative z-10">Let's Build Together</h2>
          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto font-light relative z-10">
            My inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
          </p>
          <div className="flex justify-center gap-6 flex-wrap relative z-10">
            <a href={`mailto:${mockContact.email}`} className="inline-flex h-14 items-center justify-center gap-3 rounded-xl bg-white px-8 text-base font-bold text-slate-950 transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.3)]">
              <Mail className="w-5 h-5" /> Say Hello
            </a>
            <a href={mockContact.resumeUrl} target="_blank" className="inline-flex h-14 items-center justify-center gap-3 rounded-xl border border-white/20 bg-white/5 px-8 text-base font-medium text-white transition-all hover:bg-white/10 hover:border-white/40">
              <FileText className="w-5 h-5" /> View Résumé
            </a>
          </div>
        </section>

      </main>
    </div>
  );
}
