const list = document.querySelector('.filter__list')
const games = document.querySelectorAll('.game')

list.addEventListener('click', event => {
  if (event.target.tagName !== 'BUTTON') return false;

  let filterClass = event.target.dataset['id'];

  console.log(event.target.dataset['id'])

  games.forEach(elem => {
    elem.classList.remove('hide');
    if (!elem.classList.contains(filterClass)) {
      elem.classList.add('hide');
    }
  })
})