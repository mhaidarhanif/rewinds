export function getNameInitials(name = "First Last") {
  return name
    .split(" ")
    .map((word, index) => {
      if (index < 2) return word.charAt(0).toUpperCase();
      else return "";
    })
    .join("");
}

export function truncateText(text: string, maxLength = 140) {
  if (!text || typeof text !== "string") return text;
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
}

export function capitalizeText(text: string) {
  if (!text || typeof text !== "string") return text;
  return text.charAt(0).toUpperCase() + text.slice(1);
}

/**
 * PROMPT: create typescript function to parse string
 * that if found word with the pattern of @text then it will
 * transform @text into an anchor element like <a href="/text">@text</a>
 */
export function parseTextForMention(input: string) {
  const regex = /@(\w+)/g;
  const output = input.replace(regex, '<a href="/$1">@$1</a>');
  return output;

  // const input = "Hello @world! How are you doing today?";
  // const output = parseTextForMention(input);
  // Hello <a href="/world">@world</a>! How are you doing today?
}
