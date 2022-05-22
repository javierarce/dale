let $canvas = undefined
let MAX_HEIGHT = 1080
let currentTransformation = 0

const loadImage = ($target, src) => {
  if (!src.type.match(/image.*/)){
    console.log("The dropped file is not an image: ", src.type)
    return
  }

  let reader = new FileReader()

  reader.onload = (e) => {
    render(e.target.result)

    setTimeout(() => {
      $target.classList.remove('is-drop')
      $target.classList.remove('is-dragover')
    }, 500)
  }

  reader.readAsDataURL(src)
}

const render = (src) => {
  let image = new Image()

  image.onload = () => {
    onLoadImage(image) 
    showCanvas()
  }

  image.src = src
}

const showCanvas = () => {
  let $canvas = getElement('.js-canvas')
  $canvas.classList.remove('is-hidden')
}

const onLoadImage = (image) => {
  $canvas = getElement('.js-canvas')
  transformImage(image)
}

const addGradient = (ctx) => {
  let img = new Image

  img.onload = () => {
    ctx.drawImage(img, $canvas.width - img.width + 1, $canvas.height - img.height + 1)
  }

  img.src = 'gradient.png'
}

const transformImage = (image) => {

  if (image.height > MAX_HEIGHT) {
    image.width *= MAX_HEIGHT / image.height
    image.height = MAX_HEIGHT
  }

  let ctx = $canvas.getContext('2d')

  ctx.clearRect(0, 0, $canvas.width, $canvas.height)
  ctx.save()

  addGradient(ctx)

  $canvas.width = image.width
  $canvas.height = image.height

  let width = image.width
  let height = image.height

  ctx.drawImage(image, 0, 0, width, height)
  ctx.restore()
}

const onLoad = () => {
  let $target = getElement('.js-drop')

  $target.addEventListener('dragleave', (e) => {
    killEvent(e)
    $target.classList.remove('is-dragover')
  }, true)

  $target.addEventListener('dragend', (e) => {
    killEvent(e)
    $target.classList.remove('is-dragover')
  }, true)

  $target.addEventListener('dragover', (e) => {
    killEvent(e)
    $target.classList.add('is-dragover')
  }, true)

  $target.addEventListener('drop', (e) => {
    killEvent(e)
    if (e && e.dataTransfer && e.dataTransfer.files.length) {
      loadImage($target, e.dataTransfer.files[0])
      $target.classList.add('is-drop')
    }
  }, true)
}


window.onload = onLoad
