const DEFAULT_API_URL = 'https://api.chatujme.cz';
const DEFAULT_TIMEOUT = 10_000;

export type BadWebsiteCategory =
  | 'junk news'
  | 'disinformation'
  | 'conspiracy'
  | 'pro-kremlin'
  | 'anti system'
  | 'health'
  | 'anti-islamic'
  | 'deep state'
  | 'nwo'
  | 'ezotheric'
  | 'aggregator'
  | 'hoax'
  | 'violence'
  | 'biased'
  | 'homophobic'
  | 'historic conspiracy'
  | 'anti-catholic'
  | 'food';

export interface BadWebsite {
  id: number;
  domain: string;
  source: string[];
  category: BadWebsiteCategory[];
  source_link: string[];
}

export interface BadWebsitesClientOptions {
  baseUrl?: string;
  timeout?: number;
}

export class BadWebsitesClient {
  private readonly baseUrl: string;
  private readonly timeout: number;

  constructor(options: BadWebsitesClientOptions = {}) {
    this.baseUrl = (options.baseUrl ?? DEFAULT_API_URL).replace(/\/+$/, '');
    this.timeout = options.timeout ?? DEFAULT_TIMEOUT;
  }

  async getAll(): Promise<BadWebsite[]> {
    return this.fetch<BadWebsite[]>('/bad-websites/list');
  }

  async check(urls: string[]): Promise<BadWebsite[]> {
    return this.fetch<BadWebsite[]>('/bad-websites/list', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ domains: urls }),
    });
  }

  async checkOne(url: string): Promise<BadWebsite | null> {
    const results = await this.check([url]);
    return results[0] ?? null;
  }

  async getByCategory(category: BadWebsiteCategory): Promise<BadWebsite[]> {
    const all = await this.getAll();
    return all.filter((site) => site.category.includes(category));
  }

  async getDomainSet(): Promise<Set<string>> {
    const all = await this.getAll();
    return new Set(all.map((site) => site.domain));
  }

  static extractDomain(url: string): string {
    try {
      return new URL(url).hostname.replace(/^www\./, '');
    } catch {
      return url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0];
    }
  }

  private async fetch<T>(path: string, init?: RequestInit): Promise<T> {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), this.timeout);

    try {
      const response = await globalThis.fetch(`${this.baseUrl}${path}`, {
        ...init,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      return response.json() as Promise<T>;
    } finally {
      clearTimeout(timer);
    }
  }
}
