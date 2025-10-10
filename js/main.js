
// Функция для открытия/закрытия меню
function toggleMenu(isActive) {
   const body = document.body;
   const burgerContainer = document.getElementById('burger');
   const mobileNav = document.getElementById('headernav');
   const menuclose = document.getElementById('close_menu');
   const menuOpen = document.getElementById('open_menu');
   const menuOverlay = document.getElementById('menuOverlay');
   const header = document.querySelector('.header');

   if (isActive) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

      // Сохраняем текущую позицию скролла
      body.dataset.scrollY = window.scrollY;

      // Блокируем прокрутку и сохраняем место для скроллбара
      body.style.overflow = 'hidden';
      body.style.paddingRight = `${scrollbarWidth}px`;

      // Если шапка фиксированная, добавляем отступ и ей
      if (header.classList.contains('scrolled')) {
         header.style.paddingRight = `${scrollbarWidth}px`;
      }
   } else {
      // Восстанавливаем прокрутку
      body.style.overflow = '';
      body.style.paddingRight = '';

      // Убираем отступ у шапки
      header.style.paddingRight = '';

      // Восстанавливаем позицию скролла
      if (body.dataset.scrollY) {
         window.scrollTo(0, parseInt(body.dataset.scrollY));
      }
   }

   burgerContainer.classList.toggle('active', isActive);
   mobileNav.classList.toggle('active', isActive);
   menuclose.classList.toggle('active', isActive);
   menuOpen.classList.toggle('active', isActive);
   menuOverlay.classList.toggle('active', isActive);
}

// Открытие / закрытие мобильного меню
document.getElementById('burger').addEventListener('click', function () {
   const isActive = !this.classList.contains('active');
   toggleMenu(isActive);
});

// Закрытие меню на overlay
document.getElementById('menuOverlay').addEventListener('click', function () {
   toggleMenu(false);
});

// Закрытие меню при клике на пункт
const menuLinks = document.querySelectorAll(".header_nav a");
menuLinks.forEach(link => {
   link.addEventListener("click", () => {
      toggleMenu(false);
   });
});


// Открытие окна поиска
document.getElementById('searchSection').addEventListener('click', function () {
   const body = document.body;
   const header = document.querySelector('.header');
   const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

   // Сохраняем текущую позицию скролла
   body.dataset.scrollY = window.scrollY;

   body.style.overflow = 'hidden';
   body.style.paddingRight = `${scrollbarWidth}px`;

   // Если шапка фиксированная, добавляем отступ и ей
   if (header.classList.contains('scrolled')) {
      header.style.paddingRight = `${scrollbarWidth}px`;
   }

   document.getElementById('searchOverlay').classList.add('active');
   // document.querySelector('.search_input').focus();
});

// Закрытие окна поиска
document.getElementById('closeSearch').addEventListener('click', function () {
   const body = document.body;
   const header = document.querySelector('.header');

   body.style.overflow = '';
   body.style.paddingRight = '';

   // Убираем отступ у шапки
   header.style.paddingRight = '';

   // Восстанавливаем позицию скролла
   if (body.dataset.scrollY) {
      window.scrollTo(0, parseInt(body.dataset.scrollY));
   }

   // Очищаем поле поиска
   document.querySelector('.search_input').value = '';

   document.getElementById('searchOverlay').classList.remove('active');
});

// Обработка нажатия Enter в поле поиска
document.querySelector('.search_input').addEventListener('keydown', function (e) {
   if (e.key === 'Enter') {
      e.preventDefault(); // Предотвращаем стандартное поведение

      // Получаем поисковый запрос
      const searchQuery = this.value.trim();

      if (searchQuery) {
         // Выполняем поиск (здесь можно добавить свою логику поиска)
         performSearch(searchQuery);
      }
   }
});

// Функция выполнения поиска
function performSearch(query) {
   // Здесь должна быть ваша логика поиска
   console.log('Выполняется поиск по запросу:', query);

   // Пример: редирект на страницу поиска с параметром
   // window.location.href = `/search?q=${encodeURIComponent(query)}`;

   // Или показать результаты на этой же странице
   // showSearchResults(query);
}

