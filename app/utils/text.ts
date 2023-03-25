export function getInitials(name = "First Last") {
  return name
    .split(" ")
    .map((word, index) => {
      if (index < 2) return word.charAt(0).toUpperCase();
      else return "";
    })
    .join("");
}

export function truncateText(text: string, maxLength = 140) {
  return text.length > maxLength
    ? text.substring(0, maxLength - 3) + "..."
    : text;
}
