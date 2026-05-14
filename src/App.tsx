import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { 
  Rocket, 
  Brain, 
  Target, 
  TrendingUp, 
  Users, 
  ChevronRight, 
  Upload, 
  FileText, 
  Layout, 
  PieChart, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Plus,
  Save,
  Download,
  Menu,
  X,
  User
} from 'lucide-react';
import { generateStartupIdeas, generateBusinessPlan, generateMVPRoadmap, generatePitchDeck } from './services/geminiService';
import { UserProfile, StartupIdea, BusinessPlan, MVPRoadmap, PitchDeckSlide } from './types';

// --- Components ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (p: string) => void, currentPage: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <div className="w-10 h-10 bg-brand-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Rocket size={24} />
            </div>
     <span className="text-xl font-display font-bold tracking-tight transition-all duration-300 group-hover:tracking-wider group-hover:text-brand-500">
  Udaan <span className="text-brand-600">Setu</span>
</span>



          </div>
          
          <div className="hidden md:flex items-center gap-8">
            {['Dashboard', 'Generate', 'Market Trends'].map((item) => (
              <button 
                key={item}
                onClick={() => onNavigate(item.toLowerCase().replace(' ', '-'))}
                className={`text-sm font-medium transition-colors hover:text-brand-600 ${currentPage === item.toLowerCase().replace(' ', '-') ? 'text-brand-600' : 'text-slate-600'}`}
              >
                {item}
              </button>
            ))}
            <button onClick={() => onNavigate('generate')} className="btn-primary py-2 text-sm">Get Started</button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-600">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {['Dashboard', 'Generate', 'Market Trends'].map((item) => (
                <button 
                  key={item}
                  onClick={() => { onNavigate(item.toLowerCase().replace(' ', '-')); setIsOpen(false); }}
                  className="block w-full text-left px-3 py-4 text-base font-medium text-slate-600 hover:bg-slate-50 rounded-lg"
                >
                  {item}
                </button>
              ))}
              <button onClick={() => { onNavigate('generate'); setIsOpen(false); }} className="w-full btn-primary mt-4">Get Started</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onStart }: { onStart: () => void }) => (
  <section className="relative pt-32 pb-20 overflow-hidden">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-400 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-400 rounded-full blur-[120px]" />
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-700 text-sm font-semibold mb-6 border border-brand-100">
          <Sparkles size={16} />
          Powered by Gemini 3.1 Pro
        </span>
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
          Turn Your Skills Into a <br />
          <span className="gradient-text">Billion-Dollar Startup</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          Enter your skills and experience. Our AI analyzes your unique background to generate personalized startup ideas, business plans, and pitch decks in seconds.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={onStart} className="btn-primary text-lg px-8 py-4 flex items-center gap-2 w-full sm:w-auto">
            Generate My Startup <ArrowRight size={20} />
          </button>
        </div>
        
        <div className="mt-16 flex items-center justify-center gap-8 opacity-50 grayscale">
          <span className="font-bold text-2xl">Y Combinator</span>
          <span className="font-bold text-2xl">Stripe</span>
          <span className="font-bold text-2xl">Techstars</span>
          <span className="font-bold text-2xl">A16Z</span>
        </div>
      </motion.div>
    </div>
  </section>
);

const FeatureCard = ({ icon: Icon, title, desc }: { icon: any, title: string, desc: string }) => (
  <div className="p-8 rounded-3xl bg-white border border-slate-200 hover:shadow-xl transition-all group">
    <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-6 group-hover:bg-brand-600 group-hover:text-white transition-colors">
      <Icon size={24} />
    </div>
    <h3 className="text-xl font-display font-bold mb-3">{title}</h3>
    <p className="text-slate-600 leading-relaxed">{desc}</p>
  </div>
);

