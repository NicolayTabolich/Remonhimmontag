// Данные новостей
const newsData = [
   {
      id: 1,
      title: "Новые технологии в веб-разработке",
      summary: "Обзор последних тенденций и инструментов для современных разработчиков.",
      fullText: "Веб-разработка продолжает стремительно развиваться. В этом году мы увидели появление новых фреймворков, улучшение существующих инструментов и изменение подходов к созданию веб-приложений. Особое внимание уделяется производительности, доступности и безопасности. React и Vue.js остаются лидерами среди фронтенд-фреймворков, в то время как на бэкенде популярность набирают Node.js и Python с Django. Также растет интерес к серверless архитектурам и микросервисам.",
      date: "2025-12-15",
      images: [
         "img/4_ychastok.jpg",
         "img/rmc_svarka_1.jpg"
      ]
   },
   {
      id: 2,
      title: "Искусственный интеллект в медицине",
      summary: "Как ИИ помогает врачам ставить точные диагнозы и разрабатывать новые лекарства.",
      fullText: "Искусственный интеллект революционизирует медицину. Алгоритмы машинного обучения уже сегодня помогают анализировать медицинские изображения, предсказывать развитие заболеваний и персонализировать лечение. В диагностике рака ИИ показывает точность, сравнимую с опытными врачами. Также ИИ используется для разработки новых лекарств, значительно ускоряя этот процесс. Эти технологии не заменят врачей, но станут мощным инструментом в их руках.",
      date: "2025-04-22",
      images: [
         "img/rsc_tak.jpg",
         "img/news/news_1.jpg"
      ]
   },
   {
      id: 3,
      title: "Кибербезопасность в 2024 году",
      summary: "Основные угрозы и методы защиты от кибератак для бизнеса и частных пользователей.",
      fullText: "С ростом цифровизации увеличивается и количество кибератак. В 2024 году эксперты прогнозируют рост фишинговых атак, атак вымогателей и целевых атак на критическую инфраструктуру. Для защиты необходимо использовать многофакторную аутентификацию, регулярно обновлять программное обеспечение и обучать сотрудников основам кибергигиены. Также важно иметь план реагирования на инциденты и регулярно делать резервные копии данных.",
      date: "2025-04-10",
      images: [
         "img/bg_1.jpg",
         "img/svarshik_1.jpg"
      ]
   },
   {
      id: 4,
      title: "Развитие электромобилей в мире",
      summary: "Тенденции рынка электромобилей и перспективы развития инфраструктуры зарядных станций.",
      fullText: "Рынок электромобилей продолжает расти рекордными темпами. Ведущие автопроизводители активно инвестируют в разработку новых моделей и строительство заводов по производству аккумуляторов. Параллельно развивается инфраструктура зарядных станций. Правительства многих стран поддерживают переход на электромобили через субсидии и налоговые льготы. Ожидается, что к 2030 году доля электромобилей в мировых продажах достигнет 30%.",
      date: "2025-03-28",
      images: [
         "img/crc_chelovelk_1.jpg",
         "img/3_ychastok.jpg"
      ]
   },
   {
      id: 5,
      title: "Образование в цифровую эпоху",
      summary: "Как онлайн-курсы и цифровые технологии меняют подход к обучению.",
      fullText: "Цифровые технологии кардинально изменили образование. Онлайн-курсы, виртуальные классы и интерактивные учебные материалы стали неотъемлемой частью обучения. Это позволяет получать знания из любой точки мира и в удобное время. Однако важно сохранять баланс между цифровыми и традиционными методами обучения. Также возрастает роль soft skills - критического мышления, креативности и сотрудничества, которые сложно развивать исключительно через онлайн-формат.",
      date: "2023-12-15",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },
   {
      id: 6,
      title: "Удаленная работа: плюсы и минусы",
      summary: "Анализ преимуществ и недостатков удаленного формата работы после пандемии.",
      fullText: "Пандемия ускорила переход на удаленную работу, и многие компании решили сохранить этот формат. Среди преимуществ - гибкий график, отсутствие необходимости тратить время на дорогу и возможность работать из любой точки мира. Однако есть и недостатки: размытие границ между работой и личной жизнью, сложности в коммуникации и снижение социального взаимодействия. Успешная удаленная работа требует самодисциплины и правильной организации рабочего пространства.",
      date: "2023-11-05",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },
   {
      id: 7,
      title: "Устойчивое развитие и экология",
      summary: "Как компании внедряют экологичные практики в свои бизнес-процессы.",
      fullText: "Устойчивое развитие становится ключевым приоритетом для бизнеса. Компании внедряют экологичные практики: сокращают углеродный след, используют возобновляемые источники энергии, перерабатывают отходы и разрабатывают продукты с учетом их жизненного цикла. Потребители все чаще выбирают экологически ответственные бренды. Однако для реальных изменений необходимы системные решения и сотрудничество между бизнесом, государством и обществом.",
      date: "2024-10-18",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },
   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },
   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },

   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },

   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },

   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },
   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },


   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   },

   {
      id: 8,
      title: "Будущее космических технологий",
      summary: "Перспективы освоения космоса и коммерциализации космических полетов.",
      fullText: "Космическая отрасль переживает настоящий ренессанс. Частные компании активно развивают технологии для космических полетов, спутниковой связи и исследования космоса. Планы по колонизации Марса, добыче полезных ископаемых на астероидах и строительству орбитальных станций становятся все более реалистичными. Однако перед человечеством стоят серьезные технические и этические вызовы, связанные с освоением космоса.",
      date: "2024-09-03",
      images: [
         "img/bg_1.jpg",
         "img/news/news_1.jpg"
      ]
   }
];

