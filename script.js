'use strict';

let images = [
    'img/img_1.jpg',
    'img/img_2.jpg',
    'img/img_3.jpg'
];

images = images.map(item => item = `./${item}`);

const loadImage = async (url) => {
    const res = await fetch(url)

    if (res.ok) {
        return res.blob();
    }
    throw new Error(res.url);
}

let promises = [];
for (let img of images) {
    promises.push(loadImage(img))
}

Promise.all(promises)
    .then(values => {
        for (let res of values) {
            const objectURL = URL.createObjectURL(res),
                image = new Image();
            image.src = objectURL;
            document.body.appendChild(image);
            image.style.width = '100vw';
        }
    }).catch(err => {
        console.error(err.message);
    })