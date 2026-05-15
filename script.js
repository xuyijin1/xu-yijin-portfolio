const portfolioData = [
  {
    id: 'video-2',
    title: '匠韵流芳',
    category: 'video',
    type: 'Video / Documentary',
    desc: '非遗文化纪录片，讲述传统榫卯工艺的传承与现代创新。负责前期剧本编写、分镜脚本制作、场景美术布置、部分摄像与灯光，结合AI视频生成弥补实拍条件限制，实现宏大场景呈现。',
    meta: ['纪录片', '非遗', 'AI视频生成', '全流程制作'],
    gridRow: '1 / 3',
    gridCol: '1 / 3',
    visualClass: 'visual-video',
    banner: 'Documentary',
    videoUrl: 'https://github.com/xuyijin1/xu-yijin-portfolio/releases/download/v1.0/jiangyun.mp4',
    featured: true,
    coverImage: 'images/covers/jiangyun.png',
    coverStyle: 'background-size: 130%; background-position: center;'
  },
  {
    id: 'video-1',
    title: '武汉传媒学院新闻传播学院宣传片',
    category: 'video',
    type: 'Video / Promotion',
    desc: '2026年武汉传媒学院新闻传播学院招生宣传片。负责AI视频生成、视频剪辑与后期制作，展现学院教学环境与专业特色。',
    meta: ['AI视频生成', '剪辑', '后期', '特效'],
    gridRow: '4 / 5',
    gridCol: '1 / 4',
    visualClass: 'visual-video',
    banner: 'Promo Video',
    videoUrl: 'https://github.com/xuyijin1/xu-yijin-portfolio/releases/download/v1.0/promo.mp4',
    featured: true,
    coverImage: 'images/covers/promo.png'
  },
  {
    id: 'video-3',
    title: '诗歌微课',
    category: 'video',
    type: 'Video / Education',
    desc: '教育类微课视频。负责剧本编写、视频录制与AI视频生成，利用AI技术实现古今对话概念，营造沉浸式学习体验。',
    meta: ['AI视频生成', '古今对话', '微课', '教育'],
    gridRow: '3 / 4',
    gridCol: '1 / 2',
    visualClass: 'visual-video',
    banner: 'Educational',
    videoUrl: 'https://github.com/xuyijin1/xu-yijin-portfolio/releases/download/v1.0/poetry.mp4',
    featured: true,
    coverImage: 'images/covers/poetry.png'
  },
  {
    id: 'photo-2',
    title: '民俗烧火龙摄影',
    category: 'photo',
    type: 'Photography / Documentary',
    desc: '非遗民俗活动烧火龙的纪实摄影，捕捉火光交织的震撼瞬间，展现传统文化的独特魅力。',
    meta: ['民俗', '纪实', '光影'],
    gridRow: '2 / 3',
    gridCol: '3 / 4',
    visualClass: 'visual-photo',
    banner: 'Documentary Photo',
    imageUrls: ['images/fire-dragon/01.jpg', 'images/fire-dragon/02.jpg', 'images/fire-dragon/03.jpg', 'images/fire-dragon/04.jpg', 'images/fire-dragon/05.jpg'],
    featured: false,
    coverImage: 'images/fire-dragon/01.jpg'
  },
  {
    id: 'photo-1',
    title: '人像摄影精选',
    category: 'photo',
    type: 'Photography / Portrait',
    desc: '人像摄影作品合集，注重人物情绪捕捉与光影运用，展现不同人物的独特气质。',
    meta: ['人像', '光影', '情绪'],
    gridRow: '3 / 4',
    gridCol: '2 / 3',
    visualClass: 'visual-photo',
    banner: 'Portrait',
    imageUrls: ['images/portraits/DSC05073.jpg', 'images/portraits/DSC05142.jpg', 'images/portraits/DSC05144.jpg', 'images/portraits/DSC05195.jpg'],
    featured: true,
    coverImage: 'images/portraits/DSC05144.jpg'
  },
  {
    id: 'frontend-1',
    title: '新闻资讯类网页',
    category: 'frontend',
    type: 'Frontend / News',
    desc: '新闻资讯类创意网页项目，注重视觉排版与交互体验，展现新闻内容的多层次呈现方式。',
    meta: ['HTML', 'CSS', '响应式', '交互设计'],
    gridRow: '3 / 4',
    gridCol: '3 / 4',
    visualClass: 'visual-web',
    banner: 'News Web',
    webUrl: 'web/news-web/index.html',
    featured: true,
    coverImage: 'web/news-web/img/bg.avif'
  },
  {
    id: 'design-1',
    title: '烧火龙视觉设计',
    category: 'design',
    type: 'Design / Visual',
    desc: '非遗烧火龙主题视觉设计，包含海报与长图设计，融合传统元素与现代设计语言。',
    meta: ['海报', '长图', '视觉系统'],
    gridRow: '1 / 3',
    gridCol: '3 / 4',
    visualClass: 'visual-design',
    banner: 'Visual Design',
    imageUrls: ['images/fire-dragon/poster.jpg', 'images/fire-dragon/banner.png'],
    featured: true,
    coverImage: 'images/fire-dragon/poster.jpg'
  }
];

const grid = document.getElementById('portfolioGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const cursorGlow = document.querySelector('.cursor-glow');
const modal = document.getElementById('workModal');
const modalVisual = document.getElementById('modalVisual');
const modalType = document.getElementById('modalType');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalMeta = document.getElementById('modalMeta');

const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });

reveals.forEach(el => io.observe(el));

function observeNewReveal(node) {
  if (node) io.observe(node);
}