const Features = () => (
  <section className="py-24 bg-slate-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Everything You Need to Launch</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">From the first spark of an idea to a full investor-ready pitch deck, we've got you covered.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard 
          icon={Brain} 
          title="AI Idea Generation" 
          desc="Personalized startup concepts based on your specific skills, experience, and market gaps."
        />
        <FeatureCard 
          icon={FileText} 
          title="Full Business Plans" 
          desc="Comprehensive 20-page business plans covering strategy, operations, and financial forecasts."
        />
        <FeatureCard 
          icon={Layout} 
          title="Pitch Deck Builder" 
          desc="Auto-generated 10-slide decks that follow the winning formulas of top Silicon Valley startups."
        />
        <FeatureCard 
          icon={Target} 
          title="MVP Roadmap" 
          desc="A step-by-step development guide with recommended tech stacks and cost estimates."
        />
        <FeatureCard 
          icon={TrendingUp} 
          title="Market Analysis" 
          desc="Deep dives into market size, competitor landscape, and emerging trends in your industry."
        />
        <FeatureCard 
          icon={Users} 
          title="Cofounder Matching" 
          desc="AI-powered suggestions for the types of partners you need to complement your skill set."
        />
      </div>
    </div>
  </section>
);

const GeneratorForm = ({ onSubmit, isLoading }: { onSubmit: (p: UserProfile) => void, isLoading: boolean }) => {
  const [profile, setProfile] = useState<UserProfile>({
    email: '',
    skills: '',
    experience: '',
    interests: '',
    industry: '',
    location: 'Remote',
    budget: '$0 - $10k'
  });

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-3xl border border-slate-200 shadow-2xl">
      <div className="mb-10">
        <h2 className="text-3xl font-display font-bold mb-2">Tell us about yourself</h2>
        <p className="text-slate-600">The more detail you provide, the better the AI can tailor your startup ideas.</p>
      </div>

      <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(profile); }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Email Address</label>
            <input 
              type="email" 
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="you@example.com"
              value={profile.email}
              onChange={e => setProfile({...profile, email: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Preferred Industry</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all bg-white"
              value={profile.industry}
              onChange={e => setProfile({...profile, industry: e.target.value})}
            >
              <option value="">Any Industry</option>
              <option value="SaaS">SaaS</option>
              <option value="Fintech">Fintech</option>
              <option value="Healthtech">Healthtech</option>
              <option value="AI/ML">AI/ML</option>
              <option value="E-commerce">E-commerce</option>
              <option value="Edtech">Edtech</option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Your Skills (Comma separated)</label>
          <textarea 
            required
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            placeholder="React, Python, Project Management, Sales, UX Design..."
            value={profile.skills}
            onChange={e => setProfile({...profile, skills: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Past Experience</label>
          <textarea 
            required
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            placeholder="5 years as a Software Engineer at Google, built a side project for local bakeries..."
            value={profile.experience}
            onChange={e => setProfile({...profile, experience: e.target.value})}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Interests & Passions</label>
          <textarea 
            required
            rows={2}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
            placeholder="Sustainability, Web3, Fitness, Productivity Tools..."
            value={profile.interests}
            onChange={e => setProfile({...profile, interests: e.target.value})}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Location</label>
            <input 
              type="text" 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all"
              placeholder="San Francisco, Remote, etc."
              value={profile.location}
              onChange={e => setProfile({...profile, location: e.target.value})}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Starting Budget</label>
            <select 
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 outline-none transition-all bg-white"
              value={profile.budget}
              onChange={e => setProfile({...profile, budget: e.target.value})}
            >
              <option value="$0 - $1k">$0 - $1k</option>
              <option value="$1k - $10k">$1k - $10k</option>
              <option value="$10k - $50k">$10k - $50k</option>
              <option value="$50k+">$50k+</option>
            </select>
          </div>
        </div>

        <button 
          disabled={isLoading}
          className="w-full btn-primary py-4 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Forging Your Startup Ideas...
            </>
          ) : (
            <>
              <Zap size={20} /> Generate Startup Ideas
            </>
          )}
        </button>
      </form>
    </div>
  );
};

interface IdeaCardProps {
  idea: StartupIdea;
  onSelect: (i: StartupIdea) => void;
}

const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onSelect }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg hover:shadow-2xl transition-all cursor-pointer group"
    onClick={() => onSelect(idea)}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="w-14 h-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center group-hover:bg-brand-600 group-hover:text-white transition-colors">
        <Rocket size={28} />
      </div>
      <div className="px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
        Score: {idea.score}/100
      </div>
    </div>
    
    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand-600 transition-colors">{idea.name}</h3>
    <p className="text-slate-600 mb-6 line-clamp-3">{idea.problem}</p>
    
    <div className="space-y-4 mb-8">
      <div className="flex items-start gap-3">
        <div className="mt-1 text-brand-500"><Target size={18} /></div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Target Users</p>
          <p className="text-sm font-medium text-slate-700">{idea.target_users}</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <div className="mt-1 text-brand-500"><TrendingUp size={18} /></div>
        <div>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Market Opportunity</p>
          <p className="text-sm font-medium text-slate-700">{idea.market_opportunity}</p>
        </div>
      </div>
    </div>
    
    <button className="w-full py-3 rounded-xl border border-slate-200 font-semibold text-slate-700 group-hover:bg-brand-600 group-hover:text-white group-hover:border-brand-600 transition-all flex items-center justify-center gap-2">
      View Business Plan <ChevronRight size={18} />
    </button>
  </motion.div>
);

