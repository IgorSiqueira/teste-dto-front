<script setup>
import useProducts from '../../composables/products'
import { onMounted } from 'vue'

const { products, getProducts, destroyProduct } = useProducts()
onMounted(() => getProducts())
</script>
<template>
  <div class="mt-12">
    <div class="flex justfify-end m-2 p-2">
      <RouterLink
        :to="{ name: 'ProductCreate' }"
        class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
        >Novo Produto</RouterLink
      >
    </div>
    <div class="relative overflow-x-auto">
      <table
        v-if="products.length"
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Identificador</th>
            <th scope="col" class="px-6 py-3">Nome</th>
            <th scope="col" class="px-6 py-3">Categoria</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="product in products"
            :key="product.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ product.id }}
            </th>
            <td class="px-6 py-4">
              {{ product.name }}
            </td>
            <td class="px-6 py-4">
              {{ product.category_name }}
            </td>
            <td class="px-6 py-4 space-x-2">
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                @click="$router.push({ name: 'ProductEdit', params: { id: product.id } })"
              >
                Editar
              </button>
              <button
                @click="destroyProduct(product.id)"
                class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="max-w-md max-auto p-4 bg-white shadow-md rounded-md">
        <p>Nenhum produto cadastrado 😢!</p>
      </div>
    </div>
  </div>
</template>
