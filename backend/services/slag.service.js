const { nanoid } = require("nanoid");

function generateSlug(title) {
  const formatted = title
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]/g, "");

  return `${formatted}-${nanoid(6)}`;
}

module.exports = generateSlug;
