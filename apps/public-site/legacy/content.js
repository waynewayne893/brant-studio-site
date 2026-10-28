const bi = (zh, en) => ({ zh, en });

export const siteName = bi('个人空间', 'Personal Space');
export const demoLabel = bi('演示内容 · 待逐步更新', 'DEMO CONTENT · IN PROGRESS');

export const navItems = [
  { id: 'about', label: bi('关于', 'About') },
  { id: 'research', label: bi('研究', 'Research') },
  { id: 'projects', label: bi('项目', 'Projects') },
  { id: 'journal', label: bi('随笔', 'Journal') },
  { id: 'music', label: bi('音乐', 'Music') },
  { id: 'life', label: bi('生活', 'Life') },
];

export const pageData = {
  home: {
    kicker: bi('郭程 / BRANT WAYNE', 'BRANT WAYNE / 郭程'),
    title: bi('郭程\nBrant Wayne', 'Brant Wayne\n郭程'),
    identity: bi('西华大学 · 经济学院 · 金融专业硕士在读', 'Master of Finance Candidate · School of Economics · Xihua University'),
    lead: bi('关于学习与探索，也关于声音、表达和生活。', 'Learning and exploration, alongside music, expression, and life.'),
  },
  about: {
    kicker: bi('01 / 关于我', '01 / ABOUT'),
    title: bi('不止一种身份。', 'More than one dimension.'),
    lead: bi('从金融专业的学习，到音乐、写作与日常感受。这是一个持续生长的个人空间。', 'From graduate study in finance to music, writing, and everyday observation. A personal space in progress.'),
  },
  research: {
    kicker: bi('02 / 学习与探索', '02 / ACADEMIC JOURNEY'),
    title: bi('在学习中建立自己的方法。', 'Learning, questioning, growing.'),
    lead: bi('记录金融知识、研究方法与独立思考能力的积累。具体研究方向暂不公开。', 'A record of growth in financial knowledge, research methods, and independent thinking. Specific research topics remain private.'),
  },
  projects: {
    kicker: bi('03 / 作品与实践', '03 / PROJECTS'),
    title: bi('让想法落地。', 'Ideas, made tangible.'),
    lead: bi('从团队协作到模型迭代，记录参与过的真实项目与从中获得的成长。', 'Selected team projects and experiments, with honest notes about my role and what I learned.'),
  },
  lab: {
    kicker: bi('03.1 / 实验室', '03.1 / LAB'),
    title: bi('把好奇变成实验。', 'A place to experiment.'),
    lead: bi('为建模实验、数据可视化与交互工具留出空间。真实作品会在准备好后逐步展示。', 'Space for modeling experiments, data visualization, and interactive tools. Actual work will be published when ready.'),
  },
  journal: {
    kicker: bi('04 / 文字记录', '04 / JOURNAL'),
    title: bi('认真记录，也自由表达。', 'Notes from the margins.'),
    lead: bi('随笔、阅读笔记、喜欢的句子与学习札记。在这里，专业与生活都可以慢慢写。', 'Essays, reading notes, collected words, and learning notes—a home for thoughts both personal and academic.'),
  },
  music: {
    kicker: bi('05 / 声音收藏', '05 / MUSIC ARCHIVE'),
    title: bi('给生活一点\n自己的节拍。', 'Life has its\nown rhythm.'),
    lead: bi('中文 Hip-hop 是我认识表达与态度的一种方式。这里收集喜欢的声音、唱片与随听随想。', 'Chinese hip-hop is one way I connect with voice and attitude. A space for sounds, records, and listening notes.'),
  },
  life: {
    kicker: bi('06 / 生活切片', '06 / LIFE'),
    title: bi('收藏平凡的瞬间。', 'The art of noticing.'),
    lead: bi('日常、旅途、成长与重要时刻。以后把经历和照片，按照时间慢慢留下。', 'Everyday life, journeys, growth, and meaningful moments—a timeline to fill with real memories over time.'),
  },
  gallery: {
    kicker: bi('06.1 / 影像集', '06.1 / GALLERY'),
    title: bi('片刻，值得留下。', 'Fragments worth keeping.'),
    lead: bi('个人摄影与生活影像即将收录。当前展示的是视觉占位图，并非我的摄影作品。', 'Personal photography and visual memories will appear here. Current artwork is illustrative, not my photography.'),
  },
  now: {
    kicker: bi('此时此刻', 'THE NOW PAGE'),
    title: bi('现在进行时。', 'In the present tense.'),
    lead: bi('最近在学什么、读什么、听什么——一张会持续更新的生活便签。', 'What I am learning, reading, and listening to—a note that will keep changing.'),
  },
};