// Элементы DOM
const latestNewsContainer = document.getElementById('latest-news-container');
const newsContainer = document.getElementById('news-container');
const paginationContainer = document.getElementById('pagination');
const yearFilter = document.getElementById('year-filter');
const monthFilter = document.getElementById('month-filter');
const newsModal = document.getElementById('news-modal');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalDate = document.getElementById('modal-date');
const modalText = document.getElementById('modal-text');
const modalMainImage = document.getElementById('modal-main-image');
const news_news_slider = document.getElementById('news_news_slider');
const news_news_slidernews_dots = document.getElementById('news_news_slider-news_dots');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const fullscreenImage = document.getElementById('fullscreen-image');
const fullscreenImg = fullscreenImage.querySelector('img');
const fullscreenCaption = document.getElementById('fullscreen-caption');
const closeFullscreen = fullscreenImage.querySelector('.close-fullscreen');
const fullscreenPrev = document.getElementById('fullscreen-prev');
const fullscreenNext = document.getElementById('fullscreen-next');

// Переменные состояния
let currentPage = 1;
const newsPerPage = 12;
let filteredNews = [...newsData];
let currentnews_slide_2 = 0;
let currentNewsImages = [];
let fullscreencurrentnews_slide_2 = 0;

// Переменные для обработки свайпов
let startX = 0;
let currentX = 0;
let isSwiping = false;

// Функция инициализации приложения
function init() {
   renderLatestNews(); // Отрисовка последних новостей
   renderNews(); // Отрисовка всех новостей
   setupFilters(); // Настройка фильтров
   setupEventListeners(); // Настройка обработчиков событий
   setupSwipeHandlers(); // Настройка обработчиков свайпов
}

