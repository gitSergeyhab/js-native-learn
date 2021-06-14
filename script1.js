// XMLHttpRequest and 'https://jsonplaceholder.typicode.com/posts'

console.log('AJAX')
const ajax = document.createElement('button');
ajax.textContent = 'AJAX';
ajax.setAttribute('type', 'button')
document.body.append(ajax);

const createPost = ({title, body}) => `
    <div style="border: 1px solid; padding: 10px; margin-bottom: 3px">
        <h3>${title}</h3>
        <p>${body}</p>
    </div>
    `

const createArrayPost = (array) => array.reduce((acc, el) => acc + createPost(el), '')

getPosts = (url, cb) => {
    const xhr = new XMLHttpRequest();
    
    xhr.open('get', url);
    
    xhr.addEventListener('load', () => {
        const response = JSON.parse(xhr.responseText);
        cb(response)
        const arr = createArrayPost(response);
    });

    xhr.addEventListener('error', () => console.log('ERROR'));
    
    xhr.send()
}

const consoleResponse = (resp) => console.log(resp);

const renderResponse = (response) => {
    const arrHtml = createArrayPost(response);
    const postsDiv = document.createElement('div');
    postsDiv.innerHTML = arrHtml;
    document.body.append(postsDiv);
}

ajax.addEventListener('click', () => getPosts('https://jsonplaceholder.typicode.com/posts', renderResponse))