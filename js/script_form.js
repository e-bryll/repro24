const MODAL_ACTIVE_CLASS_NAME = 'modal-active';

const formModal = document.querySelector('#form-modal');
const successModal = document.querySelector('#success-modal');
const form = document.querySelector('#contactFormContainer');

const openFormModalBtn = document.querySelector('#toggleFormButton');
const closeBtns = document.querySelectorAll('.close-btn');

openFormModalBtn.addEventListener('click', () => {
    formModal.classList.add(MODAL_ACTIVE_CLASS_NAME);
});

closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        formModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
        successModal.classList.remove(MODAL_ACTIVE_CLASS_NAME);
    });
});

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);

    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
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

function clearFormFields() {
    const modalFiends = formModal.querySelectorAll('input');

    modalFiends.forEach(field => {
        field.value = ''
    });
}

function showGooseAnim() {
    const gusImage = document.createElement('img');

    gusImage.setAttribute('src', './img/gus-anim.gif');
    gusImage.classList.add('gus-anim');

    form.appendChild(gusImage);

    setTimeout(() => {
        gusImage.removeAttribute('src', './img/gus-anim.gif');
        form.removeChild(gusImage);
    }, 4000)

}
