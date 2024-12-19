function deleteProduct(index){
  if(!confirm('¿Estas seguro de eliminar este producto?')){
    return false;
  }
  axios.delete('http://127.0.0.1:8000/api/products/'+index)
    .then(function (response) {
      alert('Producto eliminado exitosamente.');
      window.location.href = 'index.html';
    })
    .catch(function (error) {
     console.error('Error al enviar formulario:', error);
      alert('Hubo un problema al enviar la peticion.');
    });
}

axios.get('http://127.0.0.1:8000/api/products')
  .then(response => {
    if(response.data.data.length === 0){
      document.getElementById('products').innerHTML = '<tr><td colspan="5">No hay productos registrados</td></tr>';
    }
    response.data.data.forEach(product => {
        const productElement = document.createElement('tr');
        productElement.innerHTML = `
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.category_name}</td>
            <td>${product.price}</td>
            <td>
                <a href="edit.html?id=${product.id}" class="btn btn-warning mb-2"><i class="fa-solid fa-pencil"></i> Editar</a>
                <a href="#" class="btn btn-danger mb-2" onclick="deleteProduct(${product.id})"><i class="fa-solid fa-trash"></i> Borrar</a>
            </td>`;
        document.getElementById('products').appendChild(productElement);
    })
  })
  .catch(error => {
    console.error('Error fetching data', error);
  });