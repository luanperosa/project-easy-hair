const statusFilter = document.getElementById('filterSaloon');

statusFilter.onchange = async (event) => {
  console.log(event.target.value);
  const { value } = event.target;
  const response = await axios.get('https://project-easy-hair.herokuapp.com/api/saloon', { params: { value } });
  const { data } = response;
  const saloonSortedList = document.getElementById('saloon-sorted-list');

  saloonSortedList.innerHTML = '';

  data.forEach((saloon) => {
    saloonSortedList.innerHTML += `
      <div class="col s12 m7" id="sizeCard">
      <div class="card blue-grey darken-1">
      <a href="/visitor/${saloon._id}">
        <div class="card-image">
        ${saloon.imagePath ? 
    `<img class="responsive-img" src="${saloon.imagePath}" id="imageCard">` 
: '<img id="no-image" class="responsive-img" src="/images/no-image.jpg" alt=""> '}
        </div>
        <div class="card-content">
          <span class="card-title lime-text text-lighten-5">${saloon.saloonName}</span>
          <p class="lime-text text-lighten-5">Avaliação do Google: ${saloon.ratingFromGoogle}</p>
          <p class="lime-text text-lighten-5">${saloon.fullAddress}</p>
        </div>
      </div>
      </a>
      </div>
    `;
  });
};