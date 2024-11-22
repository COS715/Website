document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.navigation a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки
            const targetUrl = this.href; // Получаем URL страницы
            
            // Добавляем анимацию исчезновения
            const content = document.querySelector('.container');
            content.classList.remove('in'); // Убираем класс 'in' для начала анимации исчезновения
            
            // Ждем завершения анимации исчезновения перед загрузкой новой страницы
            setTimeout(() => loadPage(targetUrl), 500); // 500 мс - время анимации
        });
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
            const newContent = doc.querySelector('.container').innerHTML; // Получаем только контент

            // Заменяем старый контент на новый
            content.innerHTML = newContent;

            // Добавляем анимацию появления
            setTimeout(() => content.classList.add('in'), 50); // Добавляем класс 'in' с небольшой задержкой
        } else {
            console.error('Ошибка загрузки страницы:', this.status);
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети');
    };

    xhr.send();
}
