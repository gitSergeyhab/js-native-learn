// ЗАДАНИЕ
// со страницы   url   вывести на страницу все юзернеймы,
// при клике на юзернейм вывести всю инфу

const url = 'https://jsonplaceholder.typicode.com/users';

// созание кнопки для загрузки юзернеймов
const users = document.createElement('button');
users.textContent = 'USERS';
document.body.append(users)

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

// при ТЫКЕ в юсернейм добавить под него всю инфу
const getMoreInfo = (evt) => {
    const targetUser = evt.target.closest('.js-target-user');
    if(targetUser.classList.contains('js-target-user')) {
        const id = targetUser.getAttribute('data-id');
        const hiddenInfo = targetUser.querySelector('p');
        hiddenInfo.style.display = 'block';
        getInfoThisUser(hiddenInfo, id);
    } 
};

// добавление всех юсернеймов в БОДИ
const createFragment = (users) => {
    const fragment = document.createElement('div');
    users.forEach(user => {
        fragment.append(createUser(user));
    })
    document.body.append(fragment);
    fragment.addEventListener('click', getMoreInfo); // и навесить событие для тыка
}

// ---- G0 -----//

const xhr = new XMLHttpRequest();
xhr.open('get', url);
users.addEventListener('click', () => {
    xhr.addEventListener('load', () => {
        const text = xhr.responseText;
        const users = JSON.parse(text);
        createFragment(users);
    })
    xhr.send();
})
