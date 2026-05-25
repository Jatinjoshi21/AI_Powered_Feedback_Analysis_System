function countArray(arr) {
  return arr.reduce(
    (acc, item) => {
      acc[item] = (acc[item] || 0) + 1;

      return acc;
    },

    {},
  );
}

function buildDashboard(feedback) {
  const total = feedback.length;

  const topicList = feedback.flatMap((f) => f.topics || []);

  const intentList = feedback.map((f) => f.intent);

  const urgent = feedback.filter((f) => f.urgency === "high").length;

  const avg = total
    ? feedback.reduce(
        (a, b) => a + b.sentimentScore,

        0,
      ) / total
    : 0;

  const topicCount = Object.entries(countArray(topicList))

    .map(([name, count]) => ({
      name,

      count,
    }))

    .sort((a, b) => b.count - a.count)

    .slice(0, 5);

  const intent = countArray(intentList);

  return {
    overview: {
      responses: total,

      averageSentiment: avg,

      customerMood: avg > 0.6 ? "Positive" : avg < 0.3 ? "Negative" : "Mixed",

      urgentCount: urgent,
    },

    topics: topicCount,

    intentBreakdown: intent,
  };
}

module.exports = buildDashboard;
