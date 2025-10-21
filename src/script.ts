console.log("Hello world");

const helloText = document.getElementById('hello-text') as HTMLElement;

function GetRandomNumber () {
    return Math.round(Math.random() * 100);
}

helloText.addEventListener('click', function (e) {
    helloText.textContent = GetRandomNumber().toString();
});