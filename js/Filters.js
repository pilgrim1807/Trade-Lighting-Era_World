document.addEventListener('DOMContentLoaded', () => {
  const cardsContainer = document.querySelector('.grid-row');
  const cards = Array.from(document.querySelectorAll('.card_box'));
  const checkboxes = document.querySelectorAll('.filter-grid-item input[type="checkbox"]');
  const noResultsBox = document.getElementById('no-results-message');
  const clearBtn = document.getElementById('clear-filters');
  const toggleBtn = document.getElementById('toggleFilters');
  const closeBtn = document.getElementById('closeFilters');
  const filterPanel = document.querySelector('.filter-panel');
  const resizeHandle = document.querySelector('.filter-resize-handle');

  const filterMap = {
    "1": "ra",
    "2": "colorTemp",
    "3": "bodyColor",
    "4": "diffuser",
    "5": "model",
    "6": "size",
    "7": "power"
  };

  // Функция для получения активных фильтров
  function getActiveFilters() {
    const filters = {};
    checkboxes.forEach(cb => {
      if (cb.checked) {
        const match = cb.name.match(/filter_(\d+)/);
        if (match) {
          const key = match[1];
          const value = cb.value.trim().toLowerCase();
          if (!filters[key]) filters[key] = [];
          filters[key].push(value);
        }
      }
    });
    return filters;
  }

  // Функция для фильтрации карточек
  function filterCards() {
    const activeFilters = getActiveFilters();
    const matchedCards = [];
    const unmatchedCards = [];

    cards.forEach(card => {
      let isMatch = true;
      for (const filterKey in activeFilters) {
        const dataAttr = filterMap[filterKey];
        const cardValue = (card.dataset[dataAttr] || "").toLowerCase().trim();
        const filterValues = activeFilters[filterKey];
        if (!filterValues.includes(cardValue)) {
          isMatch = false;
          break;
        }
      }
      if (isMatch) matchedCards.push(card);
      else unmatchedCards.push(card);
    });

    cardsContainer.innerHTML = '';

    matchedCards.forEach(card => {
      card.classList.remove('hidden');
      cardsContainer.appendChild(card);
    });

    unmatchedCards.forEach(card => {
      card.classList.add('hidden');
      cardsContainer.appendChild(card);
    });

    noResultsBox.style.display = (Object.keys(activeFilters).length > 0 && matchedCards.length === 0) ? 'flex' : 'none';
  }

  function resetFilters() {
    // Снимаем все галочки с чекбоксов
    checkboxes.forEach(cb => cb.checked = false);
    noResultsBox.style.display = 'none';
  
    // Снимаем класс "hidden" с карточек, показываем все карточки
    cards.forEach(card => {
      card.classList.remove('hidden');
      cardsContainer.appendChild(card);
    });
  
    // Убедимся, что панель фильтров всегда остаётся открытой
    if (!filterPanel.classList.contains('active')) {
      filterPanel.classList.add('active');  // Панель остаётся открытой
    }

    // Снимаем галочки с чекбоксов, но панель фильтров остаётся открытой
    // Состояние панели не изменяется
  }

  // Слушатели на фильтрацию
  checkboxes.forEach(cb => cb.addEventListener('change', filterCards));
  document.querySelector('.reset-btn')?.addEventListener('click', (e) => {
    e.preventDefault();
    resetFilters();  // Сбрасываем фильтры, но панель не закрывается
  });
  clearBtn?.addEventListener('click', resetFilters);

  // Открытие/закрытие панели фильтров
  toggleBtn?.addEventListener('click', () => {
    filterPanel.classList.toggle('active');
  });

  // Закрытие панели при клике на кнопку
  closeBtn?.addEventListener('click', () => {
    filterPanel.classList.remove('active');
  });

  // Перетаскивание панели: Схватиться за любой участок левого края панели
  if (resizeHandle && filterPanel) {
    let isDragging = false;
    let startX = 0;
    let startRight = 0;

    // Перетаскивание панели с левого края
    filterPanel.addEventListener('mousedown', (e) => {
      if (e.offsetX <= 10) {  // Проверяем, если клик был в области левого края панели
        isDragging = true;
        startX = e.clientX;
        startRight = parseInt(window.getComputedStyle(filterPanel).right, 10);
        document.body.style.cursor = 'ew-resize';
        filterPanel.style.transition = 'none';  // Отключаем анимацию во время перетаскивания
        e.preventDefault();
      }
    });

    document.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      const deltaX = startX - e.clientX;
      let newRight = startRight + deltaX;
      newRight = Math.max(-320, Math.min(newRight, 550)); // Ограничение для перетаскивания
      filterPanel.style.right = `${newRight}px`;

      // Убедимся, что кнопка закрытия остаётся кликабельной
      closeBtn.style.pointerEvents = 'auto';  // Делаем кнопку доступной для кликов
    });

    document.addEventListener('mouseup', () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.cursor = '';
        filterPanel.style.transition = 'right 0.4s ease, transform 0.4s ease';  // Включаем анимацию обратно
      }
    });
  }

  // Запуск фильтрации при старте
  filterCards();
});
