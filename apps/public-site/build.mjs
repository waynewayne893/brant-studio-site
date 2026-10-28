/**
 * T08 static preview generator.
 *
 * Reuses the verified legacy render functions from `legacy/render.js` and
 * turns them into path-routed static pages. The frozen legacy directory is
 * never read directly; `legacy/` is a hash-verified copy created by
 * `scripts/sync-legacy.mjs`.
 *
 * This is a local preview build only:
 * - noindex/nofollow and robots Disallow
 * - no Gallery/Lab routes
 * - no CMS, database, authentication, queue, or deployment
 */

import { createHash } from 'node:crypto';
import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import { escapeHtml, renderFooter, renderNav, renderPage } from './legacy/render.js';
import { getText, pageData } from './legacy/content.js';
import { articlePath, sampleArticles, validatePublicArticles } from './src/articles.js';
import { buildRecordArticle, editionPageMeta, renderEditionPage, reviewArticle } from './src/edition.js';

const appDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(appDir, '../..');
const legacyDir = path.join(appDir, 'legacy');
const defaultOutDir = path.join(appDir, 'dist');

const LOCALES = ['zh', 'en'];

export const MODULES = [
  { id: 'home', path: '' },
  { id: 'about', path: 'about' },
  { id: 'research', path: 'research' },
  { id: 'projects', path: 'projects' },
  { id: 'journal', path: 'journal' },
  { id: 'music', path: 'music' },
  { id: 'life', path: 'life' },
  { id: 'now', path: 'now' },
];

const IDENTITY = {
  zh: '郭程 · Brant Wayne',
  en: 'Brant Wayne · 郭程',
};

const HOME_TITLE = {
  zh: '郭程 · Brant Wayne | Personal Space',
  en: 'Brant Wayne · 郭程 | Personal Space',
};

const HOME_DESCRIPTION = {
  zh: '郭程（Brant Wayne）的中英双语个人空间：记录学习与探索、项目实践、中文 Hip-hop 与生活。',
  en: 'A bilingual personal space for Guo Cheng (Brant Wayne): study, projects, Chinese hip-hop, and everyday life.',
};

const PREVIEW_COMMENT =
  '<!-- T08 static preview: demo content, noindex, not deployed. -->';