const IdeaDetails = ({ idea, onBack }: { idea: StartupIdea, onBack: () => void }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'mvp' | 'deck'>('plan');
  const [plan, setPlan] = useState<BusinessPlan | null>(null);
  const [mvp, setMvp] = useState<MVPRoadmap | null>(null);
  const [deck, setDeck] = useState<PitchDeckSlide[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [p, m, d] = await Promise.all([
          generateBusinessPlan(idea),
          generateMVPRoadmap(idea),
          generatePitchDeck(idea)
        ]);
        setPlan(p);
        setMvp(m);
        setDeck(d);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [idea]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32">
        <div className="w-16 h-16 border-4 border-brand-200 border-t-brand-600 rounded-full animate-spin mb-6" />
        <h2 className="text-2xl font-display font-bold">Forging Strategy...</h2>
        <p className="text-slate-500">Generating business plan, MVP roadmap, and pitch deck.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-brand-600 font-medium mb-8 transition-colors">
        <ArrowRight size={20} className="rotate-180" /> Back to Ideas
      </button>

      <div className="flex flex-col md:flex-row gap-8 items-start mb-12">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-brand-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
              <Rocket size={32} />
            </div>
            <div>
              <h1 className="text-4xl font-display font-bold">{idea.name}</h1>
              <p className="text-slate-500">Investor Readiness Score: {idea.score}%</p>
            </div>
          </div>
          <p className="text-xl text-slate-600 leading-relaxed">{idea.solution}</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-secondary py-2 px-4 flex items-center gap-2"><Save size={18} /> Save</button>
          <button className="btn-primary py-2 px-4 flex items-center gap-2"><Download size={18} /> Export PDF</button>
        </div>
      </div>

      <div className="flex border-b border-slate-200 mb-8 overflow-x-auto no-scrollbar">
        {[
          { id: 'plan', label: 'Business Plan', icon: FileText },
          { id: 'mvp', label: 'MVP Roadmap', icon: Target },
          { id: 'deck', label: 'Pitch Deck', icon: Layout },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 px-8 py-4 text-sm font-bold border-b-2 transition-all whitespace-nowrap ${activeTab === tab.id ? 'border-brand-600 text-brand-600' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'plan' && plan && (
          <motion.div 
            key="plan"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 space-y-8">
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                  <Sparkles size={20} className="text-brand-500" /> Executive Summary
                </h3>
                <p className="text-slate-600 leading-relaxed">{plan.executiveSummary}</p>
              </section>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-display font-bold mb-4">The Problem</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{plan.problem}</p>
                </section>
                <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-lg font-display font-bold mb-4">The Solution</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{plan.solution}</p>
                </section>
              </div>

              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-display font-bold mb-4">Go-To-Market Strategy</h3>
                <p className="text-slate-600 leading-relaxed">{plan.goToMarket}</p>
              </section>
            </div>
            
            <div className="space-y-8">
              <section className="bg-brand-600 text-white p-8 rounded-3xl shadow-xl">
                <h3 className="text-xl font-display font-bold mb-4">Business Model</h3>
                <p className="text-brand-50 leading-relaxed text-sm">{plan.businessModel}</p>
              </section>
              
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-display font-bold mb-4">Market Size</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center text-brand-600">
                    <Globe size={24} />
                  </div>
                  <span className="text-2xl font-bold text-slate-800">{plan.marketSize}</span>
                </div>
                <p className="text-slate-500 text-xs">Estimated Total Addressable Market (TAM) based on current trends.</p>
              </section>

              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-lg font-display font-bold mb-4">Financial Forecast</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Revenue Forecast</span>
                    <span className="font-bold text-emerald-600">{plan.revenueForecast}</span>
                  </div>
                  <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                    <span className="text-slate-500 text-sm">Cost Estimate</span>
                    <span className="font-bold text-rose-600">{plan.costEstimate}</span>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}

        {activeTab === 'mvp' && mvp && (
          <motion.div 
            key="mvp"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                  <Zap size={20} className="text-brand-500" /> Core MVP Features
                </h3>
                <ul className="space-y-4">
                  {mvp.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="mt-1 text-emerald-500"><CheckCircle2 size={18} /></div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </li>
                  ))}
                </ul>
              </section>
              
              <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <h3 className="text-xl font-display font-bold mb-6 flex items-center gap-2">
                  <Shield size={20} className="text-brand-500" /> Recommended Tech Stack
                </h3>
                <div className="flex flex-wrap gap-3">
                  {mvp.techStack.map((tech, idx) => (
                    <span key={idx} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl text-sm font-bold border border-slate-200">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Timeline</p>
                    <p className="text-lg font-bold text-slate-800">{mvp.timeline}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase mb-1">Estimated Cost</p>
                    <p className="text-lg font-bold text-slate-800">{mvp.costEstimate}</p>
                  </div>
                </div>
              </section>
            </div>

            <section className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xl font-display font-bold mb-8">Development Roadmap</h3>
              <div className="relative space-y-12 before:absolute before:left-[17px] before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-100">
                {mvp.roadmap.map((phase, idx) => (
                  <div key={idx} className="relative pl-12">
                    <div className="absolute left-0 top-1 w-9 h-9 rounded-full bg-brand-600 text-white flex items-center justify-center font-bold text-sm shadow-lg shadow-brand-500/30">
                      {idx + 1}
                    </div>
                    <h4 className="text-lg font-display font-bold mb-4">{phase.phase}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {phase.tasks.map((task, tIdx) => (
                        <div key={tIdx} className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-sm text-slate-600">
                          {task}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        )}

        {activeTab === 'deck' && deck && (
          <motion.div 
            key="deck"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {deck.map((slide, idx) => (
              <div key={idx} className="aspect-video bg-slate-900 text-white p-6 rounded-2xl shadow-xl flex flex-col justify-between group hover:scale-[1.02] transition-transform cursor-pointer">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Slide {idx + 1}</span>
                    <div className="w-2 h-2 rounded-full bg-brand-500" />
                  </div>
                  <h4 className="text-lg font-display font-bold mb-3">{slide.title}</h4>
                  <ul className="space-y-1.5">
                    {slide.content.map((item, iIdx) => (
                      <li key={iIdx} className="text-[11px] text-slate-400 flex items-start gap-2">
                        <div className="mt-1.5 w-1 h-1 rounded-full bg-slate-600 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                {slide.visualPrompt && (
                  <div className="mt-4 p-2 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-[9px] text-slate-500 italic">Visual: {slide.visualPrompt}</p>
                  </div>
                )}
              </div>
            ))}
            <div className="aspect-video bg-brand-50 border-2 border-dashed border-brand-200 rounded-2xl flex flex-col items-center justify-center text-brand-600 gap-3 cursor-pointer hover:bg-brand-100 transition-colors">
              <Plus size={32} />
              <span className="font-bold">Add Custom Slide</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isLoading, setIsLoading] = useState(false);
  const [ideas, setIdeas] = useState<StartupIdea[]>([]);
  const [selectedIdea, setSelectedIdea] = useState<StartupIdea | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const handleGenerate = async (profile: UserProfile) => {
    setIsLoading(true);
    setUserProfile(profile);
    try {
      // Save profile and get user ID
      const profileRes = await fetch('/api/user/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      const { id: userId } = await profileRes.json();

      // Generate ideas via Gemini
      const generatedIdeas = await generateStartupIdeas(profile);
      setIdeas(generatedIdeas);
      
      // Save ideas to DB
      await fetch('/api/ideas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, ideas: generatedIdeas })
      });

      setCurrentPage('ideas');
    } catch (err) {
      console.error(err);
      alert("Failed to generate ideas. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="pt-16">
        <AnimatePresence mode="wait">
          {currentPage === 'landing' && (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Hero onStart={() => setCurrentPage('generate')} />
              <Features />
              
              {/* How it works */}
              <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center mb-16">
                    <h2 className="text-3xl font-display font-bold mb-4">How It Works</h2>
                    <p className="text-slate-600">Three simple steps to launch your next big thing.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {[
                      { step: '01', title: 'Input Your Skills', desc: 'Manually enter your experience, skills, and interests into our secure platform.' },
                      { step: '02', title: 'AI Idea Generation', desc: 'Our AI analyzes market gaps and matches them with your unique background.' },
                      { step: '03', title: 'Get Your Roadmap', desc: 'Receive a full business plan, MVP roadmap, and investor pitch deck.' },
                    ].map((item, idx) => (
                      <div key={idx} className="relative">
                        <span className="text-8xl font-display font-black text-slate-100 absolute -top-10 -left-4 -z-10">{item.step}</span>
                        <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                        <p className="text-slate-600">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* CTA */}
              <section className="py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="bg-brand-600 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl shadow-brand-500/40 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                    <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to start your journey?</h2>
                    <p className="text-brand-100 text-lg mb-10 max-w-xl mx-auto">Join 10,000+ founders who used StartupForge to launch their companies.</p>
                    <button onClick={() => setCurrentPage('generate')} className="bg-white text-brand-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-brand-50 transition-all shadow-xl active:scale-95">
                      Get Started for Free
                    </button>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {currentPage === 'generate' && (
            <motion.div
              key="generate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="py-20 px-4"
            >
              <GeneratorForm onSubmit={handleGenerate} isLoading={isLoading} />
            </motion.div>
          )}

          {currentPage === 'ideas' && (
            <motion.div
              key="ideas"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-4 max-w-7xl mx-auto"
            >
              {selectedIdea ? (
                <IdeaDetails idea={selectedIdea} onBack={() => setSelectedIdea(null)} />
              ) : (
                <>
                  <div className="text-center mb-16">
                    <h2 className="text-4xl font-display font-bold mb-4">Your Personalized Startup Ideas</h2>
                    <p className="text-slate-600">Based on your background in {userProfile?.industry || 'tech'}, we've identified these opportunities.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {ideas.map((idea, idx) => (
                      <IdeaCard key={idx} idea={idea} onSelect={setSelectedIdea} />
                    ))}
                  </div>
                </>
              )}
            </motion.div>
          )}

          {currentPage === 'market-trends' && (
            <motion.div
              key="market-trends"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-4 max-w-7xl mx-auto"
            >
              <div className="text-center mb-16">
                <h2 className="text-4xl font-display font-bold mb-4">Global Market Trends 2026</h2>
                <p className="text-slate-600">AI-powered analysis of emerging sectors and investment patterns.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {[
                  { title: 'Generative AI', growth: '+145%', trend: 'up', color: 'emerald' },
                  { title: 'Clean Energy', growth: '+82%', trend: 'up', color: 'emerald' },
                  { title: 'EdTech', growth: '+12%', trend: 'down', color: 'rose' },
                  { title: 'Fintech', growth: '+44%', trend: 'up', color: 'emerald' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-bold text-slate-500 uppercase mb-2">{item.title}</p>
                    <div className="flex items-end gap-2">
                      <span className="text-3xl font-bold text-slate-800">{item.growth}</span>
                      <span className={`text-sm font-bold text-${item.color}-600 mb-1 flex items-center`}>
                        {item.trend === 'up' ? <TrendingUp size={14} /> : <TrendingUp size={14} className="rotate-180" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                  <h3 className="text-xl font-display font-bold mb-6">Hot Sectors to Watch</h3>
                  <div className="space-y-6">
                    {[
                      { name: 'AI Agents for Enterprise', desc: 'Autonomous agents replacing middle-management tasks.', heat: 98 },
                      { name: 'Vertical SaaS for Healthcare', desc: 'Niche solutions for specialized medical practices.', heat: 85 },
                      { name: 'Sustainable Supply Chain', desc: 'Blockchain-based tracking for carbon footprint.', heat: 72 },
                    ].map((sector, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-slate-800">{sector.name}</span>
                          <span className="text-xs font-bold text-brand-600">{sector.heat}% Heat</span>
                        </div>
                        <p className="text-sm text-slate-500 mb-3">{sector.desc}</p>
                        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-brand-600 rounded-full" style={{ width: `${sector.heat}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 p-4 opacity-10">
                    <TrendingUp size={120} />
                  </div>
                  <h3 className="text-xl font-display font-bold mb-6">AI Prediction</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed">
                    Based on current venture capital flow and patent filings, we predict a massive shift towards "Physical AI" in late 2026—AI systems that interact directly with the physical world through robotics and IoT.
                  </p>
                  <button className="btn-primary w-full">Download Full Report</button>
                </div>
              </div>
            </motion.div>
          )}
          {currentPage === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 px-4 max-w-7xl mx-auto"
            >
              <div className="flex justify-between items-end mb-12">
                <div>
                  <h1 className="text-4xl font-display font-bold mb-2">Founder Dashboard</h1>
                  <p className="text-slate-500">Welcome back! Here are your saved projects.</p>
                </div>
                <button onClick={() => setCurrentPage('generate')} className="btn-primary flex items-center gap-2">
                  <Plus size={20} /> New Startup
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-display font-bold mb-6">Recent Ideas</h3>
                    {ideas.length > 0 ? (
                      <div className="space-y-4">
                        {ideas.map((idea, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-300 transition-colors cursor-pointer" onClick={() => { setSelectedIdea(idea); setCurrentPage('ideas'); }}>
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-brand-100 text-brand-600 rounded-xl flex items-center justify-center">
                                <Rocket size={20} />
                              </div>
                              <div>
                                <p className="font-bold text-slate-800">{idea.name}</p>
                                <p className="text-xs text-slate-500">Generated on {new Date().toLocaleDateString()}</p>
                              </div>
                            </div>
                            <ChevronRight size={20} className="text-slate-400" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                          <Brain size={32} />
                        </div>
                        <p className="text-slate-500">No ideas generated yet.</p>
                        <button onClick={() => setCurrentPage('generate')} className="text-brand-600 font-bold mt-2">Start generating</button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                    <h3 className="text-xl font-display font-bold mb-6">Profile Strength</h3>
                    <div className="flex items-center justify-center mb-6">
                      <div className="relative w-32 h-32">
                        <svg className="w-full h-full" viewBox="0 0 36 36">
                          <path className="text-slate-100" strokeDasharray="100, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                          <path className="text-brand-600" strokeDasharray="85, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-2xl font-bold">85%</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-center text-sm text-slate-500 mb-6">Your profile is highly detailed. This helps our AI provide more accurate results.</p>
                    <button className="w-full btn-secondary py-2 text-sm">Edit Profile</button>
                  </div>

                  <div className="bg-linear-to-br from-indigo-600 to-brand-600 p-8 rounded-3xl text-white shadow-xl">
                    <h3 className="text-xl font-display font-bold mb-4">Investor Readiness</h3>
                    <p className="text-indigo-100 text-sm mb-6">Complete your business plan and pitch deck to increase your score.</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <CheckCircle2 size={14} className="text-emerald-400" /> Idea Validated
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold">
                        <CheckCircle2 size={14} className="text-emerald-400" /> Business Plan Drafted
                      </div>
                      <div className="flex items-center gap-2 text-xs font-bold opacity-50">
                        <div className="w-3.5 h-3.5 rounded-full border border-white/50" /> Pitch Deck Finalized
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="bg-white border-t border-slate-200 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white">
                <Rocket size={18} />
              </div>
              <span className="text-lg font-display font-bold">Udaan Setu <span className="text-brand-600">AI</span></span>
            </div>
            <div className="flex gap-8 text-sm font-medium text-slate-500">
              <a href="#" className="hover:text-brand-600">Privacy Policy</a>
              <a href="#" className="hover:text-brand-600">Terms of Service</a>
              <a href="#" className="hover:text-brand-600">Contact Us</a>
            </div>
            <p className="text-sm text-slate-400">© 2026 Udaan Setu. All rights reserved.</p>
          </div>
        </div>
      </footer>
      <Analytics />
    </div>
  );
}
