const filters = {
  genre: 'all',
  platform: 'all',
  developer: 'all'
};

function updateFilters(filterKey, filterValue) {
  filters[filterKey] = filterValue;
  applyFilters();
}

function applyFilters() {

  var items = document.querySelectorAll('.game');

  items.forEach(function (item) {
    var itemGenre = item.getAttribute('data-genre');
    var itemPlatform = item.getAttribute('data-platform');
    var itemDeveloper = item.getAttribute('data-developer');

    var genreMatch = (filters.genre === 'all' || filters.genre === itemGenre);
    var platformMatch = (filters.platform === 'all' || filters.platform === itemPlatform);
    var developerMatch = (filters.developer === 'all' || filters.developer === itemDeveloper);

    if (genreMatch && platformMatch && developerMatch) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
}

const filtersList = document.querySelector('.filters__inner');

filtersList.addEventListener('click', ({ target: { tagName, dataset, classList } }) => {
  if (tagName !== 'BUTTON') return false;

  let filterKey = Object.keys(dataset)[0];
  let filterValue = dataset[filterKey];

  if (classList.contains('active')) {
    classList.remove('active');
    filterValue = 'all';
  } else {
    document.querySelectorAll(`.filters__inner button[data-${filterKey}]`).forEach(button => {
      button.classList.remove('active')
    });
    classList.add('active');
  }
  updateFilters(filterKey, filterValue);
});