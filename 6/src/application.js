import keyBy from 'lodash/keyBy.js';
import has from 'lodash/has.js';
import isEmpty from 'lodash/isEmpty.js';
import * as yup from 'yup';
import onChange from 'on-change';
import axios from 'axios';

const routes = {
  usersPath: () => '/users',
};

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  email: yup.string().required('email must be a valid email').email(),
  password: yup.string().required().min(6),
  passwordConfirmation: yup.string()
    .required('password confirmation is a required field')
    .oneOf(
      [yup.ref('password'), null],
      'password confirmation does not match to password',
    ),
});

// Этот объект можно использовать для того, чтобы обрабатывать ошибки сети.
// Это необязательное задание, но крайне рекомендуем попрактиковаться.
const errorMessages = {
  network: {
    error: 'Network Problems. Try again.',
  },
};

// Используйте эту функцию для выполнения валидации.
// Выведите в консоль её результат, чтобы увидеть, как получить сообщения об ошибках.
const validate = (fields) => {
  try {
    schema.validateSync(fields, { abortEarly: false });
    return {};
  } catch (e) {
    return keyBy(e.inner, 'path');
  }
};

// BEGIN
export default () => {
  const container = document.querySelector('[data-container="sign-up"]');
  const form = container.querySelector('[data-form="sign-up"]');
  const submitBtn = form.querySelector('input[type="submit"]');
  const fields = {
    name: form.querySelector('input[name="name"]'),
    email: form.querySelector('input[name="email"]'),
    password: form.querySelector('input[name="password"]'),
    passwordConfirmation: form.querySelector('input[name="passwordConfirmation"]'),
  };

  const state = {
    fields: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
    errors: {},
    isValid: false,
    isSending: false,
  };

  const render = () => {
    Object.entries(fields).forEach(([key, input]) => {
      const error = state.errors[key];
      if (error) {
        input.classList.add('is-invalid');
        let feedback = input.nextElementSibling;
        if (!feedback || !feedback.classList.contains('invalid-feedback')) {
          feedback = document.createElement('div');
          feedback.className = 'invalid-feedback';
          input.parentNode.insertBefore(feedback, input.nextSibling);
        }
        feedback.textContent = error.message;
      } else {
        input.classList.remove('is-invalid');
        let feedback = input.nextElementSibling;
        if (feedback && feedback.classList.contains('invalid-feedback')) {
          feedback.remove();
        }
      }
    });

    if (state.isValid && !state.isSending) {
      submitBtn.disabled = false;
    } else {
      submitBtn.disabled = true;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    state.fields[name] = value;
    const errors = validate(state.fields);
    state.errors = errors;
    state.isValid = isEmpty(errors);
    render();
  };

  Object.values(fields).forEach((input) => {
    input.addEventListener('input', handleChange);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const errors = validate(state.fields);
    state.errors = errors;
    state.isValid = isEmpty(errors);
    render();
    if (!state.isValid) return;

    state.isSending = true;
    render();

    try {
      await axios.post(routes.usersPath(), state.fields);
      container.innerHTML = 'User Created!';
    } catch (err) {
      state.isSending = false;
      render();
    }
  });

  render();
};

// END
