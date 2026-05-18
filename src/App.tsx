/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence, useMotionValueEvent } from "motion/react";
import { 
  Shield, 
  Lock, 
  AlertTriangle, 
  Globe, 
  User,
  Cpu,
  Zap,
  ChevronDown,
  History as HistoryIcon,
  Bug,
  Terminal,
  Activity,
  Eye,
  ShieldCheck,
  MousePointer2,
  Database,
  X
} from "lucide-react";
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";
import { cn } from "@/src/lib/utils";

// Импорт картинок (для сборщика Vite)
import shieldImg from "./assets/images/cyber_red_hero_shield_1779117242436.png";
import virusImg from "./assets/images/computer_virus_visual_1779117262729.png";
import lockImg from "./assets/images/cyber_security_protection_lock_1779117278060.png";

const statsData = [
  { year: "2019", attacks: 400 },
  { year: "2020", attacks: 480 },
  { year: "2021", attacks: 650 },
  { year: "2022", attacks: 800 },
  { year: "2023", attacks: 1200 },
  { year: "2024", attacks: 1800 },
  { year: "2025", attacks: 2450 },
];

const Slide = ({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section 
    id={id}
    className={cn("min-h-screen flex flex-col justify-center px-4 sm:px-6 py-20 md:py-24 relative overflow-hidden", className)}
  >
    <div className="max-w-7xl mx-auto w-full relative z-10">
      {children}
    </div>
  </section>
);

const FeatureCard: React.FC<{ icon: any, title: string, description: string, delay?: number }> = ({ icon: Icon, title, description, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="p-6 md:p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-cyber-primary/30 transition-all group overflow-hidden relative"
  >
    <div className="absolute top-0 right-0 w-32 h-32 bg-cyber-primary/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-cyber-primary/10 transition-colors" />
    <div className="w-12 h-12 rounded-xl bg-cyber-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
      <Icon className="w-6 h-6 text-cyber-primary" />
    </div>
    <h3 className="text-xl font-display font-semibold mb-3 text-white">{title}</h3>
    <p className="text-slate-300 text-sm leading-relaxed">{description}</p>
  </motion.div>
);

const NavDot: React.FC<{ 
  section: string, 
  index: number, 
  total: number, 
  scrollYProgress: any,
  icon: any
}> = ({ section, index, total, scrollYProgress, icon: Icon }) => {
  const [isReached, setIsReached] = React.useState(false);
  const threshold = index === 0 ? 0 : (index - 0.6) / (total - 1);
  
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const val = latest as number;
    if (val >= threshold) {
      if (!isReached) setIsReached(true);
    } else {
      if (isReached) setIsReached(false);
    }
  });

  return (
    <a 
      href={`#${section}`}
      className="group relative flex items-center justify-center h-4 w-4 z-10"
    >
      <motion.div 
        animate={{ 
          scale: isReached ? 1.1 : 0.8,
          color: isReached ? "#fff" : "rgba(255, 255, 255, 0.2)",
          backgroundColor: isReached ? "rgba(239, 68, 68, 1)" : "rgba(255, 255, 255, 0.03)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        className={cn(
          "w-4 h-4 rounded-full flex items-center justify-center transition-all duration-500 border border-white/5",
          isReached ? "border-cyber-primary shadow-[0_0_8px_rgba(239,68,68,0.4)]" : "border-transparent"
        )}
      >
        <Icon className="w-2.5 h-2.5 stroke-[2.5]" />
      </motion.div>
      
      <span className="absolute right-9 px-3 py-1.5 glass rounded-lg text-[9px] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] translate-x-4 group-hover:translate-x-0 shadow-2xl">
        {section === 'intro' ? 'Вступ' : 
         section === 'history' ? 'Зародження' :
         section === 'viruses' ? 'Віруси' :
         section === 'ai' ? 'AI Захист' :
         section === 'stats' ? 'Статистика' :
         section === 'protection' ? 'Принципи' : 'Підсумок'}
      </span>
    </a>
  );
};

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [activeExtra, setActiveExtra] = useState<null | 'materials' | 'sources'>(null);

  return (
    <div className="relative bg-cyber-dark overflow-x-hidden">
      {/* Background Decor */}
      <div className="fixed inset-0 pointer-events-none grid-background opacity-20" aria-hidden="true" />
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-cyber-primary/5 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />
      <div className="fixed bottom-0 right-1/4 w-[600px] h-[600px] bg-cyber-secondary/5 blur-[150px] rounded-full pointer-events-none" aria-hidden="true" />

      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyber-primary to-cyber-secondary z-50 origin-[0%]" 
        style={{ scaleX }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-4 sm:px-8 z-40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-br from-cyber-primary to-cyber-secondary flex items-center justify-center shadow-lg shadow-cyber-primary/20">
            <Shield className="text-white w-5 h-5 sm:w-6 sm:h-6" />
          </div>
          <span className="font-display font-bold text-lg sm:text-xl tracking-tighter text-white">CyberDefense</span>
        </div>
        <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#intro" className="hover:text-cyber-primary transition-colors">Вступ</a>
          <a href="#history" className="hover:text-cyber-primary transition-colors">Історія</a>
          <a href="#viruses" className="hover:text-cyber-primary transition-colors">Віруси</a>
          <a href="#ai" className="hover:text-cyber-primary transition-colors">AI & Безпека</a>
          <a href="#stats" className="hover:text-cyber-primary transition-colors">Статистика</a>
          <a href="#protection" className="hover:text-cyber-primary transition-colors">Захист</a>
          <a href="#conclusion" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10 text-white">Висновок</a>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col items-center">
        <div className="glass p-1 rounded-full flex flex-col gap-3 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] bg-gradient-to-b from-cyber-primary to-cyber-secondary origin-top opacity-20"
            style={{ height: "100%", scaleY: scrollYProgress }}
          />
           {[
             { id: 'intro', icon: Terminal }, 
             { id: 'history', icon: HistoryIcon }, 
             { id: 'viruses', icon: Bug }, 
             { id: 'ai', icon: Cpu }, 
             { id: 'stats', icon: Activity }, 
             { id: 'protection', icon: Shield }, 
             { id: 'conclusion', icon: ShieldCheck }
           ].map((section, idx, arr) => (
            <NavDot 
              key={section.id}
              section={section.id}
              icon={section.icon}
              index={idx}
              total={arr.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>

      <main>
        {/* Intro Slide */}
        <Slide id="intro" className="pt-32 sm:pt-40">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary text-xs font-bold uppercase tracking-widest mb-6">
                <Activity className="w-3 h-3" />
                Проект: Кібербезпека
              </div>
              <h1 className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-white leading-[1] tracking-tighter mb-8 text-glow-primary">
                Основи <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">кібер</span> <br />
                безпеки
              </h1>
              <p className="text-lg sm:text-xl text-slate-200 max-w-lg mb-10 leading-relaxed font-light">
                Стислий огляд ключових аспектів цифрового захисту. Лаконічно про історію, головні загрози та методи збереження ваших даних у сучасному інтернет просторі.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-3 px-6 py-4 rounded-xl border border-white/10 text-white/70 text-sm font-mono tracking-wider bg-white/[0.02]">
                  <User className="w-4 h-4 text-cyber-primary" />
                  <span>Стоянов Артем 15-А</span>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative aspect-square flex items-center justify-center max-w-md mx-auto lg:max-w-none"
            >
              <div className="absolute inset-0 bg-cyber-primary/10 blur-[120px] rounded-full mask-blur" />
              <div className="relative z-10 w-full max-w-lg">
                <img 
                  src={shieldImg} 
                  alt="3D Shield" 
                  className="w-full h-auto drop-shadow-2xl animate-pulse"
                />
              </div>
            </motion.div>
          </div>
          <div className="hidden lg:block absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-white/40 w-8 h-8" />
          </div>
        </Slide>

        {/* History Section */}
        <Slide id="history" className="bg-white/[0.01]">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">Зародження  цифрових загроз</h2>
            <p className="text-slate-200 max-w-3xl text-base sm:text-lg font-light leading-relaxed">
              Перші рядки шкідливого коду були написані ще до того, як інтернет став невід'ємною частиною нашого побуту. Це історія трансформації академічної цікавості у складну цифрову зброю.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <img 
                  src={virusImg} 
                  alt="Virus History" 
                  className="w-full h-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent" />
                <div className="absolute bottom-6 left-6 md:bottom-8 md:left-8">
                   <div className="text-cyber-primary font-mono text-xs sm:text-sm mb-2">1971: The Birth</div>
                   <h3 className="text-xl sm:text-2xl font-display font-bold text-white">Creeper Virus</h3>
                </div>
             </div>
             <div className="space-y-6 md:space-y-8">
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                   <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                      <HistoryIcon className="text-cyber-primary" /> Хто створив?
                   </h4>
                   <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                      Боб Томас, програміст компанії BBN Technologies. Це був науковий експеримент, покликаний довести, що програма може самовідтворюватися на різних вузлах мережі ARPANET.
                   </p>
                </div>
                <div className="p-6 md:p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                   <h4 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-3">
                      <Eye className="text-cyber-secondary" /> Наслідки
                   </h4>
                   <p className="text-slate-300 font-light leading-relaxed text-sm sm:text-base">
                      Вірус не видаляв дані, а лише виводив на екрани повідомлення. Однак це призвело до створення першої у світі антивірусної програми — <span className="text-white font-bold italic">Reaper</span>, яка шукала Creeper та видаляла його.
                   </p>
                </div>
             </div>
          </div>
        </Slide>

        {/* Famous Viruses */}
        <Slide id="viruses">
          <div className="mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6 uppercase tracking-tight">Зал Слави Шкідливого ПЗ</h2>
            <p className="text-slate-200 max-w-2xl text-base sm:text-lg font-light italic">Найнебезпечніші інструменти цифрового хаосу.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                name: "ILOVEYOU", 
                date: "Травень 2000", 
                author: "Онел де Гузман (Філіппіни)",
                desc: "Вірус-хробак, що вразив 10% комп'ютерів у світі. Онел створив його, бо не мав грошей на інтернет. Збитки: $15 млрд.",
                icon: Bug
              },
              { 
                name: "Stuxnet", 
                date: "2010 рік", 
                author: "Спецслужби США/Ізраїлю",
                desc: "Мабуть, найвідоміша цифрова зброя. Вразив іранську програму зі збагачення урану, фізично пошкоджуючи центрифуги.",
                icon: Zap
              },
              { 
                name: "WannaCry", 
                date: "Травень 2017", 
                author: "Lazarus Group (Північна Корея)",
                desc: "Глобальна атака ransomware. За лічені години вразив понад 230,000 комп'ютерів у 150 країнах, шифруючи дані.",
                icon: Lock
              }
            ].map((v, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent relative group overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 md:p-6 opacity-10 group-hover:opacity-40 transition-opacity">
                   <v.icon className="w-12 h-12 md:w-16 md:h-16 text-cyber-primary" />
                </div>
                <div className="text-[10px] sm:text-xs text-cyber-primary font-mono font-bold mb-2 uppercase tracking-widest">{v.date}</div>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-3 md:mb-4 tracking-tight">{v.name}</h3>
                <div className="text-xs sm:text-sm text-slate-400 mb-4 md:mb-6 font-mono">Автор: {v.author}</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light relative z-10">{v.desc}</p>
                <div className="absolute bottom-0 left-0 h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* AI in Cybersecurity */}
        <Slide id="ai" className="bg-white/[0.01]">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
             >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyber-primary/10 rounded-2xl">
                    <Cpu className="text-cyber-primary w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">AI: Нова зброя</h2>
                </div>
                <p className="text-slate-200 text-base sm:text-lg font-light leading-relaxed mb-8">
                  Штучний інтелект кардинально змінює правила гри. Сьогодні це одночасно і найпотужніший щит, і найнебезпечніший меч у кіберпросторі.
                </p>
                <div className="space-y-4 sm:space-y-6">
                   <div className="p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyber-primary/30 transition-colors">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2 tracking-tight">
                         <ShieldCheck className="text-cyber-primary w-4 h-4" /> Автоматизований захист
                      </h4>
                      <p className="text-slate-400 text-sm font-light">
                         AI-антивіруси здатні виявляти аномалії в поведінці системи ще до того, як вірус почне діяти. Вони навчаються на мільйонах атак у реальному часі.
                      </p>
                   </div>
                   <div className="p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyber-secondary/30 transition-colors">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2 tracking-tight">
                         <Bug className="text-cyber-secondary w-4 h-4" /> Пошук вразливостей
                      </h4>
                      <p className="text-slate-400 text-sm font-light">
                         Нейромережі сканують мільярди рядків коду операційних систем, знаходячи приховані "дірки" (Zero-day), які раніше людина могла шукати роками.
                      </p>
                   </div>
                   <div className="p-5 sm:p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-red-500/30 transition-colors">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2 tracking-tight">
                         <AlertTriangle className="text-red-500 w-4 h-4" /> Генеративні віруси
                      </h4>
                      <p className="text-slate-400 text-sm font-light">
                         Зворотний бік: хакери використовують ШІ для написання коду, який змінюється при кожному копіюванні (поліморфізм), стаючи невидимим для звичайних сканерів.
                      </p>
                   </div>
                </div>
             </motion.div>
             <div className="relative mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary to-cyber-secondary blur-[100px] opacity-10 animate-pulse" />
                <div className="p-2 rounded-[32px] sm:rounded-[40px] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-3xl">
                   <img 
                    src={virusImg} 
                    alt="AI Security Visualization" 
                    className="w-full h-auto rounded-[24px] sm:rounded-[32px] mix-blend-screen"
                   />
                </div>
                <div className="absolute -bottom-4 -right-2 sm:-bottom-6 sm:-right-6 p-4 sm:p-6 rounded-3xl bg-cyber-dark border border-white/10 shadow-2xl">
                   <div className="text-cyber-primary font-mono text-[10px] sm:text-xs uppercase tracking-widest mb-1">Status</div>
                   <div className="text-white text-sm sm:text-base font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      AI_SYNC_COMPLETED
                   </div>
                </div>
             </div>
          </div>
        </Slide>

        {/* Dynamic Stats */}
        <Slide id="stats">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight">Ландшафт Загроз 2025</h2>
              <div className="space-y-4 sm:space-y-6">
                <div className="p-6 rounded-2xl bg-cyber-primary/5 border border-cyber-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Globe /></div>
                  <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 text-glow-primary">2.45 млрд</div>
                  <div className="text-slate-300 text-sm font-light">Прогнозована кількість кіберінцидентів у 2025 році</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-3xl sm:text-4xl font-display font-bold text-white mb-2 text-glow-secondary">$10.5 трлн</div>
                  <div className="text-slate-300 text-sm font-light">Щорічні збитки світовій економіці від кіберзлочинів</div>
                </div>
              </div>
            </div>
            {/* ИСПРАВЛЕННАЯ ВЫСОТА ДЛЯ ТЕЛЕФОНОВ */}
            <div className="lg:col-span-3 min-h-[400px] lg:min-h-[500px] h-auto w-full bg-white/[0.01] rounded-[24px] sm:rounded-[32px] border border-white/5 p-5 sm:p-8 backdrop-blur-sm relative overflow-hidden flex flex-col">
               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                  <h3 className="font-display font-semibold text-lg sm:text-xl text-white">Динаміка Кібератак (млн)</h3>
                  <div className="flex items-center gap-3">
                     <div className="flex items-center gap-2 text-[10px] sm:text-xs text-slate-400 uppercase tracking-widest font-mono">
                        <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-cyber-primary" /> Атаки
                     </div>
                  </div>
               </div>
               {/* Обертка самого графика */}
               <div className="h-[200px] sm:h-[250px] lg:h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={statsData}>
                      <defs>
                        <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#64748b" fontSize={10} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}M`} width={40} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0a0a0a", borderColor: "#ffffff10", borderRadius: "12px", color: "#fff" }}
                      />
                      <Area type="monotone" dataKey="attacks" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorAttacks)" name="Атаки" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
               {/* Текст снизу больше не будет обрезаться */}
               <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-white/[0.02] rounded-xl border border-white/5 text-[9px] sm:text-[10px] text-slate-500 text-center uppercase tracking-[0.1em] sm:tracking-[0.2em] leading-relaxed">
                  Дані базуються на звітах Cybersecurity Ventures та Cisco Security Report 2024/25
               </div>
            </div>
          </div>
        </Slide>

        {/* Detailed Protection Strategy */}
        <Slide id="protection" className="bg-white/[0.01]">
          <div className="mb-12 md:mb-16 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 sm:mb-6 uppercase tracking-tight text-glow-primary">Як захистити себе?</h2>
            <p className="text-slate-200 max-w-2xl mx-auto text-base sm:text-lg font-light">
              Цифрова гігієна — це навичка №1 у сучасному світі. Прості кроки, що врятують ваші дані.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12 md:mb-16">
            {[
              { icon: Key, title: "Паролі та MFA", desc: "Використовуйте менеджери паролів та двофакторну аутентифікацію скрізь, де це можливо." },
              { icon: ShieldCheck, title: "Оновлення ПЗ", desc: "Ніколи не ігноруйте оновлення системи. Більшість атак використовують старі вразливості." },
              { icon: MousePointer2, title: "Обережні кліки", desc: "Не переходьте за підозрілими посиланнями. Фішинг — головний метод зламу у 2025-2026 роках." },
              { icon: Database, title: "Бекапи", desc: "Завжди майте офлайн-копію ваших найважливіших документів та проектів." }
            ].map((p, i) => (
              <FeatureCard key={i} icon={p.icon || Lock} title={p.title} description={p.desc} delay={i * 0.1} />
            ))}
          </div>
          <div className="p-6 md:p-12 rounded-[32px] md:rounded-[40px] border border-cyber-primary/20 bg-cyber-primary/[0.02] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 md:p-12 opacity-5"><Shield className="w-48 h-48 md:w-64 md:h-64" /></div>
             <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center relative z-10">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">Золоті правила безпеки в інтернеті</h3>
                  <ul className="space-y-4">
                    {[
                      "Перевіряйте URL-адресу сайту перед введенням логіна (HTTPS обов'язково).",
                      "Не використовуйте публічний Wi-Fi для банківських операцій без VPN.",
                      "Закривайте доступ до вебкамери, коли не користуєтесь нею.",
                      "Навчайте близьких (особливо старше покоління) базовому фішингу.",
                      "Не завантажуйте підозрілі файли з неперевірених джерел, особливо формати .exe, .bat, .cmd, .msi, .scr, .js та .vbs, оскільки вони найчастіше можуть містити шкідливе програмне забезпечення."
                    ].map((rule, ri) => (
                      <li key={ri} className="flex gap-4 items-start text-slate-200 font-light text-sm sm:text-base">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyber-primary flex-shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center mt-6 lg:mt-0">
                   <img 
                    src={lockImg} 
                    alt="Security Lock" 
                    className="w-full max-w-xs sm:max-w-sm rounded-[24px] sm:rounded-[32px] border border-white/10 shadow-2xl"
                   />
                </div>
             </div>
          </div>
        </Slide>

        {/* Conclusion Section */}
        <Slide id="conclusion">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 md:mb-8 tracking-tighter text-glow-primary">ВИСНОВОК</h2>
              <p className="text-xl sm:text-2xl text-slate-200 font-light italic mb-10 md:mb-12">
                "Безпека — це не стан, а постійна пильність."
              </p>
              <div className="p-6 md:p-10 rounded-[24px] md:rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-xl text-left relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-transparent" />
                 <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed mb-6">
                    Підсумовуючи, можна сказати, що світ кіберзагроз розвивається з неймовірною швидкістю. Сьогодні, у 2026 році, ми бачимо, як ШІ став невід'ємним інструментом як для атак, так і для передового захисту систем. 
                 </p>
                 <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed">
                    Проте, технічні засоби захисту також не стоять на місці. Головним елементом залишається <span className="text-white font-bold">Обізнаність</span>. Знаючи історію атак та основні принципи захисту, ми можемо мінімізувати ризики та безпечно користуватися всіма перевагами цифрового світу.
                 </p>
              </div>
            </motion.div>
          </div>
        </Slide>
      </main>

      {/* Footer & Extra Views */}
      <footer className="py-12 md:py-16 px-6 md:px-8 border-t border-white/5 bg-cyber-dark z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10 text-slate-600 text-[10px] tracking-[0.3em] uppercase text-center md:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
            <div className="w-6 h-6 rounded-sm bg-cyber-primary/20 flex items-center justify-center">
              <Shield className="w-3 h-3 text-cyber-primary" />
            </div>
            <span>STOYANOV ARTEM // COLLAGE PROJECT 2026</span>
          </div>
          <div className="flex gap-8 md:gap-12">
            <button 
              onClick={() => setActiveExtra('materials')}
              className="hover:text-cyber-primary transition-colors cursor-pointer border-b border-transparent hover:border-cyber-primary bg-transparent text-[10px] uppercase tracking-[0.3em]"
            >
              Матеріали
            </button>
            <button 
              onClick={() => setActiveExtra('sources')}
              className="hover:text-cyber-primary transition-colors cursor-pointer border-b border-transparent hover:border-cyber-primary bg-transparent text-[10px] uppercase tracking-[0.3em]"
            >
              Джерела
            </button>
          </div>
          <div className="font-mono text-cyber-primary/40 hidden sm:block">
            COMP_SCIENCE_DEPT
          </div>
        </div>
      </footer>

      {/* Extra Info Overlay (Адаптировано для моб.) */}
      <AnimatePresence>
        {activeExtra && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-xl" onClick={() => setActiveExtra(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-10 relative z-10 custom-scrollbar"
            >
              <button 
                onClick={() => setActiveExtra(null)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                aria-label="Зачинити"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              
              <div className="mb-6 sm:mb-8 pr-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                  Додаткова інформація
                </div>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-3">
                  {activeExtra === 'materials' ? 'Використані технології' : 'Джерела даних'}
                </h2>
                <div className="h-1 w-16 sm:w-20 bg-cyber-primary rounded-full" />
              </div>

              <div className="space-y-6">
                 {activeExtra === 'materials' ? (
                   <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                       <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="text-white font-bold text-sm mb-1">React + TypeScript</div>
                          <div className="text-slate-500 text-xs">Ядро інтерфейсу</div>
                       </div>
                       <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="text-white font-bold text-sm mb-1">Framer Motion</div>
                          <div className="text-slate-500 text-xs">Анімація та переходи</div>
                       </div>
                       <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="text-white font-bold text-sm mb-1">Tailwind CSS</div>
                          <div className="text-slate-500 text-xs">Сучасна стилізація</div>
                       </div>
                       <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                          <div className="text-white font-bold text-sm mb-1">Recharts</div>
                          <div className="text-slate-500 text-xs">Побудова графіків</div>
                       </div>
                    </div>
                    <p className="text-slate-400 text-xs sm:text-sm font-light italic">
                       Сайт розроблений з використанням сучасних паттернів проектування та архітектури SPA (Single Page Application).
                    </p>
                   </>
                 ) : (
                   <ul className="space-y-3 sm:space-y-4">
                      {[
                        { title: "Cybersecurity Ventures", url: "cybersecurityventures.com" },
                        { title: "Cisco Security Reports", url: "cisco.com/security" },
                        { title: "Kaspersky Virus History", url: "kaspersky.com" },
                        { title: "OWASP Foundation", url: "owasp.org" },
                        { title: "NIST Cybersecurity Framework", url: "nist.gov" }
                      ].map((s, si) => (
                        <li key={si} className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-cyber-primary/30 transition-colors">
                           <span className="text-white text-sm sm:text-base font-medium">{s.title}</span>
                           <span className="text-cyber-primary text-[10px] sm:text-xs font-mono">{s.url}</span>
                        </li>
                      ))}
                   </ul>
                 )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const Key = ({ className }: { className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="m15.5 7.5 2.3 2.3a1 1 0 0 0 1.4 0l2.1-2.1a1 1 0 0 0 0-1.4L19 4.1a1 1 0 0 0-1.4 0l-2.1 2.1a1 1 0 0 0 0 1.4Z"/>
    <path d="m2.1 21.8 6.4-6.4"/>
    <path d="M15 7 8.5 13.5"/>
    <path d="M10 11l-5 5"/>
    <path d="M19 4l-4 4"/>
  </svg>
);
