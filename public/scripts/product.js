const params = new URLSearchParams(location.search)
//console.log(params)
const id = params.get('id')
//console.log(id)

fetch('/api/products/'+id)
    .then(res=>res.json())
    // .then(res=>console.log(res))
    .then(res=>{
        let template = `
        <div class="card d-flex flex-row justify-content-center align-items-center m-2">
            <a href="javascript:history.go(-1)" class="btn btn-secondary" style="position: absolute; left: 20px; top: 20px;">
                <i class="fas fa-arrow-left"></i> Back
            </a>
            <img src="${res.product.thumbnail}" class="card-img-top p-3" style="width: 40vh" alt="${res.product.title}">
            <div class="card-body d-flex flex-column justify-content-center align-items-center">
                <h5 class="card-title text-center mb-2">${res.product.title}</h5>
                <p class="card-text text-center mb-2">U$D${res.product.price}</p>
                <p class="card-text text-center mb-2">${res.product.stock} units in stock</p>
                <p class="card-text text-center mb-2">${res.product.description}</p>
                <input type="number" class="text-center" style="width: 150px" value="0" min="0" max=${res.product.stock} name="quantity" id=${res.product._id}>
                <input id="add-to-cart" type="button" onclick='addToCart()' style="width: 150px" class="btn btn-primary mt-2" value="add to cart!">
            </div>
        </div>
        `
        document.getElementById('product').innerHTML = template
    })
    .catch(err=>console.log(err))

    async function addToCart () {
        console.log('ok');
        let selector = document.querySelector('input[type="number"]')
        let units = selector.value
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

        if (units>0) {
            let pid = selector.id
            try {
                let response = await fetch(`/api/carts/${cid}/product/${pid}/${units}`, {
                    method: 'PUT'
                })
                response = await response.json()
                if (response.message==="Cart updated") {
                    //socket.emit('upd_cart',null)
                    location.replace('/cart.html?cid='+cid)
                } else {
                    alert(response.message)
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert('Insert units!')
        }
    }

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