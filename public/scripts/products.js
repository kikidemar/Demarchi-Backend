fetch('/api/products')
  .then(res => res.json())
  .then(data => {
    const { products } = data
    const templates = products.map(each => {
      if (each.stock > 0) {
        return `
          <div class="card m-2" style="width: 13rem;">
            <img src="${each.thumbnail}" class="card-img-top p-3" alt="${each.description}">
            <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title text-center">${each.title}</h5>
              <p class="card-text text-center">$${each.price}</p>
              <a href="/product.html?id=${each._id}" class="btn btn-warning">+info</a>
            </div>
          </div>
        `;
      }
      return '';
    }).join('');
    document.getElementById('products').innerHTML = templates;
  })
  .catch(err => console.log(err))