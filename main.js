// PixelPress Skill Path Data
const modules = [
  {
    id: 'core-foundations',
    title: 'Core Foundations',
    lessons: [
      {
        title: 'HTML5: Semantic Structure',
        description: 'Learn about semantic HTML, accessibility, and modern layout patterns.',
        article: 'Semantic HTML Explained',
      },
      {
        title: 'CSS3: Selectors & Flexbox',
        description: 'Master selectors, flexbox, grid, transitions, and responsive styling.',
        article: 'CSS Grid Cheat Sheet',
      },
      {
        title: 'JavaScript (ES6+): Basics',
        description: 'Variables, functions, DOM manipulation, events, and async programming.',
        article: 'JavaScript ES6+ Overview',
      },
    ],
  },
  {
    id: 'modern-practices',
    title: 'Modern Frontend Practices',
    lessons: [
      {
        title: 'Responsive Web Design',
        description: 'Techniques for building interfaces that work everywhere.',
        article: 'Responsive Design Principles',
      },
      {
        title: 'CSS Architecture (BEM)',
        description: 'Organize CSS for scalability and maintainability.',
        article: 'BEM Methodology',
      },
      {
        title: 'UI/UX Fundamentals',
        description: 'Design user-friendly, accessible interfaces.',
        article: 'UI/UX Best Practices',
      },
    ],
  },
  {
    id: 'framework-essentials',
    title: 'Framework Essentials',
    lessons: [
      {
        title: 'React Basics',
        description: 'Components, props, state, and hooks.',
        article: 'React Hooks Explained',
      },
      {
        title: 'Reusable UI Components',
        description: 'Build scalable, maintainable UI elements.',
        article: 'Component Patterns',
      },
      {
        title: 'Routing & State Management',
        description: 'Fundamentals of navigation and state.',
        article: 'Routing in SPAs',
      },
    ],
  },
  {
    id: 'project-development',
    title: 'Project Development',
    lessons: [
      {
        title: 'Portfolio Website',
        description: 'Build a responsive portfolio from scratch.',
        article: 'Portfolio Project Guide',
      },
      {
        title: 'Interactive Dashboard',
        description: 'Create a dashboard with charts and widgets.',
        article: 'Dashboard UI Patterns',
      },
      {
        title: 'Multi-page React App',
        description: 'Structure and build multi-page applications.',
        article: 'React Routing Deep Dive',
      },
    ],
  },
];

// Progress and Bookmarks
let completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '{}');
let bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');

function updateProgress() {
  const total = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const completed = Object.keys(completedLessons).length;
  const percent = Math.round((completed / total) * 100);
  document.getElementById('progress-value').textContent = `${percent}%`;
  document.getElementById('progress-bar-fill').style.width = `${percent}%`;
}

function renderLessons() {
  modules.forEach(module => {
    const section = document.querySelector(`#${module.id} .lesson-list`);
    section.innerHTML = '';
    module.lessons.forEach((lesson, idx) => {
      const lessonId = `${module.id}-${idx}`;
      const div = document.createElement('div');
      div.className = 'lesson' + (completedLessons[lessonId] ? ' completed' : '');
      div.innerHTML = `
        <strong>${lesson.title}</strong>
        <span>${lesson.description}</span>
        <div class="actions">
          <button onclick="toggleComplete('${lessonId}')">${completedLessons[lessonId] ? 'Mark Incomplete' : 'Mark Complete'}</button>
          <button onclick="bookmarkArticle('${lesson.article}')">Bookmark</button>
        </div>
      `;
      section.appendChild(div);
    });
  });
}

function toggleComplete(lessonId) {
  completedLessons[lessonId] = !completedLessons[lessonId];
  if (!completedLessons[lessonId]) delete completedLessons[lessonId];
  localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
  renderLessons();
  updateProgress();
}

function bookmarkArticle(article) {
  if (!bookmarks.includes(article)) {
    bookmarks.push(article);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    renderBookmarks();
  }
}

function renderBookmarks() {
  const list = document.getElementById('bookmark-list');
  list.innerHTML = '';
  bookmarks.forEach(article => {
    const li = document.createElement('li');
    li.textContent = article;
    list.appendChild(li);
  });
}

// Initial render
renderLessons();
renderBookmarks();
updateProgress();
