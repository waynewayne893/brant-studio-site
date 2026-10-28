import { PAGE_KEYS } from './core.js';
import {
  navItems, pageData, researchModules, musicModules,
  projectItems, journalItems, journalCategories, lifeItems, lifeCategories,
  labItems, labCategories, nowCards, musicItems, galleryItems,
  skillGroups, musicArtists, featuredAlbumNote, featuredAlbumReview, wakeUpTheme,
  siteName, demoLabel, getText, safeImagePath,
} from './content.js';

export function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[c]);
}

const tx = (record, lang) => escapeHtml(getText(record, lang));
// `copy` only receives in-source editorial literals; allow explicit line-break tokens.
const copy = (zh, en, lang) => escapeHtml(lang === 'en' ? en : zh).replace(/&lt;br&gt;/g, '<br>');
const titleLines = (record, lang) => tx(record, lang).replace(/\n/g, '<br>');
const kicker = (text, lang) => `<p class="eyebrow">${tx(text, lang)}</p>`;
const demo = lang => `<span class="demo-tag">${tx(demoLabel, lang)}</span>`;
const arrow = '<span aria-hidden="true">↗</span>';

function sectionHeading(num, heading, sub = '') {
  return `<div class="section-heading"><span class="section-number">${escapeHtml(num)}</span><h2>${heading}</h2>${sub ? `<p>${sub}</p>` : ''}</div>`;
}

function pageHero(page, lang, suffix = '') {
  const data = pageData[page];
  const hasEmptySections = ['lab', 'journal', 'life'].includes(page);
  const label = hasEmptySections ? `<span class="demo-tag">${copy('页面结构已就绪 · 内容逐步更新', 'FRAMEWORK READY · CONTENT TO FOLLOW', lang)}</span>` : page === 'gallery' ? demo(lang) : '';
  return `<section class="page-hero ${suffix}"><div class="page-hero-top">${kicker(data.kicker, lang)}${label}</div><h1 class="display-title">${titleLines(data.title, lang)}</h1><p class="page-lead">${tx(data.lead, lang)}</p></section>`;
}

function cta(href, zh, en, lang, extra = '') {
  return `<a class="text-link ${extra}" href="${escapeHtml(href)}"><span>${copy(zh, en, lang)}</span>${arrow}</a>`;
}

function emptyState(zh, en, lang) {
  return `<div class="empty-state"><span class="empty-star" aria-hidden="true">✳</span><p>${copy(zh, en, lang)}</p></div>`;
}

export function renderNav(lang = 'zh', active = '') {
  const items = navItems.map(item => {
    const current = item.id === active ? ' aria-current="page"' : '';
    return `<a class="nav-link ${item.id === active ? 'is-active' : ''}" href="#/${item.id}"${current}>${tx(item.label, lang)}</a>`;
  }).join('');
  return `<header class="site-header"><div class="nav-frame">
    <a class="site-logo" href="#/home" aria-label="${copy('返回首页', 'Go home', lang)}"><span class="logo-mark">P<span class="logo-dot">.</span></span><span class="logo-caption">${tx(siteName, lang)}</span></a>
    <div class="nav-actions">
      <nav class="primary-nav" id="primary-nav" aria-label="${copy('主导航', 'Primary navigation', lang)}">${items}</nav>
      <button class="lang-button" type="button" data-lang-switch aria-label="${copy('切换为英文', 'Switch to Chinese', lang)}"><span class="${lang === 'zh' ? 'lang-current' : ''}">中</span><span class="lang-divider">/</span><span class="${lang === 'en' ? 'lang-current' : ''}">EN</span></button>
      <button class="menu-button" type="button" data-menu-toggle aria-controls="primary-nav" aria-expanded="false" aria-label="${copy('打开导航菜单', 'Open navigation menu', lang)}"><span></span><span></span></button>
    </div></div></header>`;
}

export function renderFooter(lang = 'zh') {
  return `<footer class="site-footer"><div class="footer-top"><div><span class="footer-monogram">P.</span><p>${copy('学习、表达、继续向前。', 'Learn. Express. Keep moving.', lang)}</p></div><div class="footer-links"><a href="#/about">${copy('关于', 'About', lang)}</a><a href="#/now">Now</a><a href="#/gallery">Gallery</a><a href="#/music">Music</a></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Personal Space</span><span>${copy('一处尚在生长的个人角落', 'A space still growing', lang)} · ${copy('持续更新', 'Updated over time', lang)}</span><a class="footer-github" href="https://github.com/waynewayne893" target="_blank" rel="noopener noreferrer" data-github-profile="true" aria-label="${copy('GitHub 主页（在新窗口打开）', 'GitHub profile (opens in a new window)', lang)}" title="${copy('GitHub 主页（在新窗口打开）', 'GitHub profile (opens in a new window)', lang)}" style="display:inline-flex;align-items:center;gap:6px;margin-left:14px;color:inherit;text-decoration:none;vertical-align:middle;"><svg aria-hidden="true" viewBox="0 0 16 16" width="14" height="14" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.6 7.6 0 0 1 4 0c1.53-1.03 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.28.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z"/></svg><span>GitHub</span></a><a href="#/home">↑ ${copy('回到顶部', 'Back to top', lang)}</a></div></footer>`;
}

