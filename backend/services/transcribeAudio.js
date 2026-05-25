const fs = require("fs");

const os = require("os");

const path = require("path");

const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function transcribeAudio(file) {
  const temp = path.join(
    os.tmpdir(),

    `${Date.now()}.webm`,
  );

  fs.writeFileSync(temp, file);

  try {
    const response = await client.audio.transcriptions.create({
      file: fs.createReadStream(temp),

      model: "whisper-1",
    });

    return response.text;
  } finally {
    fs.unlinkSync(temp);
  }
}

module.exports = transcribeAudio;
