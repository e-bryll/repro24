const MODAL_ACTIVE_CLASS_NAME = 'active';

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#contactForm');

const openFormModalBtn = document.querySelector('#toggleFormButton');
const closeBtns = document.querySelectorAll('.close-btn');
const connectionDiv = document.querySelector('.connection');

// Показати кнопку зворотнього зв'язку при наведенні миші на нижню частину екрану
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
        console.log('Open Form Modal Button Clicked');
        formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
        console.log('Form Modal State:', formModal.classList);
        if (connectionDiv) {
            connectionDiv.style.display = 'block'; // Show connection form container
        }
    });
}

// Close modals
closeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log('Close Button Clicked');
        formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
        successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
        console.log('Form Modal State:', formModal.classList);
        console.log('Success Modal State:', successModal.classList);
        if (connectionDiv) {
            connectionDiv.style.display = 'none'; // Hide connection form container
        }
    });
});

// Form submission
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form Submitted');
        const formData = new FormData(form);

        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString(),
        })
        .then(() => {
            console.log('Form Submission Successful');
            formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
            successModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
            setTimeout(() => {
                successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
            }, 2000);
            clearFormFields();
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
