/**
 * Comment submit form
 *
 */
const myForm = document.querySelector('#contact-form');
if (myForm) {
  const myFormButton = myForm.querySelector('button');
  myForm.addEventListener('submit', e => {
    e.preventDefault();
    if (myForm.querySelector('#input-comment').value.trim() == '') {
      return;
    }
    myFormButton.classList.add('disabled');
    let formData = new FormData(myForm);
    fetch('/', {
      method: 'POST',
      headers: {
        'Accept': 'application/x-www-form-urlencoded',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(formData).toString()
    })
    .then(data => {
      if (!data.ok) {
        throw new Error();
      }
    })
    .then(data => {
      console.log('Success: ', data);
      myForm.querySelector('.status').classList.add('success');
    })
    .catch(error => {
      console.error('Error:', error);
      myForm.querySelector('.status').classList.add('error');
    });
    //.then(() => console.log('Form successfully submitted')).catch((error) => alert(error));
  });
}
