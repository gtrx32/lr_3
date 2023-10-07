const filters = {
  genre: 'all',
  platform: 'all',
  developer: 'all'
};

const newfilters = {
  genre: 'all',
  platform: 'all',
  developer: 'all'
};

const filtersList = document.querySelector('.filters__inner');

filtersList.addEventListener('click', ({ target: { tagName, dataset, classList } }) => {
  if (tagName !== 'BUTTON') return false;

  let filterKey = Object.keys(dataset)[0];
  let filterValue = dataset[filterKey];

  if (classList.contains('active')) {
    classList.remove('active');
    filterValue = 'all';
  }
  else {
    document.querySelectorAll(`.filters__inner button[data-${filterKey}]`).forEach(button => {
      button.classList.remove('active')
    });
    classList.add('active');
  }

  updateFilters(filterKey, filterValue);
});

function updateFilters(filterKey, filterValue) {
  filters[filterKey] = filterValue;
  applyFilters();
}

function applyFilters() {
  var items = document.querySelectorAll('.game');

  items.forEach(function (item) {
    if (checkMatches(item, filters)) item.style.display = 'block';
    else item.style.display = 'none';
  });

  availableButtons(items);
}

function availableButtons(items) {
  var buttons = document.querySelectorAll('.button')

  buttons.forEach(function (button) {
    empty = true;

    items.forEach(function (item) {
      newfilters['genre'] = filters['genre'];
      newfilters['platform'] = filters['platform'];
      newfilters['developer'] = filters['developer'];
      newfilters[Object.keys(button.dataset)[0]] = button.dataset[Object.keys(button.dataset)[0]];
      if (checkMatches(item, newfilters)) empty = false;
    });

    if (empty) {
      button.classList.add('disabled');
      button.disabled = true;
    }
    else {
      button.classList.remove('disabled');
      button.disabled = false;
    }
  });
}

function checkMatches(item, filters) {
  if ((filters.genre === 'all' || filters.genre === item.getAttribute('data-genre')) &&
    (filters.platform === 'all' || filters.platform === item.getAttribute('data-platform')) &&
    (filters.developer === 'all' || filters.developer === item.getAttribute('data-developer'))) return true;
  else return false;
}