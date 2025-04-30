document.addEventListener('DOMContentLoaded', () => {
  const cards = Array.from(document.querySelectorAll('.card_box'));
  const container = document.querySelector('.grid-row') || document.body;
  const noResults = document.getElementById('no-results-message');

  let currentFilter = null;

  function normalize(text) {
    return text.toLowerCase().replace(/\s/g, '');
  }

  function extractKeyValue(text) {
    const norm = normalize(text);
    const raw = text.trim();

    if (norm.includes('вт')) return ['power', raw.replace(/[^0-9]/g, '')];
    if (norm.includes('ra')) return ['ra', raw.replace(/[^0-9]/g, '')];
    if (/k[:]?[\d]{2,5}$/i.test(norm)) return ['colorTemp', raw.replace(/[^0-9]/g, '')];
    if (/ip\d+/i.test(norm)) return ['degreeOfProtection', raw.toUpperCase()];
    if (/^\d+[xх]\d+[xх]\d+$/i.test(norm)) return ['size', raw.replace(/х/gi, 'x')];

    return ['model', raw];
  }

  function filterCards(key, value) {
    currentFilter = { key, value };
    const matched = [];

    cards.forEach(card => {
      const dataKey = key.charAt(0).toLowerCase() + key.slice(1);
      const attr = (card.dataset[dataKey] || '').toLowerCase();
      const isMatch = attr === value.toLowerCase();

      card.classList.toggle('hidden', !isMatch);
      if (isMatch) matched.push(card);
    });

    container.innerHTML = '';
    matched.forEach(card => container.appendChild(card));

    if (noResults) {
      noResults.style.display = matched.length === 0 ? 'flex' : 'none';
    }

    // Добавляем класс для двух столбцов при наличии более одной карточки
    if (matched.length > 1) {
      container.classList.add('two-columns');
    } else {
      container.classList.remove('two-columns');
    }

    showResetButton(value);
  }

  function resetFilter() {
    currentFilter = null;
    cards.forEach(card => card.classList.remove('hidden'));
    cards.forEach(card => container.appendChild(card));
    if (noResults) noResults.style.display = 'none';
    removeResetButton();
    container.classList.remove('two-columns'); // Удаляем класс при сбросе фильтра
  }

  function showResetButton(text) {
    removeResetButton();

    const resetDiv = document.createElement('div');
    resetDiv.id = 'param-reset';
    resetDiv.innerHTML = `
      <span class="reset-label">Вы выбрали: <strong>${text}</strong></span>
      <img src="/img/crossed-button.svg" alt="Сбросить фильтр" id="resetFilterIcon" style="cursor:pointer; width:34px; vertical-align:middle; margin-left:10px;">
    `;

    Object.assign(resetDiv.style, {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '8px',
      marginBottom: '20px'
    });

    container.parentElement.insertBefore(resetDiv, container);

    document.getElementById('resetFilterIcon').addEventListener('click', resetFilter);
  }

  function removeResetButton() {
    const existing = document.getElementById('param-reset');
    if (existing) existing.remove();
  }

  document.addEventListener('click', (e) => {
    const el = e.target.closest('.text-param, .text');
    if (!el) return;

    const raw = el.textContent.trim();
    const [key, val] = extractKeyValue(raw);
    filterCards(key, val);
  });
});
