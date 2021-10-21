const videoElement= document.getElementById('video');
const button = document.getElementById('button')

// Function to prompt select media stream, pass to video element, then play
async function selectMediaStream(){
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject=mediaStream;
        videoElement.onloadedmetadata=()=>{
            videoElement.play();
        }
        
    } catch (error) {
    console.log('oops error here',error)        
    }
} 

button.addEventListener('click', async ()=>{
    // disable the button when we click on it
    button.disabled = true;
    //  start picture in picture
    await videoElement.requestPictureInPicture();
    // reset button
    button.disabled= false;
});







// on load
selectMediaStream();


// captureStream = await navigator.mediaDevices.getDisplayMedia(displayMediaOptions);



// if ('pictureInPictureEnabled' in document) {
//     pipButton.classList.remove('hidden')
//     pipButton.disabled = false;
  
//     pipButton.addEventListener('click', () => {
//       video.requestPictureInPicture();
//     });
//   }