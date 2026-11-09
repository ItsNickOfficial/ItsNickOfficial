(() => {
  'use strict';
  const form = document.querySelector('#request-form');
  if (!form) return;
  const service = form.querySelector('#service');
  const country = form.querySelector('#country-code');
  const phone = form.querySelector('#phone');
  const hint = document.querySelector('#phone-hint');
  const deadline = form.querySelector('#deadline');
  const status = document.querySelector('#form-status');
  const submit = document.querySelector('#send-button');
  const defaultLabel = submit.innerHTML;

  const services = {
    'ptyxiaki-ergasia': 'Πτυχιακή εργασία',
    'diplomatiki-ergasia': 'Διπλωματική εργασία',
    'ergasia-examinou': 'Εργασία εξαμήνου',
    'statistiki-analysi': 'Στατιστική ανάλυση',
    'parousiaseis-powerpoint': 'Παρουσιάσεις PowerPoint'
  };
  const param = new URLSearchParams(window.location.search).get('service');
  if (param && Object.prototype.hasOwnProperty.call(services, param)) service.value = services[param];

  function updatePhoneRules() {
    const isGreek = country.value === '+30';
    const length = isGreek ? 10 : 8;
    phone.maxLength = length;
    phone.pattern = `[0-9]{${length}}`;
    phone.title = `Συμπλήρωσε ${length} ψηφία`;
    hint.textContent = `${length} ψηφία για ${isGreek ? 'Ελλάδα' : 'Κύπρο'}.`;
    if (phone.value.length > length) phone.value = phone.value.slice(0, length);
  }
  country.addEventListener('change', updatePhoneRules);
  phone.addEventListener('input', () => { phone.value = phone.value.replace(/[^0-9]/g, ''); });
  updatePhoneRules();

  function setDeadlineMin() {
    const d = new Date();
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    deadline.min = `${yyyy}-${mm}-${dd}`;
  }
  setDeadlineMin();

  function setStatus(message, state) {
    status.textContent = message;
    status.dataset.state = state || '';
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    setStatus('', '');
    submit.disabled = true;
    submit.textContent = 'Αποστολή...';
    try {
      const data = new FormData(form);
      data.set('full_phone', `${country.value} ${phone.value}`);
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      const result = await response.json();
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Η υπηρεσία δεν επιβεβαίωσε την αποστολή.');
      }
      setStatus('Το αίτημά σου στάλθηκε επιτυχώς! Θα επικοινωνήσουμε μαζί σου σύντομα.', 'success');
      form.reset();
      updatePhoneRules();
      if (param && Object.prototype.hasOwnProperty.call(services, param)) service.value = services[param];
    } catch (error) {
      console.error('Detailed form submission failed:', error);
      setStatus('Η αποστολή δεν ολοκληρώθηκε. Δοκίμασε ξανά ή στείλε email στο info@academic-help.net.', 'error');
    } finally {
      submit.disabled = false;
      submit.innerHTML = defaultLabel;
    }
  });
})();
