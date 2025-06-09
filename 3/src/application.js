// BEGIN
export default (laptops) => {
  const form = document.querySelector('form');
  const result = document.querySelector('.result');

  const processorSelect = form.querySelector('select[name="processor_eq"]');
  const memorySelect = form.querySelector('select[name="memory_eq"]');
  const frequencyMinInput = form.querySelector('input[name="frequency_gte"]');
  const frequencyMaxInput = form.querySelector('input[name="frequency_lte"]');

  const filterLaptops = () => {
    const processor = processorSelect.value;
    const memory = memorySelect.value;
    const frequencyMin = frequencyMinInput.value;
    const frequencyMax = frequencyMaxInput.value;

    const filtered = laptops.filter((laptop) => {
      if (processor && laptop.processor !== processor) {
        return false;
      }
      if (memory && String(laptop.memory) !== memory) {
        return false;
      }
      if (frequencyMin && laptop.frequency < Number(frequencyMin)) {
        return false;
      }
      if (frequencyMax && laptop.frequency > Number(frequencyMax)) {
        return false;
      }
      return true;
    });

    result.innerHTML = '';

    if (filtered.length === 0) {
      return;
    }

    const ul = document.createElement('ul');
    filtered.forEach((laptop) => {
      const li = document.createElement('li');
      li.textContent = laptop.model;
      ul.appendChild(li);
    });
    result.appendChild(ul);
  };

  processorSelect.addEventListener('change', filterLaptops);
  memorySelect.addEventListener('change', filterLaptops);
  frequencyMinInput.addEventListener('input', filterLaptops);
  frequencyMaxInput.addEventListener('input', filterLaptops);

  filterLaptops();
};

// END