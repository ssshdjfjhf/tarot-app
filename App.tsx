import React, { useState, useEffect, useRef } from 'react';
import Background from './components/Background';
import Card from './components/Card';
import { AppState, SpreadType, DrawnCard, SpreadConfig } from './types';
import { SPREADS as SPREAD_DATA, FLIP_SOUND_BASE64 } from './constants';
import { shuffleDeck, drawCards } from './services/tarotEngine';
import { getTarotReading } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [selectedSpread, setSelectedSpread] = useState<SpreadType>(SpreadType.SINGLE);
  const [deck, setDeck] = useState<DrawnCard[]>([]);
  const [shufflingCards, setShufflingCards] = useState<any[]>([]); // For visual chaos
  const [readingSummary, setReadingSummary] = useState<string>('');
  const [isLoadingSummary, setIsLoadingSummary] = useState(false);
  const [showSummary, setShowSummary] = useState(false);
  
  // Store the running AI promise so we don't have to wait after flipping
  const [summaryPromise, setSummaryPromise] = useState<Promise<string> | null>(null);
  
  // Audio
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(FLIP_SOUND_BASE64);
    audioRef.current.volume = 0.4;
  }, []);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {}); // Ignore interaction errors
    }
  };

  const handleStart = () => {
    setAppState(AppState.SHUFFLING);
    
    // Initialize chaos particles for shuffle animation
    const chaos = Array.from({ length: 78 }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth - window.innerWidth / 2,
      y: Math.random() * window.innerHeight - window.innerHeight / 2,
      r: Math.random() * 360,
      d: Math.random() * 2 + 0.5, // duration
      s: Math.random() * 0.5 + 0.5 // scale
    }));
    setShufflingCards(chaos);

    // 1. Logic: Draw cards immediately (behind the scenes)
    const shuffled = shuffleDeck();
    const spreadConfig = SPREAD_DATA[selectedSpread];
    const drawn = drawCards(shuffled, spreadConfig.cardCount);
    setDeck(drawn);

    // 2. Optimization: Start AI generation IMMEDIATELY in the background
    // This makes the "waiting time" effectively zero for the user
    const aiRequest = getTarotReading(spreadConfig, drawn);
    setSummaryPromise(aiRequest);

    // 3. Visual: Fast Shuffle Logic Timer
    setTimeout(() => {
        // Phase 2: Gather
        setAppState(AppState.SPREAD_DEALING);
        
        // Short delay before showing Reading view
        setTimeout(() => {
            setAppState(AppState.READING);
        }, 500); // 0.5s dealing animation
    }, 2500); // 2.5s shuffle animation (Reduced from 6s)
  };

  const handleCardReveal = (index: number) => {
    if (deck[index].isRevealed) return;

    playFlipSound();
    
    // Create new array to trigger re-render
    const newDeck = [...deck];
    newDeck[index] = { ...newDeck[index], isRevealed: true };
    setDeck(newDeck);

    // Check if all revealed
    if (newDeck.every(c => c.isRevealed)) {
        setTimeout(() => {
            revealSummary();
        }, 800);
    }
  };

  const revealSummary = async () => {
    setShowSummary(true);
    setIsLoadingSummary(true);

    if (summaryPromise) {
        try {
            const text = await summaryPromise;
            setReadingSummary(text);
        } catch (e) {
            setReadingSummary("连接灵界失败，请稍后再试。");
        }
    } else {
        setReadingSummary("数据迷失...");
    }
    setIsLoadingSummary(false);
  };

  const resetApp = () => {
    setAppState(AppState.INTRO);
    setDeck([]);
    setReadingSummary('');
    setShowSummary(false);
    setIsLoadingSummary(false);
    setSummaryPromise(null);
  };

  // --- RENDERERS ---

  const renderIntro = () => (
    <div className="flex flex-col items-center justify-center min-h-screen z-10 relative px-4 text-center">
      <h1 className="text-6xl md:text-8xl font-serif text-transparent bg-clip-text bg-gradient-to-t from-violet-600 to-white animate-pulse-glow mb-8 drop-shadow-[0_0_15px_rgba(139,92,246,0.5)]">
        NEBULA TAROT
      </h1>
      <p className="text-violet-200 text-lg mb-12 max-w-lg tracking-widest font-light">
        Consult the stars. Reveal your destiny.
      </p>

      <div className="mb-8">
        <label className="block text-violet-300 mb-2 text-sm uppercase tracking-wider">选择你的牌阵 (Choose Spread)</label>
        <select 
            value={selectedSpread}
            onChange={(e) => setSelectedSpread(e.target.value as SpreadType)}
            className="bg-slate-900/80 border border-violet-500 text-violet-100 p-3 rounded-lg outline-none focus:ring-2 focus:ring-violet-400 w-64 text-center"
        >
            {Object.values(SPREAD_DATA).map((s: SpreadConfig) => (
                <option key={s.id} value={s.id}>{s.name}</option>
            ))}
        </select>
        <p className="text-slate-400 text-xs mt-2 max-w-xs mx-auto">
            {SPREAD_DATA[selectedSpread].description}
        </p>
      </div>

      <button 
        onClick={handleStart}
        className="group relative px-8 py-4 bg-transparent overflow-hidden rounded-full transition-all duration-300 hover:scale-105"
      >
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-70 group-hover:opacity-100 blur-sm transition-opacity"></div>
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-20 group-hover:opacity-40 border border-white/20 rounded-full"></div>
        <span className="relative z-10 text-white font-serif tracking-[0.2em] text-xl group-hover:text-white transition-colors drop-shadow-md">
            开始占卜 (BEGIN)
        </span>
      </button>
    </div>
  );

  const renderShuffling = () => (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        {shufflingCards.map((card) => (
            <div
                key={card.id}
                className="absolute w-20 h-32 bg-violet-900/40 border border-violet-400/30 rounded"
                style={{
                    transform: `translate(${card.x}px, ${card.y}px) rotate(${card.r}deg) scale(${card.s})`,
                    transition: `transform ${card.d}s cubic-bezier(0.25, 0.46, 0.45, 0.94)`,
                    opacity: 0,
                    animation: `float ${card.d}s ease-in-out infinite`
                }}
            >
                <div className="w-full h-full animate-spin-slow opacity-50 bg-gradient-to-br from-violet-500 to-transparent" />
            </div>
        ))}
        {/* Triggering the transition with a useEffect inside component mount would be cleaner but inline styles work for this chaotic effect */}
        <style>{`
            .shuffling-card {
                 animation: shuffleFly 6s forwards;
            }
        `}</style>
        <div className="z-20 text-2xl tracking-widest text-violet-200 animate-pulse font-serif">
            命运洗牌中 (SHUFFLING)...
        </div>
    </div>
  );

  // Helper for Celtic Cross positioning
  const getCardStyle = (index: number, total: number): React.CSSProperties => {
    // Mobile fallback: simple grid
    if (window.innerWidth < 768) {
        return { position: 'relative', margin: '10px' };
    }

    if (selectedSpread === SpreadType.CELTIC_CROSS) {
        // Hardcoded positions for Celtic Cross
        const positions = [
            { top: '50%', left: '40%', zIndex: 10 }, // 1. Center
            { top: '50%', left: '40%', rotate: '90deg', zIndex: 11 }, // 2. Crossing
            { top: '25%', left: '40%', zIndex: 9 }, // 3. Below (visual up)
            { top: '50%', left: '20%', zIndex: 9 }, // 4. Left
            { top: '75%', left: '40%', zIndex: 9 }, // 5. Above (visual down)
            { top: '50%', left: '60%', zIndex: 9 }, // 6. Right
            { top: '80%', left: '85%', zIndex: 9 }, // 7. Staff bottom
            { top: '60%', left: '85%', zIndex: 9 }, // 8. Staff low-mid
            { top: '40%', left: '85%', zIndex: 9 }, // 9. Staff high-mid
            { top: '20%', left: '85%', zIndex: 9 }, // 10. Staff top
        ];
        const pos = positions[index];
        return {
            position: 'absolute',
            top: pos.top,
            left: pos.left,
            transform: `translate(-50%, -50%) ${pos.rotate ? `rotate(${pos.rotate})` : ''}`,
            zIndex: pos.zIndex
        };
    } else {
        // Flex row logic for Single and Three Card
        return { position: 'relative', margin: '0 10px' };
    }
  };

  const renderReading = () => {
    const isCeltic = selectedSpread === SpreadType.CELTIC_CROSS;
    const containerClass = isCeltic && window.innerWidth >= 768
        ? "relative w-full max-w-5xl h-[600px] mx-auto"
        : "flex flex-wrap justify-center gap-4 py-8 px-4 max-w-6xl mx-auto";

    return (
        <div className="w-full h-screen pt-4 pb-32 overflow-y-auto z-10 relative scroll-smooth">
             {/* Spread Area */}
             <div className="flex flex-col items-center">
                 <h2 className="text-violet-300 font-serif mb-6 text-xl tracking-widest border-b border-violet-800 pb-2">
                     {SPREAD_DATA[selectedSpread].name}
                 </h2>
                 
                 <div className={containerClass}>
                    {deck.map((card, idx) => (
                        <div key={card.id} style={getCardStyle(idx, deck.length)}>
                            <div className="flex flex-col items-center gap-2">
                                {/* Position Label */}
                                <span className={`text-[10px] uppercase text-violet-400/70 tracking-wider bg-black/50 px-2 rounded mb-1 ${card.isRevealed ? 'opacity-100' : 'opacity-0'} transition-opacity`}>
                                    {idx + 1}. {SPREAD_DATA[selectedSpread].positionMeanings[idx]}
                                </span>
                                <Card 
                                    card={card} 
                                    onClick={() => handleCardReveal(idx)}
                                    // In Celtic cross, need to prevent clicking covered card first ideally, but simple sequential is fine for this demo
                                    disabled={false} 
                                />
                            </div>
                        </div>
                    ))}
                 </div>
             </div>

             {/* Results Section - Appears as cards are revealed */}
             <div className="max-w-4xl mx-auto px-6 mt-12 grid gap-6">
                 {deck.filter(c => c.isRevealed).map((card, idx) => (
                     <div key={`result-${card.id}`} className="bg-slate-900/60 border-l-4 border-violet-500 p-6 rounded-r-lg backdrop-blur-sm animate-float [animation-duration:4s]">
                         <div className="flex flex-col md:flex-row md:items-baseline gap-4 mb-2">
                             <h3 className="text-2xl text-violet-200 font-serif">
                                 {card.nameCn} <span className="text-sm text-violet-400 opacity-60">({card.nameEn})</span>
                             </h3>
                             <span className={`px-2 py-1 text-xs rounded border ${card.isReversed ? 'border-red-500/50 text-red-300' : 'border-green-500/50 text-green-300'}`}>
                                 {card.isReversed ? '逆位 (Reversed)' : '正位 (Upright)'}
                             </span>
                             <span className="text-xs text-slate-400 uppercase tracking-wider">
                                 位置: {SPREAD_DATA[selectedSpread].positionMeanings[idx]}
                             </span>
                         </div>
                         <p className="text-slate-300 leading-relaxed font-light">
                             {card.isReversed ? card.meaningRev : card.meaningUp}
                         </p>
                         <div className="mt-3 flex gap-2 flex-wrap">
                             {card.keywords.map(k => (
                                 <span key={k} className="text-[10px] text-violet-400 bg-violet-900/30 px-2 py-1 rounded-full">{k}</span>
                             ))}
                         </div>
                     </div>
                 ))}
             </div>

             {/* AI Summary Section */}
             {showSummary && (
                 <div className="max-w-3xl mx-auto px-6 mt-12 mb-20 text-center">
                     <div className="p-8 rounded-2xl bg-gradient-to-b from-indigo-900/40 to-black/60 border border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.2)]">
                         <h3 className="text-2xl font-serif text-transparent bg-clip-text bg-gradient-to-r from-violet-200 to-fuchsia-200 mb-6">
                             ✧ 整体综合解读 (Final Synthesis) ✧
                         </h3>
                         {isLoadingSummary ? (
                             <div className="flex flex-col items-center gap-4">
                                 <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin"></div>
                                 <p className="text-violet-300 animate-pulse text-sm">正在连接灵界 (Consulting)...</p>
                             </div>
                         ) : (
                             <div className="prose prose-invert mx-auto text-left">
                                 <p className="text-lg leading-loose text-indigo-100 whitespace-pre-wrap">
                                     {readingSummary}
                                 </p>
                             </div>
                         )}
                     </div>
                 </div>
             )}
             
             {/* Floating Reset Button */}
             <div className="fixed bottom-6 right-6 z-50">
                 <button 
                    onClick={resetApp}
                    className="bg-slate-900 text-violet-300 border border-violet-500 px-6 py-2 rounded-full hover:bg-violet-900 hover:text-white transition-all shadow-[0_0_10px_rgba(139,92,246,0.3)] font-serif uppercase text-sm tracking-wider"
                 >
                    重新占卜 (New Reading) ↺
                 </button>
             </div>
        </div>
    );
  };

  return (
    <div className="relative h-screen overflow-hidden text-white font-sans selection:bg-violet-500 selection:text-white">
      <Background />
      
      {appState === AppState.INTRO && renderIntro()}
      {(appState === AppState.SHUFFLING || appState === AppState.SPREAD_DEALING) && renderShuffling()}
      {(appState === AppState.READING || appState === AppState.SUMMARY) && renderReading()}
    </div>
  );
};

export default App;