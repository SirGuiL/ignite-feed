export const linkifyHashtags = (text) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hashtagRegex = /(^|\s)(#[a-zA-Z\d]+)/g;

  const linkedText = text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  }).replace(hashtagRegex, (match, space, hashtag) => {
    const tag = hashtag.trim();
    return `${space}<a href="#${encodeURIComponent(tag)}">${tag}</a>`;
  });

  return linkedText;
}
