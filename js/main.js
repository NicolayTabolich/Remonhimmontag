
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


// О компании
document.addEventListener('DOMContentLoaded', function () {
   // Элементы слайдера
   const sliderTrack = document.getElementById('sliderTrack');
   const prevBtn = document.querySelector('.company_slider-btn.prev');
   const nextBtn = document.querySelector('.company_slider-btn.next');

   // Элементы модального окна
   const company_modal = document.getElementById('imageModal');
   const modalImage = document.getElementById('modalImage');
   const modalClose = document.getElementById('modalClose');
   const modalPrev = document.getElementById('modalPrev');
   const modalNext = document.getElementById('modalNext');
   const modalCounter = document.getElementById('modalCounter');

   // Данные для слайдера
   const slideData1 = [
      { src: 'img/bg_1.jpg', alt: 'photo' },
      { src: 'img/bg_2.jpg', alt: 'photo 2' },
      { src: 'img/bg_3.jpg', alt: 'photo 3' },
      { src: 'img/bg_1.jpg', alt: 'photo 4' },
      { src: 'img/bg_2.jpg', alt: 'photo 5' },
      { src: 'img/bg_3.jpg', alt: 'photo 6' },
      { src: 'img/bg_1.jpg', alt: 'photo 7' },
      { src: 'img/bg_2.jpg', alt: 'photo 8' }
   ];

   let currentSlide = 0;
   let slideInterval;
   const slideCount = slideData1.length;
   const slideDelay = 7000; // 7 секунд

   // Определяем количество видимых слайдов
   function getSlidesToShow() {
      const width = window.innerWidth;
      if (width < 768) return 1;
      if (width < 992) return 2;
      if (width < 1200) return 3;
      return 4;
   }

   let slidesToShow = getSlidesToShow();

   // Создаем слайды
   function createSlides() {
      sliderTrack.innerHTML = '';

      // Для бесконечной прокрутки добавляем копии слайдов в начало и конец
      const totalSlides = slideCount + 2 * slidesToShow;

      for (let i = 0; i < totalSlides; i++) {
         const slideIndex = (i - slidesToShow + slideCount) % slideCount;
         const slide = document.createElement('div');
         slide.className = 'company_slider-item';

         const img = document.createElement('img');
         img.src = slideData1[slideIndex].src;
         img.alt = slideData1[slideIndex].alt;

         slide.appendChild(img);
         sliderTrack.appendChild(slide);
      }

      // Устанавливаем начальную позицию
      sliderTrack.style.transform = `translateX(-${slidesToShow * 100 / slidesToShow}%)`;
   }

   // Функция для перехода к конкретному слайду
   function goToSlide(index, instant = false) {
      if (instant) {
         sliderTrack.style.transition = 'none';
      } else {
         sliderTrack.style.transition = 'transform 0.5s ease';
      }

      currentSlide = index;
      const translateX = -currentSlide * (100 / slidesToShow);
      sliderTrack.style.transform = `translateX(${translateX}%)`;

      // Сброс интервала
      if (!instant) {
         resetInterval();
      }
   }

   // Функция для перехода к следующей группе слайдов
   function nextSlide() {
      currentSlide++;

      // Если достигли конца, незаметно переходим к началу
      if (currentSlide >= slideCount + slidesToShow) {
         // Мгновенно переходим к началу без анимации
         goToSlide(slidesToShow, true);
         // Затем анимируем переход к следующему слайду
         setTimeout(() => {
            currentSlide = slidesToShow + 1;
            goToSlide(currentSlide);
         }, 50);
      } else {
         goToSlide(currentSlide);
      }
   }

   // Функция для перехода к предыдущей группе слайдов
   function prevSlide() {
      currentSlide--;

      // Если достигли начала, незаметно переходим к концу
      if (currentSlide < 0) {
         // Мгновенно переходим к концу без анимации
         goToSlide(slideCount + slidesToShow - 1, true);
         // Затем анимируем переход к предыдущему слайду
         setTimeout(() => {
            currentSlide = slideCount + slidesToShow - 2;
            goToSlide(currentSlide);
         }, 50);
      } else {
         goToSlide(currentSlide);
      }
   }

   // Функция для сброса интервала автоматической смены слайдов
   function resetInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, slideDelay);
   }

   // Открытие модального окна с изображением
   function openModal(index) {
      // Корректируем индекс для оригинальных слайдов
      const originalIndex = (index - slidesToShow + slideCount) % slideCount;
      currentSlide = originalIndex;
      updateModal();
      company_modal.style.display = 'flex';
      document.body.style.overflow = 'hidden'; // Блокировка прокрутки фона
   }

   // Закрытие модального окна
   function closeModal() {
      company_modal.style.display = 'none';
      document.body.style.overflow = 'auto'; // Восстановление прокрутки
   }

   // Обновление содержимого модального окна
   function updateModal() {
      const imgSrc = slideData1[currentSlide].src;
      const imgAlt = slideData1[currentSlide].alt;

      modalImage.src = imgSrc;
      modalImage.alt = imgAlt;
      modalCounter.textContent = `${currentSlide + 1} / ${slideCount}`;
   }

   // Переход к следующему изображению в модальном окне
   function modalNextSlide() {
      currentSlide = (currentSlide + 1) % slideCount;
      updateModal();
   }

   // Переход к предыдущему изображению в модальном окне
   function modalPrevSlide() {
      currentSlide = (currentSlide - 1 + slideCount) % slideCount;
      updateModal();
   }

   // Обработчики событий для слайдера
   prevBtn.addEventListener('click', prevSlide);
   nextBtn.addEventListener('click', nextSlide);

   // Обработчики событий для модального окна
   modalClose.addEventListener('click', closeModal);
   modalPrev.addEventListener('click', modalPrevSlide);
   modalNext.addEventListener('click', modalNextSlide);

   // Закрытие модального окна при клике на фон
   company_modal.addEventListener('click', function (e) {
      if (e.target === company_modal) {
         closeModal();
      }
   });

   // Открытие модального окна при клике на изображение в слайдере
   sliderTrack.addEventListener('click', function (e) {
      if (e.target.tagName === 'IMG') {
         const sliderItems = document.querySelectorAll('.company_slider-item');
         const index = Array.from(sliderItems).indexOf(e.target.parentElement);
         openModal(index);
      }
   });

   // Обработчики клавиатуры для навигации
   document.addEventListener('keydown', function (e) {
      if (company_modal.style.display === 'flex') {
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
         createSlides();
         resetInterval();
      }
   });

   // Инициализация
   createSlides();
   resetInterval();

   // Пауза автоматической смены при наведении на слайдер
   const sliderWrapper = document.querySelector('.company_slider-wrapper');
   sliderWrapper.addEventListener('mouseenter', function () {
      clearInterval(slideInterval);
   });

   sliderWrapper.addEventListener('mouseleave', function () {
      resetInterval();
   });
});
