const div = document.createElement('div');
div.classList.add('header-div');

const postsUrl = 'https://jsonplaceholder.typicode.com/posts';

const makeTitles = (title, id) => `<h3 class="header title" data-id=${id}>${title}</h3>`;


const fetchHeaders = fetch(postsUrl)
    .then(res => res.json())
    .then(posts => posts.reduce((acc, {title, id}) => acc + makeTitles(title, id), ''))
    .then(hPosts => div.innerHTML = hPosts)
    .then(() => document.body.append(div))
    .catch(err => console.log(err))


const changeTitleToBody = (element, title, body) => {
    element.textContent = element.classList.contains('title') ?  body : title;
    element.classList.toggle('title');
}

const onClickHeadeFetch = (target) => {
    const url = `${postsUrl}/${target.dataset.id}`;
    const feachBody = fetch(url)
        .then(res => res.json())
        .then(({body, title}) => changeTitleToBody(target, title, body))
        .catch(err => console.log(err))
}


div.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.classList.contains('header')) {
        onClickHeadeFetch(target)
    }
})