// Закрытие окна поиска по нажатию Escape
document.addEventListener('keydown', function (e) {
   if (e.key === 'Escape' && document.getElementById('searchOverlay').classList.contains('active')) {
      document.getElementById('closeSearch').click();
   }
});

// Слайдер

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.slider_dot');
// const servicesLink = document.querySelector('.services_link');   //Для скрытия кнопки услуги на первом слайде включить
let currentSlide = 0;
let slideInterval;

// Функция для показа слайда
// function showSlide(n) {
//    slides.forEach(slide => slide.classList.remove('active'));
//    dots.forEach(dot => dot.classList.remove('active'));

//    currentSlide = (n + slides.length) % slides.length;

//    slides[currentSlide].classList.add('active');
//    dots[currentSlide].classList.add('active');


// }

// Функция для показа слайда
function showSlide(n) {
   slides.forEach(slide => slide.classList.remove('active'));
   dots.forEach(dot => dot.classList.remove('active'));

   currentSlide = (n + slides.length) % slides.length;

   slides[currentSlide].classList.add('active');
   dots[currentSlide].classList.add('active');

   //    // Скрываем кнопку на первом слайде (индекс 0), показываем на остальных
   //    if (currentSlide === 0) {                                    //Для скрытия кнопки услуги на первом слайде включить
   //       servicesLink.classList.add('hidden');                       //Для скрытия кнопки услуги на первом слайде включить
   //    } else {                                                       //Для скрытия кнопки услуги на первом слайде включить
   //       servicesLink.classList.remove('hidden');                    //Для скрытия кнопки услуги на первом слайде включить
   //    }
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

document.addEventListener('DOMContentLoaded', function () {
   // Получаем высоту шапки
   const header = document.querySelector('.header');
   const headerHeight = header.offsetHeight;

   // Создаем плейсхолдер с вычисленной высотой
   const placeholder = document.querySelector('.header_placeholder');

   // Скрываем кнопку на первом слайде (индекс 0), показываем на остальных


   // Добавление фона при скролле с улучшенной логикой
   window.addEventListener('scroll', function () {
      if (window.scrollY > 30) {
         header.classList.add('scrolled');
      } else {
         header.classList.remove('scrolled');
      }
   });

});

if (/iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream) {
   document.addEventListener('touchmove', function (e) {
      if (document.getElementById('searchOverlay').classList.contains('active')) {
         // Разрешаем скролл только внутри поискового overlay
         if (!e.target.closest('.search_overlay')) {
            e.preventDefault();
         }
      }
   }, { passive: false });
}


// О компании
document.addEventListener('DOMContentLoaded', function () {
   const videoPlayer = document.getElementById('videoPlayer');

   videoPlayer.addEventListener('click', function () {
      // Заменяем миниатюру на iframe с видео
      this.innerHTML = '<iframe class="video-iframe" src="https://www.youtube.com/embed/T9oVJQvlXBQ?si=Dk1veWe5huZH4TgQ?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
      this.innerHTML = '<iframe class="company_video-iframe" src="https://www.youtube.com/embed/T9oVJQvlXBQ?si=Dk1veWe5huZH4TgQ?rel=0" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
   });

   // Функция для обрезки текста по высоте видео
   function adjustContent() {
      const textContent = document.querySelector('.text-content');
      const videoContent = document.querySelector('.video-content');

      if (window.innerWidth > 991.98) {
         // На больших экранах устанавливаем высоту текста равной высоте видео
         textContent.style.maxHeight = videoContent.offsetHeight + 'px';
      } else {
         // На мобильных устройствах используем CSS-правила
         textContent.style.maxHeight = '';
      }
   }

   // Вызываем функцию при загрузке и изменении размера окна
   window.addEventListener('load', adjustContent);
   window.addEventListener('resize', adjustContent);
});

// Наши услуги
document.addEventListener('DOMContentLoaded', function () {
   const company_slider = document.getElementById('servicesSlider');
   const dotsservices__container = document.getElementById('sliderDots');
   const dots = dotsservices__container.querySelectorAll('.service_slider_dot');
   const serviceCards = company_slider.querySelectorAll('.service_card');

   let currentPosition = 0;
   let currentSlide = 0;
   let cardsToShow = 3;
   let autoScrollInterval;
   let totalSlides = Math.ceil(serviceCards.length / cardsToShow);

   // Переменные для обработки свайпа
   let touchStartX = 0;
   let touchEndX = 0;
   let isDragging = false;

   // Функция для обновления количества отображаемых карточек
   function updateCardsToShow() {
      if (window.innerWidth <= 1200 && window.innerWidth > 768) {
         cardsToShow = 2;
      } else if (window.innerWidth <= 768) {
         cardsToShow = 1;
      } else {
         cardsToShow = 3;
      }

      totalSlides = Math.ceil(serviceCards.length / cardsToShow);
      updateDots();
      goToSlide(0);
   }

   // Функция для перемещения слайдера
   function moveSlider() {
      const cardWidth = company_slider.offsetWidth / cardsToShow;
      currentPosition = -currentSlide * cardWidth * cardsToShow;
      company_slider.style.transform = `translateX(${currentPosition}px)`;

      updateDots();
   }

   // Обновление точек-индикаторов
   function updateDots() {
      dots.forEach((dot, index) => {
         let dotIndex;

         if (currentSlide === 0) {
            // Первый слайд
            dotIndex = index === 0 ? totalSlides - 1 : index - 1;
         } else if (currentSlide === totalSlides - 1) {
            // Последний слайд
            dotIndex = index === 2 ? 0 : totalSlides - 2 + index;
         } else {
            // Средние слайды
            dotIndex = currentSlide - 1 + index;
         }

         dot.setAttribute('data-index', dotIndex);

         if (dotIndex === currentSlide) {
            dot.classList.add('active');
         } else {
            dot.classList.remove('active');
         }
      });
   }

   // Переход к определенному слайду
   function goToSlide(slideIndex) {
      if (slideIndex < 0) {
         currentSlide = totalSlides - 1;
      } else if (slideIndex >= totalSlides) {
         currentSlide = 0;
      } else {
         currentSlide = slideIndex;
      }
      moveSlider();
   }

   // Сброс таймера автоматической прокрутки
   function resetAutoScroll() {
      clearInterval(autoScrollInterval);
      startAutoScroll();
   }

   // Обработчики кликов на точки
   dots.forEach(dot => {
      dot.addEventListener('click', () => {
         const slideIndex = parseInt(dot.getAttribute('data-index'));
         goToSlide(slideIndex);
         resetAutoScroll(); // Сброс таймера при ручном перелистывании
      });
   });

   // Функция для автоматической прокрутки
   function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
         goToSlide(currentSlide + 1);
      }, 7000); // Меняем слайд каждые 7 секунд
   }

   // Обработчики для свайпа на мобильных устройствах
   company_slider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      isDragging = true;
   });

   company_slider.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchEndX = e.changedTouches[0].screenX;
   });

   company_slider.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;

      const swipeThreshold = 50; // Минимальное расстояние для свайпа
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
         if (diff > 0) {
            // Свайп влево - следующий слайд
            goToSlide(currentSlide + 1);
         } else {
            // Свайп вправо - предыдущий слайд
            goToSlide(currentSlide - 1);
         }
         resetAutoScroll(); // Сброс таймера при ручном перелистывании
      }
   });

   // Обработчик изменения размера окна
   window.addEventListener('resize', function () {
      updateCardsToShow();
   });

   // Инициализация
   updateCardsToShow();
   startAutoScroll();
});



