//define const using element id
const imageContainer=document.getElementById('image-container');
const loader= document.getElementById('loader');

//global varable
let photosArray=[];
let ready= false;
let imageLoaded=0;
let totalImages=0;
let initialLoad= true;




// unsplash api
const count=5;
const apiKey='gSkNrQU2ALktIK0znkUVOJcVVLAQ8tUuxCKfgW3XKCg';
const apiUrl=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// image load function
function imageLoad(){
    imageLoaded++;
    console.log(imageLoaded)
if(imageLoaded === totalImages){
    ready= true;
    loader.hidden = true;
    initialLoad =  false;
    count= 30;
}


}


// Helper function to set attributes on DOM Elements
function setAttributes(element,attributes){
    for(const key in attributes){
        element.setAttribute(key,attributes[key])
    }
}

// create elements for links and show photos, add to dom
function displayPhotos(photosArray){
    imageLoaded=0;
   totalImages = photosArray.length;
   console.log('totalImages = ',totalImages)
photosArray.forEach( (photo) => {
//create an anchor element to link with unsplash
const item= document.createElement('a');
// item.setAttribute('href',photo.links.html)
// item.setAttribute('target','_blank');
setAttributes(item,{
href: photo.links.html,
target: '_blank',
});

//create <img> tag for photo
const img=document.createElement('img');
// img.setAttribute('src', photo.urls.regular);
// img.setAttribute('alt',photo.alt_description);
// img.setAttribute('title',photo.alt_description);
setAttributes(img,{
    src: photo.urls.regular,
    alt: photo.alt_description,
    title: photo.alt_description
})

//Event Listener, check when each is finished loading
img.addEventListener('load', imageLoad());


//Put <img> inside <a>, then put both inside the image container element
item.appendChild(img);
imageContainer.appendChild(item);
});
}

// fetch photos from unsplash api

async function getPhotos(){
    try{
        const response= await fetch(apiUrl);
        const photosArray = await response.json();
        displayPhotos(photosArray);
    }catch(error){
        console.log (error);
    }
}

// infinite scroll--- scroll event
window.addEventListener('scroll', () =>{
if(window.innerHeight + window.scrollY >= document.body.offsetHeight-1000 && ready ){
    ready= false; 
    getPhotos();
}

});


// on load
getPhotos();