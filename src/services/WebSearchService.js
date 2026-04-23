import axios from 'axios';
import { GOOGLE_SEARCH_API_KEY, GOOGLE_SEARCH_ENGINE_ID } from '@env';

export async function webSearch(query) {
  if (!GOOGLE_SEARCH_API_KEY || !GOOGLE_SEARCH_ENGINE_ID) {
    throw new Error('Search API keys missing');
  }
  const url = `https://www.googleapis.com/customsearch/v1?key=${GOOGLE_SEARCH_API_KEY}&cx=${GOOGLE_SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`;
  const response = await axios.get(url);
  if (response.data.items && response.data.items.length > 0) {
    const firstResult = response.data.items[0];
    return `I found this: ${firstResult.title}. ${firstResult.snippet}. Here's the link: ${firstResult.link}`;
  } else {
    return `No results for "${query}". Try something else, smarty.`;
  }
}
