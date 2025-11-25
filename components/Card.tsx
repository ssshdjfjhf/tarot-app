import React from 'react';
import { DrawnCard, Suit } from '../types';

interface CardProps {
  card: DrawnCard;
  onClick: () => void;
  style?: React.CSSProperties;
  disabled?: boolean;
}

// --- SVG Icons ---

const SuitIcon: React.FC<{ suit: Suit; className?: string }> = ({ suit, className }) => {
  switch (suit) {
    case Suit.WANDS: // Wand / Staff
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M19.5,4.5 L15,2 L17,6 L15,10 L18,12 L16,16 L19,19 L15,22 L5,22 L9,14 L7,10 L11,6 L9,2 L13.5,4.5 L14.5,0.5 L19.5,4.5 Z" />
        </svg>
      );
    case Suit.CUPS: // Cup / Chalice
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
          <path d="M5,5 C5,3 7,3 7,3 L17,3 C17,3 19,3 19,5 C19,11 16,14 12,14 C8,14 5,11 5,5 Z M12,14 L12,19 M7,22 L17,22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case Suit.SWORDS: // Sword
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
           <path d="M12,2 L14,15 L17,15 L12,22 L7,15 L10,15 L12,2 Z M10,15 L14,15" />
        </svg>
      );
    case Suit.PENTACLES: // Coin / Star
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12,4 L14.5,9.5 L20,10 L16,14 L17.5,19.5 L12,16.5 L6.5,19.5 L8,14 L4,10 L9.5,9.5 L12,4 Z" fill="currentColor" fillOpacity="0.5" />
        </svg>
      );
    default:
      return null;
  }
};

// --- Court Card Visuals ---

const CourtVisual: React.FC<{ rank: number; suit: Suit; colorClass: string }> = ({ rank, suit, colorClass }) => {
    // 11: Page, 12: Knight, 13: Queen, 14: King
    
    const renderFigure = () => {
        switch(rank) {
            case 11: // Page (Feather Cap / Youth)
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full p-2 opacity-80">
                         <path d="M50,80 Q20,80 20,50 Q20,20 50,20 Q80,20 80,50 Q80,80 50,80 Z" fill="none" stroke="currentColor" strokeWidth="2" />
                         <path d="M50,25 Q65,10 80,5" stroke="currentColor" strokeWidth="3" fill="none" />
                         <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.2" />
                         <text x="50" y="95" textAnchor="middle" fontSize="12" fill="currentColor" className="font-serif tracking-widest">PAGE</text>
                    </svg>
                );
            case 12: // Knight (Horse Head / Chess Knight)
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full p-1 opacity-90">
                        {/* Abstract Horse Head */}
                        <path d="M30,80 L70,80 L70,70 C70,70 75,50 60,35 C60,35 60,20 65,15 L55,10 C55,10 50,15 45,20 C45,20 35,20 30,25 C30,25 25,15 20,20 C20,20 25,35 30,40 C30,40 20,55 20,65 L30,80 Z" 
                              fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        <circle cx="50" cy="25" r="3" fill="currentColor" />
                        <text x="50" y="95" textAnchor="middle" fontSize="12" fill="currentColor" className="font-serif tracking-widest">KNIGHT</text>
                    </svg>
                );
            case 13: // Queen (Tiara / Feminine)
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full p-2 opacity-90">
                        {/* Crown */}
                        <path d="M20,60 L20,40 L35,50 L50,20 L65,50 L80,40 L80,60 Q50,70 20,60 Z" 
                              fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round" />
                        <circle cx="50" cy="80" r="10" fill="currentColor" fillOpacity="0.3" />
                         <text x="50" y="95" textAnchor="middle" fontSize="12" fill="currentColor" className="font-serif tracking-widest">QUEEN</text>
                    </svg>
                );
            case 14: // King (Crown / Masculine)
                return (
                    <svg viewBox="0 0 100 100" className="w-full h-full p-2 opacity-90">
                        {/* Big Crown */}
                        <path d="M20,65 L20,35 L35,35 L35,20 L50,10 L65,20 L65,35 L80,35 L80,65 Q50,75 20,65 Z" 
                             fill="none" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
                        <rect x="20" y="65" width="60" height="10" fill="currentColor" fillOpacity="0.2" />
                        <text x="50" y="95" textAnchor="middle" fontSize="12" fill="currentColor" className="font-serif tracking-widest">KING</text>
                    </svg>
                );
            default: 
                return null;
        }
    }

    return (
        <div className={`relative w-full h-full flex flex-col items-center justify-center ${colorClass}`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 scale-150">
                <SuitIcon suit={suit} className="w-32 h-32" />
            </div>
            <div className="relative z-10 w-24 h-32 flex flex-col items-center">
                {renderFigure()}
                <SuitIcon suit={suit} className="w-8 h-8 mt-[-10px] drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            </div>
        </div>
    );
};

