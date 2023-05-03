import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL + '/api/'
axios.defaults.withCredentials = true

export default function useCategories() {
  const categories = ref([])
  const category = ref([])
  const errors = ref([])
  const router = useRouter()

  const getCategories = async () => {
    const response = await axios.get('categories')
    categories.value = response.data.data
  }
  const getCategory = async (id) => {
    const response = await axios.get('categories/' + id)
    category.value = response.data.data
  }

  const storeCategory = async (data) => {
    try {
      await axios.post('categories', data)
      router.push({ name: 'CategoryIndex' })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }

  const updateCategory = async (id) => {
    try {
      await axios.put('categories/' + id, category.value)
      router.push({ name: 'CategoryIndex' })
    } catch (error) {
      if (error.response.status === 422) {
        errors.value = error.response.data.errors
      }
    }
  }

  const destroyCategory = async (id) => {
    if (!window.confirm('Tem certeza que deseja apagar?')) {
      return
    }
    await axios.delete('categories/' + id)
    await getCategories()
  }

  return {
    category,
    categories,
    getCategory,
    getCategories,
    storeCategory,
    updateCategory,
    destroyCategory,
    errors
  }
}
