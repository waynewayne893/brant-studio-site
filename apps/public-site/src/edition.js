// P1.5 owner-approved low-disclosure edition. The copy describes the site's
// purpose and methods without inventing degrees, awards, publications,
// projects, or private life events. Unconfirmed facts stay marked below.

export const editionPageMeta = {
  home: {
    title: { zh: 'Brant Studio | 一个关于学习、方法与表达的公开笔记', en: 'Brant Studio | A public notebook on learning, method, and expression' },
    description: {
      zh: 'Brant Studio 的公开笔记：记录学习方法、研究问题、项目结构、阅读与日常观察。',
      en: 'The public notebook of Brant Studio: notes on learning, research questions, project structure, reading, and everyday observation.',
    },
  },
  about: {
    title: { zh: '关于这本公开笔记 — Brant Studio', en: 'About the public notebook — Brant Studio' },
    description: {
      zh: '为什么建立这个网站、它记录什么、不记录什么，以及公开与私人内容的边界。',
      en: 'Why this site exists, what it records, what it leaves out, and where the public/private boundary sits.',
    },
  },
  research: {
    title: { zh: '研究笔记与方法 — Brant Studio', en: 'Research notes and methods — Brant Studio' },
    description: {
      zh: '关于问题、证据、复现与表达的研究方法笔记；具体研究主题保持私密，未核实成果不对外声称。',
      en: 'Notes on questions, evidence, reproducibility, and expression. Specific research topics remain private; unverified results are not claimed.',
    },
  },
  projects: {
    title: { zh: '项目笔记与展示结构 — Brant Studio', en: 'Project notes and structure — Brant Studio' },
    description: {
      zh: '项目笔记应如何呈现问题、方法、结果与限制；未核实的项目与奖项不会作为真实成果展示。',
      en: 'How a project note should present problem, method, result, and limits. Unverified projects and awards are not presented as achievements.',
    },
  },
  journal: {
    title: { zh: '随笔与阅读笔记 — Brant Studio', en: 'Journal and reading notes — Brant Studio' },
    description: {
      zh: '关于学习、证据、观察与表达的公开示例文章，以及后续文字档案的方向。',
      en: 'Public sample essays on learning, evidence, observation, and expression, plus the direction of the written archive.',
    },
  },
  music: {
    title: { zh: '聆听笔记 — Brant Studio', en: 'Listening notes — Brant Studio' },
    description: {
      zh: '把聆听当作一种注意力的练习：关于声音、记忆与表达的编辑笔记。',
      en: 'Listening as a practice of attention: editorial notes on sound, memory, and expression.',
    },
  },
  life: {
    title: { zh: '生活观察 — Brant Studio', en: 'Notes on noticing — Brant Studio' },
    description: {
      zh: '关于日常观察、节奏与保留细节的编辑笔记；不虚构私人事件。',
      en: 'Editorial notes on everyday observation, rhythm, and keeping detail—without inventing private events.',
    },
  },
  now: {
    title: { zh: '现在 — Brant Studio', en: 'Now — Brant Studio' },
    description: {
      zh: '这一页记录当前关注的方向；具体书目、项目和数据将在确认后再补充。',
      en: 'A page for current directions. Specific books, projects, and data will be added only after confirmation.',
    },
  },
};