// Функция отрисовки последних новостей (3 самые свежие)
function renderLatestNews() {
   // Очистка контейнера
   latestNewsContainer.innerHTML = '';

   // Сортируем новости по дате (от новых к старым) и берем первые 3
   const latestNews = [...newsData]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 3);

   // Создание карточек последних новостей
   latestNews.forEach(news => {
      const newsCard = document.createElement('div');
      newsCard.className = 'latest-news-card';
      newsCard.setAttribute('data-id', news.id);

      // Форматирование даты
      const date = new Date(news.date);
      const formattedDate = date.toLocaleDateString('ru-RU', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

      // Заполняем карточку содержимым (без кнопки "Читать далее")
      newsCard.innerHTML = `
                    <img src="${news.images[0]}" alt="${news.title}" class="latest-news-image">
                    <div class="latest-news-content">
                        <div class="latest-news-date">${formattedDate}</div>
                        <h3 class="latest-news-title">${news.title}</h3>
                        <p class="latest-news-summary">${news.summary}</p>
                    </div>
                `;

      // Добавляем карточку в контейнер
      latestNewsContainer.appendChild(newsCard);
   });
}

// Функция отрисовки всех новостей
function renderNews() {
   newsContainer.innerHTML = '';

   const startIndex = (currentPage - 1) * newsPerPage;
   const endIndex = startIndex + newsPerPage;
   const newsToShow = filteredNews.slice(startIndex, endIndex);

   if (newsToShow.length === 0) {
      newsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 40px;">Новости не найдены</p>';
      paginationContainer.innerHTML = '';
      return;
   }

   newsToShow.forEach(news => {
      const newsCard = document.createElement('div');
      newsCard.className = 'news-card';
      newsCard.setAttribute('data-id', news.id);

      const date = new Date(news.date);
      const formattedDate = date.toLocaleDateString('ru-RU', {
         year: 'numeric',
         month: 'long',
         day: 'numeric'
      });

      // Заполняем карточку содержимым (без ссылки "Читать далее")
      newsCard.innerHTML = `
                    <img src="${news.images[0]}" alt="${news.title}" class="news-image">
                    <div class="news-content">
                        <div class="news-date">${formattedDate}</div>
                        <h3 class="news-title">${news.title}</h3>
                        <p class="news-summary">${news.summary}</p>
                    </div>
                `;

      newsContainer.appendChild(newsCard);
   });

   renderPagination();
}

function renderPagination() {
   const totalPages = Math.ceil(filteredNews.length / newsPerPage);

   paginationContainer.innerHTML = '';

   if (totalPages < 2) return;

   for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      pageBtn.textContent = i;
      pageBtn.addEventListener('click', () => {
         currentPage = i;
         renderNews();
      });

      paginationContainer.appendChild(pageBtn);
   }
}

function setupFilters() {
   yearFilter.addEventListener('change', applyFilters);
   monthFilter.addEventListener('change', applyFilters);
}

function applyFilters() {
   const selectedYear = yearFilter.value;
   const selectedMonth = monthFilter.value;

   currentPage = 1;

   filteredNews = newsData.filter(news => {
      const newsDate = new Date(news.date);
      const newsYear = newsDate.getFullYear().toString();
      const newsMonth = (newsDate.getMonth() + 1).toString();

      const yearMatch = selectedYear === 'all' || newsYear === selectedYear;
      const monthMatch = selectedMonth === 'all' || newsMonth === selectedMonth;

      return yearMatch && monthMatch;
   });

   renderNews();
}

function setupSwipeHandlers() {
   setupSwipeForElement(news_news_slider, handlenews_news_sliderSwipe);
   setupSwipeForElement(fullscreenImage, handleFullscreenSwipe);
}

function setupSwipeForElement(element, callback) {
   element.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      currentX = startX;
      isSwiping = true;
   }, { passive: true });

   element.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      currentX = e.touches[0].clientX;
   }, { passive: true });

   element.addEventListener('touchend', (e) => {
      if (!isSwiping) return;

      const diffX = startX - currentX;
      const minSwipeDistance = 50;

      if (Math.abs(diffX) > minSwipeDistance) {
         if (diffX > 0) {
            callback(1);
         } else {
            callback(-1);
         }
      }

      isSwiping = false;
   }, { passive: true });
}