export const researchModules = [
  { id: 'interests', number: '01', title: bi('金融知识', 'Financial Knowledge'), eyebrow: bi('知识基础 / FOUNDATION', 'FOUNDATION / KNOWLEDGE'), description: bi('在金融专业硕士阶段持续拓展知识框架，重视从概念理解走向实际问题分析的过程。', 'I am strengthening my foundation in finance and learning to connect concepts with real analytical questions.'), tags: [bi('金融专业', 'Finance'), bi('理论与实践', 'Theory & Practice')] },
  { id: 'current', number: '02', title: bi('研究方法', 'Research Methods'), eyebrow: bi('方法成长 / METHODS', 'PRACTICE / METHODS'), description: bi('从文献检索、数据整理到实证分析与模型验证，逐步建立更严谨、可复现的研究习惯。', 'From reviewing literature and preparing data to empirical analysis and model validation, I am building more rigorous, reproducible research habits.'), tags: [bi('数据分析', 'Data Analysis'), bi('实证方法', 'Empirical Methods'), bi('模型验证', 'Model Validation')] },
  { id: 'methods', number: '03', title: bi('独立思考与表达', 'Independent Thinking & Expression'), eyebrow: bi('探索与沟通 / EXPRESSION', 'THINKING / EXPRESSION'), description: bi('学习提出自己的问题、审视证据，并将复杂的分析思路清晰表达。专业训练之外，也从文字与音乐中理解表达。', 'I aim to ask my own questions, examine evidence, and communicate complex reasoning clearly. Writing and music also shape how I think about expression.'), tags: [bi('批判性思维', 'Critical Thinking'), bi('学术写作', 'Academic Writing'), bi('清晰表达', 'Communication')] },
];

export const skillGroups = [
  { id: 'experience', title: bi('有实际使用经验', 'Skills in Practice'), note: bi('曾在学习或项目中实际使用，熟悉程度因工具而异。', 'Used in coursework or projects; this is not a claim of expert proficiency.'), items: ['Excel', 'MATLAB', 'Python', 'Stata', 'LaTeX', 'SPSS'] },
  { id: 'learning', title: bi('正在重点学习与提升', 'Currently Learning'), note: bi('同一工具可能同时出现在“使用过”和“继续提升”中。', 'Some tools appear in both lists because I am continuing to deepen my skills.'), items: ['Python 进阶', 'Stata 实证分析', 'MATLAB 数值模拟', 'Excel 高级应用', '学术论文写作', '数据可视化', '文献检索与管理', 'LaTeX 排版', 'SPSS 统计分析'], itemsEn: ['Advanced Python', 'Empirical Analysis with Stata', 'Numerical Simulation with MATLAB', 'Advanced Excel', 'Academic Writing', 'Data Visualization', 'Literature Search & Management', 'LaTeX Typesetting', 'Statistical Analysis with SPSS'] },
];

