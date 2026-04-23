import * as React from "react"
import { motion } from "framer-motion"
import { 
  DocumentCodeIcon as FileText, 
  Time01Icon as Clock, 
  UserIcon as User, 
  Shield01Icon as Shield, 
  Alert01Icon as AlertTriangle, 
  CheckmarkCircle01Icon as CheckCircle2, 
  More02Icon as MoreVertical, 
  Add01Icon as Plus 
} from "hugeicons-react"
import { Button } from "./ui/button"

export default function AssignmentsPage() {
  const assignments = [
    { id: "LOG-01", title: "Supply Chain Log: North Docks", type: "Operational", deadline: "2h 15m", status: "In Progress", priority: "High" },
    { id: "EDU-04", title: "Local School Infrastructure Audit", type: "Audit", deadline: "6h 40m", status: "Pending", priority: "Normal" },
    { id: "SEC-09", title: "Grid Integrity Verification", type: "Security", deadline: "Completed", status: "Verified", priority: "Low" },
  ];

  return (
    <div className="flex-1 overflow-y-auto p-10 font-body transition-all">
      <div className="max-w-6xl mx-auto">
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-border pb-12">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
               <div className="h-8 w-8 rounded-xl bg-accent/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-accent" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">Registry & Directives</span>
            </div>
            <h1 className="text-6xl font-display italic font-light tracking-tighter leading-none">
              Asset <span className="not-italic font-bold">Allocation</span>
            </h1>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex -space-x-3">
                {[1,2,3].map(i => (
                  <div key={i} className="h-10 w-10 rounded-full border-2 border-background bg-secondary overflow-hidden shadow-md">
                     <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=User${i}`} alt="U" />
                  </div>
                ))}
<div className="h-10 w-10 rounded-full border-2 border-background bg-foreground flex items-center justify-center text-[10px] font-black text-background">+12</div>
             </div>
             <Button className="h-12 w-12 rounded-2xl bg-foreground text-background shadow-xl hover:scale-110 p-0 transition-transform">
                <Plus className="h-6 w-6" />
             </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10 overflow-x-auto whitespace-nowrap scrollbar-hide">
           {["All Directives", "In Progress", "Pending Review", "Verified Log"].map((filter, i) => (
             <button key={i} className={`px-8 py-3 rounded-none text-xs font-black uppercase tracking-widest transition-none border-2 border-foreground ${i === 0 ? 'bg-foreground text-background' : 'bg-background text-foreground hover:bg-foreground hover:text-background'}`}>
                {filter}
             </button>
           ))}
        </div>

        <div className="space-y-4">
           {assignments.map((task, i) => (
             <motion.div
               key={i}
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.05 }}
               className="p-8 rounded-[2.5rem] border border-border bg-background shadow-sm hover:shadow-2xl hover:border-accent/30 transition-all flex items-center group cursor-pointer"
             >
                <div className="h-14 w-14 rounded-2xl bg-secondary flex items-center justify-center border border-border group-hover:bg-accent/10 transition-colors shrink-0 mr-8">
                   <FileText className={`h-6 w-6 ${task.status === 'Verified' ? 'text-emerald-500' : 'text-muted-foreground group-hover:text-accent'}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                   <div className="flex items-center gap-3 mb-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent/60">{task.id}</span>
                      <span className={`h-1.5 w-1.5 rounded-full ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Normal' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                   </div>
                   <h4 className="text-xl font-bold tracking-tight truncate group-hover:text-accent transition-colors">{task.title}</h4>
                </div>

                <div className="flex items-center gap-12 ml-12 shrink-0">
                   <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 mb-1">Time Left</span>
                      <div className="flex items-center gap-2 text-sm font-bold tabular-nums">
                         <Clock className="h-3 w-3" /> {task.deadline}
                      </div>
                   </div>
                   
                   <div className="flex flex-col items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/30 mb-1">Operational State</span>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] ${task.status === 'Verified' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' : 'bg-secondary text-muted-foreground'}`}>
                         {task.status}
                      </div>
                   </div>

                   <button className="h-10 w-10 rounded-xl hover:bg-secondary flex items-center justify-center transition-colors">
                      <MoreVertical className="h-5 w-5 text-muted-foreground/50" />
                   </button>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  )
}
