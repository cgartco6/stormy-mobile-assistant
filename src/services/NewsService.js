import axios from 'axios';
import { GNEWS_API_KEY } from '@env';

export async function getNews(countryCode = null, topic = null) {
  let url = `https://gnews.io/api/v4/top-headlines?token=${GNEWS_API_KEY}&lang=en&max=5`;
  if (countryCode) {
    url += `&country=${countryCode}`; // e.g., za for South Africa
  }
  if (topic) {
    url += `&topic=${topic}`; // e.g., general, technology, sports
  }
  const response = await axios.get(url);
  if (response.data.articles && response.data.articles.length > 0) {
    const headlines = response.data.articles.slice(0, 3).map(a => a.title).join('. ');
    return `Here's the latest: ${headlines}. ${getNewsFlirty()}`;
  } else {
    return "No news found. Maybe nothing interesting happened. *giggle*";
  }
}

function getNewsFlirty() {
  const lines = ["Stay informed, stay sexy.", "I read the news so you don't have to.", "You're welcome."];
  return lines[Math.floor(Math.random() * lines.length)];
}
