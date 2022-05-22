const DEFAULT_TIMEOUT = 500

const killEvent = (e) => {
  e.stopPropagation()
  e.preventDefault()
}

const addClass = (elementClass, className) => {
  let $element = getElement(`.${elementClass}`)

  if ($element) {
    $element.classList.add(className)
  }
}

const getRandomItem = (items) => {
  return items[Math.floor(Math.random()*items.length)]
}

const getElements = (selector) => {
  return document.querySelectorAll(selector)
}

const getElement = (selector) => {
  return document.querySelector(selector)
}

const showLoader = () => {
  addClass('js-loader', 'is-visible')
}

const hideLoader = () => {
  const $loader = getElement('.js-loader')
  $loader.classList.remove('is-visible')
}

