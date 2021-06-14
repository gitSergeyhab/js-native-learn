// ЗАДАНИЕ
// со страницы   url   вывести на страницу все юзернеймы,
// при клике на юзернейм вывести всю инфу

const url = 'https://jsonplaceholder.typicode.com/users';

// созание кнопки для загрузки юзернеймов
const users = document.createElement('button');
users.textContent = 'USERS';
document.body.append(users)
// ... и дива куда их занружать
const container = document.createElement('div');
container.classList.add('container');
container.style.display = 'block';

// создание одной записи с юзернеймом
const createUser = (user) => {
    const fragment = document.createElement('div');
    const userName = document.createElement('h2');
    userName.textContent = user.username;
    const hiddenInfo = document.createElement('p')
    hiddenInfo.style.display = 'none';
    fragment.append(userName, hiddenInfo);
    fragment.style.border = '1px solid';
    fragment.style.padding = '10px';
    fragment.setAttribute('data-id', user.id);
    fragment.classList.add('js-target-user')
    return fragment;
};

// добавление в скрытый элемент   hiddenInfoBlock   параграфов из объекта по   ID
const getInfoThisUser = (hiddenInfoBlock, id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `${url}/${id}`);
    xhr.addEventListener('load', () => {
        const moreInfo = JSON.parse(xhr.responseText);
        let frag = document.createDocumentFragment();

        // добавление во фраг параграфа "ключ:    значение"
        const keyValueToPar = (key, value) => `${key}:   ${value}`
        const paragAppend = (frag, key, value) => {
            const parag = document.createElement('p');
            parag.textContent = keyValueToPar(key, value);
            frag.append(parag);
        };

        // добавление во фраг параграфОВ "ключ:    значение", 
        //а если значение - объект - рекурссия
        const fragmentAppend = (frag, obj) => {
            for (let inf of Object.keys(obj)) {
                if(typeof obj[inf] === 'object') {
                    fragmentAppend(frag, obj[inf]);
                } else {
                    paragAppend(frag, inf, obj[inf]);
                }
            }
        }

        fragmentAppend(frag, moreInfo); // наполнение фрагмента
        hiddenInfoBlock.append(frag); // ... и добавление 
    });
    xhr.send();
}

const changeBlockNone = (element) => {
    if(element.style.display === 'block') {
        element.style.display = 'none';
    } else {
        element.style.display = 'block';
    }
}

// при ТЫКЕ в юсернейм добавить под него всю инфу
const getMoreInfo = (evt) => {
    const targetUser = evt.target.closest('.js-target-user');

    if(targetUser) {
        const hiddenInfo = targetUser.querySelector('p');
        if(targetUser.classList.contains('js-already-download')) {
            changeBlockNone(hiddenInfo);
        } else {
            const id = targetUser.getAttribute('data-id');
            hiddenInfo.style.display = 'block';
            getInfoThisUser(hiddenInfo, id);
            targetUser.classList.add('js-already-download');
        }
    } 
};

// добавление всех юсернеймов в БОДИ
const createFragment = (users) => {
    users.forEach(user => {
        container.append(createUser(user));
    })
    document.body.append(container);
    container.addEventListener('click', getMoreInfo); // и навесить событие для тыка
}

// ---- G0 -----//

users.addEventListener('click', () => {
    if(container.classList.contains('js-alredy-download-usernames')) {
        changeBlockNone(container);
    } else {
        const xhr = new XMLHttpRequest();
        xhr.open('get', url);
        xhr.addEventListener('load', () => {
            const text = xhr.responseText;
            const users = JSON.parse(text);
            createFragment(users);
        })
        xhr.send();
        container.classList.add('js-alredy-download-usernames');
    };
})
