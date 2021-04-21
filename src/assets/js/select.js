const select1 = new CustomSelect('.select', {
    defaultValue: 'Не выбрана',
    data: ['10 тонн', '20 тонн', '30 тонн', 'О_о'],
    onSelected(item) {
      console.log(`Выбранное значение: ${item.textContent}`);
    },
  });

  document.querySelector('.select').addEventListener('select.change', (e) => {
    console.log(
      `Выбранное значение: ${
      e.target.querySelector('.select__item_selected').textContent
      }`
    );
  });
  const select2 = new CustomSelect('.select1', {
    defaultValue: 'Не выбрана',
    data: ['10 тонн', '20 тонн', '30 тонн', 'О_о'],
    onSelected(item) {
      console.log(`Выбранное значение: ${item.textContent}`);
    },
  });

  document.querySelector('.select1').addEventListener('select1.change', (e) => {
    console.log(
      `Выбранное значение: ${
      e.target.querySelector('.select__item_selected').textContent
      }`
    );
  });
  const select3 = new CustomSelect('.select2', {
    defaultValue: 'Не выбрана',
    data: ['10 тонн', '20 тонн', '30 тонн', 'О_о'],
    onSelected(item) {
      console.log(`Выбранное значение: ${item.textContent}`);
    },
  });

  document.querySelector('.select2').addEventListener('select2.change', (e) => {
    console.log(
      `Выбранное значение: ${
      e.target.querySelector('.select__item_selected').textContent
      }`
    );
  });