document.getElementById('login').addEventListener('click',(event)=> {
  event.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
  console.log({ email,password })
  fetch('/api/session/login',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email,password })
  })
      .then(res=>res.json())
      .then(res=>alert(res.message))
      .catch(err=>console.log(err))
})

document.getElementById('signout').addEventListener('click',(event)=> {
  event.preventDefault()
  fetch('/api/session/logout',{
      method: 'POST'
  })
      .then(res=>res.json())
      .then(res=>alert(res.message))
      .catch(err=>console.log(err))
})