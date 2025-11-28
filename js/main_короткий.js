// Общие функции для управления скроллом
function disableScroll() {
   const body = document.body;
   const header = document.querySelector('.header');

   // Проверяем, не заблокирован ли уже скролл
   if (body.style.overflow === 'hidden') return;

   const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

   body.dataset.scrollY = window.scrollY;
   body.style.overflow = 'hidden';
   body.style.paddingRight = `${scrollbarWidth}px`;

   if (header && header.classList.contains('scrolled')) {
      header.style.paddingRight = `${scrollbarWidth}px`;
   }
}

function enableScroll() {
   const body = document.body;
   const header = document.querySelector('.header');

   body.style.overflow = '';
   body.style.paddingRight = '';

   if (header) {
      header.style.paddingRight = '';
   }

   if (body.dataset.scrollY) {
      window.scrollTo(0, parseInt(body.dataset.scrollY));
      delete body.dataset.scrollY;
   }
}

// Функция для открытия/закрытия меню
function toggleMenu(isActive) {
   const elements = {
      burger: document.getElementById('burger'),
      mobileNav: document.getElementById('headernav'),
      menuclose: document.getElementById('close_menu'),
      menuOpen: document.getElementById('open_menu'),
      menuOverlay: document.getElementById('menuOverlay')
   };

   // Проверяем существование элементов
   Object.entries(elements).forEach(([key, element]) => {
      if (!element) {
         console.warn(`Element ${key} not found`);
         return;
      }
   });

   if (isActive) {
      disableScroll();
   } else {
      enableScroll();
   }

   // Переключаем классы только для существующих элементов
   Object.values(elements).forEach(element => {
      if (element) {
         element.classList.toggle('active', isActive);
      }
   });
}

// Универсальный слайдер
class Slider {
   constructor(container, options = {}) {
      this.container = container;
      this.slides = container.querySelectorAll('.slide');
      this.dots = container.querySelectorAll('.slider_dot');
      this.currentSlide = 0;
      this.interval = null;
      this.autoPlayDelay = options.autoPlayDelay || 7000;

      if (this.slides.length === 0) return;

      this.init();
   }

   init() {
      this.showSlide(this.currentSlide);
      this.startSlideShow();
      this.addEventListeners();
   }

   showSlide(n) {
      this.slides.forEach(slide => slide.classList.remove('active'));
      this.dots.forEach(dot => dot.classList.remove('active'));

      this.currentSlide = (n + this.slides.length) % this.slides.length;

      this.slides[this.currentSlide].classList.add('active');
      if (this.dots[this.currentSlide]) {
         this.dots[this.currentSlide].classList.add('active');
      }
   }

   nextSlide() {
      this.showSlide(this.currentSlide + 1);
   }

   startSlideShow() {
      if (this.slides.length <= 1) return;
      this.interval = setInterval(() => this.nextSlide(), this.autoPlayDelay);
   }

   stopSlideShow() {
      if (this.interval) {
         clearInterval(this.interval);
      }
   }

   addEventListeners() {
      this.dots.forEach((dot, index) => {
         dot.addEventListener('click', () => {
            this.stopSlideShow();
            this.showSlide(index);
            this.startSlideShow();
         });
      });
   }
}