// ВАкансии
document.addEventListener('DOMContentLoaded', function () {
   // Весь предыдущий код остается без изменений
   // ...

   // Аккордеон для вакансий
   const vacancyItems = document.querySelectorAll('.vacancy_page_item');

   vacancyItems.forEach(item => {
      const header = item.querySelector('.vacancy_page_header');

      header.addEventListener('click', function () {
         // Убрали автоматическое закрытие других вакансий
         // Теперь пользователь сам управляет каждой вакансией

         // Переключаем текущий элемент
         item.classList.toggle('active');

         // Если вакансия закрывается, сбрасываем состояние телефона
         if (!item.classList.contains('active')) {
            resetPhoneState(item);
         }
      });
   });

   // Функционал показа телефона
   const showPhoneBtns = document.querySelectorAll('.show_phone_btn');

   showPhoneBtns.forEach(btn => {
      btn.addEventListener('click', function (e) {
         e.stopPropagation(); // Предотвращаем срабатывание клика на родительский элемент

         const phoneContainer = this.nextElementSibling;

         // Показываем/скрываем контейнер с телефоном
         if (phoneContainer && phoneContainer.classList.contains('phone_container')) {
            phoneContainer.classList.toggle('active');

            // Меняем текст кнопки
            if (phoneContainer.classList.contains('active')) {
               this.textContent = 'Скрыть телефон';
            } else {
               this.textContent = 'Показать телефон';
            }
         }
      });
   });

   // Функция для сброса состояния телефона
   function resetPhoneState(vacancyItem) {
      const phoneContainer = vacancyItem.querySelector('.phone_container');
      const showPhoneBtn = vacancyItem.querySelector('.show_phone_btn');

      if (phoneContainer) {
         phoneContainer.classList.remove('active');
      }

      if (showPhoneBtn) {
         showPhoneBtn.textContent = 'Показать телефон';
      }
   }
});



