const { InferenceClient } = require("@huggingface/inference");

const client = new InferenceClient(process.env.HF_TOKEN);

async function analyzeSentiment(text) {
  const result = await client.textClassification({
    model: "distilbert-base-uncased-finetuned-sst-2-english",

    inputs: text,
  });

  const score = result[0].score;

  return {
    sentimentLabel: result[0].label.toLowerCase(),

    sentimentScore: score,
  };
}

module.exports = analyzeSentiment;
