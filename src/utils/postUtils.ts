export const linkifyHashtags = (text: string) => {
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const hashtagRegex = /(^|\s)(#[a-zA-Z\d]+)/g;

  const linkedText = text.replace(urlRegex, (url: string) => {
    return `<a href="${url}" target="_blank">${url}</a>`;
  }).replace(hashtagRegex, (match: any, space: string, hashtag: string) => {
    const tag = hashtag.trim();
    return `${space}<a href="#${encodeURIComponent(tag)}">${tag}</a>`;
  });

  return linkedText;
}
