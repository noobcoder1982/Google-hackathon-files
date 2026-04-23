import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Login01Icon as LogIn,
  Mail01Icon as Mail, 
  LockPasswordIcon as Lock, 
  ViewIcon as Eye, 
  ViewOffIcon as EyeOff, 
  ArrowLeft01Icon as ChevronLeft,
  Facebook01Icon as Facebook,
  AppleIcon as Apple,
  Shield01Icon as Shield,
  CpuIcon as Cpu,
  FlashIcon as Zap,
  ArrowRight01Icon as ArrowRight,
  GlobeIcon as Globe
} from "hugeicons-react"
import { Button } from "./ui/button"
import { Link } from "react-router-dom"
import { useTheme } from "../contexts/ThemeContext"
import { cn } from "@/lib/utils"

import { apiRequest } from "../lib/api"

export default function SignInPage({ onLogin }: { onLogin: (user?: any) => void }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [role, setRole] = React.useState<'volunteer' | 'ngo'>('volunteer');
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    organizationName: '',
  });
  const { theme } = useTheme();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        // Login Logic
        const response = await apiRequest('/auth/login', {
          method: 'POST',
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        if (response.success) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          onLogin(response.data.user);
        }
      } else {
        // Register Logic
        const endpoint = role === 'volunteer' ? '/auth/register/volunteer' : '/auth/register/ngo';
        const body = role === 'volunteer' 
          ? { name: formData.name, email: formData.email, password: formData.password }
          : { name: formData.name, organizationName: formData.organizationName || formData.name, email: formData.email, password: formData.password };

        const response = await apiRequest(endpoint, {
          method: 'POST',
          body: JSON.stringify(body),
        });

        if (response.success) {
          localStorage.setItem('accessToken', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('user', JSON.stringify(response.data.user));
          onLogin(response.data.user);
        }
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed');
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen w-full flex bg-background font-sans selection:bg-indigo-600/10 overflow-hidden relative">
      
      {/* Left Panel: Cinematic Visual Briefing */}
      <div className="hidden lg:flex w-3/5 relative bg-black overflow-hidden border-r border-white/5">
         {/* Animated Tactical Mesh */}
         <div className="absolute inset-0 opacity-40" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #312e81 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
         <div className="absolute inset-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/20 blur-[180px] rounded-full animate-pulse" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
         </div>

         {/* Content Overlay */}
         <div className="relative z-10 w-full h-full p-20 flex flex-col justify-between">
            <Link to="/" className="flex items-center gap-4 group">
               <div className="h-12 w-12 rounded-2xl bg-indigo-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <span className="font-black text-2xl italic text-white">IQ</span>
               </div>
               <span className="text-xl font-black tracking-[0.4em] text-white lowercase">impactquest</span>
            </Link>

            <div className="space-y-8 max-w-xl">
               <motion.div 
                 key={isLogin ? 'login-visual' : 'signup-visual'}
                 initial={{ opacity: 0, x: -30 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 1 }}
                 className="space-y-4"
               >
                  <div className="flex items-center gap-3">
                     <Shield className="h-5 w-5 text-indigo-500" />
                     <span className="text-indigo-500 text-[10px] font-black uppercase tracking-[0.4em]">{isLogin ? 'Auth Protocol v4.0.1' : 'Registration Protocol v4.0.1'}</span>
                  </div>
                  <h1 className="text-7xl font-black tracking-tighter text-white leading-[0.85] lowercase">
                     {isLogin ? 'mission' : 'create'} <br/> <span className="text-white/20 italic">{isLogin ? 'briefing.' : 'profile.'}</span>
                  </h1>
                  <p className="text-xl text-white/40 font-medium leading-relaxed italic border-l-4 border-indigo-600 pl-8">
                     {isLogin 
                        ? "\"Accessing the tactical coordination layer requires secure synchronization. Initialize your session to resume global operations.\""
                        : "\"Join the global infrastructure hub. Register your operator profile to begin orchestrating high-fidelity humanitarian missions.\""
                     }
                  </p>
               </motion.div>

               <div className="grid grid-cols-2 gap-8 pt-12">
                  {[
                     { label: "operational nodes", val: "24.5k", icon: Globe },
                     { label: "sync latency", val: "0.02ms", icon: Zap }
                  ].map((stat, i) => (
                     <div key={i} className="space-y-2 p-6 rounded-3xl bg-white/5 border border-white/10">
                        <stat.icon className="h-4 w-4 text-indigo-500 mb-2" />
                        <div className="text-[9px] font-black uppercase tracking-widest text-white/30">{stat.label}</div>
                        <div className="text-3xl font-black text-white italic">{stat.val}</div>
                     </div>
                  ))}
               </div>
            </div>

            <div className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">
               © 2026 ImpactQuest Global Infrastructure Hub
            </div>
         </div>
      </div>

      {/* Right Panel: High-Precision Auth Form */}
      <div className="flex-1 flex flex-col justify-center px-8 md:px-24 lg:px-20 xl:px-32 bg-background relative relative z-10">
         
         {/* Mobile Header (Hidden on LG) */}
         <div className="lg:hidden absolute top-12 left-8 right-8 flex justify-between items-center">
            <Link to="/" className="text-xl font-black tracking-[0.2em] text-foreground lowercase">impactquest</Link>
            <ChevronLeft className="h-6 w-6 text-muted-foreground" />
         </div>

         <motion.div 
           key={isLogin ? 'login-form' : 'signup-form'}
           initial={{ opacity: 0, y: 30 }}
           animate={{ opacity: 1, y: 0 }}
           className="max-w-[440px] w-full mx-auto space-y-8"
         >
            {/* Header */}
            <div className="space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-600">{isLogin ? 'Secure Handshake' : 'Node Registration'}</span>
               <h2 className="text-5xl font-bold tracking-tight text-foreground lowercase">{isLogin ? 'initialize session' : 'register new profile'}</h2>
               <p className="text-muted-foreground text-base font-medium italic opacity-60">
                  {isLogin 
                     ? "Enter your credentials to synchronize with the global mission grid."
                     : "Provide your operator details to deploy your profile onto the infrastructure."
                  }
               </p>
            </div>

            {/* Form */}
            <form onSubmit={handleAuth} className="space-y-4">
               <AnimatePresence mode="popLayout">
                  {!isLogin && (
                     <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-6 overflow-hidden"
                     >
                        {/* Role Selection */}
                        <div className="flex gap-2 p-1 bg-secondary/30 rounded-2xl border border-border/40">
                           <button
                              type="button"
                              onClick={() => setRole('volunteer')}
                              className={cn(
                                 "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                 role === 'volunteer' ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground/60 hover:text-foreground"
                              )}
                           >
                              Volunteer
                           </button>
                           <button
                              type="button"
                              onClick={() => setRole('ngo')}
                              className={cn(
                                 "flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all",
                                 role === 'ngo' ? "bg-indigo-600 text-white shadow-lg" : "text-muted-foreground/60 hover:text-foreground"
                              )}
                           >
                              NGO / Organization
                           </button>
                        </div>

                        <div className="space-y-4">
                           <div className="space-y-2 group">
                              <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 transition-colors group-focus-within:text-indigo-600 pl-2">
                                 {role === 'volunteer' ? 'operator name' : 'contact person name'}
                              </label>
                              <div className="relative">
                                 <LogIn className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-indigo-600 transition-colors" />
                                 <input 
                                    required
                                    name="name"
                                    type="text" 
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder={role === 'volunteer' ? "Alex Thompson" : "Jane Doe"}
                                    className="w-full h-20 bg-secondary/30 rounded-[1.5rem] pl-20 pr-8 text-[15px] font-black tracking-tight outline-none border border-border/60 focus:border-indigo-600 transition-all placeholder:text-muted-foreground/20"
                                 />
                              </div>
                           </div>

                           {role === 'ngo' && (
                              <motion.div 
                                 initial={{ opacity: 0, y: 10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 className="space-y-2 group"
                              >
                                 <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 transition-colors group-focus-within:text-indigo-600 pl-2">organization name</label>
                                 <div className="relative">
                                    <Globe className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-indigo-600 transition-colors" />
                                    <input 
                                       required
                                       name="organizationName"
                                       type="text" 
                                       value={formData.organizationName}
                                       onChange={handleInputChange}
                                       placeholder="Global Aid Network"
                                       className="w-full h-20 bg-secondary/30 rounded-[1.5rem] pl-20 pr-8 text-[15px] font-black tracking-tight outline-none border border-border/60 focus:border-indigo-600 transition-all placeholder:text-muted-foreground/20"
                                    />
                                 </div>
                              </motion.div>
                           )}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>

               {error && (
                  <motion.div 
                     initial={{ opacity: 0, scale: 0.95 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-[10px] font-black uppercase tracking-widest text-red-500 text-center"
                  >
                     {error}
                  </motion.div>
               )}

               <div className="space-y-2 group">
                  <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 transition-colors group-focus-within:text-indigo-600 pl-2">operator email</label>
                  <div className="relative">
                     <Mail className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-indigo-600 transition-colors" />
                     <input 
                        required
                        name="email"
                        type="email" 
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="operator@impactquest.org"
                        className="w-full h-20 bg-secondary/30 rounded-[1.5rem] pl-20 pr-8 text-[15px] font-black tracking-tight outline-none border border-border/60 focus:border-indigo-600 transition-all placeholder:text-muted-foreground/20"
                     />
                  </div>
               </div>

               <div className="space-y-2 group">
                  <div className="flex justify-between items-center px-2">
                     <label className="text-[9px] font-black uppercase tracking-widest text-muted-foreground/60 transition-colors group-focus-within:text-indigo-600">secure password</label>
                     {isLogin && <button type="button" className="text-[9px] font-black uppercase tracking-widest text-indigo-600/40 hover:text-indigo-600 transition-colors">forgot?</button>}
                  </div>
                  <div className="relative">
                     <Lock className="absolute left-8 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-indigo-600 transition-colors" />
                     <input 
                        required
                        name="password"
                        type={showPassword ? "text" : "password"} 
                        value={formData.password}
                        onChange={handleInputChange}
                        placeholder="••••••••"
                        className="w-full h-20 bg-secondary/30 rounded-[1.5rem] pl-20 pr-20 text-[15px] font-black tracking-tight outline-none border border-border/60 focus:border-indigo-600 transition-all placeholder:text-muted-foreground/20"
                     />
                     <button 
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground/30 hover:text-indigo-600 transition-colors"
                     >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                     </button>
                  </div>
               </div>

               <Button 
                  disabled={isLoading}
                  className="w-full h-28 rounded-[2rem] bg-indigo-600 text-white text-2xl font-black tracking-widest gap-6 shadow-2xl shadow-indigo-600/30 hover:scale-[1.02] active:scale-95 transition-all mt-6 relative overflow-hidden"
               >
                  <AnimatePresence mode="wait">
                     {isLoading ? (
                        <motion.div 
                           key="loading"
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }}
                           className="flex items-center gap-3 lowercase"
                        >
                           <Cpu className="h-5 w-5 animate-spin" /> {isLogin ? 'synchronizing...' : 'registering...'}
                        </motion.div>
                     ) : (
                        <motion.div 
                           key="ready"
                           initial={{ opacity: 0 }} 
                           animate={{ opacity: 1 }}
                           className="flex items-center gap-4 lowercase"
                        >
                           {isLogin ? 'begin session' : 'create profile'} <ArrowRight className="h-5 w-5" />
                        </motion.div>
                     )}
                  </AnimatePresence>
               </Button>
               
               <div className="flex flex-col gap-2 pt-2 text-center">
                  <button 
                     type="button"
                     onClick={() => setIsLogin(!isLogin)}
                     className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600 hover:text-indigo-700 transition-colors"
                  >
                     {isLogin ? "don't have a profile? register here" : "already have a profile? session in"}
                  </button>
                  <Button 
                     type="button"
                     variant="ghost" 
                     onClick={onLogin}
                     className="w-full h-12 rounded-[1.5rem] text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-indigo-600 hover:bg-indigo-600/5"
                  >
                     continue as guest operator
                  </Button>
               </div>
            </form>

            {/* Social Handshake */}
            <div className="space-y-6 pt-4">
               <div className="relative flex items-center">
                  <div className="flex-1 border-t border-border/40 border-dashed"></div>
                  <span className="px-6 text-[9px] font-black text-muted-foreground/30 uppercase tracking-[0.4em]">Integrated Auth</span>
                  <div className="flex-1 border-t border-border/40 border-dashed"></div>
               </div>

               <div className="grid grid-cols-2 gap-4">
                  {[
                     { label: "google sync", icon: Globe },
                     { label: "apple protocol", icon: Apple }
                  ].map((social, i) => (
                     <button 
                        key={i}
                        className="h-20 rounded-[2rem] border border-border/60 bg-card hover:bg-secondary/50 flex items-center justify-center gap-4 transition-all group active:scale-95"
                     >
                        <social.icon className="h-5 w-5 text-muted-foreground/40 group-hover:text-indigo-600 transition-colors" />
                        <span className="text-[11px] font-black uppercase tracking-widest text-muted-foreground/60 group-hover:text-foreground">{social.label}</span>
                     </button>
                  ))}
               </div>
            </div>
         </motion.div>
      </div>

      {/* Top Left: Go Back Interface */}
      <Link 
        to="/" 
        className="absolute top-12 left-12 z-50 flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/5 text-white/40 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all group"
      >
         <ChevronLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em] lowercase">go back</span>
      </Link>
    </div>
  )
}
