export interface BuildSiteOptions {
  outDir?: string;
  buildTime?: string;
  baseUrl?: string;
}

export interface BuiltRoute {
  lang: 'zh' | 'en';
  page: string;
  path: string;
  file: string;
}

export interface BuildSiteResult {
  outDir: string;
  buildTime: string;
  baseUrl: string;
  routes: BuiltRoute[];
  files: number;
  textFiles: number;
}

export function buildSite(options?: BuildSiteOptions): Promise<BuildSiteResult>;

export const MODULES: ReadonlyArray<{ id: string; path: string }>;