function renderHome(lang) {
  const data = pageData.home;
  const project = projectItems[0];
  return `<section class="home-hero"><div class="home-hero-copy">
    <div class="hero-overline">${kicker(data.kicker, lang)}<span class="hero-edition">VOL. 001 &nbsp; / &nbsp; PERSONAL ARCHIVE</span></div>
    <h1 class="display-title home-title">${titleLines(data.title, lang)}</h1>
    <p class="hero-identity">${tx(data.identity, lang)}</p>
    <div class="hero-lyric" aria-label="${copy('我喜欢的歌词，出自 Asen《在雨后醒来》', 'A favorite line from Asen’s 《在雨后醒来》', lang)}">${wakeUpTheme.lines.map(line => `<p class="hero-lyric-line">${escapeHtml(line)}</p>`).join('')}<p class="hero-lyric-source">— ${tx(wakeUpTheme.source, lang)}</p></div>
    <div class="hero-bottom">${cta('#/about', '认识我', 'About Me', lang)}<span class="hero-scroll">${copy('向下探索', 'SCROLL TO EXPLORE', lang)} ↓</span></div>
  </div><div class="home-hero-visual"><img src="./assets/architecture-hero.svg" alt="${copy('原创黑白建筑风格艺术插画', 'Original black-and-white architectural illustration', lang)}"></div></section>
  <div class="running-line"><span>QUANTITATIVE THINKING</span><span>✳</span><span>CREATIVE LIVING</span><span>✳</span><span>STRENGTH &amp; KINDNESS</span><span>✳</span><span>AN OPEN NOTEBOOK</span></div>
  <section class="home-intro editorial-section">${sectionHeading('01 /', copy('思考 · 探索', 'Thought & Exploration', lang), copy('专业与生活的交汇', 'WHERE LEARNING MEETS LIFE', lang))}
    <div class="home-two-col"><div class="intro-serif">${copy('用理性理解世界，<br>也为表达留下空间。', 'A rational lens on the world,<br>with room for expression.', lang)}</div><div><p class="body-copy">${copy('作为金融专业硕士在读生，我正在积累知识、方法与独立思考的能力。这个空间也记录音乐、文字和生活带给我的触动。', 'As a graduate student in finance, I am developing knowledge, research methods, and my own way of thinking. This space also holds music, writing, and moments from life.', lang)}</p>${cta('#/research', '进入学习与探索', 'Explore My Academic Journey', lang)}</div></div>
  </section>
  <section class="home-focus editorial-section"><div class="split-top">${sectionHeading('02 /', 'Academic Journey', copy('学习与探索 · 持续成长', 'LEARNING & GROWTH', lang))}${cta('#/research', '查看学习与探索', 'Explore My Journey', lang)}</div>
    <div class="focus-grid"><div class="focus-art" aria-hidden="true"><span class="orbit orbit-1"></span><span class="orbit orbit-2"></span><span class="orbit orbit-3"></span><span class="focus-cross">+</span><span class="focus-figure">A / 01</span></div><div class="focus-copy"><p class="small-overline">FINANCE · METHODS · THINKING</p><h3>${copy('在学习中建立自己的方法。', 'Building my own way of thinking.', lang)}</h3><p>${copy('金融知识、研究方法、独立思考与表达——比起提前定义研究标签，我更希望先如实记录能力成长的过程。', 'Financial knowledge, research methods, independent thinking, and expression. For now, I would rather document how I am learning than publish a specific research label.', lang)}</p>${cta('#/research', '学习档案', 'Academic archive', lang)}</div></div>
  </section>
  <section class="editorial-section"><div class="split-top">${sectionHeading('03 /', 'Selected Projects', copy('团队协作 · 实践成果', 'COLLABORATIVE WORK · PRACTICE', lang))}${cta('#/projects', '全部项目', 'All projects', lang)}</div>
    <div class="teaser-grid teaser-grid-featured"><article class="teaser-card"><div class="teaser-graphic teaser-graphic-one"><span>01 / FINTECH</span><div class="graphic-lines" aria-hidden="true"></div></div><div class="teaser-caption"><span>${tx(project.award, lang)}</span><h3>${tx(project.title, lang)}</h3><p>${tx(project.role, lang)} · ${tx(project.team, lang)}</p></div></article><div class="teaser-feature-copy"><span class="small-overline">TEAM PROJECT / 2026</span><h3>${copy('从监测到部署，<br>让模型持续迭代。', 'A model that<br>learns to evolve.', lang)}</h3><p>${tx(project.summary, lang)}</p>${cta('#/projects', '查看项目详情', 'Read project details', lang)}</div></div>
  </section>
  <section class="now-band"><div><span class="small-overline">04 / THE NOW PAGE</span><h2>${copy('此刻，正在发生。', 'What is happening now.', lang)}</h2></div><p>${copy('最近在读、在学、在听什么？留一张随时可以改写的便签。', 'What am I reading, learning, listening to? An editable note from the present.', lang)}</p>${cta('#/now', '看看 Now', 'Visit Now', lang)}</section>
  <section class="editorial-section music-preview"><div class="split-top">${sectionHeading('05 /', 'On Repeat', copy('音乐是另一种叙事', 'ANOTHER KIND OF STORY', lang))}${cta('#/music', '进入音乐专区', 'Enter Music Archive', lang)}</div><div class="music-preview-grid"><div class="music-preview-photo"><img src="./assets/vinyl-hero.svg" alt="${copy('原创唱片静物插画，并非专辑封面', 'Original vinyl still life, not an album cover', lang)}" loading="lazy"></div><div class="music-preview-copy"><span class="small-overline">CHINESE HIP-HOP / LISTENING NOTES</span><h3>${tx(musicItems[0].title, lang)}<span class="heading-period">.</span></h3><p>${tx(featuredAlbumNote, lang)}</p><p class="home-featured-artists">${musicArtists.slice(0, 3).map(item => `<span>${escapeHtml(item.name)}</span>`).join('')}</p>${cta('#/music', '探索我的声音档案', 'Explore my listening archive', lang)}</div></div></section>
  <section class="editorial-section home-bottom"><div class="mini-editorial"><span class="small-overline">06 / VISUAL DIARY</span><h2>Gallery<span class="heading-period">.</span></h2><div class="gallery-preview-art" aria-label="${copy('原创占位影像', 'Original illustrative placeholder', lang)}"><img src="./assets/gallery-placeholder.svg" alt="${copy('抽象城市影像占位插画，非个人照片', 'Abstract city placeholder, not a personal photograph', lang)}" loading="lazy"></div><p>${copy('一些未曾说出口的细节，交给镜头。个人照片待补充。', 'Details best left to a lens. Personal photographs to follow.', lang)}</p>${cta('#/gallery', '查看影像集', 'View Gallery', lang)}</div><div class="mini-editorial"><span class="small-overline">07 / WORDS & MOMENTS</span><h2>Journal <em>&</em> Life<span class="heading-period">.</span></h2><div class="journal-rule"><span>NOTE / 001</span><span>${copy('准备记录', 'READY FOR NOTES', lang)}</span></div><h3>${copy('把日常写成自己的注脚。', 'Footnotes to an ordinary day.', lang)}</h3><p>${copy('阅读、城市、经历与想法；关于我的更多切面，都会慢慢出现。', 'Reading, cities, experiences, ideas—more sides of the story will appear over time.', lang)}</p><div class="double-cta">${cta('#/journal', '阅读随笔', 'Read Journal', lang)}${cta('#/life', '生活记录', 'Life Notes', lang)}</div></div></section>`;
}

