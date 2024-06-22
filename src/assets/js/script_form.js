const MODAL_ACTIVE_CLASS_NAME = 'active';

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#contactForm');

const openFormModalBtn = document.querySelector('#toggleFormButton');
const closeBtns = document.querySelectorAll('.close-btn');
const connectionDiv = document.querySelector('.connection');

// Show feedback button when mouse is at the bottom of the screen
document.addEventListener('mousemove', (event) => {
    const windowHeight = window.innerHeight;
    const mouseY = event.clientY;

    if (mouseY > windowHeight - 100) {
        if (openFormModalBtn) {
            openFormModalBtn.classList.add('visible');
        }
    } else {
        if (openFormModalBtn) {
            openFormModalBtn.classList.remove('visible');
        }
    }
});

// Open form modal
if (openFormModalBtn) {
    openFormModalBtn.addEventListener('click', () => {
        formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
        if (connectionDiv) {
            connectionDiv.style.display = 'block';
        }
    });
}

// Close modals
closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
        successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
        if (connectionDiv) {
            connectionDiv.style.display = 'none';
        }
        clearFormFields(); // Clear form fields when the modal is closed
    });
});

// Form submission
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => {
            formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
            successModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
            setTimeout(() => {
                successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
            }, 2000);
            clearFormFields(); // Clear form fields after successful submission
        })
        .catch((error) => console.log('Sending form failed', error));
    });
}

// Clear form fields
function clearFormFields() {
    const modalFields = formModal.querySelectorAll('input, textarea');

    modalFields.forEach((field) => {
        field.value = '';
    });
}
