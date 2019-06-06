'use strict';

let images = [
    'img/img_1.jpg',
    'img/img_2.jpg',
    'img/img_3.jpg'
];

images = images.map(item => item = `./${item}`);

const loadImage = url => {
    return new Promise((resolve, reject) => {
        const req = new XMLHttpRequest();
        req.open('GET', url);
        req.setRequestHeader('Content-type', 'image/jpeg');
        req.setRequestHeader('Cache-Control', 'no-cache');
        req.send();

        req.addEventListener('load', function() {
            if (req.status === 200) {
                resolve(url)
            } else {
                reject(url)
            }
        })
    })
}

let promises = [];
for (let img of images) {
    promises.push(loadImage(img))
}
Promise.all(promises)
    .then(values => {
        for (let path of values) {
            const image = new Image();
            image.src = path;
            document.body.appendChild(image);
            image.style.width = '100vw';
        }
    })
    .catch(err => console.error(err))