// Универсальный обработчик видео
class VideoHandler {
   static initVideoPlayer(playerId, iframeClass) {
      const player = document.getElementById(playerId);
      if (!player) return;

      player.addEventListener('click', function () {
         this.innerHTML = `<iframe class="${iframeClass}" src="https://www.youtube.com/embed/T9oVJQvlXBQ?si=Dk1veWe5huZH4TgQ?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
      });
   }
}

// Lightbox для галереи
class Lightbox {
   constructor(lightboxId, gallerySelector) {
      this.lightbox = document.getElementById(lightboxId);
      this.images = document.querySelectorAll(gallerySelector);
      this.currentIndex = 0;

      if (!this.lightbox || this.images.length === 0) return;

      this.init();
   }

   init() {
      this.bindEvents();
      this.setupIntersectionObserver();
   }

   bindEvents() {
      // Закрытие
      const closeBtn = this.lightbox.querySelector('[id$="close"]');
      if (closeBtn) {
         closeBtn.addEventListener('click', () => this.close());
      }

      this.lightbox.addEventListener('click', (e) => {
         if (e.target === this.lightbox) this.close();
      });

      // Навигация
      const prevBtn = this.lightbox.querySelector('[id$="prev"]');
      const nextBtn = this.lightbox.querySelector('[id$="next"]');

      if (prevBtn) prevBtn.addEventListener('click', () => this.prev());
      if (nextBtn) nextBtn.addEventListener('click', () => this.next());

      // Клавиатура
      document.addEventListener('keydown', (e) => {
         if (!this.lightbox.classList.contains('active')) return;

         switch (e.key) {
            case 'Escape': this.close(); break;
            case 'ArrowLeft': this.prev(); break;
            case 'ArrowRight': this.next(); break;
         }
      });

      // Свайпы
      this.addSwipeSupport();
   }

   open(index) {
      this.currentIndex = index;
      this.updateImage();
      this.lightbox.classList.add('active');
      disableScroll();
      this.preloadAdjacentImages();
   }

   close() {
      this.lightbox.classList.remove('active');
      enableScroll();
   }

   updateImage() {
      const img = this.lightbox.querySelector('img');
      const counter = this.lightbox.querySelector('[id$="counter"]');

      if (img) img.src = this.images[this.currentIndex].src;
      if (counter) counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
   }

   prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.updateImage();
      this.preloadAdjacentImages();
   }

   next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.updateImage();
      this.preloadAdjacentImages();
   }

   addSwipeSupport() {
      let touchStartX = 0;

      this.lightbox.addEventListener('touchstart', (e) => {
         touchStartX = e.changedTouches[0].screenX;
      });

      this.lightbox.addEventListener('touchend', (e) => {
         const touchEndX = e.changedTouches[0].screenX;
         const diff = touchStartX - touchEndX;
         const swipeThreshold = 50;

         if (Math.abs(diff) > swipeThreshold) {
            diff > 0 ? this.next() : this.prev();
         }
      });
   }

   preloadAdjacentImages() {
      const prevIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      const nextIndex = (this.currentIndex + 1) % this.images.length;

      [prevIndex, nextIndex].forEach(index => {
         const img = new Image();
         img.src = this.images[index].src;
      });
   }

   setupIntersectionObserver() {
      const observer = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               this.loadImage(entry.target);
               observer.unobserve(entry.target);
            }
         });
      }, { rootMargin: '50px' });

      this.images.forEach(img => observer.observe(img));
   }

   loadImage(img) {
      if (img.getAttribute('data-loaded')) return;

      const tempImg = new Image();
      tempImg.onload = () => {
         img.style.opacity = '1';
         img.setAttribute('data-loaded', 'true');
      };
      tempImg.src = img.src;
   }
}

// Анимация появления элементов при скролле
class ScrollAnimation {
   constructor() {
      this.sections = document.querySelectorAll('.services_section, .company__main, .download-resume, .photo_company, .certificates, .company_content_image, .services_page, .contacts__section, .management_section, .company_section, .about-section, .documents, .news__section, .footer, .vacancy_page, .vacancies_section, .hero_slider, .other_section, .all-news, .work_types_crc, .intro_text_crc, .gallery_crc');

      if (this.sections.length === 0) return;

      this.init();
   }

   init() {
      this.sections.forEach(section => section.classList.add('scroll-section'));

      const observer = new IntersectionObserver((entries) => {
         entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
               setTimeout(() => {
                  entry.target.classList.add('active');
               }, index * 50);
            }
         });
      }, {
         threshold: 0.1,
         rootMargin: '0px 0px -20px 0px'
      });

      this.sections.forEach(section => observer.observe(section));
   }
}

// Инициализация всех компонентов
document.addEventListener('DOMContentLoaded', function () {
   // Принудительно включаем скролл и отключаем все оверлеи при загрузке
   enableScroll();
   document.getElementById('menuOverlay')?.classList.remove('active');
   document.getElementById('searchOverlay')?.classList.remove('active');

   // Мобильное меню
   const burger = document.getElementById('burger');
   if (burger) {
      burger.addEventListener('click', function () {
         const isActive = !this.classList.contains('active');
         toggleMenu(isActive);
      });
   }

   // Закрытие меню по клику на оверлей
   document.getElementById('menuOverlay')?.addEventListener('click', () => toggleMenu(false));

   // Закрытие меню по клику на кнопку закрытия
   document.getElementById('close_menu')?.addEventListener('click', () => toggleMenu(false));

   // Закрытие меню по клику на ссылки
   const menuLinks = document.querySelectorAll(".header_nav a");
   menuLinks.forEach(link => {
      link.addEventListener("click", () => toggleMenu(false));
   });

   // Поиск
   const searchSection = document.getElementById('searchSection');
   const closeSearch = document.getElementById('closeSearch');
   const searchInput = document.querySelector('.search_input');
   const searchOverlay = document.getElementById('searchOverlay');

   searchSection?.addEventListener('click', function () {
      disableScroll();
      searchOverlay?.classList.add('active');
   });

   searchOverlay?.addEventListener('click', function (e) {
      if (e.target === this) {
         enableScroll();
         searchOverlay.classList.remove('active');
         if (searchInput) searchInput.value = '';
      }
   });

   closeSearch?.addEventListener('click', function () {
      enableScroll();
      searchOverlay?.classList.remove('active');
      if (searchInput) searchInput.value = '';
   });

   searchInput?.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
         e.preventDefault();
         const searchQuery = this.value.trim();
         if (searchQuery) {
            performSearch(searchQuery);
         }
      }
   });

   document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchOverlay?.classList.contains('active')) {
         closeSearch?.click();
      }
   });

   // Слайдер
   const sliderContainer = document.querySelector('.slider-container');
   if (sliderContainer) {
      new Slider(sliderContainer);
   }

   // Заголовок и скролл
   const header = document.querySelector('.header');
   if (header) {
      // Инициализируем начальное состояние
      header.classList.toggle('scrolled', window.scrollY > 30);

      window.addEventListener('scroll', function () {
         header.classList.toggle('scrolled', window.scrollY > 30);
      });
   }

   // iOS обработка
   if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
      document.addEventListener('touchmove', function (e) {
         if (searchOverlay?.classList.contains('active')) {
            if (!e.target.closest('.search_overlay')) {
               e.preventDefault();
            }
         }
      }, { passive: false });
   }

   // Видео плееры
   VideoHandler.initVideoPlayer('videoPlayer', 'video-iframe');
   VideoHandler.initVideoPlayer('videoPlayer1', 'company_video-iframe');

   // Адаптация контента
   function adjustContent() {
      const textContent = document.querySelector('.text-content');
      const videoContent = document.querySelector('.video-content');

      if (window.innerWidth > 991.98 && textContent && videoContent) {
         textContent.style.maxHeight = videoContent.offsetHeight + 'px';
      } else if (textContent) {
         textContent.style.maxHeight = '';
      }
   }

   window.addEventListener('load', adjustContent);
   window.addEventListener('resize', adjustContent);

   // Lightbox
   const lightbox = new Lightbox('lightbox_crc', '.gallery_crc_item img');

   // Ленивая загрузка изображений
   const lazyImages = document.querySelectorAll('img[data-src]');
   if (lazyImages.length > 0) {
      const imageObserver = new IntersectionObserver((entries) => {
         entries.forEach(entry => {
            if (entry.isIntersecting) {
               const img = entry.target;
               img.src = img.dataset.src;
               img.classList.remove('lazy');
               imageObserver.unobserve(img);
            }
         });
      });

      lazyImages.forEach(img => imageObserver.observe(img));
   }

   // Анимация скролла
   new ScrollAnimation();
});

// Вспомогательные функции
function performSearch(query) {
   console.log('Выполняется поиск по запросу:', query);
   // window.location.href = `/search?q=${encodeURIComponent(query)}`;
}

// Обработчик ошибок
window.addEventListener('error', function (e) {
   console.error('Global error:', e.error);
});