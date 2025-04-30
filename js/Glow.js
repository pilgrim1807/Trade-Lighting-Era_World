document.addEventListener('DOMContentLoaded', () => {
  const cursorGlow = document.getElementById('cursor-glow');

  // Обновление позиции курсора
  document.addEventListener('mousemove', (e) => {
    if (document.body.classList.contains('dark-theme')) {
      cursorGlow.style.top = `${e.clientY}px`;
      cursorGlow.style.left = `${e.clientX}px`;
    }
  });

  // Усиление свечения при нажатии
  document.addEventListener('mousedown', () => {
    if (document.body.classList.contains('dark-theme')) {
      document.body.classList.add('cursor-glow-strong');
    }
  });

  // Возврат нормального свечения при отпускании
  document.addEventListener('mouseup', () => {
    document.body.classList.remove('cursor-glow-strong');
  });

  // Включение/выключение свечения изображения по клику
  document.body.addEventListener('click', (e) => {
    const img = e.target.closest('img');
    if (img && document.body.classList.contains('dark-theme')) {
      img.classList.toggle('glow-off');
    }
  });
});
