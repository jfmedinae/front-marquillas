const parameters = window.location.search;

const urlParams = new URLSearchParams(parameters);

const id = urlParams.get('id');

axios.get('http://127.0.0.1:8000/api/categories')
  .then(response => {
    const categorySelect = document.getElementById('category_id');
    response.data.data.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
    })
  })
  .catch(error => {
    console.error('Error fetching data', error);
  });

axios.get('http://127.0.0.1:8000/api/products/'+id)
    .then(function (response) {
      document.getElementById('name').value = response.data.data.name;
      document.getElementById('price').value = response.data.data.price;
      document.getElementById('category_id').value = response.data.data.category_id;
    })
    .catch(function (error) {
     console.error('Error al enviar formulario:', error);
      alert('Hubo un problema al enviar el formulario.');
    });

document.getElementById('editForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const payload = {"category_id": 1};
  formData.forEach((value, key) => {
    payload[key] = value;
  });

  // Enviar la solicitud POST con Axios
  axios.put('http://127.0.0.1:8000/api/products/'+id, payload)
    .then(function (response) {
      alert('Producto actualizado exitosamente.');
      window.location.href = 'index.html';
    })
    .catch(function (error) {
     console.error('Error al enviar formulario:', error);
      alert('Hubo un problema al enviar el formulario.');
    });
});