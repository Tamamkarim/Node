function ValidationForm() {
    let enimiInput = document.getElementById('Enimi');
    let snimiInput = document.getElementById('Snimi');
    let painoInput = document.getElementById('Paino');
    let pituusInput = document.getElementById('Pituus');
    let messageArea = document.querySelector('textarea');
  
    if (enimiInput.value === '') {
      messageArea.value = 'Enimi on tyhjä';
      return;
    }
  
    if (snimiInput.value === '') {
      messageArea.value = 'Snimi on tyhjä';
      return;
    }
  
    let painoValue = painoInput.value;
    if (painoValue === '') {
      messageArea.value = 'paino on tyhjä';
      return;
    } else {
      painoValue = parseFloat(painoValue);
      if (isNaN(painoValue) || painoValue < 50 || painoValue > 200) {
        messageArea.value = 'Paino range from 50 and 200.';
        return;
      }
    }
  
    let pituusValue = pituusInput.value;
    if (pituusValue === '') {
      messageArea.value = 'pituus on tyhjä';
      return;
    } else {
      pituusValue = parseFloat(pituusValue);
      if (isNaN(pituusValue) || pituusValue < 60 || pituusValue > 200) {
        messageArea.value = 'Pituus range 60 and 200.';
        return;
      }
    }
  
    messageArea.value = 'Validation is done';
  }
  
