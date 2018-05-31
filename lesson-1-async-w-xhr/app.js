(function () {
    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        responseContainer.innerHTML = '';
        searchedForText = searchField.value;
        const unsplashRequest = new XMLHttpRequest();

        unsplashRequest.open('GET', `https://api.unsplash.com/search/photos?page=1&query=${searchedForText}`);
        unsplashRequest.onload = addImage;
        unsplashRequest.setRequestHeader('Authorization', 'Client-ID 02decdae513f8fc08af14f5e9f84fbd00d61bd1a9691da7cae94d0aa29a09a88');
        unsplashRequest.send();

        function addImage(){
          let htmlContent = '';
          const data = JSON.parse(this.responseText);

          if (data && data.results && data.results[0]) {
            const firstImage = data.results[0];

            htmlContent = `<figure>
              <img src="${firstImage.urls.regular}" alt="${searchedForText}">
              <figcaption>${searchedForText} by ${firstImage.user.name}</figcaption>
            </figure>`;
          } else {
            htmlContent = '<div class="error-no-image">No images available</div>';
          }
          responseContainer.insertAdjacentHTML('afterbegin', htmlContent);
        }

        });
        function addArticles () {}
        const articleRequest = new XMLHttpRequest();
        articleRequest.onload = addArticles;
        articleRequest.open('GET', `http://api.nytimes.com/svc/search/v2/articlesearch.json?q=new+york+times&api-key=7a88c509ae074449bd5a9899e3b58dab`);
        articleRequest.send();

    // searchedForText = 'hippos';

})();
