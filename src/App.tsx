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
  ArrowRight,
  Fingerprint,
  Cpu,
  Zap,
  ChevronDown,
  History as HistoryIcon,
  Bug,
  Terminal,
  Server,
  Activity,
  Eye,
  Settings,
  ShieldCheck,
  MousePointer2,
  ExternalLink,
  BookOpen,
  Database,
  X,
  Check
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
    className={cn("min-h-screen flex flex-col justify-center px-6 py-24 relative overflow-hidden", className)}
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
    className="p-8 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:border-cyber-primary/30 transition-all group overflow-hidden relative"
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
  // Threshold to trigger when about 60% of the next slide is visible
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
      
      {/* Tooltip */}
      <span className="absolute right-9 px-3 py-1.5 glass rounded-lg text-[9px] text-white opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap pointer-events-none uppercase tracking-[0.2em] translate-x-4 group-hover:translate-x-0 shadow-2xl">
        {section === 'intro' ? 'Вступ' : 
         section === 'history' ? 'Генезис' :
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
      <nav className="fixed top-0 left-0 right-0 h-20 flex items-center justify-between px-8 z-40 backdrop-blur-md border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyber-primary to-cyber-secondary flex items-center justify-center shadow-lg shadow-cyber-primary/20">
            <Shield className="text-white w-6 h-6" />
          </div>
          <span className="font-display font-bold text-xl tracking-tighter text-white">CyberDefense</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#intro" className="hover:text-cyber-primary transition-colors">Вступ</a>
          <a href="#history" className="hover:text-cyber-primary transition-colors">Історія</a>
          <a href="#viruses" className="hover:text-cyber-primary transition-colors">Віруси</a>
          <a href="#ai" className="hover:text-cyber-primary transition-colors">AI & Безпека</a>
          <a href="#stats" className="hover:text-cyber-primary transition-colors">Статистика</a>
          <a href="#protection" className="hover:text-cyber-primary transition-colors">Захист</a>
          <a href="#conclusion" className="px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-colors border border-white/10 text-white">Висновок</a>
        </div>
      </nav>

      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
        <div className="glass p-1 rounded-full flex flex-col gap-3 relative overflow-hidden">
          {/* Vertical Progress Filler */}
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
        <Slide id="intro" className="pt-40">
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
              <h1 className="text-6xl md:text-8xl font-display font-bold text-white leading-[0.9] tracking-tighter mb-8 text-glow-primary">
                Основи <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyber-primary to-cyber-secondary">кібер</span> <br />
                безпеки
              </h1>
              <p className="text-xl text-slate-200 max-w-lg mb-10 leading-relaxed font-light">
                Стислий огляд ключових аспектів цифрового захисту. Лаконічно про історію, головні загрози та методи збереження ваших даних у сучасному вебі.
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
              className="relative aspect-square flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-cyber-primary/10 blur-[120px] rounded-full mask-blur" />
              <div className="relative z-10 w-full max-w-lg">
                <img 
                  src="/src/assets/images/cyber_red_hero_shield_1779117242436.png" 
                  alt="3D Shield" 
                  className="w-full h-auto drop-shadow-2xl animate-pulse"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="text-white/40 w-8 h-8" />
          </div>
        </Slide>

        {/* History Section - Detailed */}
        <Slide id="history" className="bg-white/[0.01]">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">Генезис цифрових загроз</h2>
            <p className="text-slate-200 max-w-3xl text-lg font-light leading-relaxed">
              Перші рядки шкідливого коду були написані ще до того, як інтернет став невід'ємною частиною нашого побуту. Це історія трансформації академічної цікавості у складну цифрову зброю.
            </p>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
             <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/5">
                <img 
                  src="/src/assets/images/computer_virus_visual_1779117262729.png" 
                  alt="Virus History" 
                  className="w-full h-auto opacity-70 grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark to-transparent" />
                <div className="absolute bottom-8 left-8">
                   <div className="text-cyber-primary font-mono text-sm mb-2">1971: The Birth</div>
                   <h3 className="text-2xl font-display font-bold text-white">Creeper Virus</h3>
                </div>
             </div>
             <div className="space-y-8">
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                   <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <HistoryIcon className="text-cyber-primary" /> Хто створив?
                   </h4>
                   <p className="text-slate-300 font-light leading-relaxed">
                      Боб Томас, програміст компанії BBN Technologies. Це був науковий експеримент, покликаний довести, що програма може самовідтворюватися на різних вузлах мережі ARPANET.
                   </p>
                </div>
                <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/5">
                   <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Eye className="text-cyber-secondary" /> Наслідки
                   </h4>
                   <p className="text-slate-300 font-light leading-relaxed">
                      Вірус не видаляв дані, а лише виводив на екрани повідомлення. Однак це призвело до створення першої у світі антивірусної програми — <span className="text-white font-bold italic">Reaper</span>, яка шукала Creeper та видаляла його.
                   </p>
                </div>
             </div>
          </div>
        </Slide>

        {/* Famous Viruses - Deep Dive */}
        <Slide id="viruses">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight">Зал Слави Шкідливого ПЗ</h2>
            <p className="text-slate-200 max-w-2xl text-lg font-light italic">Найнебезпечніші інструменти цифрового хаосу.</p>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
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
                author: "Спецслужби США/Ізраїлю (припущ.)",
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
                className="p-8 rounded-3xl border border-white/5 bg-gradient-to-b from-white/[0.04] to-transparent relative group"
              >
                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-40 transition-opacity">
                   <v.icon className="w-16 h-16 text-cyber-primary" />
                </div>
                <div className="text-xs text-cyber-primary font-mono font-bold mb-2 uppercase tracking-widest">{v.date}</div>
                <h3 className="text-2xl font-display font-bold text-white mb-4 tracking-tight">{v.name}</h3>
                <div className="text-sm text-slate-400 mb-6 font-mono">Автор: {v.author}</div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 font-light">{v.desc}</p>
                <div className="h-1 w-0 group-hover:w-full bg-gradient-to-r from-cyber-primary to-cyber-secondary transition-all duration-500 rounded-full" />
              </motion.div>
            ))}
          </div>
        </Slide>

        {/* AI in Cybersecurity */}
        <Slide id="ai" className="bg-white/[0.01]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
             >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-cyber-primary/10 rounded-2xl">
                    <Cpu className="text-cyber-primary w-8 h-8" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-bold text-white uppercase tracking-tight">AI: Нова зброя</h2>
                </div>
                <p className="text-slate-200 text-lg font-light leading-relaxed mb-8">
                  Штучний інтелект кардинально змінює правила гри. Сьогодні це одночасно і найпотужніший щит, і найнебезпечніший меч у кіберпросторі.
                </p>
                <div className="space-y-6">
                   <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyber-primary/30 transition-colors">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2 tracking-tight">
                         <ShieldCheck className="text-cyber-primary w-4 h-4" /> Автоматизований захист
                      </h4>
                      <p className="text-slate-400 text-sm font-light">
                         AI-антивіруси здатні виявляти аномалії в поведінці системи ще до того, як вірус почне діяти. Вони навчаються на мільйонах атак у реальному часі.
                      </p>
                   </div>
                   <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-cyber-secondary/30 transition-colors">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2 tracking-tight">
                         <Bug className="text-cyber-secondary w-4 h-4" /> Пошук вразливостей
                      </h4>
                      <p className="text-slate-400 text-sm font-light">
                         Нейромережі сканують мільярди рядків коду операційних систем, знаходячи приховані "дірки" (Zero-day), які раніше людина могла шукати роками.
                      </p>
                   </div>
                   <div className="p-6 rounded-2xl border border-white/5 bg-white/[0.02] hover:border-red-500/30 transition-colors">
                      <h4 className="text-white font-bold mb-2 flex items-center gap-2 tracking-tight">
                         <AlertTriangle className="text-red-500 w-4 h-4" /> Генеративні віруси
                      </h4>
                      <p className="text-slate-400 text-sm font-light">
                         Зворотний бік: хакери використовують ШІ для написання коду, який змінюється при кожному копіюванні (поліморфізм), стаючи невидимим для звичайних сканерів.
                      </p>
                   </div>
                </div>
             </motion.div>
             <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary to-cyber-secondary blur-[100px] opacity-10 animate-pulse" />
                <div className="p-2 rounded-[40px] bg-gradient-to-br from-white/10 to-transparent border border-white/10 backdrop-blur-3xl">
                   <img 
                    src="/src/assets/images/computer_virus_visual_1779117262729.png" 
                    alt="AI Security Visualization" 
                    className="w-full h-auto rounded-[32px] mix-blend-screen"
                    referrerPolicy="no-referrer"
                   />
                </div>
                <div className="absolute -bottom-6 -right-6 p-6 rounded-3xl bg-cyber-dark border border-white/10 shadow-2xl">
                   <div className="text-cyber-primary font-mono text-xs uppercase tracking-widest mb-1">Status</div>
                   <div className="text-white font-bold flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                      AI_SYNC_COMPLETED
                   </div>
                </div>
             </div>
          </div>
        </Slide>

        {/* Dynamic Stats */}
        <Slide id="stats">
          <div className="grid lg:grid-cols-5 gap-16 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-8 tracking-tight">Ландшафт Загроз 2025</h2>
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-cyber-primary/5 border border-cyber-primary/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10"><Globe /></div>
                  <div className="text-4xl font-display font-bold text-white mb-2 text-glow-primary">2.45 млрд</div>
                  <div className="text-slate-300 text-sm font-light">Прогнозована кількість кіберінцидентів у 2025 році</div>
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
                  <div className="text-4xl font-display font-bold text-white mb-2 text-glow-secondary">$10.5 трлн</div>
                  <div className="text-slate-300 text-sm font-light">Щорічні збитки світовій економіці від кіберзлочинів</div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 h-[500px] w-full bg-white/[0.01] rounded-[32px] border border-white/5 p-8 backdrop-blur-sm relative overflow-hidden">
               <div className="flex items-center justify-between mb-12">
                  <h3 className="font-display font-semibold text-xl text-white">Динаміка Кібератак (млн)</h3>
                  <div className="flex items-center gap-3">
                     <div className="flex items-center gap-2 text-xs text-slate-400 uppercase tracking-widest font-mono">
                        <span className="w-3 h-3 rounded-full bg-cyber-primary" /> Атаки
                     </div>
                  </div>
               </div>
               <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={statsData}>
                      <defs>
                        <linearGradient id="colorAttacks" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                          <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                      <XAxis dataKey="year" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                      <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}M`} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: "#0a0a0a", borderColor: "#ffffff10", borderRadius: "12px", color: "#fff" }}
                      />
                      <Area type="monotone" dataKey="attacks" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorAttacks)" name="Атаки" />
                    </AreaChart>
                  </ResponsiveContainer>
               </div>
               <div className="mt-8 p-4 bg-white/[0.02] rounded-xl border border-white/5 text-[10px] text-slate-500 text-center uppercase tracking-[0.2em]">
                  Дані базуються на звітах Cybersecurity Ventures та Cisco Security Report 2024/25
               </div>
            </div>
          </div>
        </Slide>

        {/* Detailed Protection Strategy */}
        <Slide id="protection" className="bg-white/[0.01]">
          <div className="mb-16 text-center">
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 uppercase tracking-tight text-glow-primary">Як захистити себе?</h2>
            <p className="text-slate-200 max-w-2xl mx-auto text-lg font-light">
              Цифрова гігієна — це навичка №1 у сучасному світі. Прості кроки, що врятують ваші дані.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              { icon: Key, title: "Паролі та MFA", desc: "Використовуйте менеджери паролів та двофакторну автентифікацію скрізь, де це можливо." },
              { icon: ShieldCheck, title: "Оновлення ПЗ", desc: "Ніколи не ігноруйте оновлення системи. Більшість атак використовують старі вразливості." },
              { icon: MousePointer2, title: "Обережні кліки", desc: "Не переходьте за підозрілими посиланнями. Фішинг — головний метод зламу у 2025 році." },
              { icon: Database, title: "Бекапи", desc: "Завжди майте офлайн-копію ваших найважливіших документів та проектів." }
            ].map((p, i) => (
              <FeatureCard key={i} icon={p.icon || Lock} title={p.title} description={p.desc} delay={i * 0.1} />
            ))}
          </div>
          <div className="p-12 rounded-[40px] border border-cyber-primary/20 bg-cyber-primary/[0.02] relative overflow-hidden">
             <div className="absolute top-0 right-0 p-12 opacity-5"><Shield className="w-64 h-64" /></div>
             <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-display font-bold text-white mb-6">Золоті правила безпеки в інтернеті</h3>
                  <ul className="space-y-4">
                    {[
                      "Перевіряйте URL-адресу сайту перед введенням логіна (HTTPS обов'язково).",
                      "Не використовуйте публічний Wi-Fi для банківських операцій без VPN.",
                      "Закривайте доступ до вебкамери, коли не користуєтесь нею.",
                      "Навчайте близьких (особливо старше покоління) базовому фішингу."
                    ].map((rule, ri) => (
                      <li key={ri} className="flex gap-4 items-start text-slate-200 font-light">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyber-primary flex-shrink-0" />
                        {rule}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex justify-center">
                   <img 
                    src="/src/assets/images/cyber_security_protection_lock_1779117278060.png" 
                    alt="Security Lock" 
                    className="w-full max-w-sm rounded-[32px] border border-white/10 shadow-2xl"
                    referrerPolicy="no-referrer"
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
              <h2 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 tracking-tighter text-glow-primary">ВИСНОВОК</h2>
              <p className="text-2xl text-slate-200 font-light italic mb-12">
                "Безпека — це не стан, а постійна пильність."
              </p>
              <div className="p-10 rounded-[32px] border border-white/5 bg-white/[0.02] backdrop-blur-xl text-left relative overflow-hidden group">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyber-primary/5 to-transparent" />
                 <p className="text-lg text-slate-300 font-light leading-relaxed mb-6">
                    Підсумовуючи, можна сказати, що світ кіберзагроз розвивається з неймовірною швидкістю. Сьогодні, у 2026 році, ми бачимо, як ШІ став невід'ємним інструментом як для атак, так і для передового захисту систем. 
                 </p>
                 <p className="text-lg text-slate-300 font-light leading-relaxed">
                    Проте, технічні засоби захисту також не стоять на місці. Головним елементом залишається <span className="text-white font-bold">Обізнаність</span>. Знаючи історію атак та основні принципи захисту, ми можемо мінімізувати ризики та безпечно користуватися всіма перевагами цифрового світу.
                 </p>
              </div>
            </motion.div>
          </div>
        </Slide>
      </main>

      {/* Footer & Extra Views */}
      <footer className="py-16 px-8 border-t border-white/5 bg-cyber-dark z-20 relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-slate-600 text-[10px] tracking-[0.3em] uppercase">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 rounded-sm bg-cyber-primary/20 flex items-center justify-center">
              <Shield className="w-3 h-3 text-cyber-primary" />
            </div>
            <span>STOYANOV ARTEM // COLLAGE PROJECT 2026</span>
          </div>
          <div className="flex gap-12">
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
          <div className="font-mono text-cyber-primary/40">
            COMP_SCIENCE_DEPT
          </div>
        </div>
      </footer>

      {/* Extra Info Overlay */}
      <AnimatePresence>
        {activeExtra && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center px-6"
          >
            <div className="absolute inset-0 bg-cyber-dark/95 backdrop-blur-xl" onClick={() => setActiveExtra(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="max-w-2xl w-full bg-white/[0.03] border border-white/10 rounded-3xl p-10 relative z-10"
            >
              <button 
                onClick={() => setActiveExtra(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors"
                aria-label="Зачинити"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="mb-8">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyber-primary/10 border border-cyber-primary/20 text-cyber-primary text-[10px] font-bold uppercase tracking-widest mb-4">
                  Додаткова інформація
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-2">
                  {activeExtra === 'materials' ? 'Використані технології' : 'Джерела даних'}
                </h2>
                <div className="h-1 w-20 bg-cyber-primary rounded-full" />
              </div>

              <div className="space-y-6">
                 {activeExtra === 'materials' ? (
                   <>
                    <div className="grid grid-cols-2 gap-4">
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
                    <p className="text-slate-400 text-sm font-light italic">
                       Сайт розроблений з використанням сучасних паттернів проектування та архітектури SPA (Single Page Application).
                    </p>
                   </>
                 ) : (
                   <ul className="space-y-4">
                      {[
                        { title: "Cybersecurity Ventures", url: "cybersecurityventures.com" },
                        { title: "Cisco Security Reports", url: "cisco.com/security" },
                        { title: "Kaspersky Virus History", url: "kaspersky.com" },
                        { title: "OWASP Foundation", url: "owasp.org" },
                        { title: "NIST Cybersecurity Framework", url: "nist.gov" }
                      ].map((s, si) => (
                        <li key={si} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-cyber-primary/30 transition-colors">
                           <span className="text-white font-medium">{s.title}</span>
                           <span className="text-cyber-primary text-xs font-mono">{s.url}</span>
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