// О комнпании


document.addEventListener('DOMContentLoaded', function () {
   // Элементы слайдера
   const sliderTrack = document.getElementById('sliderTrack');
   const prevBtn = document.querySelector('.company_slider-btn.prev');
   const nextBtn = document.querySelector('.company_slider-btn.next');

   // Элементы модального окна
   const imageModal = document.getElementById('imageModal');
   const modalImage = document.getElementById('modalImage');
   const modalClose = document.getElementById('modalClose');
   const modalPrev = document.getElementById('modalPrev');
   const modalNext = document.getElementById('modalNext');
   const modalCounter = document.getElementById('modalCounter');

   // Данные для слайдера
   const slideData = [
      { src: 'img/bg_1.jpg', alt: 'Фото производства 1' },
      { src: 'img/bg_2.jpg', alt: 'Фото производства 2' },
      { src: 'img/bg_3.jpg', alt: 'Фото производства 3' },
      { src: 'img/bg_4.jpg', alt: 'Фото производства 4' },
      { src: 'img/bg_5.jpg', alt: 'Фото производства 5' },
      { src: 'img/bg_3.jpg', alt: 'Фото производства 6' },
      { src: 'img/bg_1.jpg', alt: 'Фото производства 7' },
      { src: 'img/bg_2.jpg', alt: 'Фото производства 8' }
   ];

   let currentSlide = 0;
   let slidesToShow = getSlidesToShow();
   let isAnimating = false;

   // Определяем количество видимых слайдов
   function getSlidesToShow() {
      const width = window.innerWidth;
      if (width < 768) return 1;
      if (width < 992) return 2;
      if (width < 1200) return 3;
      return 4;
   }

   // Создаем слайды
   function createSlides() {
      sliderTrack.innerHTML = '';
      slideData.forEach((slide, index) => {
         const slideElement = document.createElement('div');
         slideElement.className = 'company_slider-item';

         const img = document.createElement('img');
         img.src = slide.src;
         img.alt = slide.alt;
         img.dataset.index = index;

         slideElement.appendChild(img);
         sliderTrack.appendChild(slideElement);
      });
      updateSlider();
   }

   // Обновляем позицию слайдера
   function updateSlider() {
      if (isAnimating) return;

      isAnimating = true;
      const translateX = -currentSlide * (100 / slidesToShow);
      sliderTrack.style.transform = `translateX(${translateX}%)`;

      // Сбрасываем флаг анимации после завершения перехода
      setTimeout(() => {
         isAnimating = false;
      }, 500);
   }

   // Переход к следующему слайду
   function nextSlide() {
      if (isAnimating) return;

      const maxSlide = Math.max(0, slideData.length - slidesToShow);
      if (currentSlide >= maxSlide) {
         currentSlide = 0;
      } else {
         currentSlide++;
      }
      updateSlider();
   }

   // Переход к предыдущему слайду
   function prevSlide() {
      if (isAnimating) return;

      const maxSlide = Math.max(0, slideData.length - slidesToShow);
      if (currentSlide <= 0) {
         currentSlide = maxSlide;
      } else {
         currentSlide--;
      }
      updateSlider();
   }

   // Открытие модального окна
   function openModal(index) {
      currentSlide = parseInt(index);
      updateModal();
      imageModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
   }

   // Закрытие модального окна
   function closeModal() {
      imageModal.style.display = 'none';
      document.body.style.overflow = 'auto';
   }

   // Обновление модального окна
   function updateModal() {
      modalImage.src = slideData[currentSlide].src;
      modalImage.alt = slideData[currentSlide].alt;
      modalCounter.textContent = `${currentSlide + 1} / ${slideData.length}`;
   }

   // Следующее изображение в модальном окне
   function modalNextSlide() {
      currentSlide = (currentSlide + 1) % slideData.length;
      updateModal();
   }

   // Предыдущее изображение в модальном окне
   function modalPrevSlide() {
      currentSlide = (currentSlide - 1 + slideData.length) % slideData.length;
      updateModal();
   }

   // Обработчики событий для слайдера
   prevBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      prevSlide();
   });

   nextBtn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      nextSlide();
   });

   // Обработчики событий для модального окна
   modalClose.addEventListener('click', closeModal);
   modalPrev.addEventListener('click', modalPrevSlide);
   modalNext.addEventListener('click', modalNextSlide);

   // Закрытие модального окна при клике на фон
   imageModal.addEventListener('click', function (e) {
      if (e.target === imageModal) {
         closeModal();
      }
   });

   // Открытие модального окна при клике на изображение в слайдере
   sliderTrack.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG') {
         const index = e.target.dataset.index;
         openModal(index);
      }
   });

   // Обработчики клавиатуры
   document.addEventListener('keydown', function (e) {
      if (imageModal.style.display === 'flex') {
         if (e.key === 'Escape') {
            closeModal();
         } else if (e.key === 'ArrowLeft') {
            modalPrevSlide();
         } else if (e.key === 'ArrowRight') {
            modalNextSlide();
         }
      }
   });

   // Адаптация при изменении размера окна
   window.addEventListener('resize', function () {
      const newSlidesToShow = getSlidesToShow();
      if (newSlidesToShow !== slidesToShow) {
         slidesToShow = newSlidesToShow;
         // Корректируем текущий слайд, чтобы не выходить за пределы
         const maxSlide = Math.max(0, slideData.length - slidesToShow);
         if (currentSlide > maxSlide) {
            currentSlide = maxSlide;
         }
         updateSlider();
      }
   });

   // Инициализация
   createSlides();

   // Добавляем обработчики для touch событий на мобильных устройствах
   let startX = 0;
   let endX = 0;

   sliderTrack.addEventListener('touchstart', function (e) {
      startX = e.touches[0].clientX;
   }, { passive: true });

   sliderTrack.addEventListener('touchend', function (e) {
      endX = e.changedTouches[0].clientX;
      handleSwipe();
   }, { passive: true });

   function handleSwipe() {
      const swipeThreshold = 50;
      const diff = startX - endX;

      if (Math.abs(diff) > swipeThreshold) {
         if (diff > 0) {
            // Свайп влево - следующий слайд
            nextSlide();
         } else {
            // Свайп вправо - предыдущий слайд
            prevSlide();
         }
      }
   }
});


