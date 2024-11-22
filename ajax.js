document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.navigation a');

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение ссылки
            const targetUrl = this.href; // Получаем URL страницы
            console.log(`Загружаем страницу: ${targetUrl}`); // Отладочное сообщение
            
            // Добавляем анимацию исчезновения
            const content = document.querySelector('.container');
            content.classList.remove('in');
            setTimeout(() => loadPage(targetUrl), 500); // Задержка для анимации
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
            content.classList.add('in');
            console.log('Контент загружен и заменен.'); // Отладочное сообщение
        } else {
            console.error('Ошибка загрузки страницы:', this.status); // Логируем ошибку
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети'); // Логируем сетевую ошибку
    };

    xhr.send();
}
