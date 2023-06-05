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

  tab_container.querySelector('.tab_display').querySelectorAll("input").forEach((el) => {
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
  horizontalSweep()
}


////////////////////
// RESULT DISPLAY //
////////////////////

const horizontalSweep = () => {
  const divLeft = document.getElementById('image_preview_h_left')
  const divRight = document.getElementById('image_preview_h_right')
  divLeft.classList.add('active', 'loading')
  divRight.classList.add('active')
  setTimeout(() => {
    divRight.classList.remove('active')
    loadingResult()
    setTimeout(() => {
      loadingResult()
      displayResult('fake')
    }, 2000);
  }, 2000);
}

const loadingResult = () => {
  spinner = document.getElementById('spinner')
  spinner.classList.toggle('hidden')
}

const displayResult = (result) => {
  const display = document.getElementById('main_result_display')

  setTimeout(() => {
    txt = `This image is a ${result}`
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
  }
}
