import 'babel-polyfill'
import './index.css'

const contents = document.querySelector('.contents');

// create carousel items
const createCarouselItem = () => {
    const br = document.createElement("br");

    const carouselDiv = document.createElement("div");
    carouselDiv.setAttribute('class', "carousel");

    const imageDiv = document.createElement("div");
    imageDiv.setAttribute('class', "image");

    const imageTag = document.createElement("img");
    imageTag.setAttribute('src', "");

    imageDiv.appendChild(imageTag);
    carouselDiv.appendChild(imageDiv);
    carouselDiv.appendChild(br);



    const nameDiv = document.createElement("div");
    nameDiv.setAttribute('class', "name");


    carouselDiv.appendChild(nameDiv);
    carouselDiv.appendChild(br);


    const textDiv = document.createElement('div');
    textDiv.setAttribute('class', 'text');
    textDiv.innerHTML = 'In viverra odio non sem rutrum';

    carouselDiv.appendChild(textDiv)

    return carouselDiv;
}


for (let i = 0; i < 5; i++) {
    const carouselItem = createCarouselItem();
    contents.appendChild(carouselItem);
}

//api function
async function getUserDetail() {
    let user = await fetch('https://randomuser.me/api/', { mode: 'cors' }).then(r => r.json())
    return user.results[0]
    //     onst result = await fetch('https://randomuser.me/api/', { mode: 'cors' })
    //     const user = await result.json()
    //     return user.results[0]
    // }
}


//define onclick on next and prev button
const items = [...contents.getElementsByClassName('carousel')];
const itemsVisible = 3;
const lastIndex = items.length - itemsVisible;
let index = 0

function handleClick(direction) {
    index = index + direction;
    console.log(index);
    if (index > lastIndex) {
        index = 0;
    } else if (index < 0) {
        index = lastIndex;
    }

    const diffInPixels = -300 * index;
    contents.style.transform = `translateX(${diffInPixels}px)`;

}
const leftButton = document.querySelector('.control .prev');
const rightButton = document.querySelector('.control .next');
leftButton.addEventListener('click', () => handleClick(-1));
rightButton.addEventListener('click', () => handleClick(1));


// console.log("aaa", items)
items.forEach(async item => {
    const user = await getUserDetail();
    const imageSrc = user.picture.large;
    const name = user.name.first;
    const family = user.name.last;
    // reviewtext 
    item.querySelector('.carousel .image img').setAttribute("src", imageSrc);
    item.querySelector('.carousel .name ').innerHTML = (name + ' ' + family);
});