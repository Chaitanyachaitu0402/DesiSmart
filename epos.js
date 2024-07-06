const axios = require('axios');

const eposKey = '';
const eposSecret = '';
const authToken = '';

const fetchProducts = async () => {
  try {
    const response = await axios.get('https://epos-api.example.com/products', {
      headers: {
        'Authorization': Bearer ${authToken},
        'Epos-Key': eposKey,
        'Epos-Secret': eposSecret,
      },
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
};

fetchProducts();