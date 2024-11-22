document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.navigation a');
    const footer = document.getElementById('footer');
    const content = document.querySelector('.container');

    // Скрываем футер по умолчанию
    footer.style.display = 'none';

    // Применяем анимацию "входа" для первого отображения страницы
    content.classList.add('fade');
    setTimeout(() => {
        content.classList.add('in');
    }, 50);

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки
            const targetUrl = this.href; // Получаем URL страницы
            
            // Добавляем анимацию исчезновения
            content.classList.remove('in');
            
            // Ждем завершения анимации исчезновения перед загрузкой новой страницы
            setTimeout(() => loadPage(targetUrl), 500); // 500 мс - время анимации
        });
    });

    // Обработчик события popstate для навигации по истории
    window.addEventListener('popstate', function(event) {
        loadPage(location.pathname); // Загружаем страницу по текущему URL
    });
});

function loadPage(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.onload = function() {
        if (this.status === 200) {
            const content = document.querySelector('.container');
            const parser = new DOMParser();
            const doc = parser.parseFromString(this.responseText, 'text/html');
            const newContent = doc.querySelector('.container').innerHTML;

            // Заменяем старый контент на новый
            content.innerHTML = newContent;

            // Обновляем URL в адресной строке
            history.pushState(null, '', url);

            // Проверяем, если загруженная страница - это главная
            if (url.endsWith('index.html')) {
                footer.style.display = ''; // Показываем футер
            } else {
                footer.style.display = 'none'; // Скрываем футер
            }

            // Добавляем анимацию появления
            setTimeout(() => {
                content.classList.remove('fade');
                content.classList.add('in');
            }, 50);
        } else {
            console.error('Ошибка загрузки страницы:', this.status);
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети');
    };

    xhr.send();
}