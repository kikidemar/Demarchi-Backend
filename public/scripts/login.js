

document.getElementById('login').addEventListener('click',(event)=> {
  event.preventDefault()
  const email = document.getElementById('email').value
  const password = document.getElementById('password').value
//   console.log({ email , password })
  fetch('/api/auth/login',{
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email,password })
  })
      .then(res=>res.json())
      .then((res)=>{
        alert(res.message)
        if (res.message === 'User logged in!')
        window.location.href = 'http://localhost:8080/products.html'
        })
      .catch(err=>console.log(err))
})

document.getElementById('signout').addEventListener('click',(event)=> {
  event.preventDefault()
  fetch('/api/auth/signout',{
      method: 'POST'
  })
      .then(res=>res.json())
      .then(res=>alert(res.message))
      .catch(err=>console.log(err))
})

document.addEventListener('DOMContentLoaded', function () {
  let cid = getCookieValue('cid')
          function getCookieValue(cookieName) {
              const cookies = document.cookie.split('; ');
              for (const cookie of cookies) {
                  const [name, value] = cookie.split('=');
                  if (name === cookieName) {
                      let decodedValue = decodeURIComponent(value)
                      decoded=decodedValue.slice(2)
                      return JSON.parse(decoded)
                  }
              }
              return null
          }
  if (cid) {
    const cartLink = document.getElementById('quantity')
    cartLink.href = `/cart.html?cid=${cid}`
  }
  })
