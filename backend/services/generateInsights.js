const OpenAI = require("openai");

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

async function generateInsights(feedback) {
  const input = feedback.map((f) => ({
    summary: f.summary,

    sentiment: f.sentimentLabel,

    topics: f.topics,

    intent: f.intent,

    urgency: f.urgency,
  }));

  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    response_format: {
      type: "json_object",
    },

    messages: [
      {
        role: "system",

        content: `

You are a customer intelligence analyst.

Analyze ALL feedback together.

Rules:

- Detect recurring patterns
- Ignore isolated opinions
- Focus on business value
- Prioritize frequent issues
- Generate actions

Return ONLY JSON:

{

executiveSummary:"",

customerMood:"",

topStrengths:[],

criticalIssues:[],

emergingPatterns:[],

recommendedActions:[],

priority:""

}

priority:
low
medium
high

`,
      },

      {
        role: "user",

        content: JSON.stringify(input),
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = generateInsights;