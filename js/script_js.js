
// Добавление фона при скролле
window.addEventListener('scroll', function () {
   const header = document.querySelector('.main-header');
   if (window.scrollY > 50) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
});

// Функция для открытия/закрытия меню
function toggleMenu(isActive) {
   const burgerContainer = document.getElementById('burgerContainer');
   const mobileNav = document.getElementById('mobileNav');
   const menuOverlay = document.getElementById('menuOverlay');

   burgerContainer.classList.toggle('active', isActive);
   mobileNav.classList.toggle('active', isActive);
   menuOverlay.classList.toggle('active', isActive);

   // Блокировка скролла
   document.body.classList.toggle('menu-open', isActive);
}

// Открытие/закрытие мобильного меню
document.getElementById('burgerContainer').addEventListener('click', function () {
   const isActive = !this.classList.contains('active');
   toggleMenu(isActive);
});

// Закрытие меню при клике на overlay
document.getElementById('menuOverlay').addEventListener('click', function () {
   toggleMenu(false);
});

// Закрытие меню при клике на кнопку закрытия внутри меню
document.getElementById('mobileCloseBtn').addEventListener('click', function (e) {
   e.stopPropagation(); // Предотвращаем всплытие события
   toggleMenu(false);
});

// Открытие окна поиска
document.getElementById('searchSection').addEventListener('click', function () {
   document.getElementById('searchOverlay').classList.add('active');
   document.querySelector('.search-input').focus();
});

// Закрытие окна поиска
document.getElementById('closeSearch').addEventListener('click', function () {
   document.getElementById('searchOverlay').classList.remove('active');
});

// Слайдер
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider-dot');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let currentSlide = 0;
let slideInterval;

// Функция для показа слайда
function showSlide(n) {
   slides.forEach(slide => slide.classList.remove('active'));
   dots.forEach(dot => dot.classList.remove('active'));

   currentSlide = (n + slides.length) % slides.length;

   slides[currentSlide].classList.add('active');
   dots[currentSlide].classList.add('active');
}

// Функция для следующего слайда
function nextSlide() {
   showSlide(currentSlide + 1);
}

// Автопереключение слайдов каждые 7 секунд
function startSlideShow() {
   slideInterval = setInterval(nextSlide, 7000);
}

// Остановка автопереключения
function stopSlideShow() {
   clearInterval(slideInterval);
}


// Обработчики событий для точек
dots.forEach((dot, index) => {
   dot.addEventListener('click', function () {
      stopSlideShow();
      showSlide(index);
      startSlideShow();
   });
});

// Запуск слайдера
startSlideShow();

// Переключение языка
const languageElements = document.querySelectorAll('[data-lang]');
const langSwitcher = document.querySelectorAll('.language-switcher span');

// Тексты для разных языков
const translations = {
   ru: {
      email: "info@company.com",
      search: "Поиск",
      menu: "Меню",
      close: "Закрыть",
      home: "Главная",
      about: "О компании",
      services: "Услуги",
      projects: "Проекты",
      news: "Новости",
      contacts: "Контакты",
      servicesBtn: "Услуги"
   },
   en: {
      email: "info@company.com",
      search: "Search",
      menu: "Menu",
      close: "Close",
      home: "Home",
      about: "About",
      services: "Services",
      projects: "Projects",
      news: "News",
      contacts: "Contacts",
      servicesBtn: "Services"
   },
   be: {
      email: "info@company.com",
      search: "Пошук",
      menu: "Меню",
      close: "Зачыніць",
      home: "Галоўная",
      about: "Пра кампанію",
      services: "Паслугі",
      projects: "Праекты",
      news: "Навіны",
      contacts: "Кантакты",
      servicesBtn: "Паслугі"
   }
};

// Функция для изменения языка
function changeLanguage(lang) {
   // Устанавливаем атрибут lang для html
   document.documentElement.lang = lang;

   // Обновляем все текстовые элементы
   languageElements.forEach(element => {
      const key = element.getAttribute('data-lang');
      if (translations[lang][key]) {
         element.textContent = translations[lang][key];
      }
   });

   // Обновляем активный язык в переключателе
   langSwitcher.forEach(item => {
      if (item.getAttribute('data-lang') === lang) {
         item.classList.add('active');
      } else {
         item.classList.remove('active');
      }
   });

   // Сохраняем выбор языка в localStorage
   localStorage.setItem('selectedLanguage', lang);
}

// Обработчики событий для переключателя языка
langSwitcher.forEach(item => {
   item.addEventListener('click', function () {
      const lang = this.getAttribute('data-lang');
      changeLanguage(lang);
   });
});

// Загружаем сохраненный язык при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
   const savedLanguage = localStorage.getItem('selectedLanguage') || 'ru';
   changeLanguage(savedLanguage);
});

