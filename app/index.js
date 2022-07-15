// API

const API = (() => {

  const baseURL = 'http://localhost:4232';
  const path = 'movies';

  const getMovies = () =>
    fetch([baseURL, path].join('/'))
      .then((response) => response.json());

  return { getMovies };
})();

// MODEL

const Model = ((api) => {

  const { getMovies } = api;

  return { getMovies };

})(API);

// VIEW

const View = (() => {

  const domStr = {
    movieList: 'movie_list'
  };

  const render = (element, template) => {
    element.innerHTML = template;
  };

  const createTemplate = (arr) => {
    let template = '';
    arr.forEach((movie) => {
      template += `
        <li class='slide'>
          <img src='${movie.imgUrl}'></img>
          <p>${movie.name}</p>
          <p>${movie.outlineInfo}</p>
        </li>
      `;
    });
    return template;
  };

  return { render, createTemplate, domStr }

})();

// CONTROLLER

const Controller = ((model, view) => {

  const initialize = () => {

    const movieContainer = document.getElementById(view.domStr.movieList);

    model.getMovies().then((movies) => {
      const template = view.createTemplate(movies);
      view.render(movieContainer, template);
    });


    const movieSlides = document.getElementById("carousel");
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');

    prevButton.addEventListener("click", (event) => {
      movieSlides.scrollLeft += 352;
    });

    nextButton.addEventListener("click", (event) => {
      movieSlides.scrollRight -= 352;
    });

  };



  return { initialize }

})(Model, View);

Controller.initialize();