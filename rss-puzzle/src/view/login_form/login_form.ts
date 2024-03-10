import './login_form.scss';
import View from '../view';
import state from '../../controllers/state';

const loginView = new View({ tag: 'div', classList: ['login-view'] });
const header = new View({ tag: 'h2', classList: ['header'] });
header.view.append('Login Form');
const validationErrors = {
  valueMissing: 'Must not be empty',
  patternMismatch: 'Only English letter and hyphen. First letter in uppercase.',
};

function validator(submitButton: View, ...validatedFields: View[]) {
  const validated = new Map<View, boolean>(
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
      submitButton.view.removeAttribute('disabled');
    } else {
      submitButton.view.setAttribute('disabled', '');
    }
  }

  return function validate(input: View) {
    const inputElement = input.view;
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
          // case validity.tooShort:
          //   inputElement.setCustomValidity(errorMsg.tooShot);
          //   break;
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

function createFormContent(): View {
  const loginForm = new View<HTMLFormElement>({
    tag: 'form',
    classList: ['login-form'],
  });
  const firstName = new View<HTMLInputElement>({
    tag: 'input',
    classList: ['input'],
  });
  const surName = new View<HTMLInputElement>({
    tag: 'input',
    classList: ['input'],
  });
  const submit = new View({ tag: 'input', classList: ['input'] });
  loginForm.view.addEventListener('submit', (event) => {
    state.setValue({
      firstName: firstName.view.value,
      surName: surName.view.value,
    });
    event.preventDefault();
  });
  firstName.setAttributes(
    ['type', 'text'],
    ['placeholder', 'First Name'],
    ['title', 'First name'],
    ['required', ''],
    ['pattern', '[A-Z]{1,}[a-z\\-]{0,}'],
    ['minlength', '3']
  );
  surName.setAttributes(
    ['type', 'text'],
    ['placeholder', 'Surname'],
    ['title', 'Surname'],
    ['required', ''],
    ['pattern', '[A-Z]{1,}[a-z\\-]{0,}'],
    ['minlength', '4']
  );
  submit.setAttributes(
    ['type', 'submit'],
    ['value', 'Login'],
    ['disabled', '']
  );
  const validate = validator(submit, firstName, surName);
  firstName.view.addEventListener('input', () => {
    validate(firstName);
  });
  surName.view.addEventListener('input', () => {
    validate(surName);
  });
  loginForm.append(firstName, surName, submit);
  return loginForm;
}

loginView.append(header, createFormContent());
export default loginView;