export const musicModules = [
  { id: 'artists', number: '01', title: bi('喜欢的音乐人', 'Featured Artists'), lead: bi('这些声音构成了我理解中文 Hip-hop 的一部分。', 'Some of the artists and collectives behind my love of Chinese hip-hop.') },
  { id: 'repeat', number: '02', title: bi('反复聆听', 'On Repeat'), lead: bi('《冰冷热带鱼》是当前这份音乐档案的起点。', 'Starting this personal music archive with 《冰冷热带鱼》.') },
  { id: 'albums', number: '03', title: bi('唱片清单', 'Album Collection'), lead: bi('先收录这些作品，再慢慢补充我的聆听笔记。此处不是实体唱片收藏声明。', 'A growing listening list, not a claim of physical ownership. More notes will follow.') },
  { id: 'notes', number: '04', title: bi('音乐手记', 'Music Notes'), lead: bi('关于自由、低谷与重新向前的私人听感。', 'A personal note on freedom, hard times, and moving forward.') },
  { id: 'compass', number: '05', title: bi('韧性与温柔', 'Voice & Resilience'), lead: bi('来自《在雨后醒来》的表达：努力变强，也对世界保持温柔。', 'A line from 《在雨后醒来》 about growing stronger without losing kindness.') },
];

// Owner-selected homepage quotation. Preserve the user's supplied original wording in both language modes.
// Other previously discussed lyrics remain private candidates, not automatically published content.
export const wakeUpTheme = {
  lines: ['wakin up today', '不要怕被击败，', '变更强的同时，对世界更要温柔以待'],
  source: bi('Asen ·《在雨后醒来》', 'Asen ·《在雨后醒来》'),
  about: bi('这段歌词里打动我的，是经历低谷后的韧性与温柔。继续变强不意味着变得冷漠；音乐让我记得，在学习和生活之外，也要保留对世界的善意。', 'What stays with me is its balance of resilience and kindness. Becoming stronger does not have to mean becoming harder. Music reminds me to carry that outlook beyond my studies.'),
  note: bi('我喜欢这段表达，因为它把两种看似矛盾的力量放在一起：不惧失败，继续成长；与此同时，也不丢掉对世界的温柔。这也是我希望带进日常生活的一种态度。', 'I return to this line because it holds two ideas together: the courage to keep growing through setbacks, and the choice to stay gentle with the world. That balance speaks to the person I hope to become.'),
};

export const projectItems = [{
  id: 'credit-risk-iteration',
  title: bi('信贷风控自主迭代模型', 'Self-Iterating Credit Risk Model'),
  team: bi('衡微致胜队', 'Hengwei Zhisheng Team'),
  role: bi('团队队长 · 主要负责迭代模块', 'Team leader · primary responsibility for the iteration module'),
  competition: bi('中国研究生第五届金融科技创新大赛', 'The 5th China Graduate FinTech Innovation Competition'),
  award: bi('2026 年 · 国家级三等奖', '2026 · National Third Prize'),
  summary: bi('团队共同完成的信贷风控闭环系统，围绕“监测—根因—迭代—部署”组织模型维护与更新流程。', 'A collaborative credit-risk management system organized around a monitor–root cause–iterate–deploy loop.'),
  focus: bi('我主要负责“迭代”模块的设计、算法实现、实验评估和优化，也承担项目总体规划、进度协调、模型方案、报告与答辩等相关工作。以上是我参与的任务，并不代表团队按这些项目逐项分工。', 'My main focus was designing and implementing the iteration module, with model experiments, evaluation and optimization. I also contributed to project planning, coordination, model design, reporting, and the presentation. These describe my contributions, not the team’s formal division of labor.'),
  iteration: bi('从更新触发判断、策略选择到模型验证及风险约束，探索如何让风控模型形成可审视的持续迭代过程。', 'Within the iteration module, I worked on update triggers, strategy selection, validation, and risk safeguards to support a reviewable model-update process.'),
  systemStages: [bi('监测', 'Monitor'), bi('根因', 'Root Cause'), bi('迭代', 'Iterate'), bi('部署', 'Deploy')],
}];