function handlenews_news_sliderSwipe(direction) {
   changenews_slide(direction);
}

function handleFullscreenSwipe(direction) {
   changeFullscreennews_slide(direction);
}

function setupEventListeners() {
   // Обработчик для последних новостей - клик по любой области карточки
   latestNewsContainer.addEventListener('click', (e) => {
      // Находим ближайшую карточку новости
      const newsCard = e.target.closest('.latest-news-card');
      if (newsCard) {
         const newsId = parseInt(newsCard.getAttribute('data-id'));
         const news = newsData.find(item => item.id === newsId);

         if (news) {
            openNewsModal(news);
         }
      }
   });

   // Обработчик для всех новостей - клик по любой области карточки
   newsContainer.addEventListener('click', (e) => {
      // Находим ближайшую карточку новости
      const newsCard = e.target.closest('.news-card');
      if (newsCard) {
         const newsId = parseInt(newsCard.getAttribute('data-id'));
         const news = newsData.find(item => item.id === newsId);

         if (news) {
            openNewsModal(news);
         }
      }
   });

   // Остальные обработчики без изменений
   closeModal.addEventListener('click', closeNewsModal);
   newsModal.addEventListener('click', (e) => {
      if (e.target === newsModal) {
         closeNewsModal();
      }
   });

   prevBtn.addEventListener('click', () => changenews_slide(-1));
   nextBtn.addEventListener('click', () => changenews_slide(1));

   news_news_slider.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
         const news_slideIndex = Array.from(news_news_slider.children).indexOf(e.target.parentElement);
         openFullscreenImage(news_slideIndex);
      }
   });

   fullscreenPrev.addEventListener('click', () => changeFullscreennews_slide(-1));
   fullscreenNext.addEventListener('click', () => changeFullscreennews_slide(1));

   closeFullscreen.addEventListener('click', closeFullscreenImage);
   fullscreenImage.addEventListener('click', (e) => {
      if (e.target === fullscreenImage) {
         closeFullscreenImage();
      }
   });
}

function openNewsModal(news) {
   const date = new Date(news.date);
   const formattedDate = date.toLocaleDateString('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
   });

   modalTitle.textContent = news.title;
   modalDate.textContent = formattedDate;
   modalText.textContent = news.fullText;
   modalMainImage.src = news.images[0];
   modalMainImage.alt = news.title;

   currentNewsImages = news.images;
   currentnews_slide_2 = 0;

   news_news_slider.innerHTML = '';
   news_news_slidernews_dots.innerHTML = '';

   news.images.forEach((image, index) => {
      const news_slide = document.createElement('div');
      news_slide.className = `news_slide ${index === 0 ? 'active' : ''}`;
      news_slide.innerHTML = `<img src="${image}" alt="${news.title} - изображение ${index + 1}">`;
      news_news_slider.appendChild(news_slide);

      const news_dot = document.createElement('div');
      news_dot.className = `news_dot ${index === 0 ? 'active' : ''}`;
      news_dot.addEventListener('click', () => goTonews_slide(index));
      news_news_slidernews_dots.appendChild(news_dot);
   });

   updatenews_news_slider();



   newsModal.style.display = 'block';
   document.body.style.overflow = 'hidden'; // Блокируем прокрутку body
}

function closeNewsModal() {
   newsModal.style.display = 'none';
   document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку body только здесь
}

function changenews_slide(direction) {
   currentnews_slide_2 += direction;

   if (currentnews_slide_2 < 0) {
      currentnews_slide_2 = currentNewsImages.length - 1;
   } else if (currentnews_slide_2 >= currentNewsImages.length) {
      currentnews_slide_2 = 0;
   }

   goTonews_slide(currentnews_slide_2);
}

function goTonews_slide(news_slideIndex) {
   currentnews_slide_2 = news_slideIndex;
   updatenews_news_slider();
}

