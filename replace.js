const fs = require('fs');
let content = fs.readFileSync('src/components/Marketplace.tsx', 'utf8');

const target = `<Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground/30 group-focus-within:text-indigo-600 transition-colors" />
               <input 
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 type="text" 
                 placeholder="Search sector, reward, or tactical keyword..." 
                 className="w-full h-14 bg-secondary/30 border border-border/40 rounded-2xl pl-14 pr-6 text-base font-medium focus:outline-none focus:border-indigo-600/40 focus:bg-background transition-all shadow-inner"
               />`;

const replacement = `<div className="absolute inset-x-0 -bottom-px h-[2px] bg-gradient-to-r from-transparent via-indigo-500/80 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 blur-[2px]" />
                <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-center">
                   <Sparkles className="h-5 w-5 text-indigo-500 animate-pulse drop-shadow-[0_0_8px_rgba(79,70,229,0.6)]" />
                </div>
                <input 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  type="text" 
                  placeholder="Semantic AI Search: 'Logistics missions near me with high XP...'" 
                  className="w-full h-14 bg-card/40 backdrop-blur-2xl border border-indigo-500/20 rounded-2xl pl-14 pr-[140px] text-sm font-medium focus:outline-none focus:border-indigo-500/60 focus:bg-background transition-all shadow-[0_0_15px_rgba(79,70,229,0.05)] focus:shadow-[0_0_30px_rgba(79,70,229,0.15)] text-foreground placeholder:text-muted-foreground/50"
                  spellCheck={false}
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-3">
                   <span className="hidden md:block text-[9px] font-black uppercase tracking-widest text-indigo-500/60 transition-opacity">Neural / Fuzzy</span>
                   <button className="h-8 px-4 rounded-xl bg-indigo-500/10 text-indigo-500 border border-indigo-500/20 hover:bg-indigo-600 hover:text-white transition-all text-[10px] font-black uppercase tracking-widest shadow-sm">
                      Search
                   </button>
                </div>`;

const lines = content.split(/\r?\n/);
let startIndex = -1;
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('placeholder="Search sector, reward, or tactical keyword..."')) {
    startIndex = i - 4; // Found the input placeholder, go back 4 lines to <Search
    break;
  }
}

if (startIndex !== -1) {
    const startIdx = content.indexOf('<Search className="absolute left-5 top');
    const endIdxStr = '/>';
    const firstPart = content.slice(0, startIdx);
    const afterSearch = content.slice(startIdx);
    const endOfInputIdx = afterSearch.indexOf('/>');
    
    // a regex replacement is safer
    content = content.replace(/<Search className="absolute left-5 top-1\/2 -translate-y-1\/2 h-5 w-5 text-muted-foreground\/30 group-focus-within:text-indigo-600 transition-colors" \/>[\s\S]*?<input [\s\S]*?className="w-full h-14 bg-secondary\/30 border border-border\/40 rounded-2xl pl-14 pr-6 text-base font-medium focus:outline-none focus:border-indigo-600\/40 focus:bg-background transition-all shadow-inner"[\s\S]*?\/>/, replacement);
    
    fs.writeFileSync('src/components/Marketplace.tsx', content);
    console.log("Success");
} else {
    console.log("Failed to find target");
}