const copy = (lang, zh, en) => (lang === 'zh' ? zh : en);
const esc = (value) => String(value).replace(/[&<>"']/g, (character) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));

function pageHero(lang, kicker, title, lead, fallbackKey = '') {
  return `<section class="page-hero edition-hero"${fallbackKey ? ` data-visual-fallback="${fallbackKey}"` : ''}>
    <div class="page-hero-top"><p class="eyebrow">${esc(kicker)}</p><span class="section-aside">${copy(lang, '公开版', 'PUBLIC EDITION')}</span></div>
    <h1 class="display-title">${esc(title).replace(/\n/g, '<br>')}</h1>
    <p class="page-lead">${esc(lead)}</p>
  </section>`;
}

function sectionHeading(lang, number, title, aside = '') {
  return `<div class="split-top"><div><span class="small-overline">${esc(number)}</span><h2>${esc(title)}<span class="heading-period">.</span></h2></div>${aside ? `<span class="section-aside">${esc(aside)}</span>` : ''}</div>`;
}

function card(title, text, index, lang) {
  return `<article class="edition-card"><span class="edition-card-number">${esc(index)}</span><h3>${esc(title)}</h3><p>${esc(text)}</p><span class="edition-card-link">${copy(lang, '阅读 / READ', 'READ / 阅读')}</span></article>`;
}

function projectFeature(lang) {
  return `<section class="editorial-section edition-section project-feature" data-visual-fallback="home-featured-project">
    <div class="project-feature-media"><img src="/assets/project-home.png" alt="${copy(lang, 'Brant Studio 展示站实际截图', 'Actual screenshot of the Brant Studio public site')}"><span>ACTUAL BUILD SCREENSHOT</span></div>
    <div class="project-feature-copy">
      <span class="small-overline">PROJECT NOTE / 01 · LIVE</span>
      <h2>Personal Space <em>/</em> Brant Studio<span class="heading-period">.</span></h2>
      <p>${copy(lang, '一个从既有编辑设计系统出发、经过匿名化与隐私复核后，以纯静态方式发布的双语网站。', 'A bilingual public site built from an existing editorial design system, reviewed for anonymity and privacy, and shipped as a static-only website.')}</p>
      <dl class="project-facts">
        <div><dt>${copy(lang, '状态', 'Status')}</dt><dd>${copy(lang, '已上线', 'Live')}</dd></div>
        <div><dt>${copy(lang, '形态', 'Form')}</dt><dd>${copy(lang, '静态站点', 'Static site')}</dd></div>
        <div><dt>${copy(lang, '范围', 'Scope')}</dt><dd>${copy(lang, '中英双语 · 20 路由', 'ZH / EN · 20 routes')}</dd></div>
      </dl>
      <a class="text-link" href="/${lang}/projects/#project-personal-space"><span>${copy(lang, '阅读项目记录', 'Read the project note')}</span><span aria-hidden="true">↗</span></a>
    </div>
  </section>`;
}

function projectCase(lang) {
  return `<section class="editorial-section edition-section project-case" id="project-personal-space" data-visual-fallback="projects-cards">
    ${sectionHeading(lang, '02 / SELECTED PROJECT', copy(lang, '项目记录：Personal Space', 'Project note: Personal Space'), 'BRANT STUDIO / PUBLIC SITE')}
    <div class="project-case-grid">
      <div class="project-case-media">
        <figure><img src="/assets/project-home.png" alt="${copy(lang, 'Personal Space 首页实际构建截图', 'Actual build screenshot of the Personal Space home page')}"><figcaption>${copy(lang, '实际构建截图 · 桌面首页', 'Actual build screenshot · desktop home')}</figcaption></figure>
        <figure class="project-case-mobile"><img src="/assets/project-mobile.png" alt="${copy(lang, 'Personal Space 移动端实际构建截图', 'Actual mobile build screenshot of Personal Space')}"><figcaption>${copy(lang, '实际构建截图 · 移动端', 'Actual build screenshot · mobile')}</figcaption></figure>
      </div>
      <div class="project-case-body">
        <p class="project-case-kicker">${copy(lang, '项目 01 / 网站建设', 'Project 01 / Website build')}</p>
        <h3>${copy(lang, '把一套编辑视觉，变成可独立部署的公开网站。', 'Turning an editorial visual system into an independently deployable public site.')}</h3>
        <p>${copy(lang, '这个项目不是客户交付，也不是比赛作品。它记录 Personal Space 从既有静态页面、内容审核和匿名化，到 Cloudflare Pages 上线与公网验收的实际建设过程。', 'This is not a client delivery or a competition entry. It records the actual process of taking Personal Space from existing static pages and content review through anonymity checks to a Cloudflare Pages launch and public verification.')}</p>

        <dl class="project-facts project-facts-wide">
          <div><dt>${copy(lang, '项目类型', 'Type')}</dt><dd>${copy(lang, '个人网站 / 静态发布', 'Personal site / static publishing')}</dd></div>
          <div><dt>${copy(lang, '周期', 'Period')}</dt><dd>2026-10-25 — 2026-10-26</dd></div>
          <div><dt>${copy(lang, '公开状态', 'Public status')}</dt><dd>${copy(lang, 'Live · Pages Free', 'Live · Pages Free')}</dd></div>
          <div><dt>${copy(lang, '技术边界', 'Technical boundary')}</dt><dd>${copy(lang, '静态构建；无公网 CMS / 后台 / DB', 'Static build; no public CMS / admin / DB')}</dd></div>
          <div><dt>${copy(lang, '项目角色', 'Role')}</dt><dd>${copy(lang, '待本人确认，暂不署名', 'Pending owner confirmation; no attribution yet')}</dd></div>
          <div><dt>${copy(lang, '公开范围', 'Public scope')}</dt><dd>${copy(lang, '8 个内容模块 / 20 路由', '8 content modules / 20 routes')}</dd></div>
        </dl>

        <h4>${copy(lang, '问题与约束', 'Problem & constraints')}</h4>
        <p>${copy(lang, '已有视觉体系质量较高，但内容存在泛化、历史隐私信息和未确认履历。目标不是重做设计，而是在保留米白、酒红、衬线编辑语言的前提下，建立一套可公开、可复核、可回滚的静态站点。', 'The existing visual system was strong, but the content contained generic copy, historical private details, and unconfirmed CV claims. The goal was not a redesign: it was to keep the ivory, wine, and serif editorial language while creating a public, reviewable, rollback-friendly static site.')}</p>

        <h4>${copy(lang, '实际完成', 'What was built')}</h4>
        <ul class="project-list">
          <li>${copy(lang, '中英文八个内容模块与两篇公开示例文章', 'Eight bilingual content modules and two public sample essays')}</li>
          <li>${copy(lang, '匿名化公开构建、canonical / hreflang / sitemap / robots / 404', 'An anonymized public build with canonical, hreflang, sitemap, robots, and 404')}</li>
          <li>${copy(lang, 'Cloudflare Pages Direct Upload 与公网验收记录', 'Cloudflare Pages Direct Upload and a public verification record')}</li>
          <li>${copy(lang, '可重复构建、隐私扫描与本地打包流程', 'A repeatable build, privacy scan, and local packaging process')}</li>
        </ul>

        <h4>${copy(lang, '验证与限制', 'Verification & limits')}</h4>
        <p>${copy(lang, '已验证 20 个公开路由、HTTPS、sitemap、robots、404、桌面与移动端布局及公开内容扫描。这里不宣称性能跑分、用户增长或商业成果；项目仍缺少真实文章、真实项目、照片和持续更新流水线。', 'Verified 20 public routes, HTTPS, sitemap, robots, 404, desktop/mobile layout, and a public-content scan. No performance score, user growth, or commercial outcome is claimed. The project still lacks real articles, real project material, photography, and a continuous publishing pipeline.')}</p>
        <a class="text-link" href="https://brant-studio.pages.dev" rel="noreferrer">${copy(lang, '访问线上站点', 'Visit the live site')} <span aria-hidden="true">↗</span></a>
      </div>
    </div>
  </section>`;
}

function musicShelf(lang) {
  return `<section class="editorial-section edition-section music-shelf-section">
    ${sectionHeading(lang, '02 / LISTENING ARCHIVE', copy(lang, '聆听档案的展示结构', 'A structure for listening notes'), 'VISUAL SLOT · AWAITING MATERIAL')}
    <div class="music-shelf">
      <div class="music-shelf-art">
        <img src="/assets/vinyl-hero.svg" alt="${copy(lang, '原创唱片视觉，不是真实收藏照片', 'Original vinyl artwork, not a photograph of a real collection')}" loading="lazy">
        <span>ORIGINAL VISUAL / NOT A RECORD PHOTO</span>
      </div>
      <div class="music-shelf-copy">
        <p class="music-shelf-lead">${copy(lang, '这里先搭好唱片档案的骨架：一张主视觉、一个明确的未开放状态，以及不冒充收藏的说明。', 'The structure of the archive comes first: one visual anchor, an explicit not-open state, and a clear note that this is not a claimed collection.')}</p>
        <div class="archive-status">
          <strong>${copy(lang, 'Archive not open', 'Archive not open')}</strong>
          <p>${copy(lang, '真实音乐数据尚未整理完成。这里不展示虚构专辑、歌手或听感条目。', 'Verified music data is not ready. No invented albums, artists, or listening entries are shown here.')}</p>
          <span>${copy(lang, '待提供：音乐人/专辑名单、真实听感、封面授权或自有照片。', 'To provide: artist/album list, real listening notes, cover permission or original photographs.')}</span>
        </div>
      </div>
    </div>
  </section>`;
}

function lifeGallery(lang) {
  return `<section class="editorial-section edition-section life-gallery-section">
    ${sectionHeading(lang, '02 / IMAGE & TEXT', copy(lang, '生活记录的图文结构', 'A structure for image and text'), 'ILLUSTRATION · NOT A PERSONAL PHOTO')}
    <div class="life-gallery">
      <figure class="life-gallery-main">
        <img src="/assets/gallery-placeholder.svg" alt="${copy(lang, '原创抽象占位图，不是个人照片', 'Original abstract placeholder, not a personal photograph')}" loading="lazy">
        <figcaption>${copy(lang, '原创抽象图 / 真实照片待提供', 'Original abstract artwork / real photographs to follow')}</figcaption>
      </figure>
      <div class="life-status">
        <span>STATUS / 未开放</span>
        <strong>${copy(lang, 'Life journal not open', 'Life journal not open')}</strong>
        <p>${copy(lang, '真实生活记录、照片与授权尚未提供。这里不展示虚构的日记、旅行或摄影作品。', 'Verified life records, photographs, and permissions are not available. No invented diary entries, journeys, or photography are shown here.')}</p>
        <em>${copy(lang, '待提供：照片、时间、说明文字、肖像授权。', 'To provide: photographs, dates, captions, and portrait permission.')}</em>
      </div>
    </div>
    <p class="life-gallery-note">${copy(lang, '当前只展示原创抽象视觉和空的图文槽位，不把占位图当作旅行、关系或生活事件。', 'Only original abstract artwork and empty image/text slots are shown. Placeholders are not presented as journeys, relationships, or life events.')}</p>
  </section>`;
}

export function reviewArticle(lang) {
  if (lang === 'en') {
    return `<section class="editorial-section edition-section review-article" id="research-method-note">
      <div class="review-banner">EDITORIAL CANDIDATE · NOT YET APPROVED AS THE OWNER’S PUBLISHED WORK</div>
      <span class="small-overline">REVIEW DRAFT / RESEARCH METHOD</span>
      <h2>From question to evidence: a reviewable research note method</h2>
      <p class="review-deck">A complete editorial candidate about making a research question, evidence trail, and limits legible. It is written for review, not presented as the owner’s prior research or publication.</p>
      <div class="review-body">
        <h3>1. A question is a boundary, not a title</h3>
        <p>A research question is useful only when it tells the reader what is inside the study and what is outside it. Before collecting material, write four sentences: what object is being studied, what kind of evidence could answer the question, under which conditions a claim would hold, and which competing explanations remain open. If those sentences cannot be written, the question is probably still a topic.</p>
        <p>A topic invites accumulation. A question forces selection. The selection should be visible, because a reader cannot judge a conclusion without knowing what was excluded.</p>
        <h3>2. Separate the evidence trail</h3>
        <p>Keep primary material, secondary compilations, and interpretive notes in separate layers. For each source, record where it came from, when it was collected, which version was used, and what it cannot establish. Missing data should be recorded as missing, not silently dropped. A final table without a provenance trail looks cleaner than it is.</p>
        <h3>3. Make the analysis retraceable</h3>
        <p>A reproducible method does not require the reader to rerun every model. It requires enough information to retrace the decisions: why this sample, why this variable, why this comparison, and what would have changed the conclusion. Record the alternatives that were considered but rejected. This is not administrative overhead; it is part of the argument.</p>
        <h3>4. Put limits before polish</h3>
        <p>Distinguish three statements: the data support X; X is a working explanation; X remains untested. Do not turn correlation into causation, or one result into a stable rule. A limitation section is not a disclaimer at the end. It is the boundary that makes the claim honest.</p>
        <h3>5. A minimum note template</h3>
        <ol>
          <li>Question: object, scope, and excluded cases.</li>
          <li>Claim: the smallest statement the evidence could support.</li>
          <li>Evidence: sources, versions, and provenance.</li>
          <li>Counter-evidence: what would weaken the claim.</li>
          <li>Method: steps another person could follow.</li>
          <li>Limit: where the conclusion stops.</li>
        </ol>
        <p>This candidate is intentionally generic. It does not describe a real thesis, dataset, finding, or publication. Its purpose is to test the reading experience and provide a structure the owner can accept, edit, replace, or reject.</p>
      </div>
      <p class="review-disclaimer">Editorial candidate only. Not owner-approved research, not a publication, and not included in the public deployment package.</p>
    </section>`;
  }
  return `<section class="editorial-section edition-section review-article" id="research-method-note">
    <div class="review-banner">编辑候选稿 · 尚未获本人批准作为正式作品公开</div>
    <span class="small-overline">REVIEW DRAFT / 研究方法</span>
    <h2>从问题到证据：一份可复核的研究笔记方法</h2>
    <p class="review-deck">一篇完整的研究方法编辑候选稿，讨论如何把问题、证据链与结论边界写清楚。它不是用户的既有研究，也不是已发表作品。</p>
    <div class="review-body">
      <h3>一、问题是一条边界，不是一个标题</h3>
      <p>一个可工作的研究问题，首先要说明什么在研究对象之内、什么在边界之外。开始收集材料之前，先写四句话：研究对象是什么；什么样的证据有可能回答它；在什么条件下一个判断能够成立；还有哪些竞争性解释没有被排除。如果这四句话写不出来，手中的通常仍是一个“题目”，还不是“问题”。</p>
      <p>题目倾向于不断累积材料，问题则迫使研究者做选择。选择必须被看见，因为读者如果不了解哪些材料被排除，就无法判断结论的适用范围。</p>
      <h3>二、把证据链分开记录</h3>
      <p>原始材料、二手整理与解释性笔记应当分层保存。对每一份材料，记录来源、采集时间、使用的版本，以及它不能证明什么。缺失值要作为缺失被记录，而不是在整理过程中悄悄消失。一张没有出处的最终表格，往往比它看起来更脆弱。</p>
      <h3>三、让分析过程可以被重走</h3>
      <p>可复核不等于要求读者重跑所有模型，而是要求关键决策可以被追溯：为什么使用这组样本、为什么选择这个变量、为什么做这个比较，以及什么结果会改变结论。被考虑过又放弃的替代解释，也应当留下痕迹。这不是附加的行政工作，而是论证的一部分。</p>
      <h3>四、把限制写在润色之前</h3>
      <p>区分三种陈述：数据支持某个判断；某个判断是暂时解释；某个判断仍待检验。不要把相关写成因果，也不要把一次结果写成稳定规律。限制不是文末的免责声明，而是让结论保持诚实的边界。</p>
      <h3>五、一份最小笔记模板</h3>
      <ol>
        <li>问题：对象、范围与被排除的情形。</li>
        <li>判断：证据目前能支持的最小陈述。</li>
        <li>证据：来源、版本与出处链。</li>
        <li>反证：什么会削弱这个判断。</li>
        <li>方法：另一个人可以照着走的步骤。</li>
        <li>限制：结论在哪里停下。</li>
      </ol>
      <p>这篇候选稿刻意保持通用：它不描述真实论文、数据、发现或发表记录。它的用途是检验阅读体验，并提供一份可以由本人接受、修改、替换或拒绝的方法结构。</p>
    </div>
    <p class="review-disclaimer">编辑候选稿。不是本人已批准的研究，不是正式发表作品，也不包含在公开部署包中。</p>
  </section>`;
}

function home(lang) {
  const threads = lang === 'zh' ? [
    ['01 / 研究与方法', '把模糊的问题拆成可以检验的步骤：问题、证据、方法、限制。', '研究笔记'],
    ['02 / 项目结构', '用问题、角色、方法、结果与限制来组织项目说明，而不是堆砌成果。', '项目笔记'],
    ['03 / 文字与观察', '阅读、聆听与日常观察，构成专业训练之外的另一种注意力。', '随笔与观察'],
  ] : [
    ['01 / RESEARCH & METHOD', 'Turning a vague question into testable steps: question, evidence, method, limits.', 'Research notes'],
    ['02 / PROJECT STRUCTURE', 'Organising a project around problem, role, method, result, and limits—not a pile of claims.', 'Project notes'],
    ['03 / WORDS & ATTENTION', 'Reading, listening, and everyday observation as another kind of attention beyond formal training.', 'Journal & notes'],
  ];
  return `
  <section class="home-hero edition-home">
    <div class="home-hero-copy">
      <div class="hero-overline"><p class="eyebrow">BRANT STUDIO / PUBLIC NOTEBOOK</p><span class="hero-edition">VOL. 001 &nbsp; / &nbsp; OPEN ARCHIVE</span></div>
      <h1 class="display-title home-title">Brant Studio</h1>
      <p class="hero-identity">${copy(lang, '关于金融、数据与方法的公开笔记', 'Notes on finance, data, and method')}</p>
      <p class="hero-tagline">${copy(lang, '把问题写下来，\n把方法说明白。', 'Write the question down.\nMake the method legible.')}</p>
      <p class="home-lead">${copy(lang, '这是一个面向公众的编辑式笔记：记录学习中的问题、可复现的方法、项目结构，以及阅读与聆听留下的线索。它不是完整简历，也不替代正式论文。', 'A public-facing editorial notebook: questions from learning, reproducible methods, project structure, and traces left by reading and listening. It is not a complete CV, and it does not replace formal research.')}</p>
      <div class="hero-bottom"><a class="text-link" href="/${lang}/about/"><span>${copy(lang, '了解这个空间', 'About this notebook')}</span><span aria-hidden="true">↗</span></a><span class="hero-scroll">${copy(lang, '向下阅读 ↓', 'READ ON ↓')}</span></div>
    </div>
    <div class="home-hero-visual"><img src="/assets/architecture-hero.svg" alt="${copy(lang, '抽象建筑插画，不是个人照片', 'Abstract architectural illustration, not a personal photograph')}" width="900" height="1200"></div>
  </section>
  <div class="running-line"><span>QUESTIONS</span><span>✳</span><span>METHOD</span><span>✳</span><span>EVIDENCE</span><span>✳</span><span>EXPRESSION</span></div>
  <section class="editorial-section edition-section" data-visual-fallback="home-clues">
    ${sectionHeading(lang, '01 / START HERE', copy(lang, '三条阅读线索', 'Three ways in'), 'PUBLIC EDITION')}
    <div class="edition-grid">${threads.map(([number, text, title], index) => `<article class="edition-card"><span class="edition-card-number">${number}</span><h3>${esc(title)}</h3><p>${esc(text)}</p><span class="edition-card-link">${index === 0 ? copy(lang, '从研究开始', 'Begin with research') : index === 1 ? copy(lang, '看项目结构', 'See project structure') : copy(lang, '进入文字档案', 'Enter the journal')}</span></article>`).join('')}</div>
  </section>
  <section class="editorial-section edition-section edition-split" data-visual-fallback="home-problem">
    <div class="intro-serif">${copy(lang, '先说明问题，\n再说明立场。', 'Name the question.\nThen name the position.')}</div>
    <div><p class="body-copy">${copy(lang, '这个公开版不把“正在学习”写成“已经完成”，也不把示例项目写成真实经历。可公开的部分，应当能经得起追问：证据从哪里来？方法能否复现？结论的边界在哪里？', 'This public edition does not turn “currently learning” into “completed”, or a sample structure into a real experience. What is public should survive a simple question: where does the evidence come from, can the method be reproduced, and where does the conclusion stop?')}</p><a class="text-link" href="/${lang}/research/"><span>${copy(lang, '阅读方法笔记', 'Read the method notes')}</span><span aria-hidden="true">↗</span></a></div>
  </section>
  ${projectFeature(lang)}
  <section class="editorial-section edition-section" data-visual-fallback="home-latest">
    ${sectionHeading(lang, '02 / LATEST WRITING', copy(lang, '从文字开始', 'Start with the writing'), 'JOURNAL')}
    <div class="edition-feature"><p class="eyebrow">PUBLIC SAMPLE / 2026</p><h3>${copy(lang, '保留一点观察，也保留问题的边界。', 'Keep an observation—and the limits of the question.')}</h3><p>${copy(lang, '两篇公开示例文章，展示这个空间如何阅读、如何标注不确定，以及如何把“方法”放在结论之前。', 'Two public sample essays showing how this space reads, marks uncertainty, and puts method before conclusion.')}</p><a class="text-link" href="/${lang}/journal/"><span>${copy(lang, '进入文字档案', 'Read the journal')}</span><span aria-hidden="true">↗</span></a></div>
  </section>`;
}

function about(lang) {
  return `${pageHero(lang, copy(lang, '01 / 关于', '01 / ABOUT'), copy(lang, '不是一份简历，\n而是一本公开笔记。', 'Not a CV.\nA public notebook.'), copy(lang, '这个网站解释自己如何阅读、如何记录、如何区分已确认的事实与仍在形成中的判断。', 'This site explains how it reads, how it records, and how it separates confirmed facts from judgments still taking shape.'), 'about-hero')}
  <section class="editorial-section edition-section edition-split" data-visual-fallback="about-public-scope">
    <div class="intro-serif">${copy(lang, '公开，不等于全部。', 'Public does not mean everything.')}</div>
    <div><p class="body-copy">${copy(lang, '这里公开的是可以脱离私人语境阅读的内容：方法笔记、项目结构、公开示例文章，以及学习与阅读中的一般性问题。私人日记、未批准的研究材料、真实身份细节和后台数据不进入公开构建。', 'What appears here can be read outside its private context: method notes, project structure, public sample essays, and general questions from learning and reading. Private journals, unapproved research material, real identity details, and admin data do not enter the public build.')}</p><p class="body-copy">${copy(lang, '因此，这个网站不追求“信息很多”，而追求每一条公开信息都有来源、有边界，并且值得被保留。', 'The aim is not to publish more. It is to make each public item sourced, bounded, and worth keeping.')}</p></div>
  </section>
  <section class="editorial-section edition-section" data-visual-fallback="about-principles">
    ${sectionHeading(lang, '02 / EDITORIAL RULES', copy(lang, '三条编辑原则', 'Three editorial rules'), 'HOW THIS SITE WORKS')}
    <div class="edition-grid">
      ${card(copy(lang, '事实与草稿分开', 'Facts and drafts stay apart'), copy(lang, '未确认的学历、奖项、论文、项目与个人经历，不写成既成事实。', 'Unconfirmed degrees, awards, papers, projects, and personal events are not written as settled facts.'), '01', lang)}
      ${card(copy(lang, '先写方法，再写结论', 'Method before conclusion'), copy(lang, '能说明证据来源、处理步骤与限制，比一个漂亮结论更重要。', 'Showing where evidence comes from, how it was handled, and where it stops matters more than a tidy conclusion.'), '02', lang)}
      ${card(copy(lang, '保留私人边界', 'Keep a private boundary'), copy(lang, '公开页面不承载私人生活、真实身份、后台入口或未批准内容。', 'Public pages do not carry private life, real identity, admin entry points, or unapproved material.'), '03', lang)}
    </div>
  </section>
  <section class="editorial-section edition-section edition-split" data-visual-fallback="about-next">
    <div class="intro-serif">${copy(lang, '下一步，\n把空白留给真实材料。', 'Next, leave the blanks\nfor real material.')}</div>
    <div><p class="body-copy">${copy(lang, '姓名、学校、学历、研究方向、项目与公开联系方式，只有在本人明确确认后才会补充。当前版本使用低披露的通用表达，不把未经确认的内容冒充个人履历。', 'Name, school, degree, research topics, projects, and public contact details will be added only after explicit confirmation. This edition uses low-disclosure language and does not present unconfirmed material as a personal CV.')}</p><p class="edition-fact">${copy(lang, '待确认 / 待完善：公开姓名 / 学校与学历 / 公开联系方式 / 可公开的项目与研究方向', 'Pending / incomplete: public name / school and degree / public contact / publishable projects and research topics')}</p></div>
  </section>`;
}

function research(lang) {
  return `${pageHero(lang, copy(lang, '02 / 研究与方法', '02 / RESEARCH & METHOD'), copy(lang, '先让问题变得清楚，\n再让答案变得可靠。', 'Make the question clear.\nThen make the answer accountable.'), copy(lang, '这里记录的是研究方法的骨架，而不是未经核实的成果清单。具体研究主题与数据保持私密。', 'This page records the scaffolding of method, not a list of unverified results. Specific topics and data remain private.'))}
  <section class="editorial-section edition-section edition-split" data-visual-fallback="method-intro">
    <div class="intro-serif">${copy(lang, '问题不是装饰，\n它决定你能看见什么。', 'A question is not decoration.\nIt decides what you can see.')}</div>
    <div><p class="body-copy">${copy(lang, '一个可工作的研究问题，通常要同时说明：对象是什么、证据从哪里来、在什么条件下成立、哪些解释暂不排除。问题越清楚，后面的数据整理与模型选择越不容易变成“先有答案，再找材料”。', 'A workable research question usually states its object, the source of evidence, the conditions under which a claim holds, and the explanations not yet ruled out. The clearer the question, the less likely data work and model choice become “answer first, evidence later”.')}</p></div>
  </section>
  <section class="editorial-section edition-section" data-visual-fallback="research-methods">
    ${sectionHeading(lang, '01 / METHOD NOTES', copy(lang, '方法笔记', 'Method notes'), 'WORKING NOTES')}
    <div class="edition-list">
      <article class="edition-row"><span>01</span><div><h3>${copy(lang, '证据从哪里来', 'Where evidence comes from')}</h3><p>${copy(lang, '区分原始数据、二手整理与解释性材料；记录版本、口径与缺失，而不是只留下最后一张表。', 'Separate primary data, secondary compilations, and interpretive material. Record versions, definitions, and missingness—not only the final table.')}</p></div></article>
      <article class="edition-row"><span>02</span><div><h3>${copy(lang, '方法能否被复核', 'Can the method be reviewed?')}</h3><p>${copy(lang, '把假设、变量、样本与模型选择写成别人可以重走的路径；对不能复现的部分，明确标出限制。', 'Write assumptions, variables, sample choices, and model choices as a path someone else could retrace. Mark the parts that cannot be reproduced.')}</p></div></article>
      <article class="edition-row"><span>03</span><div><h3>${copy(lang, '结论在哪里停下', 'Where the conclusion stops')}</h3><p>${copy(lang, '区分“数据支持”“暂时解释”与“尚待检验”。不把相关性写成因果，也不把一次结果写成稳定规律。', 'Distinguish “supported by data”, “working explanation”, and “still untested”. Do not turn correlation into causation or a single result into a stable rule.')}</p></div></article>
    </div>
  </section>
  <section class="editorial-section edition-section edition-split">
    <div class="intro-serif">${copy(lang, '具体主题暂不公开。', 'Specific topics remain private.')}</div>
    <div><p class="body-copy">${copy(lang, '当前公开的是方法层面的思考，而不是研究档案。论文、数据、未发表结果与具体课题不会因为页面存在而被自动公开。', 'What is public here is thinking about method, not a research archive. Papers, data, unpublished results, and specific topics are not made public simply because this page exists.')}</p><p class="edition-fact">${copy(lang, '待确认：可公开的研究方向 / 论文或项目 / 方法与工具的真实使用范围', 'Pending: publishable research topics / papers or projects / actual scope of methods and tools used')}</p></div>
  </section>`;
}

function projects(lang) {
  return `${pageHero(lang, copy(lang, '03 / 项目', '03 / PROJECTS'), copy(lang, '先说明角色，\n再说明结果。', 'State the role.\nThen state the result.'), copy(lang, '这里先公开一条有实际构建与上线记录支持的网站项目；其他项目、角色与奖项在确认前保持留白。', 'This page publishes one website project supported by an actual build and launch record. Other projects, roles, and awards remain blank until confirmed.'))}
  <section class="editorial-section edition-section edition-split" data-visual-fallback="project-intro">
    <div class="intro-serif">${copy(lang, '一个项目，\n至少要回答四个问题。', 'A project note should answer\nat least four questions.')}</div>
    <div><p class="body-copy">${copy(lang, '问题是什么？我具体做了什么？方法如何被验证？结果与限制分别是什么？把这四件事写清楚，比堆叠“参与过”“负责过”更有信息量。', 'What was the problem? What did I specifically do? How was the method validated? What were the results and limits? Answering these four questions is more informative than stacking claims of participation.')}</p></div>
  </section>
  <section class="editorial-section edition-section" data-visual-fallback="projects-checklist">
    ${sectionHeading(lang, '01 / NOTE STRUCTURE', copy(lang, '一条项目记录应回答什么', 'What a project note should answer'), 'EDITORIAL CHECKLIST')}
    <div class="project-checklist">
      <span>${copy(lang, '问题与语境', 'Problem & context')}</span>
      <span>${copy(lang, '角色与贡献（待确认）', 'Role & contribution (pending)')}</span>
      <span>${copy(lang, '方法与验证', 'Method & validation')}</span>
      <span>${copy(lang, '结果与限制', 'Result & limits')}</span>
    </div>
  </section>
  <section class="editorial-section edition-section edition-split">
    <div class="intro-serif">${copy(lang, '只有可核查的记录，\n才进入公开履历。', 'Only reviewable records\nenter a public CV.')}</div>
    <div><p class="body-copy">${copy(lang, '当前公开的是 Brant Studio 公开展示站本身：它有实际构建、截图、上线地址与验收记录。此前页面中的比赛、团队与奖项信息不再展示；其他个人项目在确认前保持留白。', 'What is public here is the Brant Studio public site itself: it has an actual build, screenshots, a live address, and a verification record. Competition, team, and award details from an earlier draft are no longer shown; other personal projects remain blank until confirmed.')}</p><p class="edition-fact">${copy(lang, '待确认：其他可公开项目 / 真实角色 / 团队署名 / 奖项与时间 / 可公开结果', 'Pending: further publishable projects / actual role / team credit / awards and dates / publishable results')}</p></div>
  </section>
  ${projectCase(lang)}`;
}

function journal(lang, articleIndex, reviewHtml = '') {
  return `${pageHero(lang, copy(lang, '04 / 随笔', '04 / JOURNAL'), copy(lang, '认真记录，\n也认真标注不确定。', 'Write it down.\nMark what is uncertain.'), copy(lang, '公开示例文章与阅读笔记：关于学习、证据、观察和表达。这里的文章是公开示例，不是已发表研究。', 'Public sample essays and reading notes on learning, evidence, observation, and expression. These are public samples, not published research.'))}
  <section class="editorial-section edition-section edition-split" data-visual-fallback="journal-intro">
    <div class="intro-serif">${copy(lang, '写作是一种\n把问题放慢的方式。', 'Writing slows a question down.')}</div>
    <div><p class="body-copy">${copy(lang, '这个文字档案不追求“观点输出”。它更关心一个判断是如何形成的：哪些是观察，哪些是解释，哪些仍然只是猜测。专业写作与日常写作在这里不是两套语言，而是同一种诚实。', 'This archive is less interested in broadcasting opinions than in showing how a judgment forms: what is observation, what is interpretation, and what is still a guess. Academic and everyday writing are not two languages here; they are the same commitment to honesty.')}</p></div>
  </section>
  ${articleIndex}
  ${reviewHtml}
  <section class="editorial-section edition-section" data-visual-fallback="journal-directions">
    ${sectionHeading(lang, '02 / EDITORIAL DIRECTION', copy(lang, '文字档案的方向', 'Direction of the archive'), 'NEXT NOTES')}
    <div class="edition-list">
      <article class="edition-row"><span>01</span><div><h3>${copy(lang, '阅读笔记', 'Reading notes')}</h3><p>${copy(lang, '不只摘录结论，也记录论证路径、证据质量与仍未被回答的问题。', 'Not only conclusions, but the path of the argument, the quality of evidence, and the questions left open.')}</p></div></article>
      <article class="edition-row"><span>02</span><div><h3>${copy(lang, '学习札记', 'Learning notes')}</h3><p>${copy(lang, '把概念、方法与实践中的卡点写清楚，避免把“知道名词”当作“理解机制”。', 'Make concepts, methods, and points of friction explicit—rather than mistaking vocabulary for understanding.')}</p></div></article>
      <article class="edition-row"><span>03</span><div><h3>${copy(lang, '观察与表达', 'Observation & expression')}</h3><p>${copy(lang, '从音乐、城市与日常中练习注意力和语言，但不虚构私人事件。', 'Practise attention and language through music, cities, and everyday life—without inventing private events.')}</p></div></article>
    </div>
  </section>`;
}

function music(lang) {
  return `${pageHero(lang, copy(lang, '05 / 聆听', '05 / LISTENING'), copy(lang, '听，是一种\n训练注意力的方式。', 'Listening is a way\nto train attention.'), copy(lang, '这里不是唱片收藏声明，而是一组关于声音、记忆与表达的编辑笔记。具体专辑与私人听感待确认后再补充。', 'This is not a claim of record ownership. It is a set of editorial notes on sound, memory, and expression. Specific albums and private listening notes will be added only after confirmation.'))}
  <section class="editorial-section edition-section edition-split" data-visual-fallback="music-intro">
    <div class="intro-serif">${copy(lang, '声音先于解释到达。', 'Sound arrives before explanation.')}</div>
    <div><p class="body-copy">${copy(lang, '一段音乐能记住的，往往不是“它讲了什么”，而是它如何组织时间：哪里留白，哪里重复，哪里突然改变方向。把这种结构听出来，和把一段论证读清楚，有相似之处。', 'What stays from a piece of music is often not its stated meaning but how it organises time: where it leaves space, where it repeats, where it turns. Hearing that structure has something in common with reading an argument clearly.')}</p></div>
  </section>
  <section class="editorial-section edition-section">
    ${sectionHeading(lang, '01 / LISTENING NOTES', copy(lang, '三种聆听方式', 'Three ways of listening'), 'EDITORIAL NOTES')}
    <div class="edition-grid">
      ${card(copy(lang, '听结构', 'Listen for structure'), copy(lang, '节奏、段落与重复如何组织一首作品的时间。', 'How rhythm, sections, and repetition organise a piece in time.'), '01', lang)}
      ${card(copy(lang, '听语气', 'Listen for tone'), copy(lang, '同一个词在不同语气里，如何改变它的重量。', 'How the same word changes weight when the tone changes.'), '02', lang)}
      ${card(copy(lang, '听留白', 'Listen for space'), copy(lang, '没有发声的部分，如何让前后真正发生关系。', 'How the unheard parts make the before and after relate.'), '03', lang)}
    </div>
  </section>
  <section class="editorial-section edition-section edition-split">
    <div class="intro-serif">${copy(lang, '先保留感受，\n再决定是否解释。', 'Keep the response.\nDecide later whether to explain.')}</div>
    <div><p class="body-copy">${copy(lang, '具体专辑、音乐人和私人听感不在本稿中虚构或补写。等真实材料与公开意愿确认后，这一页再增加可核查的聆听档案。', 'Specific albums, artists, and private listening responses are not invented or filled in here. Verified material will be added only after the owner confirms both the facts and the wish to publish them.')}</p><p class="edition-fact">${copy(lang, '待确认：可公开的音乐人/专辑 / 听感是否公开 / 是否保留旧版歌词引用', 'Pending: publishable artists/albums / whether listening notes are public / whether to retain the earlier lyric reference')}</p></div>
  </section>
  ${musicShelf(lang)}`;
}

function life(lang) {
  return `${pageHero(lang, copy(lang, '06 / 生活观察', '06 / NOTICING'), copy(lang, '把日常写下来，\n但不把日常表演出来。', 'Write the everyday down.\nDo not perform it.'), copy(lang, '这一页练习观察、节奏与保留细节；不虚构旅行、关系、里程碑或私人事件。', 'This page practises observation, rhythm, and keeping detail. It does not invent journeys, relationships, milestones, or private events.'))}
  <section class="editorial-section edition-section edition-split">
    <div class="intro-serif">${copy(lang, '注意力的单位，\n可以是一次呼吸。', 'Attention can be measured\nin a single breath.')}</div>
    <div><p class="body-copy">${copy(lang, '生活记录最容易变成两种东西：流水账，或精心修饰的展示。这里想保留第三种可能：一个细节为什么值得记住，它改变了什么，又没有被解释成什么。', 'A life record easily becomes either a diary of events or a carefully polished display. This page wants a third possibility: why a detail is worth keeping, what it changes, and what it is not made to explain.')}</p></div>
  </section>
  <section class="editorial-section edition-section">
    ${sectionHeading(lang, '01 / SMALL PRACTICES', copy(lang, '三个小练习', 'Three small practices'), 'EDITORIAL NOTES')}
    <div class="edition-list">
      <article class="edition-row"><span>01</span><div><h3>${copy(lang, '先写看见的', 'Write what is seen')}</h3><p>${copy(lang, '先记录光线、声音、动作与位置，再决定要不要写感受。', 'Record light, sound, movement, and position before deciding what it felt like.')}</p></div></article>
      <article class="edition-row"><span>02</span><div><h3>${copy(lang, '保留未完成', 'Keep the unfinished')}</h3><p>${copy(lang, '不是每个片段都需要一个结论；有些只需要被准确放置。', 'Not every fragment needs a conclusion. Some only need to be placed accurately.')}</p></div></article>
      <article class="edition-row"><span>03</span><div><h3>${copy(lang, '不替别人说话', 'Do not speak for others')}</h3><p>${copy(lang, '写自己的观察，不把他人、关系或私人场景当作公开素材。', 'Write your own observation. Do not turn other people, relationships, or private scenes into public material.')}</p></div></article>
    </div>
  </section>
  <section class="editorial-section edition-section edition-split">
    <div class="intro-serif">${copy(lang, '真实材料到位之前，\n这一页保持克制。', 'Until real material arrives,\nthis page stays restrained.')}</div>
    <div><p class="body-copy">${copy(lang, '目前没有经本人确认、可以公开的旅行、生活事件或照片。此页只保留写作方法与观察方向，不填补虚构故事。', 'There are currently no owner-confirmed journeys, life events, or photographs suitable for publication. This page keeps only method and direction; it does not fill the gap with invented stories.')}</p><p class="edition-fact">${copy(lang, '待确认：可公开的生活片段 / 照片与授权 / 是否保留旧版个人叙述', 'Pending: publishable life fragments / photographs and permission / whether to retain earlier personal narrative')}</p></div>
  </section>
  ${lifeGallery(lang)}`;
}

function musicEdition(lang) {
  const index = [
    ['#music-artists', copy(lang, '精选音乐人', 'Featured Artists'), copy(lang, '编辑说明', 'Editorial note')],
    ['#music-repeat', copy(lang, '反复聆听', 'On Repeat'), copy(lang, '重复与注意力', 'Repetition & attention')],
    ['#music-albums', copy(lang, '唱片收藏', 'Album Collection'), copy(lang, '收藏与授权', 'Collection & permission')],
    ['#music-notes', copy(lang, '音乐手记', 'Music Notes'), copy(lang, '聆听方法', 'Listening method')],
  ];
  return `${pageHero(lang, copy(lang, '05 / 聆听', '05 / LISTENING'), copy(lang, '听，是一种\n训练注意力的方式。', 'Listening is a way\nto train attention.'), copy(lang, '这是一个已经开放的音乐栏目：用编辑文章与原创视觉讨论聆听，不虚构你喜欢的歌手、专辑或私人听感。', 'An open music section: editorial writing and original visuals about listening, without inventing the artists, albums, or private responses you like.'))}
  <section class="editorial-section edition-section edition-split" data-visual-fallback="music-intro">
    <div class="intro-serif">${copy(lang, '声音先于解释到达。', 'Sound arrives before explanation.')}</div>
    <div><p class="body-copy">${copy(lang, '一段音乐能记住的，往往不是“它讲了什么”，而是它如何组织时间：哪里留白，哪里重复，哪里突然改变方向。把这种结构听出来，和把一段论证读清楚，有相似之处。', 'What stays from a piece of music is often not its stated meaning but how it organises time: where it leaves space, where it repeats, where it turns. Hearing that structure has something in common with reading an argument clearly.')}</p><p class="body-copy">${copy(lang, '以下内容为编辑性写作；它们不是用户听歌记录，也不声称与任何音乐人、唱片或收藏存在私人关系。', 'The writing below is editorial. It is not a record of the owner’s listening and does not claim a personal relationship with any artist, record, or collection.')}</p></div>
  </section>
  <nav class="music-index" aria-label="${copy(lang, '音乐栏目索引', 'Music sections')}">${index.map(([href, title, note]) => `<a href="${href}"><span>${esc(title)}</span><strong>${esc(note)}</strong></a>`).join('')}</nav>
  <section class="editorial-section edition-section music-band" data-visual-fallback="music-band">
    <div class="music-band-art"><img src="/assets/vinyl-hero.svg" alt="${copy(lang, '原创唱片视觉，不是真实收藏照片', 'Original vinyl artwork, not a photograph of a real collection')}"><span>ORIGINAL VISUAL / NOT A RECORD PHOTO</span></div>
    <div><span class="small-overline">EDITORIAL POSITION</span><h2>${copy(lang, '先把“喜欢”与“拥有”分开', 'Separate “listening” from “owning”')}</h2><p class="body-copy">${copy(lang, '音乐页面最容易把三种事实混在一起：我听过什么、我喜欢什么、我拥有或获准展示什么。这个栏目只讨论可以公开的部分；没有真实资料时，它宁可保持编辑性，也不替你编一张唱片架。', 'A music page easily mixes three facts: what was heard, what was liked, and what is owned or licensed for display. This section only discusses what can be public. Without verified material, it stays editorial rather than inventing a record shelf for you.')}</p></div>
  </section>
  <section class="editorial-section edition-section music-editorial" id="music-artists" data-visual-fallback="music-sections">
    ${sectionHeading(lang, '01 / FEATURED ARTISTS', copy(lang, '喜欢一位音乐人，意味着什么', 'What does it mean to feature an artist?'), 'EDITORIAL NOTE · NOT A PERSONAL LIST')}
    <div class="music-essay"><p>${copy(lang, '写一位音乐人，不等于声称认识他。可以写作品的结构、语气与历史位置，也可以写它为何值得反复听；但不能把“听过”写成“陪伴”，把“欣赏”写成“私人关系”。在真实名单与授权出现之前，这一栏只保留这条编辑原则。', 'Writing about an artist does not mean claiming to know them. One can write about structure, tone, and historical position, or why a work rewards returning to it. But “heard” should not become “accompanied me”, and “admired” should not become “a personal relationship”. Until verified names and permissions exist, this section keeps only that principle.')}</p></div>
  </section>
  <section class="editorial-section edition-section music-editorial" id="music-repeat" data-visual-fallback="music-sections">
    ${sectionHeading(lang, '02 / ON REPEAT', copy(lang, '重复，是一种细读', 'Repetition is a form of close reading'), 'EDITORIAL NOTE · NOT A PERSONAL LIST')}
    <div class="music-essay"><p>${copy(lang, '一首歌被反复播放，不一定意味着它“代表我”。重复会改变注意力：第一次听旋律，第二次听编曲，第三次才听见词与留白之间的关系。把重复写成注意力的练习，比把它写成身份宣言更诚实。', 'A song played repeatedly does not necessarily “represent” anyone. Repetition changes attention: the first listen catches melody, the second arrangement, the third the relation between words and empty space. Treating repetition as a practice of attention is more honest than treating it as a statement of identity.')}</p></div>
  </section>
  <section class="editorial-section edition-section music-editorial" id="music-albums" data-visual-fallback="music-sections">
    ${sectionHeading(lang, '03 / ALBUM COLLECTION', copy(lang, '收藏页应当说明什么', 'What a collection page should disclose'), 'NO COVER IMAGES UNTIL PERMITTED')}
    <div class="music-essay"><p>${copy(lang, '“听过”“拥有实体唱片”“获准使用封面”是三种不同状态。收藏页至少应说明是哪一种，以及图片来自哪里。当前没有经确认的唱片清单或封面授权，因此不展示虚构专辑、受版权保护的封面或“收藏”数字。', '“Heard”, “owns a physical copy”, and “licensed to display the cover” are three different states. A collection page should say which one applies and where an image comes from. No verified record list or cover permission exists yet, so no invented albums, copyrighted sleeves, or collection counts are shown.')}</p></div>
  </section>
  <section class="editorial-section edition-section" id="music-notes" data-visual-fallback="music-sections music-notes">
    ${sectionHeading(lang, '04 / MUSIC NOTES', copy(lang, '聆听方法笔记', 'Notes on listening'), 'EDITORIAL NOTES')}
    <div class="edition-list">
      <article class="edition-row"><span>01</span><div><h3>${copy(lang, '听结构', 'Listen for structure')}</h3><p>${copy(lang, '节奏、段落与重复如何组织一首作品的时间；什么时候进入，什么时候退出。', 'How rhythm, sections, and repetition organise a work in time—when it enters and when it leaves.')}</p></div></article>
      <article class="edition-row"><span>02</span><div><h3>${copy(lang, '听语气', 'Listen for tone')}</h3><p>${copy(lang, '同一个词在不同语气里如何改变重量；克制与用力各自付出了什么代价。', 'How the same word changes weight when the tone changes, and what restraint or force each costs.')}</p></div></article>
      <article class="edition-row"><span>03</span><div><h3>${copy(lang, '听留白', 'Listen for space')}</h3><p>${copy(lang, '没有发声的部分，如何让前后真正发生关系。', 'How the unheard parts make the before and after relate.')}</p></div></article>
    </div>
    <p class="edition-fact">${copy(lang, '栏目状态：开放。个人音乐资料仍待确认：音乐人/专辑、真实听感、封面授权或自有照片。', 'Section status: open. Personal music material remains unconfirmed: artists/albums, real listening notes, cover permission, or original photographs.')}</p>
  </section>`;
}

function lifeEdition(lang) {
  return `${pageHero(lang, copy(lang, '06 / 生活记录', '06 / LIFE NOTES'), copy(lang, '先把一天写清楚，\n再决定它是否属于生活。', 'Write the day clearly.\nThen decide whether it is a life story.'), copy(lang, '日常记录正式开放。第一篇只记录一件已经核实的事：这个网站从候选版走到可核对状态的过程。其他生活素材仍需真实资料与授权。', 'The life section is now open. Its first entry records one verified thing: moving this site from a candidate build to a reviewable state. Other life material still needs real sources and permission.'))}
  <section class="editorial-section edition-section life-log" id="life-build-log" data-visual-fallback="life-log">
    <div class="life-log-meta"><span>BUILD LOG / 2026-10-26</span><span>VERIFIED PROJECT RECORD</span></div>
    <div class="life-log-grid">
      <figure class="life-log-media"><img src="/assets/project-home.png" alt="${copy(lang, 'Brant Studio 首页实际构建截图', 'Actual build screenshot of the Brant Studio home page')}"><figcaption>${copy(lang, '实际构建截图 / 不是个人照片', 'Actual build screenshot / not a personal photograph')}</figcaption></figure>
      <div class="life-log-copy">
        <span class="small-overline">01 / SITE BUILD</span>
        <h2>${copy(lang, '建站日常：把“看起来完成”改成“可以被核对”', 'A build log: turning “looks finished” into “can be checked”')}</h2>
        <p>${copy(lang, '今天没有新的私人故事要公开。这一天发生的事，是重新核对这个网站：删去站不住的履历与奖项，把匿名边界写清楚，给项目补上真实截图，并把音乐与生活从空状态改成可阅读的栏目。', 'No new private story is being published today. What happened was a re-check of this site: removing unsupported CV and award claims, making the anonymity boundary explicit, adding real project screenshots, and turning Music and Life from empty states into readable sections.')}</p>
        <p>${copy(lang, '也遇到过一个具体问题：一个内部工程标记混进了公开构建。那次没有直接上线，而是撤回、移除、重新构建。这个细节不值得炫耀，但它说明了“可以核对”比“看起来完成”更重要。', 'One concrete problem also appeared: an internal engineering marker leaked into the public build. It was not launched; the package was held back, the marker removed, and the build repeated. The detail is not impressive, but it shows why “can be checked” matters more than “looks finished”.')}</p>
        <p>${copy(lang, '这不是私人日记，也不是旅行、关系或成长叙事。它只记录与这个网站直接相关、且可以公开验证的工作。', 'This is not a private diary, nor a travel, relationship, or personal-growth narrative. It records only work directly related to this site that can be publicly verified.')}</p>
        <p class="life-log-tags">SITE BUILD · REVIEW · STATIC PUBLISH · 2026-10-26</p>
      </div>
    </div>
  </section>
  <section class="editorial-section edition-section" data-visual-fallback="life-index">
    ${sectionHeading(lang, '02 / RECORD INDEX', copy(lang, '生活记录索引', 'Life record index'), 'OPEN / PENDING MATERIAL')}
    <div class="life-index">
      <a class="life-index-open" href="#life-build-log"><span>01</span><strong>${copy(lang, '建站日常', 'Site build log')}</strong><em>${copy(lang, '已开放 · 1 条', 'Open · 1 entry')}</em></a>
      <div><span>02</span><strong>${copy(lang, '摄影', 'Photography')}</strong><em>${copy(lang, '待真实照片与授权', 'Awaiting photographs and permission')}</em></div>
      <div><span>03</span><strong>${copy(lang, '训练', 'Training')}</strong><em>${copy(lang, '待真实记录', 'Awaiting verified records')}</em></div>
      <div><span>04</span><strong>${copy(lang, '阅读与日常', 'Reading & everyday')}</strong><em>${copy(lang, '待真实材料', 'Awaiting real material')}</em></div>
    </div>
    <p class="edition-fact">${copy(lang, '开放范围仅限本页已展示的建站记录；不包含私人日记、人物照片、地理位置或未授权生活事件。', 'Open scope is limited to the build record shown here. It does not include private diaries, portraits, location data, or unauthorised life events.')}</p>
  </section>`;
}

export function buildRecordArticle(lang) {
  if (lang === 'en') {
    return `<section class="editorial-section edition-section review-article" id="build-record">
      <div class="review-banner">EDITORIAL CANDIDATE · NOT YET APPROVED AS THE OWNER’S PUBLISHED WORK</div>
      <span class="small-overline">REVIEW DRAFT / BUILD RECORD</span>
      <h2>Brant Studio build record: from idea to first launch</h2>
      <p class="review-deck">A factual account of how the public site was assembled, what changed, what went wrong, and what remains open. It describes the site, not an unconfirmed personal role.</p>
      <div class="review-body">
        <h3>1. Starting point</h3>
        <p><strong>Fact:</strong> the project began from an existing static public-site codebase with an established ivory, wine, and serif editorial identity. The first task was not to invent a new visual language, but to separate reusable design from content that could not be published safely.</p>
        <p>The old pages contained generic introductions and some historical identity, education, competition, and quotation material. Those claims could not be treated as confirmed public facts. The working rule became: preserve the design; remove or withhold the unsupported content.</p>

        <h3>2. The first public version</h3>
        <p><strong>Fact:</strong> the first public build reduced the site to an anonymous edition, added explicit public sample articles, and deployed as a static site on Cloudflare Pages. The public site has eight content modules in Chinese and English, twenty routes, a sitemap, robots, and a custom 404.</p>
        <p><strong>Editorial judgment:</strong> a small, honest site was better than a larger site filled with unverified biography. That choice made the first launch possible, but it also made the content feel thin. The next iteration had to add real material rather than more abstract copy.</p>

        <h3>3. Design choices that stayed</h3>
        <p>The existing system already had a clear typographic hierarchy, restrained wine accents, thin rules, and a strong left-copy / right-image home composition. Rebuilding that system would have added risk without improving recognition. The build therefore kept the tokens and page shell, and concentrated on content hierarchy: project evidence, article reading, and honest empty states.</p>
        <p>Images were handled conservatively. The project card uses actual screenshots of the build. The Music section uses an original vinyl illustration, not a photograph of a collection or a copyrighted sleeve. Life uses an original abstract illustration, not a personal photograph.</p>

        <h3>4. Problems encountered</h3>
        <p>A static site cannot rely on a backend to hide mistakes. Approval rules, anonymization, and build-time checks had to be explicit. One preflight review found an internal engineering marker in the public HTML; the package was held back, the marker was removed, and the package was rebuilt. That was slower than uploading first, but it kept internal language out of the public site.</p>
        <p>A second problem was the gap between “a page exists” and “a page has something worth reading.” The project and article work in this iteration is a response to that gap. Music and Life now open with clearly labelled editorial writing and one verified build log; personal music and life material is still withheld.</p>

        <h3>5. What was verified</h3>
        <p><strong>Fact:</strong> the public build was checked for twenty routes, HTTPS, canonical links, hreflang, sitemap, robots, 404, desktop and mobile layout, and a public-content privacy scan. The site was deployed through Cloudflare Pages Direct Upload and has a live pages.dev address. No public CMS, admin surface, database, or paid service is part of this static deployment.</p>
        <p>These are build facts, not performance claims. No traffic, ranking, conversion, or commercial outcome is asserted.</p>

        <h3>6. What remains open</h3>
        <p>The public project needs a confirmed role statement. The journal still needs real articles. Music needs verified names, listening notes, and image permissions. Life needs photographs, captions, dates, and consent. Those are material questions, not copy problems.</p>
        <p><strong>Next step:</strong> collect and approve real material, then add it through the same public-approval path. Until then, the honest state is a small public notebook with one documented website project and clearly marked samples.</p>
      </div>
      <p class="review-disclaimer">Editorial candidate only. Not owner-approved, not a personal résumé, and not included in the public deployment package.</p>
    </section>`;
  }
  return `<section class="editorial-section edition-section review-article" id="build-record">
    <div class="review-banner">编辑候选稿 · 尚未获本人批准作为正式作品公开</div>
    <span class="small-overline">REVIEW DRAFT / 建站记录</span>
    <h2>Brant Studio 建站记录：从构想到第一次上线</h2>
    <p class="review-deck">一篇关于公开网站如何被搭建、哪里做了取舍、遇到什么问题、什么仍然没有完成的记录。它描述这个网站，不声称未经确认的个人角色。</p>
    <div class="review-body">
      <h3>一、起点</h3>
      <p><strong>事实：</strong>项目始于一套已经存在的静态前台代码与既定的米白、酒红、衬线编辑视觉。第一项工作不是发明新的设计语言，而是把可复用的设计与不能安全公开的内容分开。</p>
      <p>旧页面中包含泛化介绍，也包含一些历史身份、学校、竞赛与引文材料。这些内容不能直接当作已确认的公开事实。于是工作规则变成：保留设计骨架；移除或暂缓没有依据的内容。</p>

      <h3>二、第一次上线</h3>
      <p><strong>事实：</strong>首个公开版本收敛为匿名展示版，加入明确标注的公开示例文章，并以静态站点形式部署到 Cloudflare Pages。公开站包含中英文八个内容模块、二十个路由、sitemap、robots 与自定义 404。</p>
      <p><strong>编辑判断：</strong>一个规模较小但诚实可核对的网站，比一个用未确认履历填满的网站更可取。这个选择让第一次上线成为可能，但也让内容显得单薄。下一轮必须增加真实材料，而不是继续增加抽象文案。</p>

      <h3>三、保留下来的设计选择</h3>
      <p>原有系统已经有清楚的字体层级、克制的酒红点缀、细分隔线，以及首页左文右图的构图。重做设计系统会增加风险，却不一定提高识别度。因此构建保留 tokens 与页面外壳，把精力放到内容层级：项目证据、文章阅读，以及清晰的内容状态。</p>
      <p>图片处理保持保守：项目卡使用网站自身的实际截图；Music 使用原创黑胶插画，而不是收藏照片或受版权保护的唱片封面；Life 使用原创抽象图，而不是个人照片。</p>

      <h3>四、实际遇到的问题</h3>
      <p>静态网站不能依赖后端来掩盖错误，公开批准、匿名化和构建检查必须显式存在。一次部署前检查发现公开 HTML 中混入了内部工程标记；那一次没有上传，而是撤回候选包、移除标记、重新构建。这比“先传再修”慢，但避免了把内部语言暴露给访客。</p>
      <p>第二个问题是“页面存在”与“页面值得读”之间的差距。本轮的 Project 与 Journal 内容就是对这个差距的回应。Music 与 Life 现在以明确标注的编辑内容与一条已核实建站记录开放；个人音乐与生活素材仍未确认。</p>

      <h3>五、已经验证的部分</h3>
      <p><strong>事实：</strong>公开构建检查了二十个路由、HTTPS、canonical、hreflang、sitemap、robots、404、桌面与移动端布局，以及公开内容隐私扫描。站点通过 Cloudflare Pages Direct Upload 发布，具有实际 pages.dev 地址。这个静态部署不包含公网 CMS、后台界面、数据库或付费服务。</p>
      <p>这些是构建事实，不是性能宣传。没有流量、排名、转化或商业结果的宣称。</p>

      <h3>六、仍然开放的部分</h3>
      <p>项目还需要一个经确认的角色说明；Journal 还需要真实文章；Music 需要可公开的音乐人、专辑、听感与图片授权；Life 需要照片、说明、时间与他人授权。这些是材料问题，不是再写几段通用文字就能解决的问题。</p>
      <p><strong>下一步：</strong>收集并批准真实材料，然后继续通过同一套公开批准路径加入。在此之前，诚实的版本就是：一个小型公开笔记，一个已经记录的网站项目，以及清楚标注的示例内容。</p>
    </div>
    <p class="review-disclaimer">编辑候选稿。不是本人已批准的内容，不是个人简历，也不包含在公开部署包中。</p>
  </section>`;
}
function now(lang) {
  const items = lang === 'zh' ? [
    ['01 / LEARNING', '学习方法', '目前关注如何把问题拆解、把证据分级，以及让分析过程可复核。具体课程、项目与进度待确认。'],
    ['02 / READING', '阅读方向', '阅读笔记将围绕论证结构、证据质量与概念边界展开；书目与论文清单尚未确认。'],
    ['03 / LISTENING', '聆听笔记', '把声音当作注意力的练习，暂不公开具体专辑与私人听感。'],
    ['04 / BUILDING', '这个网站', '继续完善公开内容的编辑结构，并保持私人草稿、后台与公开构建的隔离。'],
  ] : [
    ['01 / LEARNING', 'Learning', 'Currently interested in breaking questions down, grading evidence, and making analysis reviewable. Specific courses, projects, and progress remain unconfirmed.'],
    ['02 / READING', 'Reading', 'Reading notes will focus on argument structure, evidence quality, and conceptual boundaries. A book and paper list is not yet confirmed.'],
    ['03 / LISTENING', 'Listening', 'Treating sound as a practice of attention. Specific albums and private responses are not public yet.'],
    ['04 / BUILDING', 'This site', 'Continuing the editorial structure of the public notebook while keeping private drafts, admin, and the public build separate.'],
  ];
  return `${pageHero(lang, copy(lang, '现在 / NOW', 'NOW / 现在'), copy(lang, '现在进行时，\n但不表演进度。', 'In the present tense.\nWithout performing progress.'), copy(lang, '这一页只说明当前关注的方向；具体书目、课程、项目与数据在确认后再补充。', 'This page names current directions only. Specific books, courses, projects, and data will be added after confirmation.'))}
  <section class="editorial-section edition-section" data-visual-fallback="now-focus">
    ${sectionHeading(lang, '01 / CURRENTLY', copy(lang, '当前关注', 'Currently'), 'LAST UPDATED / 2026-10')}
    <div class="edition-grid edition-grid-two">
      ${items.map(([label, title, text]) => `<article class="edition-card"><span class="edition-card-number">${esc(label)}</span><h3>${esc(title)}</h3><p>${esc(text)}</p></article>`).join('')}
    </div>
  </section>
  <section class="editorial-section edition-section edition-split" data-visual-fallback="now-intro">
    <div class="intro-serif">${copy(lang, '不把“正在做”\n写成“已经完成”。', 'Do not turn “working on”\ninto “finished”.')}</div>
    <div><p class="body-copy">${copy(lang, 'Now 页面会持续更新，但不会用模糊的忙碌感代替具体信息。没有确认的内容，就暂时留白。', 'The Now page will keep changing, but it will not replace specifics with a vague sense of busyness. What is unconfirmed stays blank for now.')}</p><p class="edition-fact">${copy(lang, '待确认：当前课程/阅读书目 / 可公开学习进度 / 可公开项目', 'Pending: current courses/reading list / publishable learning progress / publishable projects')}</p></div>
  </section>`;
}

export function renderEditionPage(lang, page, articleIndex = '', reviewHtml = '') {
  switch (page) {
    case 'home': return home(lang);
    case 'about': return about(lang);
    case 'research': return research(lang);
    case 'projects': return projects(lang);
    case 'journal': return journal(lang, articleIndex, reviewHtml);
    case 'music': return musicEdition(lang);
    case 'life': return lifeEdition(lang);
    case 'now': return now(lang);
    default: return '';
  }
}