// Фщтогалерея

// Данные для галереи (обычно загружаются с сервера)
const galleryData = {
   "2022": [
      { src: "img/bg_1.jpg", alt: "Фото 2022-1" },
      { src: "img/bg_2.jpg", alt: "Фото 2022-2" },
      { src: "img/bg_3.jpg", alt: "Фото 2022-3" },
      { src: "img/bg_4.jpg", alt: "Фото 2022-4" }
   ],
   "2023": [
      { src: "img/bg_1.jpg", alt: "Фото 2023-1" },
      { src: "img/bg_2.jpg", alt: "Фото 2023-2" },
      { src: "img/bg_3.jpg", alt: "Фото 2023-3" },
      { src: "img/bg_3.jpg", alt: "Фото 2023-3" },
      { src: "img/bg_3.jpg", alt: "Фото 2023-3" },
      { src: "img/bg_3.jpg", alt: "Фото 2023-3" },

      { src: "img/bg_3.jpg", alt: "Фото 2023-3" },
      { src: "img/bg_3.jpg", alt: "Фото 2023-3" },
      { src: "img/bg_4.jpg", alt: "Фото 2023-4" }
   ],
   "2024": [
      { src: "img/bg_1.jpg", alt: "Фото 2024-1" },
      { src: "img/bg_5.jpg", alt: "Фото 2024-2" },
      { src: "img/bg_3.jpg", alt: "Фото 2024-3" },
      { src: "img/bg_2.jpg", alt: "Фото 2024-4" }
   ],
   "2025": [
      { src: "img/bg_2.jpg", alt: "Фото 2025-1" },
      { src: "img/bg_1.jpg", alt: "Фото 2025-2" },
      { src: "img/bg_3.jpg", alt: "Фото 2025-3" },
      { src: "img/bg_4.jpg", alt: "Фото 2025-4" }
   ]
};