// Content collections are intentionally empty until Brant provides actual material.
// Journal entries: { category, title?, date?, summary?, original?, source?, translation?, reflection? }.
// Collected quotes preserve `original` verbatim; bilingual translations and reflections are optional.
export const journalCategories = [
  { id: 'essays', number: '01', title: bi('随笔', 'Essays'), description: bi('记录观点、感受与没有标准答案的问题。', 'Personal reflections, observations, and open-ended questions.') },
  { id: 'reading', number: '02', title: bi('阅读笔记', 'Reading Notes'), description: bi('把书籍与文章里值得记住的思考整理成笔记。', 'Ideas worth returning to, gathered from books and articles.') },
  { id: 'quotes', number: '03', title: bi('句子收藏', 'Collected Words'), description: bi('看到喜欢的原句就留下，记下出处；译文与感想按需补充。', 'Favorite lines in their original language, credited to their sources. Translations and reflections are optional.') },
  { id: 'learning', number: '04', title: bi('学习札记', 'Learning Notes'), description: bi('记录知识、方法和正在形成的理解。', 'Notes on concepts, methods, and my developing understanding.') },
];
export const journalItems = [];
// Life records: { category, date: 'YYYY-MM-DD', title, body, tags?, image?, imageAlt? }.
// The timeline sorts by date, while optional photos are only used if local and verified.
export const lifeCategories = [
  { id: 'everyday', number: '01', title: bi('日常', 'Everyday'), description: bi('值得留心的小事，和不经意的瞬间。', 'Little things and passing moments worth noticing.') },
  { id: 'journeys', number: '02', title: bi('旅途', 'Journeys'), description: bi('走过的地方，以及沿途看到的世界。', 'Places visited and the world noticed along the way.') },
  { id: 'growth', number: '03', title: bi('成长', 'Growth'), description: bi('变化、尝试与一路积累的体会。', 'Changes, attempts, and lessons gathered along the way.') },
  { id: 'moments', number: '04', title: bi('重要时刻', 'Milestones'), description: bi('那些值得郑重记录的人生节点。', 'Personal milestones worth keeping in the record.') },
];
export const lifeItems = [];
// Lab work: { category, title, description, date?, tags?, href? }.
// Do not insert sample results or demo projects that could be mistaken for real work.
export const labCategories = [
  { id: 'modeling', number: '01', title: bi('建模实验', 'Modeling Experiments'), description: bi('从问题、假设到模型方案，逐步呈现可公开的真实建模探索。', 'Room for documented modeling questions, assumptions, and methods from real work.') },
  { id: 'visualization', number: '02', title: bi('数据可视化', 'Data Visualization'), description: bi('让真实的数据与分析结果变得清晰、可读。', 'A future home for clear, grounded visual stories told with actual data.') },
  { id: 'tools', number: '03', title: bi('交互工具', 'Interactive Tools'), description: bi('把经过验证的小工具和交互式想法，逐步整理成可体验的作品。', 'Small, verified utilities and interactive ideas, published when they are ready.') },
];
export const labItems = [];
export const nowCards = [
  { id: 'learning', number: '01', label: 'LEARNING', title: bi('正在学习', 'Learning'), detail: bi('Python 进阶、Stata 实证分析、学术论文写作，也持续练习数据可视化与研究工具。', 'Advanced Python, empirical analysis with Stata, academic writing, and improving data visualization and research tools.'), pending: false, link: '#/research' },
  { id: 'reading', number: '02', label: 'READING', title: bi('最近在读', 'Reading'), detail: bi('具体书目和文献清单尚未确认，后续再补充。', 'A current list of books and papers has not yet been confirmed.'), pending: true },
  { id: 'listening', number: '03', label: 'LISTENING', title: bi('耳机里的声音', 'Listening'), detail: bi('《冰冷热带鱼》，以及 SASIOVERLXRD、JinJiBeWater_隼、连麻Swimming 的声音。', '《冰冷热带鱼》, alongside SASIOVERLXRD, JinJiBeWater_隼, and 连麻Swimming.'), pending: false, link: '#/music' },
  { id: 'exploring', number: '04', label: 'EXPLORING', title: bi('最近关注', 'Exploring'), detail: bi('金融知识、研究方法与独立思考表达能力；具体研究方向暂不公开。', 'Financial knowledge, research methods, and independent thinking and expression. Specific research topics remain private.'), pending: false, link: '#/research' },
];
export const musicItems = [
  { title: bi('冰冷热带鱼', '冰冷热带鱼'), artist: bi('五人组相关作品', 'A record associated with five artists'), featured: true },
  { title: bi('CHUNGHWA', 'CHUNGHWA'), artist: bi('连麻Swimming', '连麻Swimming') },
  { title: bi('自在极意', '自在极意'), artist: bi('JinJiBeWater_隼', 'JinJiBeWater_隼') },
  { title: bi('那小子真帅', '那小子真帅'), artist: bi('SASIOVERLXRD', 'SASIOVERLXRD') },
];
export const musicArtists = [
  { name: 'SASIOVERLXRD', detail: bi('首页优先展示', 'Featured on the homepage') },
  { name: 'JinJiBeWater_隼', detail: bi('首页优先展示', 'Featured on the homepage') },
  { name: '连麻Swimming', detail: bi('首页优先展示', 'Featured on the homepage') },
  { name: 'Asen', detail: bi('喜欢的音乐人', 'An artist I listen to') },
  { name: 'RICHNOMADIC', detail: bi('由 Babybako 和 Zhacai 组成的双人组合', 'A duo formed by Babybako and Zhacai') },
  { name: 'mac ova seas', detail: bi('喜欢的音乐人', 'An artist I listen to') },
];
export const featuredAlbumNote = bi('《冰冷热带鱼》不只是一张专辑。它关于思想与行动的自由，也曾陪我走过一段低谷。', '《冰冷热带鱼》 is more than an album to me. It speaks to freedom of thought and action—and stayed with me through a difficult chapter.');
export const featuredAlbumReview = bi(
  '我喜欢《冰冷热带鱼》，并不是因为它的制作有多精致。恰恰是那些粗粝、不完美的声音，让“思想自由、行动自由”变得格外真实。\n\n在我听来，它承载着几位音乐人在低谷中彼此支撑、不愿被生活击倒的倔强。五人组的音乐曾陪伴我走过一段低谷。\n\n所以当我再次听到这张专辑，听见的不只是节奏，还有继续向前的力量。',
  'What draws me to 《冰冷热带鱼》 is not polished production. Its rough edges make its message—freedom of thought and freedom of action—feel all the more real.\n\nI hear artists holding one another up through dark times, refusing to let life break them. Their music stayed with me through a difficult chapter.\n\nWhen I return to this album, I hear more than beats. I hear the strength to keep moving forward.'
);
export const galleryItems = [];

export const links = {
  research: '#/research', projects: '#/projects', lab: '#/lab',
  journal: '#/journal', music: '#/music', life: '#/life',
  gallery: '#/gallery', now: '#/now', about: '#/about',
};

export function getText(record, lang = 'zh') {
  if (!record || typeof record !== 'object') return '—';
  if (typeof record[lang] === 'string' && record[lang].trim()) return record[lang];
  if (typeof record.zh === 'string' && record.zh.trim()) {
    return lang === 'en' ? `[中文原文 / Chinese original] ${record.zh}` : record.zh;
  }
  if (typeof record.en === 'string' && record.en.trim()) return record.en;
  return '—';
}

export function safeExternalUrl(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && url.hostname && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

export function safeImagePath(value) {
  return typeof value === 'string' && /^\.?\/assets\/[a-zA-Z0-9/_-]+\.(png|jpg|jpeg|webp|svg)$/i.test(value) ? value : null;
}
