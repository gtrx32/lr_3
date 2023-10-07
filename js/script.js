let filters = {};

if (window.localStorage.getItem('filters')) {
  filters = JSON.parse(window.localStorage.getItem('filters'));
  applyFilters();
} else {
  filters = {
    genre: 'all',
    platform: 'all',
    developer: 'all',
  };
}

document.querySelector('.filters__inner').addEventListener('click', ({ target: { tagName, dataset, classList } }) => {
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

  window.localStorage.setItem('filters', JSON.stringify(filters));
  applyFilters();
}

function applyFilters() {
  var items = document.querySelectorAll('.game');

  items.forEach(function (item) {
    item.style.display = checkMatches(item, filters) ? 'block' : 'none';
  });

  availableButtons(items);
}

function availableButtons(items) {
  var buttons = document.querySelectorAll('.button')

  buttons.forEach(function (button) {
    empty = true;

    items.forEach(function (item) {
      const newfilters = { ...filters };
      newfilters[Object.keys(button.dataset)[0]] = button.dataset[Object.keys(button.dataset)[0]];
      if (checkMatches(item, newfilters)) empty = false;
    });

    button.disabled = empty;
  });

  Object.keys(filters).forEach(filter => {
    const btn = document.querySelector(`.filters__inner button[data-${filter}="${filters[filter]}"]`);
    if (btn) {
      btn.classList.add('active');
    }
  });
}

function checkMatches(item, { genre, platform, developer }) {
  return (
    (genre === 'all' || genre === item.getAttribute('data-genre')) &&
    (platform === 'all' || platform === item.getAttribute('data-platform')) &&
    (developer === 'all' || developer === item.getAttribute('data-developer'))
  );
}