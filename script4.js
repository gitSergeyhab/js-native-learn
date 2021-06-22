const url1 = 'https://w-dog.ru/wallpapers/9/1/547422858285832/grand-kanon-arizona-ssha-nebo-reka-kanon-gory.jpg';
const url2 = 'https://cdn.pixabay.com/photo/2012/09/02/20/24/grand-canyon-55643_960_720.jpg';
const url3 = 'https://adamschallau.com/images/xl/Grand-Canyon-Mather-Point-1880.jpg'

const div = document.createElement('div');

document.body.append(div);



// const loadImg = (container, url) => {
//     return new Promise(resolve => {
//         const img = document.createElement('img');
//         img.src = url;
//         img.height = 200;
//         container.append(img);
//         img.addEventListener('load', () => resolve());
//         console.log(img)
//     })
// };
    
// loadImg(div, url3)
//     .then(() =>  loadImg(div, url2))
//     .then(() =>  loadImg(div, url1))



// const loadImg = (container, url) => new Promise(resolve => {
//         const img = document.createElement('img');
//         img.src = url;
//         img.height = 200;
//         container.append(img);
//         img.addEventListener('load', resolve);
//         console.log(img)
//     });
    
// loadImg(div, url3)
//     .then(() =>  loadImg(div, url2))
//     .then(() =>  loadImg(div, url1))


const forLoadImg = (res, container, url) => {
    const img = document.createElement('img');
    img.src = url;
    img.height = 200;
    container.append(img);
    img.addEventListener('load', res);
    console.log(img)
}


const loadImg = (container, url) => new Promise(resolve => forLoadImg(resolve, container, url));
    
loadImg(div, url3)
    .then(() =>  loadImg(div, url2))
    .then(() =>  loadImg(div, url1))