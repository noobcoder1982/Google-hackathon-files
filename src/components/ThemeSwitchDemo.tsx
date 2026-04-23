import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"

export default function ThemeSwitchDemo() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-background transition-colors duration-500 overflow-hidden">
      {/* Background with abstract shapes */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/30 blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="z-10 text-center space-y-8 px-4">
        <header className="space-y-2">
          <h1 className="text-6xl font-display italic font-light tracking-tight selection:bg-accent/30">
            System <span className="not-italic font-bold text-accent">Luminance</span>
          </h1>
          <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto">
            Experience the state-of-the-art cinematic theme transition.
          </p>
        </header>

        <div className="p-12 rounded-[3.5rem] bg-background/40 backdrop-blur-3xl border border-border/50 shadow-2xl inline-block transition-all hover:scale-105 active:scale-95 group">
          <div className="relative">
             <div className="absolute -inset-4 bg-accent/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
             <AnimatedThemeToggler className="h-16 w-16 bg-secondary text-foreground hover:bg-secondary/80 shadow-inner scale-150 relative z-10" />
          </div>
        </div>

        <div className="pt-12">
           <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground/40">
              <span className="h-px w-12 bg-border/50" />
              ImpactQuest Core Interface
              <span className="h-px w-12 bg-border/50" />
           </div>
        </div>
      </div>
      
      {/* Visual background image for richness */}
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2672&auto=format&fit=crop" 
          alt="Atmospheric" 
          className="w-full h-full object-cover opacity-10 dark:opacity-20 transition-opacity duration-1000"
        />
      </div>
    </div>
  );
}
