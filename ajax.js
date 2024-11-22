document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.navigation a');
    const footer = document.getElementById('footer');
    const content = document.querySelector('.container');

    // Проверяем, является ли текущая страница главной
    const isHomePage = window.location.pathname === '/Website/' || window.location.pathname.endsWith('index.html');

    if (isHomePage) {
        footer.style.display = ''; // Показываем футер
    } else {
        footer.style.display = 'none'; // Скрываем футер
    }

    // Применяем анимацию "входа" для первого отображения страницы
    content.classList.add('fade');
    setTimeout(() => {
        content.classList.add('in');
    }, 50);

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки
            const targetUrl = this.href; // Получаем URL страницы
            
            // Добавляем анимацию "исчезновения"
            content.classList.remove('in');
            content.classList.add('fade');
            
            // Ждем завершения анимации исчезновения перед загрузкой новой страницы
            setTimeout(() => loadPage(targetUrl), 500); // Время должно соответствовать времени анимации в CSS
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

            // Убираем класс "in" для начала анимации
            content.classList.remove('in');
            content.classList.add('fade'); // Добавляем класс "fade"

            // Ждем завершения анимации перед заменой контента
            setTimeout(() => {
                content.innerHTML = newContent; // Заменяем контент

                // Проверяем, если загруженная страница - это главная
                const isHomePage = url === '/' || url.endsWith('index.html');

                if (isHomePage) {
                    footer.style.display = ''; // Показываем футер
                } else {
                    footer.style.display = 'none'; // Скрываем футер
                }

                // Добавляем анимацию появления
                content.classList.remove('fade'); // Убираем класс "fade" после замены
                content.classList.add('in'); // Добавляем класс "in" для появления
            }, 500); // Время должно соответствовать времени анимации в CSS
        } else {
            console.error('Ошибка загрузки страницы:', this.status);
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети');
    };

    xhr.send();
}