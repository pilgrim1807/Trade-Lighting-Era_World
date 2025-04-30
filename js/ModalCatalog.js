(() => {
    const THEME_KEY = "theme"; // Ключ для localStorage

    function applyTheme(theme, animate = true) {
        document.documentElement.setAttribute("data-theme", theme);
        document.body.classList.toggle("dark-theme", theme === "dark");
        localStorage.setItem(THEME_KEY, theme);
        updateIcons(theme, animate);
        document.dispatchEvent(new CustomEvent("themechanged", { detail: theme }));
    }

    function updateIcons(theme, animate = true) {
        document.querySelectorAll(".theme-icon").forEach((img) => {
            const light = img.getAttribute("data-light");
            const dark = img.getAttribute("data-dark");
            const newSrc = theme === "dark" ? dark : light;
            if (!newSrc) return;

            if (!animate) {
                img.src = newSrc;
                return;
            }

            img.classList.add("fade-out");
            setTimeout(() => {
                img.src = newSrc;
                img.classList.remove("fade-out");
                img.classList.add("fade-in", "glow");
                setTimeout(() => img.classList.remove("fade-in", "glow"), 500);
            }, 150);
        });
    }

    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const currentTheme = savedTheme || (prefersDark ? "dark" : "light");

    document.documentElement.setAttribute("data-theme", currentTheme);
    document.body.classList.toggle("dark-theme", currentTheme === "dark");

    document.addEventListener("DOMContentLoaded", () => {
        applyTheme(currentTheme, false);

        document.addEventListener("click", (e) => {
            const themeBtn = e.target.closest(".theme_change");
            if (themeBtn) {
                e.preventDefault();
                const newTheme = document.body.classList.contains("dark-theme") ? "light" : "dark";
                applyTheme(newTheme);
            }
        });

        const openBtn = document.getElementById("openCatalogModal");

        openBtn?.addEventListener("click", (e) => {
            e.preventDefault();
            let modal = document.getElementById("catalogModal");

            if (!modal) {
                createModal(); // создаёт модалку и навешивает события
                modal = document.getElementById("catalogModal");
            }

            modal.classList.add("active");
            document.body.classList.add("modal-open");
            localStorage.setItem("catalogModalOpen", "true");
        });

        const isModalOpen = localStorage.getItem("catalogModalOpen");
        if (isModalOpen === "true") {
            let modal = document.getElementById("catalogModal");
            if (!modal) {
                createModal();
                modal = document.getElementById("catalogModal");
            }
            modal.classList.add("active");
            document.body.classList.add("modal-open");
        }

        document.addEventListener("themechanged", (e) => {
            const theme = e.detail;
            const closeIcon = document.getElementById("closeIcon");
            if (closeIcon) {
                const newSrc = theme === "dark"
                    ? closeIcon.getAttribute("data-dark")
                    : closeIcon.getAttribute("data-light");
                if (newSrc) closeIcon.src = newSrc;
            }
        });
    });

    // Функция создания модального окна и сразу обновления иконок
    function createModal() {
        const modalHTML = `<div id="catalogModal" class="modal">
    <div class="modal-content">

        <button id="onClose" class="close-btn">
            <img id="closeIcon" class="close-icon theme-icon" src="/img/light_close-icon.svg"
                data-light="/img/light_close-icon.svg" data-dark="/img/dark_close-icon.svg" alt="Закрыть окно" />
        </button>

        <header class="header hidden-print modal-header">
            <div class="modal_container container">
                <div class="modal-city-area-container">
                    <h1 class="modal-city">Ваш город: </h1>
                    <ul class="header-info_modal">
                        <li>Сайт для проектировщиков</li>
                        <li>Личный кабинет</li>
                    </ul>
                </div>
                <div class="modal-logo-theme-wrapper">
                    <div class="modal-header-controls">
                        <a href="https://www.eraworld.ru/" class="logo">
                            <img src="/img/logo_era.svg" alt="logo" />
                        </a>

                        <form action="/search" class="modal-search-form search-form">
                            <input type="text" id="search-input" placeholder="Поиск по сайту..." />
                        </form>

                        <button id="themeToggleBtnModal" class="theme_change" aria-label="Сменить тему">
                            <span class="header-info_change">Сменить тему</span>
                            <img id="themeIcon" class="theme-icon change-icon" src="/img/light_lamp.svg"
                                data-light="/img/light_lamp.svg" data-dark="/img/dark_lamp.svg" width="76"
                                alt="Иконка темы" />
                        </button>
                    </div>
                </div>

                <nav class="nav_main nav_main_sub">
                    <ul>
                        <li><a href="https://www.eraworld.ru/solutions">Отраслевые решения</a></li>
                        <li><a href="https://www.eraworld.ru/projects">Реализованные проекты</a></li>
                        <li><a href="https://www.eraworld.ru/services">Сервисы</a></li>
                        <li><a href="https://www.eraworld.ru/about">Компания</a></li>
                        <li><a href="/articles/9-chestnaya-poziciya-era.html">Честная позиция</a></li>
                        <li><a href="https://www.eraworld.ru/news">Новости</a></li>
                        <li><a href="https://www.eraworld.ru/guide">Справочник</a></li>
                        <li><a href="https://www.eraworld.ru/about/wheretobuy">Где купить</a></li>
                        <li><a href="https://www.eraworld.ru/advert">Скачать</a></li>
                        <li><a href="https://www.eraworld.ru/contacts">Контакты</a></li>
                    </ul>
                </nav>
                <hr>
            </div>
        </header>
        <div class="modal-body">
            <main class="container">
                <section class="page-heading">
                    <ul class="breadcrumb hidden-print">
                        <li class="main_title"><a href="https://www.eraworld.ru">Главная</a></li>
                    </ul>
                    <h2 class="catalog_title">Каталог</h2>
                    <div class="grid-container">
                        <section class="button-section">
                            <h3 class="modal-title_section">Освещение</h3>
                            <div class="button-grid">

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="img/icons/lighting/lighting-light-theme/icon-1.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-1.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-1.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Офисные светильники </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-8.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-8.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-8.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Светильники HoReCa
                                        Geometria</span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-15.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-15.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-15.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Встраиваемые светильники
                                    </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-2.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-2.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-2.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Бытовые светодиодные
                                        светильники </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-9.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-9.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-9.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Торговое освещение </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-16.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-16.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-16.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Светильники ЖКХ </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-3.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-3.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-3.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Линейные светодиодные
                                        светильники </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-10.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-10.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-10.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Трековые светильники и
                                        аксессуары </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-17.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-17.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-17.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Настенно-потолочные
                                        светильники </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-4.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-4.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-4.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Аварийное освещение </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-11.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-11.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-11.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Патроны и переходники </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-18.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-18.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-18.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Источники света </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-5.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-5.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-5.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate"> Фитосветильники </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-12.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-12.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-12.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text  hyphenate "> Складское освещение </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-19.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-19.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-19.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Уличные светильники </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-6.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-6.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-6.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Садово-парковое освещение
                                    </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-13.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-13.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-13.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Прожекторы</span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-20.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-20.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-20.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Светодиодные ленты и модули
                                    </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-7.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-7.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-7.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Светильники на солнечных
                                        батареях </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon" src="/img/icons/lighting/lighting-light-theme/icon-14.svg"
                                        data-light="/img/icons/lighting/lighting-light-theme/icon-14.svg"
                                        data-dark="/img/icons/lighting/lighting-dark-theme/dark-icon-14.svg" alt=""
                                        aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenat"> Фонари </span>
                                </button>

                            </div>
                        </section>
                        <!-- СЕКЦИЯ 2: 15 кнопок -->
                        <section class="button-section">
                            <h3 class="modal-title_section">Электротовары</h3>
                            <div class="button-grid">
                                <!-- Кнопки 21–35 -->
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-21.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-21.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-21.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Низковольтное оборудование
                                    </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-26.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-26.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-26.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Корпуса и боксы </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-31.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-31.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-31.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Аксессуары для электромонтажа
                                    </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-22.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-22.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-22.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Кабеленесущие системы </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-27.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-27.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-27.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Электроустановочные решения
                                    </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-32.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-32.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-32.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Звонки </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-23.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-23.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-23.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Автоматизация и Умный дом
                                    </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-28.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-28.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-28.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Датчики движения </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-33.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-33.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-33.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Стабилизаторы </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-24.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-24.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-24.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate">Удлинители и сетевые фильтры
                                    </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-29.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-29.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-29.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Кабель силовой </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-34.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-34.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-34.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Кабель и провод </span>
                                </button>

                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-25.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-25.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-25.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Изоляционная лента </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-30.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-30.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-30.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Клеммы </span>
                                </button>
                                <button class="nav-button" id="NavButtonGrid"
                                    onclick="window.location.href='/catalog/1'" aria-label="Перейти по ссылке">
                                    <img class="theme-icon"
                                        src="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-35.svg"
                                        data-light="/img/icons/Electrical-goods/Electrical-goods-light-theme/icon-35.svg"
                                        data-dark="/img/icons/Electrical-goods/Electrical-goods-dark-theme/dark-icon-35.svg"
                                        alt="" aria-hidden="true" />
                                    <span lang="ru" class="modal_button-text hyphenate"> Новогоднее освещение </span>
                                </button>
                            </div>
                    </div>
                    <button class=" footer-modal-button" id="FooterModalButton"
                        onclick="window.location.href='/catalog/1'">
                        <span class="modal_footer-text-button">Баннер каталога ЭРА</span>
                    </button>
                </section>
            </main>
        </div>
    </div>
</div>`;

        document.body.insertAdjacentHTML("beforeend", modalHTML);
        updateIcons(localStorage.getItem(THEME_KEY) || "light", false);
        setupModalEvents(); // навешиваем события
    }

    function setupModalEvents() {
        const modal = document.getElementById("catalogModal");
        const closeBtn = document.getElementById("onClose");

        if (!modal || !closeBtn) return;

        // Обработчик нажатия на кнопку закрытия
        closeBtn.addEventListener("click", () => {
            modal.classList.remove("active");
            document.body.classList.remove("modal-open");
            localStorage.removeItem("catalogModalOpen");
        });

        // Закрытие по клику вне контента модалки
        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                modal.classList.remove("active");
                document.body.classList.remove("modal-open");
                localStorage.removeItem("catalogModalOpen");
            }
        });

        // Закрытие по ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") {
                modal.classList.remove("active");
                document.body.classList.remove("modal-open");
                localStorage.removeItem("catalogModalOpen");
            }
        });

        // Обновление иконки при смене темы
        document.addEventListener("themechanged", (e) => {
            const theme = e.detail;
            const closeIcon = document.getElementById("closeIcon");
            if (closeIcon) {
                const newSrc = theme === "dark"
                    ? closeIcon.getAttribute("data-dark")
                    : closeIcon.getAttribute("data-light");
                if (newSrc) closeIcon.src = newSrc;
            }
        });
    }
})();