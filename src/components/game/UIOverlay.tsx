"use client";

import { useGameStore } from "@/lib/store";
import { X } from "lucide-react";
import GitHubCalendar from "react-github-calendar";

export default function UIOverlay() {
  const activeNode = useGameStore((state) => state.activeNode);
  const setActiveNode = useGameStore((state) => state.setActiveNode);

  if (!activeNode) return null;

  return (
    <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center bg-background/20 p-4 backdrop-blur-sm transition-all duration-500 animate-in fade-in">
      {/* 
        The modal itself needs pointer-events-auto so we can click the close button,
        while the background remains pointer-events-none so we could theoretically still touch the canvas 
        (or we can block the canvas by making the wrapper auto too).
      */}
      <div className="pointer-events-auto relative w-full max-w-lg overflow-hidden rounded-2xl border border-border bg-card p-8 text-card-foreground shadow-2xl animate-in zoom-in-95 duration-300">
        
        <button
          onClick={() => setActiveNode(null)}
          className="absolute right-4 top-4 rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="mb-6">
          <span className="inline-block rounded-full border border-ring/30 px-3 py-1 text-xs font-medium uppercase tracking-wider text-accent">
            {activeNode.type}
          </span>
        </div>

        {activeNode.type === 'project' && (
          <div>
            <h2 className="mb-2 text-3xl font-semibold tracking-tight font-heading">
              {activeNode.data.title}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {activeNode.data.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {activeNode.data.techStack.map((tech: string) => (
                <span key={tech} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeNode.type === 'experience' && (
          <div>
            <h2 className="mb-1 text-3xl font-semibold tracking-tight font-heading">
              {activeNode.data.title}
            </h2>
            <h3 className="mb-4 text-lg font-medium text-accent">
              {activeNode.data.company}
            </h3>
            <p className="text-muted-foreground">
              {activeNode.data.description}
            </p>
          </div>
        )}

        {activeNode.type === 'skill' && (
          <div>
            <h2 className="mb-2 text-3xl font-semibold tracking-tight font-heading">
              {activeNode.data.name}
            </h2>
            <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className="h-full bg-accent transition-all duration-1000 ease-out" 
                style={{ width: `${activeNode.data.level}%` }}
              />
            </div>
          </div>
        )}

        {activeNode.type === 'education' && (
          <div>
            <h2 className="mb-1 text-3xl font-semibold tracking-tight font-heading">
              {activeNode.data.institution}
            </h2>
            <h3 className="mb-4 text-lg font-medium text-accent">
              {activeNode.data.degree}
            </h3>
            <div className="flex justify-between text-sm text-muted-foreground border-t border-border pt-4 mt-4">
              <span>{activeNode.data.location}</span>
              <span>{activeNode.data.startDate} - {activeNode.data.endDate}</span>
            </div>
            <div className="mt-4 inline-block rounded-md bg-accent/10 px-3 py-1 text-sm font-semibold text-accent">
              Score: {activeNode.data.score}
            </div>
          </div>
        )}

        {activeNode.type === 'startup' && (
          <div>
            <h2 className="mb-1 text-3xl font-semibold tracking-tight font-heading">
              {activeNode.data.name}
            </h2>
            <h3 className="mb-4 text-lg font-medium text-destructive">
              {activeNode.data.tagline}
            </h3>
            <p className="mb-6 text-muted-foreground">
              {activeNode.data.description}
            </p>
            <div className="mb-6 rounded-lg bg-muted p-4">
              <p className="text-sm italic text-foreground text-opacity-80">
                "{activeNode.data.vision}"
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {activeNode.data.techStack.map((tech: string) => (
                <span key={tech} className="rounded-md bg-background px-2 py-1 text-xs text-muted-foreground border border-border">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeNode.type === 'footprint' && (
          <div>
            <h2 className="mb-4 text-3xl font-semibold tracking-tight font-heading">
              Coding Footprint
            </h2>
            <p className="mb-6 text-muted-foreground">
              Live GitHub contributions for <span className="font-semibold text-foreground">{activeNode.data.githubUsername}</span>
            </p>
            <div className="rounded-xl border border-border bg-muted/50 p-4 w-full overflow-x-auto">
               <GitHubCalendar username={activeNode.data.githubUsername} colorScheme="dark" />
            </div>
            <div className="mt-6 flex justify-between gap-4 text-sm text-muted-foreground">
               {activeNode.data.leetcodeUsername && (
                 <div>LeetCode: <span className="text-foreground">{activeNode.data.leetcodeUsername}</span></div>
               )}
               {activeNode.data.codeforcesUsername && (
                 <div>Codeforces: <span className="text-foreground">{activeNode.data.codeforcesUsername}</span></div>
               )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
