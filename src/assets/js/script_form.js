const MODAL_ACTIVE_CLASS_NAME = 'active'; // Ensure this matches your CSS class

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#contactForm');

const openFormModalBtn = document.querySelector('#toggleFormButton');
const closeBtns = document.querySelectorAll('.close-btn');

// Open form modal
openFormModalBtn.addEventListener('click', () => {
  formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
});

// Close modals
closeBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
    successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
  });
});

// Form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch('/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(formData).toString(),
  })
    .then(() => {
      showGooseAnim();

      setTimeout(() => {
        formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
        setTimeout(() => {
          successModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
          setTimeout(() => {
            successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
          }, 2000);
        }, 700);
        clearFormFields();
      }, 3000);
    })
    .catch((error) => console.log('Sending form failed'));
});

// Clear form fields
function clearFormFields() {
  const modalFields = formModal.querySelectorAll('input, textarea');

  modalFields.forEach((field) => {
    field.value = '';
  });
}

// Show goose animation
// function showGooseAnim() {
  // const gooseImage = document.createElement('img');

  // gooseImage.setAttribute('src', './img/gus-anim.gif');
  // gooseImage.classList.add('gus-anim');

  // form.appendChild(gooseImage);

  // setTimeout(() => {
    // gooseImage.removeAttribute('src');
    // form.removeChild(gooseImage);
  // }, 4000);
// }
