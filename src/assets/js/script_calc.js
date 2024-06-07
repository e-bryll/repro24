document.addEventListener('DOMContentLoaded', () => {
  const calculateButton = document.getElementById('calculate');
  const filmFieldsContainer = document.getElementById('film-fields-container');
  const addFilmButton = document.getElementById('addFilm');
  const resetButton = document.getElementById('resetButton');
  const pricePerSquareMeter = 1500; // ціна за квадратний метр в гривнях
  const minFilmPrice = 240; // мінімальна вартість плівки в гривнях

  addFilmButton.addEventListener('click', () => {
    if (filmFieldsContainer.children.length < 4) {
      const newFilmField = createFilmField(filmFieldsContainer.children.length + 1);
      filmFieldsContainer.appendChild(newFilmField);
    }
  });

  calculateButton.addEventListener('click', () => {
    let totalCost = 0;
    let valid = true;
    let totalResult = document.getElementById('total-result');
    if (totalResult) {
      totalResult.remove();
    }

    document.querySelectorAll('.film-field').forEach((field, index) => {
      const width = field.querySelector('.film-width').value;
      const length = field.querySelector('.length').value;
      const quantity = field.querySelector('.quantity').value;

      if (!width || !length || !quantity) {
        valid = false;
        return;
      }

      if (length > 1100) {
        field.querySelector('.result').textContent = 'Довжина плівки має бути до 1 100 мм';
        valid = false;
        return;
      }

      const widthInMeters = width / 1000;
      const lengthInMeters = length / 1000;
      let cost = Math.ceil((widthInMeters * lengthInMeters * quantity * pricePerSquareMeter) / 10) * 10;
      cost = Math.max(cost, minFilmPrice * quantity);

      totalCost += cost;

      field.querySelector('.result').textContent = `Вартість: ${cost} грн.`;
    });

    if (valid && document.querySelectorAll('.film-field').length > 1) {
      totalResult = document.createElement('div');
      totalResult.classList.add('result');
      totalResult.setAttribute('id', 'total-result');
      totalResult.textContent = `Загальна вартість: ${totalCost} грн.`;
      filmFieldsContainer.appendChild(totalResult);
    }
  });

  resetButton.addEventListener('click', () => {
    // Clear all fields and add one default field
    filmFieldsContainer.innerHTML = '';
    const newFilmField = createFilmField(1);
    filmFieldsContainer.appendChild(newFilmField);
  });

  // Ініціалізація сторінки з одним полем для плівки за замовчуванням
  initializeFilmFields();

  // Функція для створення поля для плівки
  function createFilmField(number) {
    const newFilmField = document.createElement('div');
    newFilmField.classList.add('film-field');

    const filmWidthGroup = document.createElement('div');
    filmWidthGroup.classList.add('form-group');
    const filmWidthLabel = document.createElement('label');
    filmWidthLabel.setAttribute('for', `film-width${number}`);
    filmWidthLabel.classList.add('form-label');
    filmWidthLabel.textContent = 'Ширина рулону:';
    filmWidthGroup.appendChild(filmWidthLabel);

    const filmWidthSelect = document.createElement('select');
    filmWidthSelect.setAttribute('id', `film-width${number}`);
    filmWidthSelect.classList.add('film-width');
    filmWidthSelect.innerHTML = `
            <option value="">виберіть</option>
            <option value="457">457</option>
            <option value="724">724</option>
            <option value="762">762</option>
            <option value="914">914</option>
        `;
    filmWidthGroup.appendChild(filmWidthSelect);
    newFilmField.appendChild(filmWidthGroup);

    const lengthGroup = document.createElement('div');
    lengthGroup.classList.add('form-group');
    const lengthLabel = document.createElement('label');
    lengthLabel.setAttribute('for', `length${number}`);
    lengthLabel.classList.add('form-label');
    lengthLabel.textContent = `Довжина плівки ${number}:`;
    lengthGroup.appendChild(lengthLabel);

    const lengthInput = document.createElement('input');
    lengthInput.setAttribute('type', 'number');
    lengthInput.setAttribute('id', `length${number}`);
    lengthInput.classList.add('length');
    lengthInput.setAttribute('placeholder', 'довжина в мм');
    lengthInput.setAttribute('min', '50');
    lengthInput.setAttribute('max', '1100');
    lengthInput.required = true;
    lengthGroup.appendChild(lengthInput);
    newFilmField.appendChild(lengthGroup);

    const quantityGroup = document.createElement('div');
    quantityGroup.classList.add('form-group');
    const quantityLabel = document.createElement('label');
    quantityLabel.setAttribute('for', `quantity${number}`);
    quantityLabel.classList.add('form-label');
    quantityLabel.textContent = 'Кількість:';
    quantityGroup.appendChild(quantityLabel);

    const quantityInput = document.createElement('input');
    quantityInput.setAttribute('type', 'number');
    quantityInput.setAttribute('id', `quantity${number}`);
    quantityInput.classList.add('quantity');
    quantityInput.setAttribute('value', '1');
    quantityInput.setAttribute('min', '1');
    quantityInput.required = true;
    quantityGroup.appendChild(quantityInput);
    newFilmField.appendChild(quantityGroup);

    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');
    resultDiv.setAttribute('id', `result${number}`);
    newFilmField.appendChild(resultDiv);

    return newFilmField;
  }

  // Функція для ініціалізації поля для плівки
  function initializeFilmFields() {
    while (filmFieldsContainer.children.length > 1) {
      filmFieldsContainer.removeChild(filmFieldsContainer.lastChild);
    }
    if (filmFieldsContainer.children.length === 0) {
      const newFilmField = createFilmField(1);
      filmFieldsContainer.appendChild(newFilmField);
    }
  }
});
