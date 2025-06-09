// BEGIN
export default () => {
  const form = document.querySelector('form');
  const input = form.querySelector('input[name="number"]');
  const result = document.getElementById('result');
  const resetBtn = form.querySelector('button[type="button"]');
  let sum = 0;

  const render = () => {
    result.textContent = sum;
    form.reset();
    input.focus();
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const value = parseInt(input.value, 10);
    if (!isNaN(value)) {
      sum += value;
    }
    render();
  });

  resetBtn.addEventListener('click', () => {
    sum = 0;
    render();
  });

  render();
};

// END