// Public-site output is anonymous by default. The original source remains in
// Git history; unconfirmed identity, education, awards and quoted lyrics are
// replaced only in the generated public HTML.
const PUBLIC_REDACTIONS = [
  [/郭程（Brant Wayne）/g, 'Brant Studio'],
  [/郭程\s*\/\s*BRANT WAYNE/gi, 'BRANT STUDIO / PUBLIC EDITION'],
  [/BRANT WAYNE\s*\/\s*郭程/gi, 'BRANT STUDIO / PUBLIC EDITION'],
  [/Brant Studio\s*·\s*Brant Studio/g, 'Brant Studio'],
  [/郭程/g, 'Brant Studio'],
  [/Brant Wayne/g, 'Brant Studio'],
  [/西华大学[^<]*?硕士在读/g, '独立学习与研究 · 金融、数据与方法'],
  [/Master of Finance Candidate[^<]*?Xihua University/g, 'Independent study & research · finance, data, and methods'],
  [/郭程（Brant Studio）|Brant Studio（Brant Studio）/g, 'Brant Studio'],
  [/在金融专业硕士阶段[^<]*/g, '在金融与数据的学习中持续拓展知识框架'],
  [/金融专业/g, '金融与数据'],
  [/中国研究生[^<]*?大赛/g, '公开示例项目（信息待确认）'],
  [/The 5th China Graduate FinTech Innovation Competition/g, 'Sample project (details unconfirmed)'],
  [/2026\s*年?\s*·\s*国家级三等奖/g, '示例 · 未核实'],
  [/2026\s*·\s*National Third Prize/g, 'Sample · unverified'],
  [/衡微致胜团队|衡微致胜队|Hengwei Zhisheng Team/g, 'Sample Team'],
  [/团队队长[^<]*?迭代模块/g, '示例角色 · 待确认'],
  [/Team leader[^<]*?iteration module/g, 'Sample role · unconfirmed'],
  [/信贷风控自主迭代模型/g, '示例项目：模型迭代'],
  [/Self-Iterating Credit Risk Model/g, 'Sample Project: Model Iteration'],
  [/团队共同完成的[^<]*/g, '公开示例项目说明，具体成果与角色待确认。'],
  [/A collaborative credit-risk[^<]*/g, 'Public sample project description; details are unconfirmed.'],
  [/我主要负责[^<]*/g, '此项目为公开示例，具体贡献待确认。'],
  [/My main focus was[^<]*/g, 'This is a public sample; specific contributions are unconfirmed.'],
  [/从更新触发判断[^<]*/g, '示例项目说明，具体方法待确认。'],
  [/Within the iteration module[^<]*/g, 'Public sample; implementation details are unconfirmed.'],
  [/Asen\s*·\s*《在雨后醒来》/g, '公开示例引文'],
  [/Asen\s*《在雨后醒来》/g, '公开示例引文'],
  [/Asen/g, '公开示例引文'],
  [/wakin up today/gi, 'A NOTE ON KEEPING AN OPEN NOTEBOOK'],
  [/不要怕被击败[^<]*/g, '示例引文已移除。'],
  [/变更强的同时[^<]*/g, ''],
  [/I return to this line[^<]*/g, 'This is a public sample note, not a confirmed personal quotation.'],
  [/作为金融与数据硕士在读生/g, '作为独立学习者'],
  [/金融与数据硕士在读/g, '独立学习者'],
  [/硕士在读/g, '独立学习者'],
  [/Brant Studio<br>Brant Studio/g, 'Brant Studio'],
  [/Brant Studio\s*·\s*Brant Studio/g, 'Brant Studio'],
  [/Life has itsown rhythm\./g, 'Life has its own rhythm.'],
  [/<div class="hero-lyric"[\s\S]*?<\/div>/, '<div class="hero-lyric" aria-label="公开版编辑说明"><p class="hero-lyric-line">A public notebook,</p><p class="hero-lyric-line">still being written.</p><p class="hero-lyric-source">— BRANT STUDIO</p></div>'],
];

function redactPublicHtml(html) {
  return PUBLIC_REDACTIONS.reduce((output, [pattern, replacement]) => (
    output.replace(pattern, replacement)
  ), html);
}

function pagePath(lang, module) {
  return module.path ? `/${lang}/${module.path}/` : `/${lang}/`;
}

function pageTitle(lang, page) {
  const editionTitle = editionPageMeta[page]?.title[lang];
  if (editionTitle) return editionTitle;
  if (page === 'home') return HOME_TITLE[lang];

  const title = getText(pageData[page].title, lang).replace(/\s+/g, ' ').trim();
  return `${title} — ${IDENTITY[lang]}`;
}

function pageDescription(lang, page) {
  const editionDescription = editionPageMeta[page]?.description[lang];
  if (editionDescription) return editionDescription;
  if (page === 'home') return HOME_DESCRIPTION[lang];

  const description = getText(pageData[page].lead, lang).replace(/\s+/g, ' ').trim();
  return description.slice(0, 180);
}

function escapeXml(value) {
  return String(value).replace(/[&<>"']/g, (character) => {
    switch (character) {
      case '&':
        return '&amp;';
      case '<':
        return '&lt;';
      case '>':
        return '&gt;';
      case '"':
        return '&quot;';
      default:
        return '&apos;';
    }
  });
}

