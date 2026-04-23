import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom"
import { 
  ArrowLeft01Icon as ArrowLeft,
  Award01Icon as Award,
  Target01Icon as Target,
  ZapIcon as Zap,
  Briefcase01Icon as Briefcase,
  StarIcon as Star,
  AnalyticsUpIcon as TrendingUp,
  DiamondIcon,
  CrownIcon,
  Shield01Icon as Shield,
  LockIcon,
  Activity01Icon
} from "hugeicons-react"
import { cn } from "@/lib/utils"

export default function ProgressionShowcase() {
  const [hasLeveledUp, setHasLeveledUp] = React.useState(false);
  const [xp, setXp] = React.useState(850);
  const [mounted, setMounted] = React.useState(false);
  const maxXP = 1000;

  React.useEffect(() => {
    setMounted(true);
    // Cinematic trigger demonstration
    const timer = setTimeout(() => {
      setXp(1000);
      setTimeout(() => setHasLeveledUp(true), 1500);
    }, 2800);
    return () => clearTimeout(timer);
  }, []);

  const badgeVariants = {
    hover: { y: -8, scale: 1.02, filter: "brightness(1.3)", transition: { duration: 0.4, ease: "easeOut" } }
  };

  const TIERS = [
    { name: "Initiate", icon: Shield, active: true },
    { name: "Protector", icon: Star, active: true },
    { name: "Vanguard", icon: Target, active: true },
    { name: "Architect", icon: DiamondIcon, active: false, currentNext: true },
    { name: "Paragon", icon: CrownIcon, active: false },
  ];

  return (
    <div className="min-h-screen text-slate-200 selection:bg-emerald-500/20 font-sans overflow-x-hidden relative bg-[#020408]">
      <div className="fixed inset-0 z-0 select-none pointer-events-none">
        <img 
           src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
           alt="Liquid Abstract" 
           className="w-full h-full object-cover opacity-60 mix-blend-screen scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#020408]/40 via-[#020408]/80 to-[#020408]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_0%,black,transparent)] opacity-40" />
      </div>

      <Link to="/" className="fixed top-8 left-8 z-[100] h-12 w-12 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-3xl border border-white/20 transition-all text-white/50 hover:text-white shadow-[inset_0_4px_10px_rgba(255,255,255,0.1),_0_10px_20px_rgba(0,0,0,0.5)]">
        <ArrowLeft className="h-5 w-5" />
      </Link>

      {/* LEVEL-UP: CINEMATIC OVERLAY */}
      <AnimatePresence>
        {hasLeveledUp && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-[#020408]/95 backdrop-blur-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.1),transparent_60%)]" />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 60 }}
              className="text-center relative z-10 w-full max-w-4xl px-6"
            >
               <motion.div 
                 initial={{ scale: 0, rotate: -90 }} animate={{ scale: 1, rotate: 0 }}
                 transition={{ type: "spring", delay: 0.3, damping: 15, mass: 1.5 }}
                 className="relative h-48 w-48 mx-auto mb-16"
               >
                 <div className="absolute inset-0 rounded-full border border-emerald-500/20 blur-[2px] animate-ping duration-1000" />
                 <div className="absolute inset-0 rounded-full bg-emerald-500/20 blur-2xl" />
                 <div className="h-full w-full bg-gradient-to-br from-emerald-400 to-emerald-700 rounded-full flex items-center justify-center shadow-[0_0_80px_rgba(16,185,129,0.5)] border border-emerald-300 relative z-10">
                   <DiamondIcon className="h-20 w-20 text-emerald-950" />
                 </div>
               </motion.div>
               <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.8 }}>
                  <p className="text-xl text-emerald-400 font-black uppercase tracking-[0.6em] mb-6 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">Ascension Complete</p>
                  <h1 className="text-7xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter mb-4">Level 4 Unlocked</h1>
                  <p className="text-xl text-slate-400 font-medium max-w-lg mx-auto">Your tactical capability has expanded. New operational directives and high-priority missions are now accessible.</p>
               </motion.div>
               <motion.button 
                 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4, duration: 0.8 }}
                 onClick={() => { setHasLeveledUp(false); setXp(0); }}
                 className="mt-16 px-12 py-5 rounded-full bg-[#10b981] text-[#022c22] font-black tracking-[0.2em] uppercase transition-all hover:scale-105 relative group overflow-visible shadow-[0_0_40px_rgba(16,185,129,0.3)]"
               >
                 <div className="absolute inset-0 rounded-full bg-[#10b981] blur-xl opacity-60 group-hover:opacity-100 group-hover:blur-[30px] transition-all duration-500" />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                    {[...Array(12)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ 
                           y: [0, -80 - ((i % 4) * 20), -120],
                           x: [0, (i % 2 === 0 ? 1 : -1) * (20 + i * 15), (i % 2 === 0 ? 1 : -1) * (30 + i * 20)],
                           opacity: [0, 1, 0],
                           scale: [0, 1.5, 0]
                        }}
                        transition={{ duration: 1.5 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.2, ease: "easeOut" }}
                        className="absolute top-1/2 left-1/2 h-2 w-2 rounded-full bg-[#6ee7b7] shadow-[0_0_20px_#34d399]"
                      />
                    ))}
                 </div>
                 <span className="relative z-10 drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">Acknowledge</span>
               </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6 py-40 space-y-48 relative z-10 w-full">
        
        {/* 1. HERO - HYPER-FOCUSED HUD */}
        <div className="space-y-24">
           {/* Section 01 Tag */}
           <motion.div 
             initial={{ opacity: 0, x: -20 }} animate={{ opacity: mounted ? 1 : 0, x: 0 }} transition={{ duration: 1, ease: "easeOut" }}
             className="flex items-center gap-4"
           >
              <div className="h-px w-12 bg-emerald-500/50" />
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">System Telemetry 01</span>
           </motion.div>

           <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: mounted ? 1 : 0, y: 0 }} transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }} className="max-w-4xl">
              <h1 className="text-6xl md:text-[5.5rem] leading-[1.1] font-black text-white tracking-tighter mb-8">
                Force Multiplication <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-600">Through Action.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed max-w-2xl">
                Every validated initiative physically alters the architecture of your progression constraints. Push the line.
              </p>
           </motion.div>

           {/* 2. THE XP REACTOR CORE - LIQUID GLASS */}
           <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: mounted ? 1 : 0, scale: 1 }} transition={{ duration: 1.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }} className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-b from-white/10 to-transparent blur-xl rounded-[3rem] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none" />
              <div className="bg-white/[0.02] backdrop-blur-[40px] rounded-[2.5rem] border border-white/10 p-8 md:p-12 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_20px_40px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 {/* Internal grid */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent_70%)] pointer-events-none" />
                 
                 <div className="relative z-10 flex flex-col md:flex-row justify-between items-end gap-12 mb-10">
                    <div>
                       <div className="flex items-center gap-3 mb-4">
                          <Activity01Icon className="h-5 w-5 text-emerald-400 animate-pulse" />
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/80">Active Sequence</span>
                       </div>
                       <p className="text-7xl font-black text-white tracking-tighter">LVL <motion.span>{hasLeveledUp ? "04" : "03"}</motion.span></p>
                    </div>
                    <div className="text-right flex-1 w-full flex flex-col items-end">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Capacity to Level 04</p>
                       <p className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 tracking-tighter font-mono">
                          {Math.floor(xp).toString().padStart(4, '0')} <span className="text-xl text-slate-600 uppercase tracking-widest ml-2">/ 1000 XP</span>
                       </p>
                    </div>
                 </div>

                 {/* The Cinematic Bar */}
                 <div className="relative h-16 w-full rounded-2xl bg-[#020305] border border-white/5 shadow-inner p-1.5 overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full duration-1000 transition-transform ease-in-out" />
                    
                    {/* Segments behind the bar */}
                    <div className="absolute inset-0 flex justify-between px-2">
                       {Array.from({length: 20}).map((_, i) => (
                          <div key={i} className="h-full w-px bg-white/[0.02]" />
                       ))}
                    </div>

                    <motion.div 
                      initial={{ width: '0%' }}
                      animate={{ width: `${(xp / maxXP) * 100}%` }}
                      transition={{ duration: 2.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className={cn(
                        "h-full rounded-xl relative overflow-hidden transition-all duration-300",
                        xp >= maxXP ? "bg-white shadow-[0_0_50px_rgba(255,255,255,0.4)]" : "bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-300 shadow-[0_0_40px_rgba(16,185,129,0.3)]"
                      )}
                    >
                       <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.2)_50%,transparent_75%)] bg-[length:250%_250%] animate-[shimmer_2s_infinite_linear]" />
                       <div className="absolute right-0 top-0 bottom-0 w-4 bg-white shadow-[0_0_20px_white]" />
                    </motion.div>
                 </div>
              </div>
           </motion.div>
        </div>

        {/* 3. RANK TIERS SHOWCASE (THE PATH) */}
        <div className="space-y-16">
            <div className="flex items-center gap-4">
               <div className="h-px w-12 bg-white/20" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Evolution Line 02</span>
            </div>

            <div className="relative pt-12">
               {/* Center Line connecting tiers */}
               <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-white/5 rounded-full" />
               <motion.div 
                 className="absolute top-1/2 -translate-y-1/2 left-0 h-1 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                 initial={{ width: 0 }} whileInView={{ width: '70%' }} transition={{ duration: 2, ease: "easeOut" }} viewport={{ once: true }}
               />
               
               <div className="flex justify-between relative z-10 w-full px-2 md:px-10">
                 {TIERS.map((tier, idx) => (
                    <div key={tier.name} className="flex flex-col items-center gap-6 group">
                       <div className={cn(
                          "relative h-16 w-full md:h-24 md:w-24 rounded-3xl flex items-center justify-center transition-all duration-700 backdrop-blur-[30px] shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_10px_30px_rgba(0,0,0,0.5)] border",
                          tier.active ? "bg-white/[0.08] border-emerald-500/40 text-emerald-400 group-hover:-translate-y-2 group-hover:border-emerald-400 group-hover:shadow-[inset_0_1px_1px_rgba(255,255,255,0.2),_0_15px_40px_rgba(16,185,129,0.3)]" : 
                          tier.currentNext ? "bg-white/[0.04] border-emerald-500/20 text-white group-hover:-translate-y-1 group-hover:bg-white/[0.08] group-hover:border-emerald-500/50" : "bg-white/[0.01] border-white/5 text-slate-600"
                       )}>
                          {tier.active && <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-emerald-500/10 to-transparent rounded-b-3xl pointer-events-none" />}
                          <tier.icon className={cn("h-6 w-6 md:h-10 md:w-10", tier.active ? "opacity-100" : tier.currentNext ? "opacity-100" : "opacity-40")} />
                          {tier.currentNext && (
                            <span className="absolute -top-3 right-0 md:-right-3 h-6 md:h-8 w-6 md:w-8 bg-emerald-500 border-2 border-[#020408] rounded-full flex items-center justify-center">
                               <LockIcon className="h-3 w-3 md:h-4 md:w-4 text-emerald-950" />
                            </span>
                          )}
                       </div>
                       <span className={cn(
                          "text-[9px] md:text-sm font-black uppercase tracking-widest text-center",
                          tier.active ? "text-emerald-400 drop-shadow-[0_0_10px_rgba(16,185,129,0.3)]" : tier.currentNext ? "text-white" : "text-slate-600"
                       )}>{tier.name}</span>
                    </div>
                 ))}
               </div>
            </div>
        </div>

        {/* 5. ACHIEVEMENTS & BADGES (THE ARMORY) */}
        <div className="space-y-16">
            <div className="flex items-center gap-4">
               <div className="h-px w-12 bg-indigo-500/50" />
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400">Classified Honors 03</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                 { title: "First Blood", desc: "First successfully logged op.", icon: Zap, color: "emerald", unlocked: true },
                 { title: "Grid Walker", desc: "10 completed field missions.", icon: Award, color: "indigo", unlocked: true },
                 { title: "Shadow Ops", desc: "Highest impact score locally.", icon: Star, color: "amber", unlocked: false },
                 { title: "Apex Prime", desc: "Top 0.1% command structure.", icon: CrownIcon, color: "rose", unlocked: false },
               ].map((badge, i) => (
                  <motion.div 
                    key={badge.title}
                    whileHover="hover"
                    variants={badgeVariants}
                    custom={i}
                    className="relative p-px rounded-[2.5rem] overflow-hidden group cursor-default"
                  >
                     <div className={cn(
                        "absolute inset-0 bg-gradient-to-br transition-opacity duration-500 opacity-50 block",
                        badge.unlocked ? `from-${badge.color}-500/40 via-transparent to-transparent group-hover:opacity-100` : "from-white/10 to-transparent"
                     )} />
                     
                     <div className={cn(
                       "relative h-full bg-white/[0.03] backdrop-blur-[30px] p-10 rounded-[2.5rem] flex flex-col items-center text-center transition-all duration-500 overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_10px_30px_rgba(0,0,0,0.5)] border border-white/10",
                       !badge.unlocked && "grayscale-[0.8] opacity-60"
                     )}>
                        <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-700">
                           <badge.icon className="h-40 w-40" />
                        </div>
                        <div className={cn(
                          "h-20 w-20 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-inner border",
                          badge.unlocked ? `bg-${badge.color}-500/10 border-${badge.color}-500/20 text-${badge.color}-400 shadow-${badge.color}-500/20` : "bg-white/5 border-white/5 text-slate-500"
                        )}>
                           {badge.unlocked && <div className={cn(`absolute inset-0 bg-${badge.color}-500/20 blur-xl rounded-full`)} />}
                           <badge.icon className="h-8 w-8 relative z-10" />
                        </div>
                        <h4 className="text-xl font-black text-white relative z-10 mb-3">{badge.title}</h4>
                        <p className="text-sm text-slate-400 font-medium relative z-10 leading-relaxed">{badge.desc}</p>
                     </div>
                  </motion.div>
               ))}
            </div>
        </div>

        {/* 7. REWARD SYSTEM & 8. FINAL CTA */}
        <div className="relative pt-32 pb-40 border-t border-white/5 text-center mt-32">
           <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-emerald-500/50 to-transparent" />
           
           <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Acquire Status.</h2>
           <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-20 font-medium">Evolution unlocks direct system privileges and high-clearance tactical access perfectly aligned with your rank.</p>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-32">
              {[
                { title: "Priority Clearance", desc: "Bypass queue systems for high-value critical deployment.", icon: Shield },
                { title: "Fleet Command", desc: "Unlock squad leader privileges for complex operations.", icon: CrownIcon },
                { title: "Physical Cache", desc: "Redeem XP for exclusive, tactical-grade hardware.", icon: Briefcase },
              ].map((reward, idx) => (
                <motion.div 
                   key={reward.title} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: idx * 0.1, duration: 0.8 }}
                   className="p-10 rounded-[2.5rem] bg-white/[0.03] backdrop-blur-2xl border border-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),_0_20px_40px_rgba(0,0,0,0.4)] hover:border-white/30 transition-all hover:-translate-y-2 group"
                >
                   <reward.icon className="h-10 w-10 mx-auto text-slate-300 mb-8 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-all" />
                   <h4 className="text-xl font-bold text-white mb-4">{reward.title}</h4>
                   <p className="text-sm text-slate-500 leading-relaxed">{reward.desc}</p>
                </motion.div>
              ))}
           </div>

           <Link to="/dashboard">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="group relative px-16 py-6 rounded-full bg-[#6366f1] text-[#ffffff] font-black uppercase tracking-[0.3em] text-sm overflow-visible shadow-[0_0_40px_rgba(99,102,241,0.4)] border border-[#818cf8]"
             >
               <div className="absolute inset-0 rounded-full bg-[#6366f1] blur-[20px] opacity-70 group-hover:opacity-100 group-hover:blur-[40px] transition-all duration-500" />
               <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#818cf8] to-[#c084fc] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ 
                         y: [0, -60 - ((i % 5) * 20), -120],
                         x: [0, ((i % 2 === 0 ? 1 : -1) * (15 + i * 10)), ((i % 2 === 0 ? 1 : -1) * (25 + i * 20))],
                         opacity: [0, 1, 0],
                         scale: [0, 2, 0]
                      }}
                      transition={{ duration: 2 + (i % 3) * 0.5, repeat: Infinity, delay: i * 0.15, ease: "easeOut" }}
                      className="absolute top-1/2 left-1/2 h-1.5 w-1.5 rounded-full bg-[#e0e7ff] shadow-[0_0_20px_#818cf8]"
                    />
                  ))}
               </div>
               <span className="relative z-10 w-full flex items-center justify-center gap-3 drop-shadow-[0_2px_10px_rgba(255,255,255,0.8)]">
                  Initiate Protocol
               </span>
             </motion.button>
           </Link>
        </div>

      </div>
    </div>
  )
}
