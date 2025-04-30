document.addEventListener('DOMContentLoaded', function () {
  const paginationContainer = document.querySelector('.pagination_container');
  const pageContent = document.getElementById('pageContent');
  const totalPages = 35;
  let currentPage = 1;

  function getThemeSuffix() {
    const theme = document.documentElement.getAttribute('data-theme');
    return theme === 'dark' ? '_dark' : '';
  }

  function renderContent(page) {
    pageContent.innerHTML = ``;
  }

  function renderPagination() {
    paginationContainer.innerHTML = '';

    const themeSuffix = getThemeSuffix();

    const createButton = (html, page, isActive = false, disabled = false) => {
      const btn = document.createElement('button');
      btn.className = 'pagination_button';
      btn.innerHTML = html;
      if (isActive) btn.classList.add('active');
      if (disabled) btn.disabled = true;

      if (!disabled && page !== null && page !== currentPage) {
        btn.addEventListener('click', () => {
          currentPage = page;
          renderPagination();
          renderContent(currentPage);
        });
      }

      return btn;
    };

    // Назад
    const backImg = `<img src="/img/backward${themeSuffix}.svg" alt="Назад">`;
    paginationContainer.appendChild(createButton(backImg, currentPage - 1, false, currentPage === 1));

    // Диапазон страниц
    const pagesToShow = [];
    if (currentPage <= 3) {
      for (let i = 1; i <= Math.min(5, totalPages); i++) pagesToShow.push(i);
    } else if (currentPage >= totalPages - 2) {
      for (let i = totalPages - 4; i <= totalPages; i++) if (i > 0) pagesToShow.push(i);
    } else {
      for (let i = currentPage - 2; i <= currentPage + 2; i++) pagesToShow.push(i);
    }

    if (!pagesToShow.includes(1)) {
      paginationContainer.appendChild(createButton('1', 1));
      if (pagesToShow[0] > 2) {
        const dots = document.createElement('span');
        dots.className = 'pagination_dots';
        dots.innerText = '...';
        paginationContainer.appendChild(dots);
      }
    }

    pagesToShow.forEach(page => {
      paginationContainer.appendChild(createButton(page, page, page === currentPage));
    });

    if (!pagesToShow.includes(totalPages)) {
      if (pagesToShow[pagesToShow.length - 1] < totalPages - 1) {
        const dots = document.createElement('span');
        dots.className = 'pagination_dots';
        dots.innerText = '...';
        paginationContainer.appendChild(dots);
      }
      paginationContainer.appendChild(createButton(totalPages, totalPages));
    }

    // Вперёд
    const forwardImg = `<img src="/img/forward${themeSuffix}.svg" alt="Вперёд">`;
    paginationContainer.appendChild(createButton(forwardImg, currentPage + 1, false, currentPage === totalPages));
  }

  document.addEventListener("themechanged", () => {
    renderPagination();
  });

  renderPagination();
  renderContent(currentPage);
});
