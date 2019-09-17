import fetch from 'isomorphic-unfetch';

export type GiantBombPlatform = {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
  abbreviation: string;
};

export type GiantBombSearchResult = {
  id: number;
  image: {
    icon_url: string;
    medium_url: string;
    screen_url: string;
    screen_large_url: string; // but use this one
    small_url: string;
    super_url: string;
    thumb_url: string;
    tiny_url: string;
    original_url: string; // but use this one
    image_tags: string;
  };
  expected_release_day: number;
  expected_release_month: number;
  expected_release_year: number;
  original_release_date: string | null;
  name: string;
  platforms: GiantBombPlatform[] | null;
  resource_type: 'game';
};

type GiantBombSearch = {
  error:
    | 'OK'
    | 'Invalid API Key'
    | 'Object Not Found'
    | 'Error in URL Format'
    | "jsonp' format requires a 'json_callback' argument"
    | 'Filter Error'
    | 'Subscriber only video is for subscribers only';
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: 1 | 100 | 101 | 102 | 103 | 104 | 105;
  results: GiantBombSearchResult[];
  version: '1.0';
};

export async function searchGame(query: string) {
  const secrets = await import('../secrets.json');
  const url = `https://www.giantbomb.com/api/search/?api_key=${secrets.giantbomb.apiKey}&format=json&limit=500&resources=game&field_list=id,image,name,platforms,original_release_date,expected_release_day,expected_release_month,expected_release_year&query=${query}`;
  const response = await fetch(url);
  const payload = (await response.json()) as GiantBombSearch;
  return payload.results;
}