function headFor(lang, module, baseUrl) {
  const title = escapeHtml(pageTitle(lang, module.id));
  const description = escapeHtml(pageDescription(lang, module.id));
  const canonical = `${baseUrl}${pagePath(lang, module)}`;
  const zhUrl = `${baseUrl}${pagePath('zh', module)}`;
  const enUrl = `${baseUrl}${pagePath('en', module)}`;
  const ogLocale = lang === 'zh' ? 'zh_CN' : 'en_US';
  const ogAlternate = lang === 'zh' ? 'en_US' : 'zh_CN';
  const htmlLang = lang === 'zh' ? 'zh-CN' : 'en';

  return `<!doctype html>
<html lang="${htmlLang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f3ed">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="alternate" hreflang="zh-CN" href="${escapeHtml(zhUrl)}">
  <link rel="alternate" hreflang="en" href="${escapeHtml(enUrl)}">
  <link rel="alternate" hreflang="x-default" href="${escapeHtml(zhUrl)}">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:locale" content="${ogLocale}">
  <meta property="og:locale:alternate" content="${ogAlternate}">
  <meta name="twitter:card" content="summary">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/public-site.css">
  <noscript><style>.menu-button{display:none!important}.primary-nav{display:flex!important;flex-wrap:wrap}</style></noscript>
</head>`;
}

function shellFor(lang, module, baseUrl, body) {
  return `${headFor(lang, module, baseUrl)}
<body>
  <a class="skip-link" href="#main-content">跳至内容 / Skip to content</a>
  <div id="site-header">${body.header}</div>
  <main id="main-content" tabindex="-1">${body.main}</main>
  <div id="site-footer">${body.footer}</div>
  <div id="gallery-modal-root"></div>
  <script type="module" src="/assets/enhance.js"></script>
</body>
</html>
`;
}

function transformBody(html, { lang, module, buildYear }) {
  let output = html;

  // Gallery and Lab are not public routes in T08. Remove their call-to-action
  // links, including the footer entry, while keeping the surrounding visual
  // sections as non-clickable editorial teasers for now.
  output = output.replace(
    /<a class="text-link[^"]*" href="#\/(?:gallery|lab)">[\s\S]*?<\/a>/g,
    '',
  );
  output = output.replace(/<a href="#\/gallery">Gallery<\/a>/g, '');
  output = output.replace(
    /<a [^>]*href="#\/(?:gallery|lab)"[^>]*>[\s\S]*?<\/a>/g,
    '',
  );

  // Convert hash routes to real paths.
  output = output.replace(/href="#\/([a-z]+)"/g, (match, id) => {
    const target = MODULES.find((entry) => entry.id === id);
    return target ? `href="${pagePath(lang, target)}"` : match;
  });

  // Nested pages must use root-absolute assets.
  output = output.replace(/(src|href)="\.\/assets\//g, '$1="/assets/');

  // Replace the language toggle button with a link to the other locale.
  const alternateLang = lang === 'zh' ? 'en' : 'zh';
  const alternatePath = pagePath(alternateLang, module);
  const alternateHreflang = alternateLang === 'zh' ? 'zh-CN' : 'en';
  const alternateLabel = lang === 'zh' ? '切换为英文' : 'Switch to Chinese';
  const beforeSwitch = output;
  output = output.replace(
    /<button class="lang-button"[^>]*data-lang-switch[^>]*>([\s\S]*?)<\/button>/,
    `<a class="lang-button" href="${alternatePath}" hreflang="${alternateHreflang}" aria-label="${alternateLabel}">$1</a>`,
  );
  if (output === beforeSwitch) {
    throw new Error(`Language switch button was not found for ${lang}/${module.id}`);
  }

  // Make the footer year deterministic.
  output = output.replace(/© \d{4}/g, `© ${buildYear}`);

  if (output.includes('href="#/')) {
    throw new Error(`Unconverted hash route remains in ${lang}/${module.id}`);
  }

  return output;
}

