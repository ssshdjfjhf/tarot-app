import { DrawnCard, SpreadConfig } from "../types";

// NOTE: Services migrated to DeepSeek API as requested.
const API_ENDPOINT = "https://api.deepseek.com/chat/completions";

export const getTarotReading = async (
  spread: SpreadConfig,
  cards: DrawnCard[]
): Promise<string> => {
  // Hardcoded API Key as requested for immediate testing
  const apiKey = "sk-bc439576c7a84ad7892b20e902b91dd6";

  if (!apiKey) {
    console.error("CRITICAL: API_KEY is missing.");
    return "配置错误：未检测到 API Key。";
  }

  const cardDescriptions = cards.map((c, i) => {
    const positionName = spread.positionMeanings[i] || `位置 ${i + 1}`;
    const orientation = c.isReversed ? "逆位" : "正位";
    return `- ${positionName}: ${c.nameCn} (${c.nameEn}) [${orientation}]`;
  }).join("\n");

  const systemPrompt = `你是一位精通神秘学、荣格心理学与象征主义的塔罗牌占卜大师。
请为牌阵 "${spread.name}" 进行解读。

【任务要求】
1. 语气：神秘、深邃、富有同理心，如同一位古老的智者在低语。
2. 结构：请不要机械地逐张解释牌义。请给出一段连贯的、文学性的“整体综合解读” (Final Synthesis)。
3. 内容：将所有牌的象征意义编织在一起，构建一个关于求问者当下处境、潜意识流动与未来可能性的完整故事。
4. 语言：中文（简体）。

【输入信息】
${cardDescriptions}

请直接输出解读正文，无需添加问候语。`;

  try {
    const response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: "请揭示牌面背后的指引。" }
        ],
        temperature: 1.1, // Slightly creative for tarot readings
        max_tokens: 2000,
        stream: false
      })
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error("DeepSeek API Error Details:", errorText);
        throw new Error(`DeepSeek API responded with status ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
        throw new Error("Empty response received from DeepSeek API");
    }

    return content;

  } catch (error) {
    console.error("DeepSeek Interpretation Failed:", error);
    return "星象连接受到干扰... (请检查控制台日志以确认 API Key 是否正确配置)";
  }
};