import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL + '/api/'
axios.defaults.withCredentials = true

export default function useProducts() {
  const products = ref([])
  const product = ref([])
  const errors = ref([])
  const router = useRouter()

  const getProducts = async () => {
    const response = await axios.get('products')
    products.value = response.data.data
  }
  const getProduct = async (id) => {
    const response = await axios.get('products/' + id)
    product.value = response.data.data
  }

  const storeProduct = async (data) => {
    try {
      await axios.post('products', data)
      router.push({ name: 'ProductIndex' })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }

  const updateProduct = async (id) => {
    try {
      await axios.put('products/' + id, product.value)
      router.push({ name: 'ProductIndex' })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }

  const destroyProduct = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar?')) {
      return
    }
    await axios.delete('products/' + id)
    await getProducts()
  }

  return {
    product,
    products,
    getProduct,
    getProducts,
    storeProduct,
    updateProduct,
    destroyProduct,
    errors
  }
}
