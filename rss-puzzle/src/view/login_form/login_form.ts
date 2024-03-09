import './login_form.scss';
import View from '../view';

const loginView = new View({ tag: 'div', classList: ['login-view'] });
const header = new View({ tag: 'h2', classList: ['header'] });
header.view.append('Login Form');

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

  return function validate(input: View, errorMsg: string) {
    const inputElement = input.view as HTMLInputElement;
    if (inputElement.validity.valueMissing) {
      inputElement.setCustomValidity(errorMsg);
      inputElement.reportValidity();
      validated.set(input, false);
    } else {
      inputElement.setCustomValidity('');
      validated.set(input, true);
    }
    allowSubmit();
  };
}

function createFormContent(): View {
  const loginForm = new View({ tag: 'form', classList: ['login-form'] });
  const firstName = new View({ tag: 'input', classList: ['input'] });
  const surName = new View({ tag: 'input', classList: ['input'] });
  const submit = new View({ tag: 'input', classList: ['input'] });
  firstName.setAttributes(
    ['type', 'text'],
    ['placeholder', 'First Name'],
    ['title', 'Must not be empty'],
    ['required', '']
  );
  surName.setAttributes(
    ['type', 'text'],
    ['placeholder', 'Surname'],
    ['title', 'Must not be empty'],
    ['required', '']
  );
  submit.setAttributes(
    ['type', 'submit'],
    ['value', 'Login'],
    ['disabled', '']
  );
  const validate = validator(submit, firstName, surName);
  firstName.view.addEventListener('input', () => {
    validate(firstName, 'This field required');
  });
  surName.view.addEventListener('input', () => {
    validate(surName, 'This field required');
  });
  loginForm.append(firstName, surName, submit);
  return loginForm;
}

loginView.append(header, createFormContent());
export default loginView;
