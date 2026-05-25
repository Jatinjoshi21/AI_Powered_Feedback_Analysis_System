const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function enrichFeedback(transcript) {
  const response = await client.chat.completions.create({
    model: "gpt-4.1-mini",

    response_format: {
      type: "json_object",
    },

    messages: [
      {
        role: "system",

        content: `

You are a customer feedback analyst.

Return ONLY JSON:

{

"summary":"",

"topics":[],

"keywords":[],

"intent":"",

"urgency":""

}

Rules:

topics:
max 5

keywords:
max 8

intent:
complaint
suggestion
praise
question

urgency:
low
medium
high

Keep concise.

`,
      },

      {
        role: "user",

        content: transcript,
      },
    ],
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = enrichFeedback;