// --- Major Arcana Visuals ---

const MajorVisual: React.FC<{ id: number }> = ({ id }) => {
    // Abstract representations for Major Arcana
    const getPath = () => {
        switch(id) {
            case 0: // Fool: Feather / Cliff
                return <path d="M20,80 Q50,20 80,80 M30,30 L40,40 M60,30 L50,40" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 1: // Magician: Infinity
                return <path d="M20,50 Q20,20 50,50 Q80,80 80,50 Q80,20 50,50 Q20,80 20,50 Z" stroke="currentColor" strokeWidth="3" fill="none"/>;
            case 2: // High Priestess: Moon / Scroll
                return <path d="M40,20 A30,30 0 1,0 40,80 M60,20 L60,80 M30,50 L70,50" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 3: // Empress: Venus / Heart
                return <path d="M50,30 m-20,0 a20,20 0 1,1 40,0 a20,20 0 1,1 -40,0 M50,70 L50,90 M40,80 L60,80" stroke="currentColor" strokeWidth="3" fill="none"/>;
            case 4: // Emperor: Cube / Ram
                return <rect x="30" y="30" width="40" height="40" stroke="currentColor" strokeWidth="4" fill="none"/>;
            case 5: // Hierophant: Keys / Cross
                return <path d="M50,10 L50,90 M30,30 L70,30 M35,50 L65,50" stroke="currentColor" strokeWidth="3" fill="none"/>;
            case 6: // Lovers: Gemini / Hearts
                return <path d="M30,50 A20,20 0 1,1 70,50 A20,20 0 1,1 30,50" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 7: // Chariot: Wheels / Square
                return <path d="M20,50 L80,50 M25,40 L75,40 L75,70 L25,70 Z M20,70 A10,10 0 1,0 20,90 A10,10 0 1,0 20,70 M80,70 A10,10 0 1,0 80,90 A10,10 0 1,0 80,70" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 8: // Strength: Lion / Infinity
                return <path d="M25,50 Q50,20 75,50 Q50,80 25,50 Z M50,30 L50,70" stroke="currentColor" strokeWidth="3" fill="none"/>;
            case 9: // Hermit: Lantern / Star
                return <path d="M50,20 L30,80 L70,80 Z M50,40 L50,60 M45,50 L55,50" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 10: // Wheel: Wheel
                return <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="4" fill="none"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="20s" repeatCount="indefinite"/></circle>;
            case 11: // Justice: Scales
                return <path d="M50,20 L50,80 M20,20 L80,20 M20,20 L20,50 M80,20 L80,50" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 12: // Hanged Man: Ankh / Rope
                return <path d="M50,10 L50,40 M30,40 L70,40 L50,80 Z" stroke="currentColor" strokeWidth="3" fill="none"/>;
            case 13: // Death: Scythe / Skull
                return <path d="M50,30 A20,20 0 1,0 50,70 A20,20 0 1,0 50,30 M35,55 L45,65 M55,65 L65,55" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 14: // Temperance: Triangle in Square
                return <path d="M20,20 L80,20 L50,80 Z M20,20 L80,20 L80,80 L20,80 Z" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 15: // Devil: Pentagram (Inv)
                return <path d="M50,90 L20,30 L80,30 Z M50,90 L80,30 L20,30" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 16: // Tower: Lightning / Broken
                return <path d="M30,90 L30,40 L50,20 L70,40 L70,90 M40,20 L60,50 L40,60 L60,90" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 17: // Star: Star
                return <path d="M50,10 L60,40 L90,50 L60,60 L50,90 L40,60 L10,50 L40,40 Z" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 18: // Moon: Moon Face
                return <path d="M30,10 A40,40 0 1,0 30,90 A30,30 0 1,1 30,10" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 19: // Sun: Sun
                return <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="3" fill="none"/>;
            case 20: // Judgement: Horn
                return <path d="M20,80 L80,20 M30,80 L40,90 M70,20 L80,10" stroke="currentColor" strokeWidth="2" fill="none"/>;
            case 21: // World: Wreath
                return <ellipse cx="50" cy="50" rx="35" ry="45" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" fill="none"/>;
            default:
                return <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" fill="none"/>;
        }
    }

    return (
        <svg viewBox="0 0 100 100" className="w-24 h-24 text-yellow-500/80 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]">
            {getPath()}
        </svg>
    );
};