function renderWorks(filter = 'featured') {
  grid.innerHTML = '';

  let items = [];
  if (filter === 'featured') {
    items = portfolioData.filter(item => item.featured === true);
  } else {
    items = portfolioData.filter(item => item.category === filter);
  }
  items.forEach((item, index) => {
    const el = document.createElement('article');
    el.className = 'portfolio-item reveal';
    el.setAttribute('data-category', item.category);
    el.setAttribute('data-id', item.id);
    el.style.transitionDelay = `${index * 40}ms`;
    if (filter === 'featured') {
      if (item.gridRow) el.style.gridRow = item.gridRow;
      if (item.gridCol) el.style.gridColumn = item.gridCol;
    }
    el.innerHTML = `
      <div class="portfolio-visual"${item.coverImage ? ` style="background-image: url('${item.coverImage}');${item.coverStyle || ''}"` : ''}>
        <div class="visual-heading">
          <strong>${item.type}</strong>
        </div>
      </div>
      <div class="portfolio-content">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
        <div class="portfolio-tags">
          ${item.meta.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
    el.addEventListener('click', () => openModal(item));
    grid.appendChild(el);
    observeNewReveal(el);
  });
}

function openModal(item) {
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  
  let visualContent = '';
  if (item.episodes && item.episodes.length > 0) {
    visualContent = `
      <div class="modal-video-container">
        <video class="modal-video" src="${item.episodes[0].url}" controls autoplay muted playsinline preload="auto"></video>
        <div class="episode-selector">
          ${item.episodes.map((ep, i) => `<button class="episode-btn${i === 0 ? ' active' : ''}" data-index="${i}">${ep.title}</button>`).join('')}
        </div>
      </div>`;
    modalVisual.className = 'modal-visual modal-video-container';
  } else if (item.videoUrl) {
    visualContent = `<video class="modal-video" src="${item.videoUrl}" controls autoplay muted playsinline preload="auto"></video>`;
    modalVisual.className = 'modal-visual modal-video-container';
  } else if (item.imageUrls && item.imageUrls.length > 0) {
    visualContent = `
      <div class="modal-image-container">
        <button class="nav-arrow nav-arrow-left" data-direction="left">‹</button>
        <img class="modal-image" src="${item.imageUrls[0]}" alt="${item.title}">
        <button class="nav-arrow nav-arrow-right" data-direction="right">›</button>
        ${item.imageUrls.length > 1 ? `<div class="image-nav">
          ${item.imageUrls.map((url, i) => `<button class="nav-dot${i === 0 ? ' active' : ''}" data-index="${i}"></button>`).join('')}
        </div>` : ''}
      </div>`;
    modalVisual.className = 'modal-visual modal-image-wrapper';
  } else if (item.webUrl) {
    visualContent = `<iframe class="modal-iframe" src="${item.webUrl}" title="${item.title}"></iframe>`;
    modalVisual.className = 'modal-visual modal-iframe-container';
  } else {
    visualContent = `<div class="modal-banner">${item.banner}</div>`;
    modalVisual.className = `modal-visual ${item.visualClass === 'visual-photo' ? 'modal-photo' : item.visualClass === 'visual-web' ? 'modal-web' : item.visualClass === 'visual-design' ? 'modal-design-1' : 'modal-video-1'}`;
  }
  
  modalVisual.innerHTML = visualContent;
  modalType.textContent = item.type;
  modalTitle.textContent = item.title;
  modalDesc.textContent = item.desc;
  modalMeta.innerHTML = item.meta.map(tag => `<li>${tag}</li>`).join('');
  document.body.style.overflow = 'hidden';
  
  // 添加图片切换功能
  setTimeout(() => {
    const navDots = modalVisual.querySelectorAll('.nav-dot');
    const navArrows = modalVisual.querySelectorAll('.nav-arrow');
    const modalImage = modalVisual.querySelector('.modal-image');
    let currentIndex = 0;

    navDots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        navDots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
        modalImage.src = item.imageUrls[index];
        currentIndex = index;
      });
    });

    navArrows.forEach(arrow => {
      arrow.addEventListener('click', () => {
        const direction = arrow.dataset.direction;
        if (direction === 'left') {
          currentIndex = currentIndex > 0 ? currentIndex - 1 : item.imageUrls.length - 1;
        } else {
          currentIndex = currentIndex < item.imageUrls.length - 1 ? currentIndex + 1 : 0;
        }
        navDots.forEach(d => d.classList.remove('active'));
        navDots[currentIndex].classList.add('active');
        modalImage.src = item.imageUrls[currentIndex];
      });
    });
  }, 100);
}

function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderWorks(btn.dataset.filter);
  });
});

document.addEventListener('click', (event) => {
  if (event.target.matches('[data-close]')) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

window.addEventListener('mousemove', (event) => {
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

renderWorks();

// Click-to-copy contact buttons
document.querySelectorAll('.contact-link-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const text = btn.dataset.copy;
    const label = btn.dataset.label;
    const originalHTML = btn.innerHTML;
    navigator.clipboard.writeText(text).then(() => {
      btn.innerHTML = `<span>✓</span> ${label}已复制`;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('copied');
      }, 1800);
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.innerHTML = `<span>✓</span> ${label}已复制`;
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.classList.remove('copied');
      }, 1800);
    });
  });
});
// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const headerNav = document.querySelector('.nav');
navToggle.addEventListener('click', () => {
  headerNav.classList.toggle('nav-open');
  navToggle.setAttribute('aria-expanded', headerNav.classList.contains('nav-open'));
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    headerNav.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});