// Переменные для управления слайдером
let currentYear = '';
let currentIndex = 0;
let currentImages = [];
let touchStartX = 0;
let touchEndX = 0;
let isSwiping = false;

// Элементы слайдера
const photogalery_slider = document.querySelector('.photogalery_slider');
const photogalery_sliderImage = document.querySelector('.photogalery_slider-image');
const photogalery_sliderImageContainer = document.querySelector('.photogalery_slider-image-container');
const photogalery_sliderHeader = document.querySelector('.photogalery_slider-header');
const photogalery_sliderThumbnails = document.querySelector('.photogalery_slider-thumbnails');
const closeButton = document.querySelector('.photogalery_slider-close');
const prevNavButton = document.querySelector('.photogalery_slider-prev-nav');
const nextNavButton = document.querySelector('.photogalery_slider-next-nav');
const currentIndexSpan = document.querySelector('.current-index');
const totalCountSpan = document.querySelector('.total-count');

// Открытие слайдера при клике на год
document.querySelectorAll('.photo_year_card').forEach(card => {
   card.addEventListener('click', () => {
      const year = card.getAttribute('data-year');
      openphotogalery_slider(year);
   });
});

// Функция открытия слайдера
function openphotogalery_slider(year) {
   currentYear = year;
   currentIndex = 0;
   currentImages = galleryData[year];

   // Обновляем заголовок
   photogalery_sliderHeader.textContent = year;

   // Обновляем счетчик
   updateCounter();

   // Показываем первое изображение
   updatephotogalery_sliderImage();

   // Создаем миниатюры
   createThumbnails();

   // Показываем слайдер
   photogalery_slider.classList.add('active');

   // Блокируем прокрутку страницы
   document.body.style.overflow = 'hidden';
}

// Функция закрытия слайдера
function closephotogalery_slider() {
   photogalery_slider.classList.remove('active');
   document.body.style.overflow = 'auto';
}

