let randomImageUrl = 'https://dog.ceo/api/breeds/image/random';
let rezultatas = document.querySelector('#rezultatas');

let getImage = (url) => {
    fetch(url)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            if (response.status === 'success')
                rezultatas.innerHTML = `<img src="${response.message}" alt="">`
            else
                rezultatas.textContent = 'Nepavyko rasti nuotraukos pagal tokią veislę'
        })
}
window.addEventListener('load', () => {
    getImage(randomImageUrl);
})


document.querySelector('.findBreed').addEventListener('click', () => {
    let breed = document.querySelector('input[name="dog-breed"]').value
    if (breed === '') {
        rezultatas.textContent = 'Neįvesta jokia veislė'
        return false;
    }
    let parsedBread = breed.toLowerCase();
    let breedUrl = `https://dog.ceo/api/breed/${parsedBread}/images/random`
    getImage(breedUrl);
})