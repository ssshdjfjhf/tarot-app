import { ArcanaType, CardDefinition, SpreadConfig, SpreadType, Suit } from "./types";

// --- Audio Asset (Short Flip Sound - Base64) ---
export const FLIP_SOUND_BASE64 = "data:audio/mp3;base64,//uQxAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAACcQCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIgAAAAAtNwAAAAAAACcgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgAAD/7kMAAAAAAAIAAAAAAAgAAAAB//uQxAAACtIbSykQAiAAAIgAAAAETElNRTMuOTkuNVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV//uQxBsABsY3T0w94AAAAAIgAAAAE5JSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUl//uQxCMABxY3T0w94AAAAAIgAAAAE5JSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUl//uQxEAAA743T0w94AAAAAIgAAAAE5JSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUl";

// --- Spreads ---
export const SPREADS: Record<SpreadType, SpreadConfig> = {
  [SpreadType.SINGLE]: {
    id: SpreadType.SINGLE,
    name: "单张指引 (One Card)",
    description: "最直接的答案，适合每日运势或具体问题。",
    cardCount: 1,
    positionMeanings: ["核心指引"]
  },
  [SpreadType.THREE_CARD]: {
    id: SpreadType.THREE_CARD,
    name: "时间之流 (Three Cards)",
    description: "洞察过去的影响、现在的状况以及未来的趋势。",
    cardCount: 3,
    positionMeanings: ["过去的影响", "当下的处境", "未来的趋势"]
  },
  [SpreadType.CELTIC_CROSS]: {
    id: SpreadType.CELTIC_CROSS,
    name: "凯尔特十字 (Celtic Cross)",
    description: "最经典的深度牌阵，全方位分析问题的成因、阻碍与结果。",
    cardCount: 10,
    positionMeanings: [
      "核心现状",
      "阻碍与挑战",
      "潜意识基础",
      "过去经历",
      "显意识目标",
      "即将发生",
      "自我态度",
      "环境影响",
      "希望与恐惧",
      "最终结果"
    ]
  }
};

// --- Helper to generate cards ---

const MAJOR_ARCANA: Omit<CardDefinition, 'type' | 'suit'>[] = [
  { id: 0, nameEn: "The Fool", nameCn: "愚人", meaningUp: "新的开始，冒险，天真，潜力无限。", meaningRev: "鲁莽，冒险失败，无知，轻率。", keywords: ["Beginnings", "Innocence", "Spontaneity"] },
  { id: 1, nameEn: "The Magician", nameCn: "魔术师", meaningUp: "创造力，意志力，技能，专注。", meaningRev: "操纵，才华未发挥，计划不周。", keywords: ["Manifestation", "Power", "Action"] },
  { id: 2, nameEn: "The High Priestess", nameCn: "女祭司", meaningUp: "直觉，潜意识，神秘，内在知识。", meaningRev: "表面知识，忽视直觉，压抑情感。", keywords: ["Intuition", "Mystery", "Subconscious"] },
  { id: 3, nameEn: "The Empress", nameCn: "皇后", meaningUp: "丰饶，母性，自然，感官享受。", meaningRev: "依赖，创造力受阻，空虚。", keywords: ["Fertility", "Nature", "Abundance"] },
  { id: 4, nameEn: "The Emperor", nameCn: "皇帝", meaningUp: "权威，结构，控制，父性。", meaningRev: "暴政，僵化，冷酷，缺乏纪律。", keywords: ["Authority", "Structure", "Control"] },
  { id: 5, nameEn: "The Hierophant", nameCn: "教皇", meaningUp: "传统，精神指引，信仰，墨守成规。", meaningRev: "叛逆，打破传统，新的信念。", keywords: ["Tradition", "Conformity", "Beliefs"] },
  { id: 6, nameEn: "The Lovers", nameCn: "恋人", meaningUp: "爱，和谐，关系，价值观选择。", meaningRev: "不和谐，失衡，错误的选择。", keywords: ["Love", "Harmony", "Values"] },
  { id: 7, nameEn: "The Chariot", nameCn: "战车", meaningUp: "胜利，意志力，自控，决心。", meaningRev: "失控，攻击性，缺乏方向。", keywords: ["Victory", "Willpower", "Action"] },
  { id: 8, nameEn: "Strength", nameCn: "力量", meaningUp: "勇气，耐心，同情，内在力量。", meaningRev: "自我怀疑，软弱，不安全感。", keywords: ["Courage", "Persuasion", "Influence"] },
  { id: 9, nameEn: "The Hermit", nameCn: "隐士", meaningUp: "内省，孤独，寻求真理，指导。", meaningRev: "孤立，寂寞，逃避现实。", keywords: ["Soul-searching", "Introspection", "Guidance"] },
  { id: 10, nameEn: "Wheel of Fortune", nameCn: "命运之轮", meaningUp: "好运，因果，生命周期，转折点。", meaningRev: "厄运，阻力，打破循环。", keywords: ["Luck", "Karma", "Cycles"] },
  { id: 11, nameEn: "Justice", nameCn: "正义", meaningUp: "公平，真理，因果报应，法律。", meaningRev: "不公，缺乏责任感，不诚实。", keywords: ["Fairness", "Truth", "Law"] },
  { id: 12, nameEn: "The Hanged Man", nameCn: "倒吊人", meaningUp: "暂停，投降，新视角，牺牲。", meaningRev: "拖延，抵抗，停滞不前。", keywords: ["Suspension", "Restriction", "Letting Go"] },
  { id: 13, nameEn: "Death", nameCn: "死神", meaningUp: "结束，转变，放下，新生。", meaningRev: "抵抗改变，无法放下，停滞。", keywords: ["Endings", "Change", "Transformation"] },
  { id: 14, nameEn: "Temperance", nameCn: "节制", meaningUp: "平衡，适度，耐心，目标明确。", meaningRev: "失衡，过度，匆忙。", keywords: ["Balance", "Moderation", "Patience"] },
  { id: 15, nameEn: "The Devil", nameCn: "恶魔", meaningUp: "束缚，上瘾，物质主义，阴影面。", meaningRev: "打破束缚，重获自由，面对阴影。", keywords: ["Bondage", "Addiction", "Materialism"] },
  { id: 16, nameEn: "The Tower", nameCn: "高塔", meaningUp: "突变，混乱，启示，觉醒。", meaningRev: "避免灾难，恐惧改变，延迟的痛苦。", keywords: ["Disaster", "Upheaval", "Sudden Change"] },
  { id: 17, nameEn: "The Star", nameCn: "星星", meaningUp: "希望，灵感，平静，精神力量。", meaningRev: "绝望，缺乏信心，灰心。", keywords: ["Hope", "Faith", "Rejuvenation"] },
  { id: 18, nameEn: "The Moon", nameCn: "月亮", meaningUp: "幻觉，恐惧，焦虑，潜意识。", meaningRev: "释放恐惧，解开谜团，清晰。", keywords: ["Illusion", "Fear", "Anxiety"] },
  { id: 19, nameEn: "The Sun", nameCn: "太阳", meaningUp: "快乐，成功，积极，活力。", meaningRev: "暂时的消沉，缺乏成功，悲观。", keywords: ["Positivity", "Fun", "Warmth"] },
  { id: 20, nameEn: "Judgement", nameCn: "审判", meaningUp: "反思，觉醒，重生，决断。", meaningRev: "自我怀疑，拒绝改变，忽视召唤。", keywords: ["Judgment", "Rebirth", "Inner Calling"] },
  { id: 21, nameEn: "The World", nameCn: "世界", meaningUp: "完成，整合，成就，旅行。", meaningRev: "未完成，缺乏封闭，停滞。", keywords: ["Completion", "Integration", "Accomplishment"] }
];

