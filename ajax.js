document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll('.navigation a');
    const footer = document.getElementById('footer');
    const content = document.querySelector('.container');

    const isHomePage = window.location.pathname === '/Website/' || window.location.pathname.endsWith('index.html');

    if (isHomePage) {
        footer.style.display = ''; 
    } else {
        footer.style.display = 'none'; 
    }

    content.classList.add('fade');
    setTimeout(() => {
        content.classList.add('in');
    }, 50);

    links.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault(); 
            const targetUrl = this.href; 

            content.classList.remove('in');
            content.classList.add('fade');

            setTimeout(() => loadPage(targetUrl), 500); 
        });
    });

    window.addEventListener('popstate', function(event) {
        loadPage(location.pathname); 
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

            content.classList.remove('in');
            content.classList.add('fade'); 

            setTimeout(() => {
                content.innerHTML = newContent; 

                const isHomePage = url === '/' || url.endsWith('index.html');

                if (isHomePage) {
                    footer.style.display = ''; 
                } else {
                    footer.style.display = 'none'; 
                }

                requestAnimationFrame(() => {
                    content.classList.remove('fade'); 
                    
                    setTimeout(() => {
                        content.classList.add('in'); 
                    }, 50); 
                });
            }, 500); 
        } else {
            console.error('Ошибка загрузки страницы:', this.status);
        }
    };

    xhr.onerror = function() {
        console.error('Ошибка сети');
    };
    xhr.send();
}

