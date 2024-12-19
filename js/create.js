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

document.getElementById('createForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const payload = {};
  formData.forEach((value, key) => {
    payload[key] = value;
  });

  axios.post('http://127.0.0.1:8000/api/products', payload)
    .then(function (response) {
      alert('Producto creado exitosamente.');
      window.location.href = 'index.html';
    })
    .catch(function (error) {
     console.error('Error al enviar formulario:', error);
      alert('Hubo un problema al enviar el formulario.');
    });
});