"use script";
const btnFeedback = document.querySelector('.bth-phone');
const blockFeedback = document.querySelector('.feedback');
const closeForm = document.querySelector('.btn-close-form');

btnFeedback.addEventListener('click', function () {
    blockFeedback.classList.remove('hidden');
})
closeForm.addEventListener('click', function () {
    blockFeedback.classList.add('hidden');
})
class FormValidator {
    constructor(formElement) {
        this.form = formElement;
        this.infoForm = document.querySelector('.info-form');
        this.infoFormText = document.querySelector('.info-form-text');
        this.allInputs = this.form.querySelectorAll('input');
        this.submitButton = this.form.querySelector('button[type="submit"]');

        this.form.addEventListener('submit', (e) => this.onSubmit(e));
        this.allInputs.forEach(input => input.addEventListener('input', () => this.validateInput(input)));
    }

    onSubmit(e) {
        e.preventDefault();

        if (this.validateForm()) {
            this.showSuccessMessage();
        } else {
            this.showValidationErrorMessage();
        }
    }

    validateForm() {
        let isFormValid = true;
        this.allInputs.forEach(input => {
            if (!this.validateInput(input)) {
                isFormValid = false;
            }
        });
        return isFormValid;
    }

    validateInput(input) {
        let isValid = true;
        const inputValue = this.isCheckRadio(input.type) ? input.checked : input.value;

        this.removeError(input);

        if (inputValue === false) {
            this.createError(input, 'Подтвердите согласие');
            isValid = false;
        }

        if (input.dataset.required === 'true' && input.value.trim() === '') {
            this.createError(input, 'Обязательное поле');
            isValid = false;
        }

        if (input.name === 'email' && input.value.trim() !== '' && !input.value.includes('@gmail.com')) {
            this.createError(input, 'Введите действительный адрес электронной почты');
            isValid = false;
        }

        if (input.name === 'phone' && input.value.trim() !== '' && !this.validatePhoneNumber(input.value.trim())) {
            this.createError(input, 'Введите действительный номер телефона');
            isValid = false;
        }

        return isValid;
    }

    isCheckRadio(type) {
        return ['checkbox', 'radio'].includes(type);
    }

    validatePhoneNumber(phoneNumber) {
        return /^\d{10}$/.test(phoneNumber); 
    }

    createError(input, text) {
        const parent = input.parentNode;
        parent.classList.add('error');
        const errorP = document.createElement('p');
        errorP.classList.add('error-p');
        errorP.textContent = text;
        parent.append(errorP);
    }

    removeError(input) {
        const parent = input.parentNode;
        if (parent.classList.contains('error')) {
            parent.querySelector('.error-p').remove();
            parent.classList.remove('error');
        }
    }

    showSuccessMessage() {
        const formData = {};
     this.allInputs.forEach(input => {
        formData[input.name] = this.isCheckRadio(input.type) ? input.checked : input.value;
    });
    localStorage.setItem('formData', JSON.stringify(formData));
    this.allInputs.forEach(input => {
        if (this.isCheckRadio(input.type)) {
            input.checked = false; 
        } else {
            input.value = '';
        }
    });
        this.infoForm.classList.remove('hidden');
        this.infoFormText.innerHTML = `Спасибо за обращение, в ближайшее время мы свяжемся с Вами.`;
    }

    showValidationErrorMessage() {
        this.infoForm.classList.remove('hidden');
        this.infoFormText.innerHTML = `Заполните коректно все данные`;
    }
}

const form = new FormValidator(document.querySelector('#form'));