function renderAbout(lang) {
  return `${pageHero('about', lang)}
    <section class="editorial-section about-grid">
      <div class="about-portrait"><div class="portrait-placeholder"><span>P.</span><small>PORTRAIT / TO BE ADDED</small></div><p class="art-caption">FIG. 02 — ${copy('头像由本人日后选择', 'Portrait to be selected later', lang)}</p></div>
      <div class="about-story"><span class="small-overline">A SHORT INTRODUCTION</span>
        <h2>${copy('在好奇与秩序之间，<br>寻找自己的方式。', 'Somewhere between<br>curiosity and structure.', lang)}</h2>
        <p>${copy('我是郭程（Brant Wayne），目前就读于西华大学经济学院，金融专业硕士在读。本科阶段学习金融工程；进入研究生阶段后，我希望继续拓展金融知识、研究方法与独立思考能力。', 'I am Guo Cheng (Brant Wayne), a Master of Finance student at the School of Economics, Xihua University. I studied Financial Engineering as an undergraduate, and I am now developing a stronger foundation in finance, research methods, and independent thinking.', lang)}</p>
        <p>${copy('我也喜欢中文 Hip-hop、文字与日常观察。专业训练帮助我理解问题，音乐和表达让我记得生活不只有一种维度。这里记录项目、学习过程，以及值得留下的片段。', 'I also enjoy Chinese hip-hop, writing, and observing everyday life. Academic work gives me ways to approach problems; music and expression remind me that life has more than one dimension. This site records projects, learning, and moments worth keeping.', lang)}</p>
        <div class="fact-rows">
          <div><span>01</span><strong>${copy('现在', 'Now', lang)}</strong><p>${copy('西华大学 · 经济学院 · 金融专业硕士在读', 'Master of Finance · School of Economics · Xihua University', lang)}</p></div>
          <div><span>02</span><strong>${copy('本科阶段', 'Undergraduate', lang)}</strong><p>${copy('本科所学专业：金融工程', 'Undergraduate major: Financial Engineering', lang)}</p></div>
          <div><span>03</span><strong>${copy('声音偏好', 'A Soundtrack', lang)}</strong><p>${copy('中文 Hip-hop 与音乐表达', 'Chinese hip-hop & musical expression', lang)}</p></div>
        </div>
      </div>
    </section>
    <section class="editorial-section about-compass"><div class="split-top">${sectionHeading('VOICE /', copy('韧性与温柔', 'Resilience and Kindness', lang), copy('学习与生活之外，我也从音乐里寻找答案', 'A PERSONAL NOTE ON THE MUSIC THAT STAYS', lang))}</div><div class="about-compass-grid"><h2>${copy('继续变强，<br>也继续温柔。', 'Keep growing stronger.<br>Keep a gentle heart.', lang)}</h2><div><p>${tx(wakeUpTheme.about, lang)}</p><span class="small-overline">${tx(wakeUpTheme.source, lang)}</span><div>${cta('#/music', '到 Music 读更多', 'Read more in Music', lang)}</div></div></div></section>
    <section class="editorial-section"><div class="split-top">${sectionHeading('MORE /', copy('几个关于我的关键词', 'A few keywords', lang))}</div><div class="keyword-row"><span>CURIOUS</span><span>ANALYTICAL</span><span>OPEN-MINDED</span><span>CREATIVE</span></div><p class="about-followup">${copy('具体研究方向暂不公开；项目和技能经历可在“学习与探索”及“项目”栏目查看。', 'My specific research focus is private for now. See Academic Journey and Projects for skills and practical work.', lang)}</p></section>`;
}

