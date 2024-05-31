"use strict";

class FormValidator {

    constructor(formElement) {
        this.form = formElement;
        this.infoForm = document.querySelector('.info-form');
        this.infoFormText = document.querySelector('.info-form-text');
        this.allInputs = Array.from(this.form.querySelectorAll('input'));
        this.submitButton = this.form.querySelector('button[type="submit"]');
        this.textarea = this.form.querySelector('textarea');
        this.allInputs.push(this.textarea);
        this.form.addEventListener('submit', (e) => this.onSubmit(e));
        this.allInputs.forEach(input => input.addEventListener('input', () => this.validateInput(input)));
    }
    
    onSubmit(e) {
        e.preventDefault();
        if (this.validateForm()) {
            this.sendFormDataToTelegram();

            this.allInputs.forEach(input => {
                if (input.type !== 'checkbox' && input.type !== 'radio') {
                    input.value = ''; 
                } else {
                    input.checked = false; 
                }
            });
            
            console.log('ok');
        } else {
            console.log('error');
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
            this.createError(input, 'Please confirm your agreement');
            isValid = false;
        }

        if (input.dataset.required === 'true' && input.value.trim() === '') {
            this.createError(input, 'This field is required');
            isValid = false;
        }

       if (input.name === 'email' && input.value.trim() !== '' && !input.value.includes('@')) {
            this.createError(input, 'Please enter a valid email address');
            isValid = false;
        }

        if (input.name === 'phone' && input.value.trim() !== '' && !this.validatePhoneNumber(input.value.trim())) {
            this.createError(input, 'Please enter a valid phone number');
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
        const errorParagraph = parent.querySelector('.error-p');
        if (errorParagraph) {
            errorParagraph.remove();
            parent.classList.remove('error');
            parent.classList.add('validYes')
        }
    }

    async sendFormDataToTelegram() {
        const formData = {};
        this.allInputs.forEach(input => {
            formData[input.name] = this.isCheckRadio(input.type) ? input.checked : input.value;
        });

        const message = Object.entries(formData)
            .map(([key, value]) => `${key}: ${value}`)
            .join('\n');
        console.log(message)
     try {
        await fetch('send.php', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
            body: 'message=' + encodeURIComponent(message)
        });
        } catch (error) {
        console.error('Error sending message to Telegram:', error);
        }
    }
}

const form = new FormValidator(document.querySelector('#form'));



