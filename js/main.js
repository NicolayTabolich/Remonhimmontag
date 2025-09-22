
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
   });

   // Функция для обрезки текста по высоте видео
   function adjustContent() {
      const textContent = document.querySelector('.text-content');
      const videoContent = document.querySelector('.video-content');

      if (window.innerWidth > 1024) {
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