function renderResearch(lang) {
  return `${pageHero('research', lang)}
    <div class="research-topline"><span>${copy('知识 / 方法 / 思考', 'KNOWLEDGE / METHODS / THINKING', lang)}</span><span>ACADEMIC JOURNEY / V.01</span></div>
    <div class="research-modules">${researchModules.map((item, i) => `<section class="research-module editorial-section" id="${item.id}">
      <div class="research-num">${item.number}<span class="research-line"></span></div>
      <div class="research-copy"><span class="small-overline">${tx(item.eyebrow, lang)}</span><h2>${tx(item.title, lang)}</h2><p>${tx(item.description, lang)}</p><div class="tag-row">${item.tags.map(tag => `<span>${tx(tag, lang)}</span>`).join('')}</div></div>
      <div class="research-art research-art-${i+1}" aria-hidden="true">${i === 0 ? '<div class="wire-orbit"><i></i><i></i><i></i></div>' : i === 1 ? '<div class="wire-stairs"><i></i><i></i><i></i><i></i></div>' : '<div class="wire-matrix"><span>∑</span><span>∂</span><span>σ</span><span>∞</span></div>'}</div>
    </section>`).join('')}</div>
    <section class="editorial-section skills-section">
      <div class="split-top">${sectionHeading('TOOLS /', copy('我的工具与技能', 'Tools & Skills', lang), copy('区分已使用与正在深化的能力', 'PRACTICE AND CONTINUING LEARNING', lang))}</div>
      <div class="skill-level-grid">${skillGroups.map(group => `<article class="skill-level-card">
        <span class="small-overline">${group.id === 'experience' ? '01 / IN PRACTICE' : '02 / IN PROGRESS'}</span>
        <h3>${tx(group.title, lang)}</h3><p>${tx(group.note, lang)}</p>
        <div class="skill-tags">${(lang === 'en' && group.itemsEn ? group.itemsEn : group.items).map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>
      </article>`).join('')}</div>
    </section>
    <section class="closing-callout"><span class="small-overline">A WORK IN PROGRESS</span><h2>${copy('成长是可以慢慢积累的。', 'Growth happens through practice.', lang)}</h2><p>${copy('具体研究方向暂不公开，后续会继续记录经本人确认可分享的学习经历。', 'Specific research topics remain private. Shareable learning milestones will be added over time.', lang)}</p>${cta('#/projects', '看看实践项目', 'Explore projects', lang)}</section>`;
}

function renderProjects(lang) {
  return `${pageHero('projects', lang)}
    <section class="editorial-section">
      <div class="split-top">${sectionHeading('01 /', copy('精选项目', 'Selected Work', lang), copy('团队作品 · 已确认的公开信息', 'TEAM WORK · OWNER-CONFIRMED INFORMATION', lang))}</div>
      ${projectItems.map((item, index) => `<article class="project-case">
        <div class="project-case-header">
          <div><span class="small-overline">CASE STUDY / 00${index + 1} &nbsp; · &nbsp; FINTECH</span><h2>${tx(item.title, lang)}</h2><p>${tx(item.summary, lang)}</p></div>
          <div class="project-prize"><span>${tx(item.award, lang)}</span><small>${tx(item.competition, lang)}</small></div>
        </div>
        <div class="project-case-meta">
          <div><span class="small-overline">TEAM</span><strong>${tx(item.team, lang)}</strong></div>
          <div><span class="small-overline">MY CONTRIBUTION</span><strong>${tx(item.role, lang)}</strong></div>
        </div>
        <div class="project-flow" aria-label="${copy('风控系统流程：监测、根因、迭代、部署', 'Risk system flow: monitor, root cause, iterate, deploy', lang)}">
          ${item.systemStages.map((stage, i) => `<div class="flow-stage ${i === 2 ? 'flow-stage-highlight' : ''}"><span>0${i + 1}</span><strong>${tx(stage, lang)}</strong><small>${['MONITOR', 'ROOT CAUSE', 'ITERATE', 'DEPLOY'][i]}</small></div>`).join('')}
        </div>
        <div class="project-detail-grid">
          <div><span class="small-overline">ROLE & COLLABORATION</span><h3>${copy('我的参与和分工', 'My Role in the Team', lang)}</h3><p>${tx(item.focus, lang)}</p></div>
          <div><span class="small-overline">MODULE / 03</span><h3>${copy('迭代模块', 'The Iteration Module', lang)}</h3><p>${tx(item.iteration, lang)}</p></div>
        </div>
        <p class="project-credit-note">${copy('该作品由团队共同完成。页面仅描述本人参与部分，暂不公开队员及指导教师的个人信息，也不展示未获公开许可的代码、数据和原始资料。', 'This is a collaborative team project. The page describes my contributions without identifying teammates or mentors, and does not publish private code, data, or source documents.', lang)}</p>
      </article>`).join('')}
    </section>
    <section class="editorial-section lab-entry"><div><span class="small-overline">02 / EXPERIMENTAL SPACE</span><h2>Lab<span class="heading-period">.</span></h2><p>${copy('一个专门留给模型、图表、算法和小实验的角落。', 'An experimental corner for models, charts, algorithms, and small ideas.', lang)}</p></div><div class="lab-entry-graphic" aria-hidden="true"><span class="lab-grid-dot"></span><span class="lab-grid-dot"></span><span class="lab-grid-dot"></span><span class="lab-grid-dot"></span></div>${cta('#/lab', '进入实验室', 'Enter the Lab', lang)}</section>`;
}


function archiveTabs(page, categories, selected, lang) {
  const items = [{ id: 'all', title: { zh: '全部', en: 'All' } }, ...categories];
  return `<div class="archive-tabs" role="group" aria-label="${copy('内容分类筛选', 'Filter by category', lang)}">${items.map(item => `<button type="button" class="archive-tab ${selected === item.id ? 'is-selected' : ''}" data-category-select="${page}:${item.id}" aria-pressed="${selected === item.id}">${tx(item.title, lang)}</button>`).join('')}</div>`;
}

function selectedArchiveCategory(categories, selection) {
  return categories.some(item => item.id === selection) ? selection : 'all';
}

function journalEntry(item, lang) {
  const category = journalCategories.find(type => type.id === item.category);
  if (!category) return '';
  const date = typeof item.date === 'string' && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(item.date) ? `<time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date)}</time>` : '';
  if (item.category === 'quotes') {
    if (typeof item.original !== 'string' || !item.original.trim()) return '';
    return `<article class="journal-entry quote-entry"><div class="journal-entry-meta">${tx(category.title, lang)} ${date}</div><span class="quote-glyph" aria-hidden="true">“</span><blockquote>${escapeHtml(item.original)}</blockquote>${item.source ? `<p class="quote-source">— ${tx(item.source, lang)}</p>` : ''}${item.translation ? `<p class="quote-translation">${tx(item.translation, lang)}</p>` : ''}${item.reflection ? `<p class="quote-reflection">${tx(item.reflection, lang)}</p>` : ''}</article>`;
  }
  if (!item.title) return '';
  return `<article class="journal-entry"><div class="journal-entry-meta">${tx(category.title, lang)} ${date}</div><h3>${tx(item.title, lang)}</h3>${item.summary ? `<p>${tx(item.summary, lang)}</p>` : ''}</article>`;
}

function renderJournal(lang, requestedCategory = 'all') {
  const selected = selectedArchiveCategory(journalCategories, requestedCategory);
  const category = journalCategories.find(item => item.id === selected);
  const entries = journalItems.filter(item => journalCategories.some(type => type.id === item.category) && (selected === 'all' || item.category === selected) && (item.category === 'quotes' ? typeof item.original === 'string' && item.original.trim() : item.title));
  return `${pageHero('journal', lang)}
    <section class="editorial-section journal-architecture">
      <div class="split-top">${sectionHeading('01 /', copy('文字档案', 'The Written Archive', lang), copy('四种记录方式，同一份好奇', 'FOUR WAYS TO KEEP A THOUGHT', lang))}<span class="section-aside">JOURNAL / 004 CATEGORIES</span></div>
      <div class="archive-catalog">${journalCategories.map(item => `<div class="archive-catalog-item"><span>${item.number} / ${tx(item.title, lang)}</span><p>${tx(item.description, lang)}</p></div>`).join('')}</div>
    </section>
    <section class="editorial-section journal-archive" aria-label="${copy('文章与收藏列表', 'Journal entries', lang)}">
      <div class="split-top">${sectionHeading('02 /', copy('档案列表', 'Browse the Notes', lang), copy('选择分类查看，内容陆续补充', 'CHOOSE A CATEGORY TO BROWSE', lang))}</div>
      ${archiveTabs('journal', journalCategories, selected, lang)}
      <div class="archive-selected-intro"><span class="small-overline">${category ? tx(category.title, lang) : 'ALL NOTES'}</span><p>${category ? tx(category.description, lang) : copy('这里会按时间收录所有正式发布的文字。', 'Published writing will appear here, ordered over time.', lang)}</p></div>
      ${entries.length ? `<div class="journal-entry-list">${entries.map(item => journalEntry(item, lang)).join('')}</div>` : `<div class="journal-empty"><div class="journal-empty-visual" aria-hidden="true"><span class="journal-large-number">00</span><span class="journal-empty-asterisk">✳</span></div><div><span class="small-overline">WORDS WILL FOLLOW</span><h2>${copy('第一页，留给未来。', 'A blank page, for now.', lang)}</h2><p>${copy('暂无正式发布的内容。文章、原句与出处会在逐一确认后加入；不会用虚构文字填充。', 'No posts have been published yet. Actual notes, original quotes, and sources will be added once confirmed.', lang)}</p></div></div>`}
    </section>`;
}

function renderLab(lang) {
  return `${pageHero('lab', lang)}
    <section class="editorial-section lab-introduction">
      <div class="lab-intro-copy"><span class="small-overline">OPEN WORKSPACE / LAB</span><h2>${copy('想法先有容身之处，<br>作品再慢慢长出来。', 'An open space for ideas<br>before they become work.', lang)}</h2><p>${copy('这里已经搭好三个分类和展示区域。只有完成核实、适合公开的真实实验与工具，才会正式出现在作品清单里。', 'Three areas are ready. Only genuine, verified work suitable for public sharing will appear in the project listings.', lang)}</p></div>
      <div class="lab-art-composition" aria-hidden="true"><span class="lab-art-frame"><i></i><i></i><i></i></span><span class="lab-art-initial">L.</span><span class="lab-art-caption">IDEAS / STRUCTURE / SPACE</span></div>
    </section>
    <section class="editorial-section lab-workspace">
      <div class="split-top">${sectionHeading('01 /', copy('探索的三个方向', 'Three Areas of Exploration', lang), copy('分类已建立 · 真实作品待补充', 'STRUCTURE READY · WORK TO FOLLOW', lang))}</div>
      <div class="lab-category-list">${labCategories.map((item, i) => {
        const works = labItems.filter(work => work.category === item.id && work.title);
        return `<section class="lab-category" id="lab-${item.id}" aria-label="${tx(item.title, lang)}"><div class="lab-category-art lab-category-art-${i + 1}" aria-hidden="true"><span class="lab-art-shape"></span><span class="lab-art-shape-two"></span><strong>${item.number}</strong></div><div class="lab-category-copy"><div class="lab-category-top"><span class="small-overline">AREA / ${item.number}</span><span class="lab-category-status">${copy('等待真实作品', 'AWAITING REAL WORK', lang)}</span></div><h3>${tx(item.title, lang)}</h3><p>${tx(item.description, lang)}</p>${works.length ? `<div class="lab-work-list">${works.filter(work => work.title).map(work => `<article class="lab-work"><h4>${tx(work.title, lang)}</h4>${work.description ? `<p>${tx(work.description, lang)}</p>` : ''}</article>`).join('')}</div>` : `<div class="lab-empty"><span aria-hidden="true">✳</span><div><strong>${copy('尚无公开作品', 'No work published yet', lang)}</strong><p>${copy('这里以后展示经过确认的真实内容，不使用虚构实验或结果。', 'Real, verified work will appear here—no invented experiments or results.', lang)}</p></div></div>`}</div></section>`;
      }).join('')}</div>
    </section>`;
}

function renderMusic(lang) {
  const data = pageData.music;
  return `<section class="music-hero">
    <div class="music-hero-visual"><img src="./assets/vinyl-hero.svg" alt="${copy('原创黑白黑胶唱片静物艺术，并非专辑封面', 'Original monochrome vinyl artwork, not an album cover', lang)}"><span class="music-hero-photo-caption">SIDE A / A PERSONAL SOUNDTRACK</span></div>
    <div class="music-hero-copy">${kicker(data.kicker, lang)}<div class="music-hero-disc">◉ &nbsp; THE SOUND OF ME &nbsp; ◉</div><h1 class="display-title">${titleLines(data.title, lang)}</h1><p>${tx(data.lead, lang)}</p><div class="music-hero-footer"><span>PERSONAL MUSIC ARCHIVE</span><span>33⅓ RPM / VOL.001</span></div></div>
  </section>
  <div class="music-marquee"><span>HIP-HOP</span><span>✳</span><span>BEATS</span><span>✳</span><span>STORIES</span><span>✳</span><span>CHINESE RAP</span><span>✳</span><span>ON REPEAT</span></div>
  <section class="editorial-section music-section" id="artists">
    <div class="split-top">${sectionHeading('01 /', 'Featured Artists', tx(musicModules[0].lead, lang))}<span class="section-aside">ARTIST FILES / 006</span></div>
    <div class="music-artist-grid">${musicArtists.map((item, i) => `<article class="music-artist-card ${i < 3 ? 'artist-priority' : ''}">
      <span class="music-artist-index">ARTIST / 0${i + 1}</span><div class="artist-card-symbol" aria-hidden="true">${['✳','✦','◉','✺','✱','◇'][i]}</div>
      <h3>${escapeHtml(item.name)}</h3><p>${tx(item.detail, lang)}</p>
    </article>`).join('')}</div>
    <p class="section-footnote">${copy('这里收录的是我喜欢的音乐人及组合。RICHNOMADIC 以双人组合列出。', 'These are artists and acts I enjoy; RICHNOMADIC is listed as a duo.', lang)}</p>
  </section>
  <section class="editorial-section music-section" id="repeat">
    <div class="split-top">${sectionHeading('02 /', 'On Repeat', tx(musicModules[1].lead, lang))}<span class="section-aside">PERSONAL HIGHLIGHT / 001</span></div>
    <div class="record-feature">
      <div class="record-feature-art" aria-label="${copy('原创唱片图形，并非《冰冷热带鱼》封面', 'Original record graphic, not the album cover', lang)}"><div class="record-disc" aria-hidden="true"><span>33⅓</span></div><span class="record-art-caption">NO COVER ART / ORIGINAL GRAPHIC</span></div>
      <div class="record-feature-copy"><span class="small-overline">CURRENT FAVORITE / CHINESE HIP-HOP</span><h2>《${tx(musicItems[0].title, lang)}》</h2><p>${tx(featuredAlbumNote, lang)}</p><a href="#notes" class="text-link"><span>${copy('读我的专辑手记', 'Read my listening note', lang)}</span><span aria-hidden="true">↗</span></a></div>
    </div>
  </section>
  <section class="editorial-section music-section" id="albums">
    <div class="split-top">${sectionHeading('03 /', 'Album Collection', tx(musicModules[2].lead, lang))}<span class="section-aside">LISTENING SHELF / 003</span></div>
    <div class="album-list">${musicItems.slice(1).map((item, i) => `<div class="album-list-row"><span class="album-list-no">0${i + 1}</span><div><h3>《${tx(item.title, lang)}》</h3><p>${tx(item.artist, lang)}</p></div><span class="album-list-mark" aria-hidden="true">↗</span></div>`).join('')}</div>
    <p class="section-footnote">${copy('这是喜欢的作品清单，暂未附个人评论；插画不是官方专辑封面。', 'A list of records I enjoy, with personal notes to follow. No official cover art is used.', lang)}</p>
  </section>
  <section class="editorial-section music-section" id="notes">
    <div class="split-top">${sectionHeading('04 /', 'Music Notes', tx(musicModules[3].lead, lang))}</div>
    <article class="listening-note"><span class="small-overline">LISTENING JOURNAL / 001</span><h2>《${tx(musicItems[0].title, lang)}》</h2>
      <div class="listening-note-body">${getText(featuredAlbumReview, lang).split(/\n\s*\n/).map(paragraph => `<p>${escapeHtml(paragraph)}</p>`).join('')}</div>
      <span class="listening-note-end">✳</span>
    </article>
  </section>
  <section class="editorial-section music-section" id="compass">
    <div class="split-top">${sectionHeading('05 /', copy('韧性与温柔', 'Voice & Resilience', lang), tx(musicModules[4].lead, lang))}<span class="section-aside">ASEN / PERSONAL COMPASS</span></div>
    <div class="music-compass"><div class="music-compass-quote"><span class="small-overline">A LINE I KEEP CLOSE</span><blockquote>${wakeUpTheme.lines.map(line => `<span>${escapeHtml(line)}</span>`).join('')}</blockquote><p>— ${tx(wakeUpTheme.source, lang)}</p></div><div class="music-compass-note"><span class="small-overline">WHY THIS STAYS WITH ME</span><h3>${copy('不怕被击败，<br>也不丢掉温柔。', 'Courage without<br>losing kindness.', lang)}</h3><p>${tx(wakeUpTheme.note, lang)}</p></div></div>
  </section>`;
}


function lifeEntry(item, lang) {
  if (!item.title || !item.body || typeof item.date !== 'string' || !/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(item.date)) return '';
  const category = lifeCategories.find(entry => entry.id === item.category);
  if (!category) return '';
  const src = safeImagePath(item.image);
  return `<article class="life-timeline-entry"><div class="life-timeline-date"><time datetime="${escapeHtml(item.date)}">${escapeHtml(item.date)}</time><span aria-hidden="true" class="life-timeline-dot"></span></div><div class="life-timeline-content"><span class="small-overline">${tx(category.title, lang)}</span><h3>${tx(item.title, lang)}</h3><p>${tx(item.body, lang)}</p>${Array.isArray(item.tags) && item.tags.length ? `<div class="life-tags">${item.tags.map(tag => `<span>${typeof tag === 'string' ? escapeHtml(tag) : tx(tag, lang)}</span>`).join('')}</div>` : ''}${src ? `<img src="${escapeHtml(src)}" alt="${item.imageAlt ? tx(item.imageAlt, lang) : tx(item.title, lang)}" loading="lazy">` : ''}</div></article>`;
}

function renderLife(lang, requestedCategory = 'all') {
  const selected = selectedArchiveCategory(lifeCategories, requestedCategory);
  const category = lifeCategories.find(item => item.id === selected);
  const entries = lifeItems.filter(item => lifeCategories.some(type => type.id === item.category) && (selected === 'all' || item.category === selected) && item.title && item.body && typeof item.date === 'string' && /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(item.date)).slice().sort((a, b) => b.date.localeCompare(a.date));
  return `${pageHero('life', lang)}
    <section class="editorial-section life-opening"><div class="life-opening-art"><img src="./assets/gallery-placeholder.svg" alt="${copy('原创城市主题插画，非个人摄影作品', 'Original illustrative cityscape, not a personal photograph', lang)}"><span>FIG. 03 / EVERYDAY OBSERVATIONS</span></div><div class="life-opening-text"><span class="small-overline">THE LIFE ARCHIVE</span><h2>${copy('不止记得去过哪里，<br>也记得如何成为自己。', 'Not only the places,<br>but the becoming.', lang)}</h2><p>${copy('日常、旅途、成长与重要时刻，会在确认后逐步进入这份生活档案。现在先为真实经历留出位置。', 'Everyday life, journeys, growth, and milestones will join this archive when I am ready to share them. For now, the space is open.', lang)}</p>${cta('#/gallery', '去看看影像空间', 'Visit the Gallery', lang)}</div></section>
    <section class="editorial-section life-categories"><div class="split-top">${sectionHeading('01 /', copy('生活的四个切面', 'Four Chapters of Life', lang), copy('轻轻分类，慢慢记录', 'AN OPEN-ENDED DIARY', lang))}</div><div class="life-category-grid">${lifeCategories.map(item => `<div class="life-category-card"><span>${item.number} /</span><h3>${tx(item.title, lang)}</h3><p>${tx(item.description, lang)}</p></div>`).join('')}</div></section>
    <section class="editorial-section life-timeline-section"><div class="split-top">${sectionHeading('02 /', copy('生活时间轴', 'Life Timeline', lang), copy('新的记录将按日期从近到远排列', 'NEWEST MOMENTS FIRST', lang))}</div>${archiveTabs('life', lifeCategories, selected, lang)}<div class="archive-selected-intro"><span class="small-overline">${category ? tx(category.title, lang) : 'ALL MOMENTS'}</span><p>${category ? tx(category.description, lang) : copy('这里将依照真实日期整理生活记录。', 'Real memories will be ordered by their dates here.', lang)}</p></div>
      ${entries.length ? `<div class="life-timeline" aria-label="${copy('按日期排列的生活记录', 'Chronological life entries', lang)}">${entries.map(item => lifeEntry(item, lang)).join('')}</div>` : `<div class="life-timeline-empty"><div class="life-timeline-spine" aria-hidden="true"><span></span><span></span></div><div><span class="small-overline">TIMELINE / 000</span><h3>${copy('时间轴已就绪，<br>故事稍后抵达。', 'No moments published yet.', lang)}</h3><p>${copy('目前还没有公开的生活记录与个人照片。以后只添加真实的日期、文字和经历。', 'No personal timeline entries or photographs have been published. Only real dates, experiences, and images will be added.', lang)}</p></div></div>`}
    </section>`;
}

function renderGallery(lang) {
  return `${pageHero('gallery', lang)}<section class="editorial-section"><div class="split-top">${sectionHeading('FRAME /', copy('影像档案', 'Visual Archive', lang), copy('个人摄影作品待添加', 'PERSONAL PHOTOGRAPHS TO COME', lang))}</div>${galleryItems.some(item => safeImagePath(item.src)) ? `<div class="gallery-grid">${galleryItems.map((item, index) => safeImagePath(item.src) ? `<button type="button" class="gallery-item" data-gallery-open="${index}" aria-label="${tx(item.alt, lang)}"><img src="${escapeHtml(safeImagePath(item.src))}" alt="${tx(item.alt, lang)}" loading="lazy"></button>` : '').join('')}</div>` : `<div class="empty-gallery"><div class="gallery-placeholder-grid"><div><img src="./assets/gallery-placeholder.svg" alt="${copy('原创影像占位设计', 'Illustrative photo placeholder', lang)}"></div><div><span class="gallery-monogram">G.</span></div><div><span>FRAME<br>002</span></div></div><div class="empty-gallery-copy"><span class="small-overline">GALLERY / 000</span><h2>${copy('影像，还在路上。', 'The images are on their way.', lang)}</h2><p>${copy('个人摄影作品尚未上传。此处仅展示原创示意图，照片加入后即可点开放大、按 Esc 关闭。', 'Personal photographs have not yet been added. These are original placeholders; future photos can open full-size and close with Escape.', lang)}</p>${demo(lang)}</div></div>`}</section>`;
}


function renderNow(lang) {
  return `${pageHero('now', lang)}
    <section class="editorial-section now-section"><div class="now-meta"><span>${copy('内容更新：2026 年 10 月', 'CONTENT UPDATED: OCTOBER 2026', lang)}</span><span>NOW / 004 NOTES</span></div>
      <div class="now-grid">${nowCards.map(card => `<article class="now-card"><div class="now-card-top"><span class="now-card-n">${card.number} / ${escapeHtml(card.label)}</span><span class="now-card-status ${card.pending ? 'is-pending' : ''}">${card.pending ? copy('待更新', 'To be updated', lang) : copy('当前记录', 'CURRENT NOTE', lang)}</span></div><h2>${tx(card.title, lang)}</h2><p>${tx(card.detail, lang)}</p>${card.link ? `<a class="now-card-link" href="${escapeHtml(card.link)}">${copy('继续了解', 'Explore more', lang)} <span aria-hidden="true">↗</span></a>` : ''}<span class="now-asterisk" aria-hidden="true">✳</span></article>`).join('')}</div>
      <div class="now-ending"><span class="small-overline">A NOTE TO MY FUTURE SELF</span><p>${copy('这不是一张固定的简历，而是会随着学习、阅读和生活持续变化的状态卡片。未确认的信息保持待更新。', 'This is not a fixed résumé. These cards change as learning and life move forward; unconfirmed details remain pending.', lang)}</p></div>
    </section>`;
}

function renderUnavailable(page, lang) {
  return `<section class="page-hero unavailable-page">${kicker(pageData[page].kicker, lang)}<h1 class="display-title">${copy('这篇内容尚未发布。', 'This entry is not available.', lang)}</h1><p class="page-lead">${copy('当前是完整的网站框架，具体文章和项目将在核实后逐步上架。', 'The site structure is ready; verified posts and projects will arrive later.', lang)}</p>${cta(`#/${page}`, '返回列表', 'Back to archive', lang)}</section>`;
}

export function renderPage(route, lang = 'zh', view = {}) {
  const page = PAGE_KEYS.includes(route?.page) ? route.page : 'home';
  if (route?.slug) return renderUnavailable(page, lang);
  switch (page) {
    case 'about': return renderAbout(lang);
    case 'research': return renderResearch(lang);
    case 'projects': return renderProjects(lang);
    case 'lab': return renderLab(lang);
    case 'journal': return renderJournal(lang, view.journalCategory);
    case 'music': return renderMusic(lang);
    case 'life': return renderLife(lang, view.lifeCategory);
    case 'gallery': return renderGallery(lang);
    case 'now': return renderNow(lang);
    default: return renderHome(lang);
  }
}
