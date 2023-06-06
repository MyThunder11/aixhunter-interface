///////////////////
// TAB COMPONENT //
///////////////////

const tabChoose = (element) => {
  const choice = element.dataset.choice
  const tab_container = element.closest('.tab_component')
  const tab_control = element.parentNode

  tab_control.querySelectorAll('p').forEach((el) => {
    if (el == element) {
      el.classList.add('active')
    } else {
      el.classList.remove('active')
    }
  })

  tab_container.querySelector('.tab_display').querySelectorAll(".tab_child").forEach((el) => {
    if (el.dataset.choice == choice) {
      el.classList.remove('hidden')
    } else {
      el.classList.add('hidden')
    }
  })


}


///////////////////
// IMAGE PREVIEW //
///////////////////

var mode = 'file'

const previewImage = (input, mode) => {
  if (mode == 'file') {
    const [file] = input.files
    if (file) {
      imgPrev.src = URL.createObjectURL(file)
    }
  } else {
    fetch(input.value)
      .then(res => res.blob())
      .then(blob => {
        imgPrev.src = URL.createObjectURL(blob);
    });
  }
}


/////////////////
// FILE SUBMIT //
/////////////////

main_input_submit.onclick = evt => {
  loadingResult(true)

  setTimeout(() => {
    displayResult('fake')
  }, 1000);
}


////////////////////
// RESULT DISPLAY //
////////////////////

const loadingResult = (bool) => {
  button = document.getElementById('submit_button')

  if (bool) {
    document.getElementById('main_result_display').innerHTML = ""
    button.innerHTML = '<div id="spinner" class="spinner-sm spinner-border" role="status"><span class="sr-only">Loading...</span></div>'
  } else {
    button.innerHTML = 'Submit'
  }
}

const displayResult = (result) => {
  const display = document.getElementById('main_result_display')

  setTimeout(() => {
    txt = `This image is a ${result}`

    loadingResult(false)
    typeWriter()
  }, 1000);
}


////////////////
// TYPEWRITER //
////////////////

var i = 0;
var txt = '';
var speed = 50;

function typeWriter() {
  if (i < txt.length) {
    document.getElementById('main_result_display').innerHTML += txt.charAt(i);
    i++;
    setTimeout(typeWriter, speed);
  } else {
    i = 0
  }
}

////////////////////
// RANDOM PICTURE //
////////////////////

random_list = [1,2,3,4,5]

const getRandom = () => {
  document.querySelectorAll('.random_content').forEach(el=>el.classList.add('hidden'));
  loader = document.getElementById('random_content_loader')

  loader.classList.remove('hidden')

  if (Math.random() >= 0.66) {
    ind = Math.floor(Math.random() * random_list.length)
    target = document.querySelector(`[data-randint="${random_list[ind]}"]`)
    delete random_list[ind];
  } else {
    target = document.getElementById('default_random_content')
    target_image = target.querySelector('img')
    target_image.src = "https://thispersondoesnotexist.com?" + new Date().getTime();
  }

  if (target == null) {
    getRandom()
  }

  setTimeout(() => {
    loader.classList.add('hidden')
    target.classList.remove('hidden')
  }, 1000);

}
