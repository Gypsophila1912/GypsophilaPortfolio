// microCMSの共通型
export interface MicroCMSImage {
  url: string;
  height: number;
  width: number;
}

export interface MicroCMSDate {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  revisedAt: string;
}

export interface MicroCMSListResponse<T> {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
}

// ===================
// Works（作品）
// ===================
export interface Work extends MicroCMSDate {
  id: string;
  title: string;
  type: boolean; // true: development, false: illustration
  date: string;
  team: boolean; // true: チーム, false: 個人
  category: string[];
  tag: string[];
  techstack: string[];
  mainImage: MicroCMSImage;
  screenshot?: MicroCMSImage[]; // 任意項目
  githuburl?: string; // 任意項目
  topazurl?: string; // 任意項目
  demourl?: string; // 任意項目
  htmlContent: string;
}

// ===================
// Articles（記事）
// ===================
export interface Article extends MicroCMSDate {
  id: string;
  title: string;
  date: string;
  tag: string[];
  mainImage: MicroCMSImage;
  screenshot?: MicroCMSImage[]; // 任意項目
  htmlContent: string;
}

// ===================
// Career（経歴）
// ===================
export interface Career extends MicroCMSDate {
  id: string;
  title: string;
  date: string;
  tag: string[];
  dscription: string; // ※microCMSの実際のフィールド名に合わせて "dscription"
}

// ===================
// Skills（スキル）
// ===================
export interface Skills extends MicroCMSDate {
  id: string;
  techstack: string[];
  tools: string[];
  skills: string[];
  hobbies: string[];
  text: string; // HTML形式のテキスト
}