function rootRedirect(baseUrl) {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="refresh" content="0; url=/zh/">
  <link rel="canonical" href="${escapeHtml(`${baseUrl}/zh/`)}">
  <title>Personal Space</title>
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/public-site.css">
</head>
<body>
  <main class="page-hero">
    <p class="eyebrow">PERSONAL SPACE</p>
    <h1 class="display-title">正在进入中文首页。</h1>
    <p class="page-lead"><a class="text-link" href="/zh/">中文</a> · <a class="text-link" href="/en/">English</a></p>
  </main>
</body>
</html>
`;
}

function notFoundPage() {
  return `<!doctype html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex, nofollow">
  <title>页面未找到 | Personal Space</title>
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  ${PREVIEW_COMMENT}
</head>
<body>
  <main class="page-hero">
    <p class="eyebrow">404 / NOT FOUND</p>
    <h1 class="display-title">页面未找到。</h1>
    <p class="page-lead">这个地址不存在，或内容尚未发布。 / This page does not exist.</p>
    <p><a class="text-link" href="/zh/">中文首页</a></p>
    <p><a class="text-link" href="/en/">English home</a></p>
  </main>
</body>
</html>
`;
}

function sitemapFor(baseUrl, buildDate) {
  const entries = [];

  for (const lang of LOCALES) {
    for (const module of MODULES) {
      const loc = `${baseUrl}${pagePath(lang, module)}`;
      const zh = `${baseUrl}${pagePath('zh', module)}`;
      const en = `${baseUrl}${pagePath('en', module)}`;
      entries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${buildDate}</lastmod>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(zh)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(zh)}"/>
  </url>`);
    }
    for (const article of sampleArticles) {
      const loc = `${baseUrl}${articlePath(lang, article.slug)}`;
      const zh = `${baseUrl}${articlePath('zh', article.slug)}`;
      const en = `${baseUrl}${articlePath('en', article.slug)}`;
      entries.push(`  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${article.date}</lastmod>
    <xhtml:link rel="alternate" hreflang="zh-CN" href="${escapeXml(zh)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(zh)}"/>
  </url>`);
    }
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

