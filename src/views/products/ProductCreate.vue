<script setup>
import { reactive } from 'vue'
import useProducts from '../../composables/products'
import SelectInput from '../../components/SelectInput.vue'

const { storeProduct, errors } = useProducts()

const form = reactive({
  name: '',
  category_id: null
})

const onSelectedOption = (selectedOption) => {
  form.category_id = selectedOption
}
</script>
<template>
  <div class="mt-12">
    <form
      class="max-w-md max-auto p-4 bg-white shadow-md rounded-md"
      @submit.prevent="storeProduct(form)"
    >
      <div class="mb-6">
        <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Nome
        </label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Nome da Categoria"
        />
        <div v-if="errors.name">
          <span class="text-sm text-red-400">{{ errors.name[0] }}</span>
        </div>
      </div>
      <div>
        <select-input
          :labelName="'Categorias'"
          :endPoint="'categories'"
          :value-property="'id'"
          :label-property="'name'"
          :placeholder="'Selecione uma categoria'"
          v-model="form.category_id"
          @selected-option="onSelectedOption"
        />
      </div>
      <div class="mt-4">
        <button
          type="submit"
          class="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white rounded"
        >
          Salvar
        </button>
      </div>
    </form>
  </div>
</template>