const SUITS_DATA = {
  [Suit.WANDS]: { name: "Wands", cn: "权杖", element: "火", keywords: ["Inspiration", "Energy", "Passion"] },
  [Suit.CUPS]: { name: "Cups", cn: "圣杯", element: "水", keywords: ["Emotion", "Relationships", "Feelings"] },
  [Suit.SWORDS]: { name: "Swords", cn: "宝剑", element: "风", keywords: ["Intellect", "Thoughts", "Conflict"] },
  [Suit.PENTACLES]: { name: "Pentacles", cn: "星币", element: "土", keywords: ["Material", "Work", "Stability"] }
};

const MINOR_NUMBERS = [
  { val: 1, name: "Ace", cn: "首牌", up: "新的机会，潜力。", rev: "错失良机，延迟。" },
  { val: 2, name: "Two", cn: "二", up: "平衡，决定，伙伴关系。", rev: "不平衡，优柔寡断。" },
  { val: 3, name: "Three", cn: "三", up: "合作，成长，初步成果。", rev: "延误，缺乏合作。" },
  { val: 4, name: "Four", cn: "四", up: "稳定，控制，保守。", rev: "贪婪，不稳定，放手。" },
  { val: 5, name: "Five", cn: "五", up: "冲突，损失，改变。", rev: "解决冲突，恢复。" },
  { val: 6, name: "Six", cn: "六", up: "和谐，慷慨，过去的回忆。", rev: "自私，由于过去而受阻。" },
  { val: 7, name: "Seven", cn: "七", up: "评估，耐心，投资。", rev: "缺乏耐心，投资失败。" },
  { val: 8, name: "Eight", cn: "八", up: "勤奋，细节，技能提升。", rev: "完美主义，缺乏专注。" },
  { val: 9, name: "Nine", cn: "九", up: "成就，满足，独立。", rev: "不满，依赖，财务问题。" },
  { val: 10, name: "Ten", cn: "十", up: "完成，圆满，遗产。", rev: "破碎，未完成，家庭问题。" },
  { val: 11, name: "Page", cn: "侍从", up: "新消息，好奇心，年轻能量。", rev: "坏消息，不成熟，拖延。" },
  { val: 12, name: "Knight", cn: "骑士", up: "行动，追求，冲动。", rev: "鲁莽，停滞，不可靠。" },
  { val: 13, name: "Queen", cn: "皇后", up: "滋养，成熟，阴性能量。", rev: "嫉妒，依赖，冷漠。" },
  { val: 14, name: "King", cn: "国王", up: "权威，掌握，阳性能量。", rev: "暴虐，软弱，滥用权力。" }
];

// Generate Full Deck
export const DECK: CardDefinition[] = [
  ...MAJOR_ARCANA.map(c => ({ ...c, type: ArcanaType.MAJOR, suit: Suit.NONE })),
  ...Object.values(Suit).filter(s => s !== Suit.NONE).flatMap(suit => 
    MINOR_NUMBERS.map(num => ({
      id: 100 + Object.values(Suit).indexOf(suit) * 14 + num.val, // Unique ID generation
      nameEn: `${num.name} of ${SUITS_DATA[suit].name}`,
      nameCn: `${SUITS_DATA[suit].cn}${num.cn}`,
      type: ArcanaType.MINOR,
      suit: suit,
      number: num.val,
      meaningUp: `${num.up} (${SUITS_DATA[suit].element}元素影响)`,
      meaningRev: `${num.rev} (${SUITS_DATA[suit].element}元素影响)`,
      keywords: [...SUITS_DATA[suit].keywords, num.name]
    }))
  )
];