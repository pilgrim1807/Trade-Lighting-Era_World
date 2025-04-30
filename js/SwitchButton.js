document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById('ItemContainer');
  const toggleBtn = document.getElementById('toggleViewBtn');
  const textSpan = toggleBtn?.querySelector('.head_text-button');

  let mode = localStorage.getItem('mode') || 'card';

  // Установка начального режима
  if (container) {
    container.classList.add(mode === 'list' ? 'mode_rows' : 'mode_cards');
    container.style.opacity = 1; // Ставим прозрачность нормальной
  }

  if (textSpan) {
    textSpan.textContent = mode === 'list' ? 'Список' : 'Карточки';
  }

  document.documentElement.classList.add(mode === 'list' ? 'list-mode' : 'card-mode');
  document.documentElement.style.visibility = 'visible';

  // Переключатель с анимацией
  toggleBtn?.addEventListener('click', () => {
    if (!container) return;

    container.style.transition = 'opacity 0.4s ease'; // Плавное исчезновение
    container.style.opacity = 0; // Начинаем исчезновение

    setTimeout(() => {
      if (container.classList.contains('mode_cards')) {
        container.classList.remove('mode_cards');
        container.classList.add('mode_rows');
        localStorage.setItem('mode', 'list');
        textSpan.textContent = 'Список';
        document.documentElement.classList.remove('card-mode');
        document.documentElement.classList.add('list-mode');
      } else {
        container.classList.remove('mode_rows');
        container.classList.add('mode_cards');
        localStorage.setItem('mode', 'card');
        textSpan.textContent = 'Карточки';
        document.documentElement.classList.remove('list-mode');
        document.documentElement.classList.add('card-mode');
      }

      container.style.opacity = 1; // Плавное появление
    }, 400); // Пауза, равная времени transition
  });
});

