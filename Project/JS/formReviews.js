'use script'
class FormValidatorReviews {
    constructor(formReviews) {
        this.formReviews = formReviews;
        this.nameInput = formReviews.querySelector('#name-reviews');
        this.phoneInput = formReviews.querySelector('#phone-reviews');
        this.btnSend = formReviews.querySelector('.btn-send');
        this.setupListeners();
    }

    setupListeners() {
        this.formReviews.addEventListener('submit', this.handleSubmit.bind(this));
    }

    handleSubmit(event) {
        event.preventDefault();
        this.validate();
    }

    validate() {
        this.clearMessages();

        if (this.nameInput.value.trim() === '') {
            this.showError(this.nameInput.parentElement.querySelector('.error-message'), 'Введите имя');
        } else {
            this.showSuccess(this.nameInput.parentElement);
        }
        if (this.phoneInput.value.trim() === '') {
            this.showError(this.phoneInput.parentElement.querySelector('.error-message'), 'Введите телефон');
        } else if (!this.isValidPhone(this.phoneInput.value.trim())) {
            this.showError(this.phoneInput.parentElement.querySelector('.error-message'), 'Введите корректный номер телефона');
        } else {
            this.showSuccess(this.phoneInput.parentElement);
        }

        if (this.isFormValid()) {
            this.resetForm();
        }
    }

    clearMessages() {
        const errorElements = this.formReviews.querySelectorAll('.error-message');
        errorElements.forEach(element => {
            element.innerText = '';
        });
        const formControls = this.formReviews.querySelectorAll('.input-reviews');
        formControls.forEach(control => {
            control.parentElement.classList.remove('error', 'success');
        });
    }

    showError(element, message) {
        const formControl = element.parentElement;
        formControl.classList.remove('success');
        formControl.classList.add('error');
        element.innerText = message;
    }

    showSuccess(formControl) {
        formControl.classList.remove('error');
        formControl.classList.add('success');
    }

    isValidPhone(phone) {
        return /^\d{10}$/.test(phone);
    }

    isFormValid() {
        return this.formReviews.querySelectorAll('.error').length === 0;
    }

    resetForm() {
        this.nameInput.value = '';
        this.phoneInput.value = '';
    }
}

const formReviews = document.querySelector('.reviews form');
const validator = new FormValidatorReviews(formReviews);


