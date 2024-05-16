
//selects form element
const form = document.querySelector("form");


form.addEventListener('submit', async(e)=>{
  e.preventDefault();
  showSpinner();
  //grabs data from form
  const data = new FormData(form);

  //initiates post req to /generate with prompt data from the form
  const response = await fetch('http://localhost:8080/generate',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    },
    body:JSON.stringify({
      prompt: data.get('prompt'),
    }),
  });

  //if successful response, show image
  //else, show error
  if(response.ok){
    const {image} = await response.json();
    const result = document.querySelector('#result');
    result.innerHTML = `<img src="${image}" width="512"/>`;
  }else{
    const err = await response.text();
    console.error(err);
  }
  //re-enable button
  hideSpinner();
});

//Disables button and adds spinner
function showSpinner() {
  const button = document.querySelector('button');
  button.disabled = true;
  button.innerHTML = 'Loading... <span class="spinner">🧠</span>';
}

//enables button and reverts to 'Submit'
function hideSpinner() {
  const button = document.querySelector('button');
  button.disabled = false;
  button.innerHTML = 'Submit';
}