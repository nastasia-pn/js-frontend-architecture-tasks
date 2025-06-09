// BEGIN
export default (companies) => {
  const container = document.querySelector('.container');

  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const buttons = companies.map((company, idx) => {
    const btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.type = 'button';
    btn.textContent = company.name;
    btn.style.marginRight = '0.5rem';
    return btn;
  });

  buttons.forEach((btn) => container.appendChild(btn));

  let currentDescription = null;
  let currentIndex = null;

  buttons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      if (currentIndex === idx) {
        if (currentDescription) {
          currentDescription.remove();
          currentDescription = null;
          currentIndex = null;
        }
        return;
      }
      if (currentDescription) {
        currentDescription.remove();
      }
      const desc = document.createElement('div');
      desc.textContent = companies[idx].description;
      container.appendChild(desc);
      currentDescription = desc;
      currentIndex = idx;
    });
  });
};

// END