function updatenews_news_slider() {
   news_news_slider.style.transform = `translateX(-${currentnews_slide_2 * 100}%)`;

   const news_dots = news_news_slidernews_dots.querySelectorAll('.news_dot');
   news_dots.forEach((news_dot, index) => {
      news_dot.classList.toggle('active', index === currentnews_slide_2);
   });
}

// Функция открытия полноэкранного просмотра
function openFullscreenImage(news_slideIndex) {
   fullscreencurrentnews_slide_2 = news_slideIndex;
   updateFullscreenImage();
   fullscreenImage.style.display = 'flex';

   // Сохраняем текущее состояние прокрутки модального окна
   const modalContent = document.querySelector('.modal-content');
   const scrollTop = modalContent.scrollTop;

   // Блокируем прокрутку только в модальном окне, а не во всем body
   document.body.style.overflow = 'hidden';
   modalContent.style.overflow = 'hidden';

   // Сохраняем позицию прокрутки для восстановления
   fullscreenImage.dataset.modalScrollTop = scrollTop;
}
// Функция закрытия полноэкранного просмотра
function closeFullscreenImage() {
   fullscreenImage.style.display = 'none';

   // Восстанавливаем прокрутку модального окна
   const modalContent = document.querySelector('.modal-content');
   const modalScrollTop = fullscreenImage.dataset.modalScrollTop || 0;

   // Восстанавливаем прокрутку модального окна
   modalContent.style.overflow = 'auto';

   // Прокручиваем к сохраненной позиции
   if (modalScrollTop > 0) {
      setTimeout(() => {
         modalContent.scrollTop = parseInt(modalScrollTop);
      }, 10);
   }

   // Не восстанавливаем прокрутку body, так как модальное окно еще открыто
   // document.body.style.overflow = 'auto'; // УБЕРИТЕ ЭТУ СТРОКУ
}

function changeFullscreennews_slide(direction) {
   fullscreencurrentnews_slide_2 += direction;

   if (fullscreencurrentnews_slide_2 < 0) {
      fullscreencurrentnews_slide_2 = currentNewsImages.length - 1;
   } else if (fullscreencurrentnews_slide_2 >= currentNewsImages.length) {
      fullscreencurrentnews_slide_2 = 0;
   }

   updateFullscreenImage();
}

function updateFullscreenImage() {
   fullscreenImg.src = currentNewsImages[fullscreencurrentnews_slide_2];
   // fullscreenCaption.textContent = `Изображение ${fullscreencurrentnews_slide_2 + 1} из ${currentNewsImages.length}`;
}

// Запуск приложения
init();

function renderPagination() {
   const totalPages = Math.ceil(filteredNews.length / newsPerPage);

   paginationContainer.innerHTML = '';

   if (totalPages < 2) return;

   for (let i = 1; i <= totalPages; i++) {
      const pageBtn = document.createElement('button');
      pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
      pageBtn.textContent = i;
      pageBtn.addEventListener('click', () => {
         currentPage = i;
         renderNews();

         // Прокрутка вверх при смене страницы
         window.scrollTo({
            top: 0,
            behavior: 'smooth'
         });
      });

      paginationContainer.appendChild(pageBtn);
   }
}

function applyFilters() {
   const selectedYear = yearFilter.value;
   const selectedMonth = monthFilter.value;

   currentPage = 1;

   filteredNews = newsData.filter(news => {
      const newsDate = new Date(news.date);
      const newsYear = newsDate.getFullYear().toString();
      const newsMonth = (newsDate.getMonth() + 1).toString();

      const yearMatch = selectedYear === 'all' || newsYear === selectedYear;
      const monthMatch = selectedMonth === 'all' || newsMonth === selectedMonth;

      return yearMatch && monthMatch;
   });

   renderNews();

   // Прокрутка вверх при применении фильтров
   window.scrollTo({
      top: 0,
      behavior: 'smooth'
   });
}