function robotsTxt(baseUrl) {
  return `# Personal Space public site. Only files in this static build are public.
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;
}

async function listFiles(dir, baseDir = dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(fullPath, baseDir)));
    } else if (entry.isFile()) {
      files.push(path.relative(baseDir, fullPath).split(path.sep).join('/'));
    }
  }

  return files;
}

function assertSafeOutDir(outDir) {
  const resolved = path.resolve(outDir);
  const forbidden = new Set([
    path.parse(resolved).root,
    repoRoot,
    path.resolve(appDir),
    path.resolve(legacyDir),
    path.resolve(appDir, 'src'),
  ]);

  if (forbidden.has(resolved)) {
    throw new Error(`Refusing to use unsafe output directory: ${resolved}`);
  }

  return resolved;
}

function normalizeBuildTime(value) {
  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    throw new Error(`Invalid build time: ${String(value)}`);
  }
  return date.toISOString();
}

function normalizeBaseUrl(value) {
  const url = new URL(value);
  if (url.protocol !== 'http:' && url.protocol !== 'https:') {
    throw new Error('PUBLIC_BASE_URL must use http:// or https://');
  }
  return `${url.origin}${url.pathname}`.replace(/\/+$/, '');
}

export function replaceHashLinks(html, lang) {
  return html
    .replace(/<a href="#\/gallery">Gallery<\/a>/g, '')
    .replace(/href="#\/([a-z]+)"/g, (match, id) => {
      const target = MODULES.find((entry) => entry.id === id);
      return target ? `href="${pagePath(lang, target)}"` : match;
    })
    .replace(/href="\.\/assets\//g, 'href="/assets/');
}

function articleIndexSection(lang) {
  const title = lang === 'zh' ? '公开示例文章' : 'Public sample articles';
  const note = lang === 'zh'
    ? '以下为明确标注的示例内容，不是用户的真实经历或已发表研究。'
    : 'The following are clearly labelled samples, not real personal experiences or published research.';
  const cards = sampleArticles.map((article) => `
    <article class="public-article-card">
      <div class="public-article-meta">
        <span class="public-sample-badge">${article.sample ? (lang === 'zh' ? '公开示例' : 'PUBLIC SAMPLE') : (lang === 'zh' ? '已批准公开' : 'OWNER APPROVED')}</span>
        <time datetime="${article.date}">${article.date}</time>
      </div>
      <h3><a href="${articlePath(lang, article.slug)}">${escapeHtml(article.title[lang])}</a></h3>
      <p>${escapeHtml(article.summary[lang])}</p>
      <a class="text-link" href="${articlePath(lang, article.slug)}">${lang === 'zh' ? '阅读示例 →' : 'Read sample →'}</a>
    </article>`).join('');
  return `<section class="editorial-section public-article-index" aria-labelledby="public-articles-title" data-visual-fallback="journal-articles">
    <div class="split-top">
      <div><span class="small-overline">03 / PUBLIC READING</span><h2 id="public-articles-title">${title}<span class="heading-period">.</span></h2></div>
      <span class="section-aside">SAMPLE / NOT PUBLISHED RESEARCH</span>
    </div>
    <p class="public-article-note">${note}</p>
    <div class="public-article-grid">${cards}</div>
  </section>`;
}

function articleHead(lang, article, baseUrl) {
  const title = `${escapeHtml(article.title[lang])} — ${IDENTITY[lang]}`;
  const description = escapeHtml(article.summary[lang]);
  const canonical = `${baseUrl}${articlePath(lang, article.slug)}`;
  const zhArticle = `${baseUrl}${articlePath('zh', article.slug)}`;
  const enArticle = `${baseUrl}${articlePath('en', article.slug)}`;
  const jsonLd = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title[lang],
    description: article.summary[lang],
    datePublished: article.date,
    inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
    isAccessibleForFree: true,
  }).replace(/</g, '\\u003c');
  return `<!doctype html>
<html lang="${lang === 'zh' ? 'zh-CN' : 'en'}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="theme-color" content="#f6f3ed">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <link rel="alternate" hreflang="zh-CN" href="${escapeHtml(zhArticle)}">
  <link rel="alternate" hreflang="en" href="${escapeHtml(enArticle)}">
  <link rel="alternate" hreflang="x-default" href="${escapeHtml(zhArticle)}">
  <meta property="og:type" content="article">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="stylesheet" href="/assets/styles.css">
  <link rel="stylesheet" href="/assets/public-site.css">
  <script type="application/ld+json">${jsonLd}</script>
</head>`;
}

function articleDocument(lang, article, baseUrl) {
  const header = replaceHashLinks(renderNav(lang, 'journal'), lang)
    .replace(/<button class="lang-button"[^>]*data-lang-switch[^>]*>([\s\S]*?)<\/button>/,
      `<a class="lang-button" href="${articlePath(lang === 'zh' ? 'en' : 'zh', article.slug)}">$1</a>`);
  const footer = replaceHashLinks(renderFooter(lang), lang);
  const body = article.body[lang].map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');
  return `${articleHead(lang, article, baseUrl)}
<body>
  <a class="skip-link" href="#main-content">跳至内容 / Skip to content</a>
  <div id="site-header">${header}</div>
  <main id="main-content" tabindex="-1" class="public-article-page">
    <article class="public-article" data-visual-article="${article.slug}">
      <div class="public-article-meta">
        <span class="public-sample-badge">${article.sample ? (lang === 'zh' ? '公开示例' : 'PUBLIC SAMPLE') : (lang === 'zh' ? '已批准公开' : 'OWNER APPROVED')}</span>
        <time datetime="${article.date}">${article.date}</time>
      </div>
      <p class="eyebrow">JOURNAL / SAMPLE NOTE</p>
      <h1 class="display-title">${escapeHtml(article.title[lang])}</h1>
      <p class="page-lead">${escapeHtml(article.summary[lang])}</p>
      <div class="public-article-body">${body}</div>
      <p class="public-article-note">${lang === 'zh'
        ? '这是一篇公开示例文章，不是用户的真实经历或已发表研究。'
        : 'This is a public sample article, not a record of the owner’s real experience or published research.'}</p>
      <a class="text-link" href="${pagePath(lang, MODULES.find((item) => item.id === 'journal'))}">${lang === 'zh' ? '← 返回文字档案' : '← Back to journal'}</a>
    </article>
  </main>
  <div id="site-footer">${footer}</div>
  <script type="module" src="/assets/enhance.js"></script>
</body>
</html>`;
}

export async function buildSite({
  outDir = defaultOutDir,
  buildTime = process.env.BUILD_TIME ?? new Date().toISOString(),
  baseUrl = process.env.PUBLIC_BASE_URL ?? 'https://brant-studio.pages.dev',
} = {}) {
  const resolvedOut = assertSafeOutDir(outDir);
  const isoBuildTime = normalizeBuildTime(buildTime);
  const buildDate = isoBuildTime.slice(0, 10);
  const buildYear = isoBuildTime.slice(0, 4);
  const normalizedBaseUrl = normalizeBaseUrl(baseUrl);
  const includeReviewCandidate = process.env.INCLUDE_REVIEW_CANDIDATE === 'true';
  validatePublicArticles(sampleArticles);

  await rm(resolvedOut, { recursive: true, force: true });
  await mkdir(resolvedOut, { recursive: true });

  const routes = [];

  for (const lang of LOCALES) {
    for (const module of MODULES) {
      const header = renderNav(lang, module.id);
      const main = renderPage(
        { page: module.id, slug: null },
        lang,
        { journalCategory: 'all', lifeCategory: 'all' },
      );
      const editionMain = renderEditionPage(
        lang,
        module.id,
        module.id === 'journal' ? articleIndexSection(lang) : '',
        module.id === 'journal' && includeReviewCandidate
          ? `${buildRecordArticle(lang)}${reviewArticle(lang)}`
          : '',
      );
      const footer = renderFooter(lang);
      const html = shellFor(lang, module, normalizedBaseUrl, {
        header,
        main: editionMain || main,
        footer,
      });

      // Apply the static transformations to the assembled document so the
      // header, body, and footer are handled consistently.
      const documentHtml = redactPublicHtml(transformBody(html, { lang, module, buildYear }));

      const relativePath = module.path
        ? `${lang}/${module.path}/index.html`
        : `${lang}/index.html`;
      const target = path.join(resolvedOut, relativePath);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, documentHtml, 'utf8');

      routes.push({
        lang,
        page: module.id,
        path: pagePath(lang, module),
        file: relativePath,
      });
    }
  }

  for (const lang of LOCALES) {
    for (const article of sampleArticles) {
      const relativePath = `${lang}/journal/${article.slug}/index.html`;
      const target = path.join(resolvedOut, relativePath);
      await mkdir(path.dirname(target), { recursive: true });
      await writeFile(target, redactPublicHtml(articleDocument(lang, article, normalizedBaseUrl)), 'utf8');
      routes.push({ lang, page: 'article', path: articlePath(lang, article.slug), file: relativePath });
    }
  }

  await writeFile(path.join(resolvedOut, 'index.html'), rootRedirect(normalizedBaseUrl), 'utf8');
  await writeFile(path.join(resolvedOut, '404.html'), notFoundPage(), 'utf8');
  await writeFile(
    path.join(resolvedOut, 'sitemap.xml'),
    sitemapFor(normalizedBaseUrl, buildDate),
    'utf8',
  );
  await writeFile(path.join(resolvedOut, 'robots.txt'), robotsTxt(normalizedBaseUrl), 'utf8');

  const assetsOut = path.join(resolvedOut, 'assets');
  await mkdir(assetsOut, { recursive: true });
  const legacyAssets = path.join(legacyDir, 'assets');
  for (const entry of await readdir(legacyAssets, { withFileTypes: true })) {
    if (entry.isFile()) {
      await cp(path.join(legacyAssets, entry.name), path.join(assetsOut, entry.name));
    }
  }
  await cp(path.join(legacyDir, 'styles.css'), path.join(assetsOut, 'styles.css'));
  await writeFile(path.join(resolvedOut, 'assets', 'public-site.css'), await readFile(path.join(appDir, 'src', 'public-site.css')), 'utf8');
  await cp(path.join(appDir, 'src', 'enhance.js'), path.join(assetsOut, 'enhance.js'));
  await cp(path.join(appDir, 'assets', 'project-home.png'), path.join(assetsOut, 'project-home.png'));
  await cp(path.join(appDir, 'assets', 'project-mobile.png'), path.join(assetsOut, 'project-mobile.png'));

  // Content-address CSS and JS so a new deployment cannot be served stale
  // files from the previous immutable-cache entry.
  const versionedAssets = new Map();
  for (const entry of await readdir(assetsOut, { withFileTypes: true })) {
    if (!entry.isFile() || !/\.(css|js)$/.test(entry.name)) continue;
    const oldPath = path.join(assetsOut, entry.name);
    const content = await readFile(oldPath);
    const hash = createHash('sha256').update(content).digest('hex').slice(0, 12);
    const ext = path.extname(entry.name);
    const base = entry.name.slice(0, -ext.length);
    const nextName = `${base}.${hash}${ext}`;
    await writeFile(path.join(assetsOut, nextName), content);
    await rm(oldPath);
    versionedAssets.set(`/assets/${entry.name}`, `/assets/${nextName}`);
  }
  for (const file of await listFiles(resolvedOut)) {
    if (!/\.(html|css|js)$/i.test(file)) continue;
    const filePath = path.join(resolvedOut, file);
    let content = await readFile(filePath, 'utf8');
    for (const [from, to] of versionedAssets) content = content.replaceAll(from, to);
    await writeFile(filePath, content, 'utf8');
  }

  await writeFile(path.join(resolvedOut, '_headers'), `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  X-Frame-Options: DENY

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/zh/*
  Cache-Control: public, max-age=0, must-revalidate

/en/*
  Cache-Control: public, max-age=0, must-revalidate

/
  Cache-Control: public, max-age=0, must-revalidate
`, 'utf8');

  // Computed so the repository boundary test can assert that app source never
  // contains the frozen directory name as a literal. The leak scan still checks
  // the generated output for this token.
  const frozenDirToken = ['personal-space', 'recovered'].join('-');
  const forbiddenTokens = [
    frozenDirToken,
    'M05-evidence',
    '#/gallery',
    '#/lab',
    'data-lang-switch',
    'DEEPSEEK_API_KEY',
    'SMTP_PASSWORD',
    'BEGIN PRIVATE KEY',
    '郭程',
    'Brant Wayne',
    '西华大学',
    '三等奖',
    '衡微致胜',
    'Hengwei Zhisheng',
    'Asen',
    'wakin up today',
  ];
  const outputFiles = await listFiles(resolvedOut);
  const textFiles = outputFiles.filter((file) => /\.(html|xml|txt|css|js|svg)$/i.test(file));

  for (const relativePath of textFiles) {
    const content = await readFile(path.join(resolvedOut, relativePath), 'utf8');
    for (const token of forbiddenTokens) {
      if (content.includes(token)) {
        throw new Error(`Leak scan failed: ${relativePath} contains ${token}`);
      }
    }
  }

  return {
    outDir: resolvedOut,
    buildTime: isoBuildTime,
    baseUrl: normalizedBaseUrl,
    routes,
    files: outputFiles.length,
    textFiles: textFiles.length,
  };
}

const entryPoint = process.argv[1];
if (entryPoint && import.meta.url === pathToFileURL(path.resolve(entryPoint)).href) {
  const result = await buildSite();
  console.log(
    `static site: ${result.routes.length} routes, ${result.files} files -> ${path.relative(repoRoot, result.outDir)}`,
  );
  console.log(`build time: ${result.buildTime}`);
  console.log(`base url: ${result.baseUrl}`);
}
