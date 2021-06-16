const headlink = document.querySelector('head link');
const bootstrap = document.createElement('link');
bootstrap.setAttribute('rel', 'stylesheet');
bootstrap.setAttribute('href', 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css');
bootstrap.setAttribute('integrity', 'undefined');
bootstrap.setAttribute('crossorigin', 'anonymous');
headlink.before(bootstrap);

const page = `
<div class="d-grid gap-2 mt-3">
    <button class="btn btn-primary btn-users" type="button">USERS</button>
</div>
<div class="container mt-5">
  <div class="row">
    <div class="col col-left">
    <ul class="list-group">
    </ul>
    </div>
    <div class="col col-right">
    </div>
  </div>
</div>
`
document.body.innerHTML = page;

// --------------------//

const url = 'https://jsonplaceholder.typicode.com/users';

const colLeft = document.querySelector('.col-left');
const colRight = document.querySelector('.col-right');
const usersBtn = document.querySelector('.btn-users');
const ulLustGroup = colLeft.querySelector('.list-group');

const cardRightTemp = ({name, email, username,
    address: {street, suite, city, zipcode, geo: {lat, lng}}, 
    phone, website, 
    company: {name: companyName, catchPhrase, bs} }) => `
<div class="card">
  <div class="card-header">
    ${name}
  </div>
  <div class="card-body">
    <h5 class="card-title">username: ${username}</h5>
    <h5 class="card-title">email: ${email}</h5>
    <h5 class="card-title">address</h5>
    <p class="card-text">street: ${street}</p>
    <p class="card-text">suite: ${suite}</p>
    <p class="card-text">city: ${city}</p>
    <p class="card-text">zipcode: ${zipcode}</p>
    <p class="card-text">lat, lng: ${lat} ${lng}</p>
    <h5 class="card-title">phone: ${phone}</h5>
    <h5 class="card-title">website: ${website}</h5>
    <h5 class="card-title">company</h5>
    <p class="card-text">companyName: ${companyName}</p>
    <p class="card-text">catchPhrase: ${catchPhrase}</p>
    <p class="card-text">bs: ${bs}</p>
  </div>
</div>
`;

const creteLiName = ({id, username}) => `<li class="list-group-item" data-id=${id}>${username}</li>`;

const getAllInfo = (id) => {
    const xhrA = new XMLHttpRequest();
    xhrA.open('get', `${url}/${id}`);
    xhrA.addEventListener('load', () => {
        const response = xhrA.responseText;
        const responseCard = JSON.parse(response);
        const card = cardRightTemp(responseCard);
        colRight.innerHTML = card;
    });
    xhrA.send();
};

usersBtn.addEventListener('click', () => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url);
    xhr.addEventListener('load', () => {
        const response = xhr.responseText;
        const responses = JSON.parse(response);
        const responsesText = responses.reduce((acc, elem) => acc + creteLiName(elem), '');
        ulLustGroup.innerHTML = responsesText
    });
    xhr.send();
});

ulLustGroup.addEventListener('click', (evt) => {
    const target = evt.target;
    if (target.classList.contains('list-group-item')) {
        const id = target.getAttribute('data-id');
        getAllInfo(id)
    }
});