// Функция обновления изображения в слайдере
function updatephotogalery_sliderImage() {
   if (currentImages.length > 0) {
      // Добавляем анимацию смены изображения
      photogalery_sliderImage.style.opacity = '0';

      setTimeout(() => {
         photogalery_sliderImage.src = currentImages[currentIndex].src;
         photogalery_sliderImage.alt = currentImages[currentIndex].alt;
         photogalery_sliderImage.style.opacity = '1';

         // Обновляем активную миниатюру
         updateActiveThumbnail();

         // Обновляем счетчик
         updateCounter();
      }, 200);
   }
}

// Функция обновления счетчика
function updateCounter() {
   currentIndexSpan.textContent = currentIndex + 1;
   totalCountSpan.textContent = currentImages.length;
}

// Функция создания миниатюр
function createThumbnails() {
   photogalery_sliderThumbnails.innerHTML = '';

   currentImages.forEach((image, index) => {
      const thumbnail = document.createElement('img');
      thumbnail.src = image.src;
      thumbnail.alt = image.alt;
      thumbnail.classList.add('photogalery_slider-thumbnail');

      if (index === currentIndex) {
         thumbnail.classList.add('active');
      }

      thumbnail.addEventListener('click', () => {
         currentIndex = index;
         updatephotogalery_sliderImage();
      });

      photogalery_sliderThumbnails.appendChild(thumbnail);
   });
}

// Функция обновления активной миниатюры
function updateActiveThumbnail() {
   const thumbnails = document.querySelectorAll('.photogalery_slider-thumbnail');
   thumbnails.forEach((thumbnail, index) => {
      if (index === currentIndex) {
         thumbnail.classList.add('active');
      } else {
         thumbnail.classList.remove('active');
      }
   });
}

// Функция перехода к предыдущему изображению
function prevImage() {
   currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
   updatephotogalery_sliderImage();
}

// Функция перехода к следующему изображению
function nextImage() {
   currentIndex = (currentIndex + 1) % currentImages.length;
   updatephotogalery_sliderImage();
}

// Обработчики событий
closeButton.addEventListener('click', closephotogalery_slider);
prevNavButton.addEventListener('click', prevImage);
nextNavButton.addEventListener('click', nextImage);

// Закрытие слайдера при клике на затемненную область
photogalery_slider.addEventListener('click', (e) => {
   if (e.target === photogalery_slider) {
      closephotogalery_slider();
   }
});

// Управление с клавиатуры
document.addEventListener('keydown', (e) => {
   if (photogalery_slider.classList.contains('active')) {
      if (e.key === 'Escape') {
         closephotogalery_slider();
      } else if (e.key === 'ArrowLeft') {
         prevImage();
      } else if (e.key === 'ArrowRight') {
         nextImage();
      }
   }
});

// Обработчики свайпа для мобильных устройств
photogalery_sliderImageContainer.addEventListener('touchstart', (e) => {
   touchStartX = e.changedTouches[0].screenX;
   isSwiping = true;
}, { passive: true });

photogalery_sliderImageContainer.addEventListener('touchmove', (e) => {
   if (!isSwiping) return;

   const touchX = e.changedTouches[0].screenX;
   const diff = touchX - touchStartX;

   // Добавляем небольшое смещение изображения при свайпе для интерактивности
   photogalery_sliderImage.style.transform = `scale(1.05) translateX(${diff * 0.5}px)`;
}, { passive: true });

photogalery_sliderImageContainer.addEventListener('touchend', (e) => {
   if (!isSwiping) return;

   touchEndX = e.changedTouches[0].screenX;
   handleSwipe();
   isSwiping = false;

   // Сбрасываем смещение изображения
   photogalery_sliderImage.style.transform = 'scale(1.05)';
}, { passive: true });

// Функция обработки свайпа
function handleSwipe() {
   const minSwipeDistance = 50; // Минимальное расстояние для срабатывания свайпа
   const diff = touchStartX - touchEndX;

   if (Math.abs(diff) < minSwipeDistance) return;

   if (diff > 0) {
      // Свайп влево - следующее изображение
      nextImage();
   } else {
      // Свайп вправо - предыдущее изображение
      prevImage();
   }
}
