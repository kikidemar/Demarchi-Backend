document.getElementById('forgot-pass').addEventListener('click',(event)=> {
  event.preventDefault()
  fetch('api/auth/forgot-pass', {
      method: 'POST',
  })
    .then(res=>res.json())
    .then(res=>alert(res.message))
    .catch(err=>console.log(err))
})