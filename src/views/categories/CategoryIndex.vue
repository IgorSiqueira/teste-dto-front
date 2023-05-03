<script setup>
import useCategories from '../../composables/categories'
import { onMounted } from 'vue'

const { categories, getCategories, destroyCategory } = useCategories()
onMounted(() => getCategories())
</script>
<template>
  <div class="mt-12">
    <div class="flex justfify-end m-2 p-2">
      <RouterLink
        :to="{ name: 'CategoryCreate' }"
        class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
        >Nova Categoria</RouterLink
      >
    </div>
    <div class="relative overflow-x-auto">
      <table
        v-if="categories.length"
        class="w-full text-sm text-left text-gray-500 dark:text-gray-400"
      >
        <thead
          class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
        >
          <tr>
            <th scope="col" class="px-6 py-3">Identificador</th>
            <th scope="col" class="px-6 py-3">Nome</th>
            <th scope="col" class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="category in categories"
            :key="category.id"
            class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
          >
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              {{ category.id }}
            </th>
            <td class="px-6 py-4">
              {{ category.name }}
            </td>
            <td class="px-6 py-4 space-x-2">
              <button
                class="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
                @click="$router.push({ name: 'CategoryEdit', params: { id: category.id } })"
              >
                Editar
              </button>
              <button
                @click="destroyCategory(category.id)"
                class="text-white bg-red-700 hover:bg-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Deletar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="max-w-md max-auto p-4 bg-white shadow-md rounded-md">
        <p>Nenhuma categoria cadastrada 😢!</p>
      </div>
    </div>
  </div>
</template>
