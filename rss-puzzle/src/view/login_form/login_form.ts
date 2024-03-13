import './login_form.scss';
import state from '../../controllers/state';
import { createElement, setAttributes } from '../../utils/dom_helpers';

const loginView = createElement({ tag: 'div', classList: ['login-view'] });
const header = createElement({ tag: 'h2', classList: ['header'] });
header.append('Login Form');
const validationErrors = {
  valueMissing: 'Must not be empty',
  patternMismatch: 'Only English letter and hyphen. First letter in uppercase.',
};
const loginCompleteHandler = {
  onLogin: () => {},
};

function validator(
  submitButton: HTMLElement,
  ...validatedFields: HTMLElement[]
) {
  const validated = new Map<HTMLElement, boolean>(
    validatedFields.map((value) => [value, false])
  );
  const allValid = () => {
    const fields = validated.values();
    let field = fields.next();
    while (field.value !== undefined) {
      if (field.value === false) return false;
      field = fields.next();
    }
    return true;
  };
  function allowSubmit() {
    if (allValid()) {
      submitButton.removeAttribute('disabled');
    } else {
      submitButton.setAttribute('disabled', '');
    }
  }

  return function validate(input: HTMLInputElement) {
    const inputElement = input;
    if (inputElement instanceof HTMLInputElement) {
      const { validity } = inputElement;
      inputElement.setCustomValidity(''); // reset customError
      if (validity.valid) {
        validated.set(input, true);
      } else {
        // defer call reportValidity
        Promise.reject().catch(() => {
          validated.set(input, false);
          inputElement.reportValidity();
        });
        switch (!validity.valid) {
          case validity.valueMissing:
            inputElement.setCustomValidity(validationErrors.valueMissing);
            break;
          case validity.patternMismatch:
            inputElement.setCustomValidity(validationErrors.patternMismatch);
            break;
          default:
            inputElement.setCustomValidity('');
        }
      }
    }
    allowSubmit();
  };
}

function createFormContent() {
  const loginForm = createElement({
    tag: 'form',
    classList: ['login-form'],
  });
  const firstName = createElement({
    tag: 'input',
    classList: ['input'],
  });
  const surName = createElement({
    tag: 'input',
    classList: ['input'],
  });
  const submit = createElement({ tag: 'input', classList: ['input'] });
  loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    state.setValue({
      firstName: firstName.value,
      surName: surName.value,
    });
    firstName.value = '';
    surName.value = '';
    loginCompleteHandler.onLogin();
  });
  setAttributes(
    firstName,
    ['type', 'text'],
    ['placeholder', 'First Name'],
    ['title', 'First name'],
    ['required', ''],
    ['pattern', '[A-Z]{1,}[a-z\\-]{0,}'],
    ['minlength', '3']
  );
  setAttributes(
    surName,
    ['type', 'text'],
    ['placeholder', 'Surname'],
    ['title', 'Surname'],
    ['required', ''],
    ['pattern', '[A-Z]{1,}[a-z\\-]{0,}'],
    ['minlength', '4']
  );
  setAttributes(
    submit,
    ['type', 'submit'],
    ['value', 'Login'],
    ['disabled', '']
  );
  const validate = validator(submit, firstName, surName);
  firstName.addEventListener('input', () => {
    validate(firstName);
  });
  surName.addEventListener('input', () => {
    validate(surName);
  });
  loginForm.append(firstName, surName, submit);
  return loginForm;
}
loginView.append(header, createFormContent());

function createLoginElement() {
  return loginView;
}
export default createLoginElement;

export { loginCompleteHandler };
