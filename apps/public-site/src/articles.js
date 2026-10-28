// Clearly-labelled public sample content. These are not presented as real
// personal experiences or published research.
export const sampleArticles = [
  {
    slug: 'learning-in-the-margins',
    category: 'essays',
    date: '2026-10-12',
    sample: true,
    visibility: 'public',
    approvedAt: '2026-10-25T15:30:00.000Z',
    approvedBy: 'owner-p0-public-approval',
    title: {
      zh: '在学习的缝隙里，保留一点观察',
      en: 'Keeping a little observation between study sessions',
    },
    summary: {
      zh: '一篇关于学习节奏、问题意识与日常记录的公开示例文章。',
      en: 'A public sample essay about learning rhythm, questions, and everyday notes.',
    },
    body: {
      zh: [
        '这是一篇公开示例文章，不是用户的真实经历记录。它用于展示 Personal Space 的文章阅读、排版与响应式体验。',
        '学习往往不是一条直线。把一个模糊的问题写下来，标明已知与未知，再决定下一步读什么、问什么，这个过程本身就值得记录。',
        '我希望这个空间能保留一些这样的片段：不必立即得出结论，但可以诚实地留下观察、方法和尚未解决的问题。',
      ],
      en: [
        'This is a public sample article, not a record of the owner’s real experience. It exists to demonstrate article reading, typography, and responsive layout in Personal Space.',
        'Learning is rarely a straight line. Writing down a vague question, marking what is known and unknown, and choosing the next reading or conversation is itself worth recording.',
        'I hope this space can keep a few fragments like this: not always conclusions, but honest observations, methods, and questions that are still open.',
      ],
    },
  },
  {
    slug: 'a-note-on-evidence',
    category: 'learning',
    date: '2026-10-18',
    sample: true,
    visibility: 'public',
    approvedAt: '2026-10-25T15:30:00.000Z',
    approvedBy: 'owner-p0-public-approval',
    title: {
      zh: '从一条笔记开始：问题、证据与方法',
      en: 'Starting from a note: questions, evidence, and methods',
    },
    summary: {
      zh: '一篇关于研究笔记与证据整理的公开示例文章。',
      en: 'A public sample note on research notes and organizing evidence.',
    },
    body: {
      zh: [
        '这是一篇公开示例文章，用于展示研究笔记类内容的阅读版式。',
        '面对一个研究问题，先区分事实、解释和假设，再记录证据来自哪里、能支持到什么程度，通常比过早追求一个漂亮结论更有帮助。',
        '方法不是装饰。它决定了我们能看到什么、忽略什么，也决定了结论是否经得起复核。',
      ],
      en: [
        'This is a public sample article used to demonstrate the reading layout for research notes.',
        'When facing a research question, separating facts, interpretations, and hypotheses—and recording where evidence comes from and how far it supports a claim—is often more useful than rushing toward a tidy conclusion.',
        'Method is not decoration. It shapes what we can see, what we ignore, and whether a conclusion can survive review.',
      ],
    },
  },
];

export function articlePath(lang, slug) {
  return `/${lang}/journal/${slug}/`;
}

// The public build must never infer approval from a draft status or a filename.
// Every exported article carries explicit public visibility and approval
// metadata; otherwise the build fails closed instead of publishing it.
export function validatePublicArticles(articles = sampleArticles) {
  if (!Array.isArray(articles) || articles.length === 0) {
    throw new Error('Public article export requires at least one explicitly approved article');
  }
  const slugs = new Set();
  for (const article of articles) {
    if (article.visibility !== 'public') {
      throw new Error(`Article ${article.slug ?? '<unknown>'} is not explicitly public`);
    }
    if (!article.approvedAt || !article.approvedBy) {
      throw new Error(`Article ${article.slug ?? '<unknown>'} lacks public approval metadata`);
    }
    if (!article.slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) {
      throw new Error(`Article ${article.slug ?? '<unknown>'} has an invalid public slug`);
    }
    if (slugs.has(article.slug)) {
      throw new Error(`Duplicate public article slug: ${article.slug}`);
    }
    slugs.add(article.slug);
  }
  return articles;
}
