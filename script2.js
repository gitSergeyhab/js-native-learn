const url = 'https://jsonplaceholder.typicode.com/users';

const users = document.createElement('button');
users.textContent = 'USERS';
document.body.append(users)


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

const keyValueToPar = (key, value) => `${key}:   ${value}`

const getInfoThisUser = (hiddenInfoBlock, id) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', `${url}/${id}`);
    xhr.addEventListener('load', () => {
        const moreInfo = JSON.parse(xhr.responseText);
        let text = document.createDocumentFragment();
        console.log(moreInfo);
        for (let inf of Object.keys(moreInfo)) {
            if(typeof moreInfo[inf] === 'object') {
                const newDict = moreInfo[inf];
                for (let newInf of Object.keys(newDict)) {
                    text += keyValueToPar(newInf, newDict[newInf]);
                }
            } else {
                text += keyValueToPar(inf, moreInfo[inf]);
            }
        }
        hiddenInfoBlock.textContent = text;
    });
    xhr.send();
    
}

const getMoreInfo = (evt) => {
    const targetUser = evt.target.closest('.js-target-user');
    if(targetUser.classList.contains('js-target-user')) {
        const id = targetUser.getAttribute('data-id');
        const hiddenInfo = targetUser.querySelector('p');
        hiddenInfo.style.display = 'block';
        getInfoThisUser(hiddenInfo, id);
        // hiddenInfo.textContent = 'hiddenInfo';
        // hiddenInfo.textContent = 'hiddenInfo';
         

    } 
};


const createFragment = (users) => {
    const fragment = document.createElement('div');
    users.forEach(user => {
        fragment.append(createUser(user))
    })
    document.body.append(fragment);
    fragment.addEventListener('click', getMoreInfo)
}

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

// document.body.append(createUser({username: 'Sergik', id: 333}))
// console.log(createUser({username: 'Sergik', id: 333}));

// xhr.open('get', `${url}/1`);
// users.addEventListener('click', () => {
//     xhr.addEventListener('load', () => {
//         const text = xhr.responseText;
//         console.log(text)
//     })
//     xhr.send();
// })