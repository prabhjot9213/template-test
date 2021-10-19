const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter')
const quoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

//global variable
let apiQuotes=[];

//loading function
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//hide loading
function loadComplete(){
    quoteContainer.hidden= false;
    loader.hidden= true;
}

//function new quote
function newQuote(){
    loading();
    //pick a random quote from api array
    const quote=apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    
   
    //check if author text is null
    if(!quote.author){
        authorText.textContent= 'Anonymous..';
    }else{
        authorText.textContent= quote.author;
    }

    //check if the quote text is long so that it can adjust on other devices

    if(quote.text.length>100){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    //set quote and hide loader
    quoteText.textContent = quote.text;
    loadComplete();
}
// get quotes from the api

async function getQuotes(){
    loading();
    const apiUrl='https://type.fit/api/quotes';

    try{
        const response = await fetch(apiUrl);
        apiQuotes= await response.json();
        newQuote();
    }
    catch(e){

    }
}

//tweet a quote 
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.tectContent} - ${authorText.textContent}`;
    window.open(twitterUrl,'_blank');
}

//Event Listeners
quoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);



getQuotes();