// --- Layout Logic ---

const Card: React.FC<CardProps> = ({ card, onClick, style, disabled }) => {
  const isMajor = card.suit === Suit.NONE;

  const getColors = (suit: Suit) => {
    switch(suit) {
      case Suit.WANDS: return "text-orange-600 border-orange-800 bg-orange-50";
      case Suit.CUPS: return "text-blue-600 border-blue-800 bg-blue-50";
      case Suit.SWORDS: return "text-slate-700 border-slate-800 bg-slate-100";
      case Suit.PENTACLES: return "text-emerald-700 border-emerald-800 bg-emerald-50";
      default: return "text-indigo-900 border-indigo-900 bg-slate-200";
    }
  };

  const colors = isMajor 
    ? "text-yellow-200 border-yellow-600 bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900"
    : getColors(card.suit);

  // Render Pips for Number Cards (1-10)
  const renderPips = (val: number, suit: Suit) => {
    // Generate grid areas based on value for a classic card look
    const getGridClass = () => {
        if (val === 1) return "grid-cols-1 grid-rows-1 flex items-center justify-center";
        if (val <= 3) return "grid-cols-1 flex flex-col justify-between py-4";
        if (val === 4) return "grid-cols-2 grid-rows-2 px-4 py-8 gap-4";
        if (val <= 6) return "grid-cols-2 grid-rows-3 px-4 py-4";
        if (val <= 8) return "grid-cols-2 grid-rows-4 px-4 py-2";
        if (val <= 10) return "grid-cols-2 grid-rows-5 px-4 py-2";
        return "grid-cols-3";
    };

    return (
        <div className={`w-full h-full grid ${getGridClass()} justify-items-center items-center`}>
            {Array.from({ length: val }).map((_, i) => (
                <SuitIcon key={i} suit={suit} className={`${val === 1 ? 'w-24 h-24' : 'w-5 h-5'}`} />
            ))}
        </div>
    );
  };

  const renderCardFace = () => {
    if (isMajor) {
        return (
            <div className={`flex flex-col items-center justify-between h-full p-2 border-4 border-double border-yellow-600/50 ${colors}`}>
                <div className="text-yellow-500 font-serif text-lg tracking-widest">{convertToRoman(card.id)}</div>
                
                {/* Mandala / Major Visual */}
                <div className="relative w-full flex-1 flex items-center justify-center">
                    <div className="absolute inset-2 border border-yellow-500/20 rounded-full animate-spin-slow"></div>
                    <MajorVisual id={card.id} />
                </div>

                <div className="text-center font-serif w-full border-t border-yellow-500/30 pt-1">
                     <div className="text-xl text-yellow-100 font-bold leading-tight">{card.nameCn}</div>
                     <div className="text-[9px] text-yellow-500/70 tracking-widest uppercase mt-1">{card.nameEn}</div>
                </div>
            </div>
        );
    } else {
        const isCourt = card.number! > 10;
        return (
            <div className={`relative flex flex-col h-full p-2 border-2 rounded-lg ${colors}`}>
                {/* Top Corner */}
                <div className="absolute top-2 left-2 flex flex-col items-center leading-none">
                    <div className="text-lg font-bold font-serif">{isCourt ? getCourtLetter(card.number!) : card.number}</div>
                    <SuitIcon suit={card.suit} className="w-3 h-3" />
                </div>
                
                {/* Bottom Corner (Rotated) */}
                <div className="absolute bottom-2 right-2 flex flex-col items-center leading-none rotate-180">
                    <div className="text-lg font-bold font-serif">{isCourt ? getCourtLetter(card.number!) : card.number}</div>
                    <SuitIcon suit={card.suit} className="w-3 h-3" />
                </div>

                {/* Center Content */}
                <div className="flex-1 flex flex-col items-center justify-center py-2 w-full h-full">
                    {isCourt ? (
                        <CourtVisual rank={card.number!} suit={card.suit} colorClass={colors.split(' ')[0]} />
                    ) : (
                        renderPips(card.number!, card.suit)
                    )}
                </div>

                {/* Name Label */}
                {!isCourt && (
                   <div className="text-center text-[10px] font-serif opacity-50 absolute bottom-10 w-full">{card.nameCn}</div>
                )}
                {isCourt && (
                    <div className="text-center font-serif border-t border-current pt-1 mt-1 opacity-80">
                         <div className="text-sm font-bold">{card.nameCn}</div>
                    </div>
                )}
            </div>
        );
    }
  };

  const getCourtLetter = (num: number) => {
      switch(num) {
          case 11: return "P";
          case 12: return "Kn";
          case 13: return "Q";
          case 14: return "K";
          default: return "";
      }
  }

  const convertToRoman = (num: number) => {
    if (num === 0) return "0";
    const roman = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1};
    let str = '';
    let n = num;
    for (const i of Object.keys(roman) as (keyof typeof roman)[]) {
      const q = Math.floor(n / roman[i]);
      n -= q * roman[i];
      str += i.repeat(q);
    }
    return str;
  };

  return (
    <div 
      className={`group w-36 h-60 perspective-1000 cursor-pointer select-none transition-all duration-300 ${disabled ? 'cursor-default' : 'hover:-translate-y-2'}`}
      style={style}
      onClick={!disabled ? onClick : undefined}
    >
      <div 
        className={`relative w-full h-full duration-700 card-preserve-3d transition-transform ${card.isRevealed ? '[transform:rotateY(180deg)]' : ''}`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-indigo-950 to-slate-900 border-2 border-violet-500/30 rounded-lg shadow-xl overflow-hidden">
            {/* Pattern */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-violet-500 to-transparent scale-150" />
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-40 border border-violet-500/40 rounded-sm flex items-center justify-center">
                     <div className="w-16 h-28 border border-violet-500/20 rounded-sm rotate-45 flex items-center justify-center">
                          <div className="w-2 h-2 bg-violet-400 rounded-full animate-pulse-glow shadow-[0_0_10px_#8b5cf6]"></div>
                     </div>
                 </div>
            </div>
            {/* Edge Glow */}
            <div className="absolute inset-0 border-2 border-white/5 rounded-lg"></div>
        </div>

        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden [transform:rotateY(180deg)] bg-white rounded-lg shadow-xl overflow-hidden">
          {renderCardFace()}
        </div>
      </div>
    </div>
  );
};

export default Card;