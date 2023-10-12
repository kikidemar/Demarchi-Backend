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