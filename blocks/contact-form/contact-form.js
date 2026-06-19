export default function decorate(block) {
  // The block contains form field definitions in rows
  // Each row: col1 = label, col2 = type (text|email|textarea|checkboxes), col3 = required (yes/no), col4 = options (for checkboxes)
  const rows = [...block.querySelectorAll(':scope > div')];
  const form = document.createElement('form');
  form.className = 'contact-form-fields';
  form.setAttribute('action', '#');
  form.setAttribute('method', 'post');

  rows.forEach((row) => {
    const cols = [...row.querySelectorAll(':scope > div')];
    if (cols.length < 2) return;

    const label = cols[0]?.textContent?.trim() || '';
    const type = cols[1]?.textContent?.trim() || 'text';
    const required = cols[2]?.textContent?.trim()?.toLowerCase() === 'yes';
    const options = cols[3]?.textContent?.trim() || '';

    const fieldDiv = document.createElement('div');
    fieldDiv.className = 'form-field';

    const labelEl = document.createElement('label');
    labelEl.textContent = label;
    if (required) {
      const star = document.createElement('span');
      star.className = 'required-star';
      star.textContent = ' *';
      labelEl.appendChild(star);
    }
    fieldDiv.appendChild(labelEl);

    if (type === 'textarea') {
      const textarea = document.createElement('textarea');
      textarea.setAttribute('rows', '5');
      textarea.setAttribute('placeholder', '');
      if (required) textarea.setAttribute('required', '');
      fieldDiv.appendChild(textarea);
    } else if (type === 'checkboxes') {
      const optionsList = options.split('|').map((o) => o.trim()).filter(Boolean);
      const checkGroup = document.createElement('div');
      checkGroup.className = 'checkbox-group';
      optionsList.forEach((opt) => {
        const checkDiv = document.createElement('div');
        checkDiv.className = 'checkbox-item';
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = `field-${opt.replace(/\s+/g, '-').toLowerCase()}`;
        input.name = label.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        input.value = opt;
        const checkLabel = document.createElement('label');
        checkLabel.setAttribute('for', input.id);
        checkLabel.textContent = opt;
        checkDiv.appendChild(input);
        checkDiv.appendChild(checkLabel);
        checkGroup.appendChild(checkDiv);
      });
      fieldDiv.appendChild(checkGroup);
    } else {
      const input = document.createElement('input');
      input.type = type;
      input.setAttribute('placeholder', '');
      if (required) input.setAttribute('required', '');
      fieldDiv.appendChild(input);
    }

    form.appendChild(fieldDiv);
  });

  const submitDiv = document.createElement('div');
  submitDiv.className = 'form-actions';
  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.textContent = 'Send Message';
  submitDiv.appendChild(submitBtn);
  form.appendChild(submitDiv);

  block.textContent = '';
  block.appendChild(form);
}
