<template>
  <label for="categories" class="block mb-2 text-sm font-medium text-gray-900">{{
    labelName
  }}</label>
  <select
    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
    v-model="selectedValue"
    @input="$emit('input', selectedValue)"
    :disabled="isLoading || hasError"
  >
    <option :value="null" disabled selected>{{ placeholder }}</option>
    <option
      v-for="option in optionsCopy"
      :key="option[valueProperty]"
      :value="option[valueProperty]"
    >
      {{ option[labelProperty] }}
    </option>
  </select>
  <div v-if="isLoading">Loading options...</div>
  <div v-if="hasError">Failed to load options.</div>
</template>

<script>
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL + '/api/'
axios.defaults.withCredentials = true

export default {
  name: 'SelectInput',
  props: {
    endPoint: {
      type: String,
      required: true
    },
    valueProperty: {
      type: String,
      default: 'id'
    },
    labelProperty: {
      type: String,
      default: 'name'
    },
    placeholder: {
      type: String,
      default: 'Select an option'
    },
    labelName: {
      type: String,
      default: 'Label Name'
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isLoading: false,
      hasError: false,
      optionsCopy: [],
      selectedValue: null
    }
  },
  computed: {
    hasOptions() {
      return this.optionsCopy.length > 0
    }
  },
  async mounted() {
    if (!this.hasOptions) {
      try {
        this.isLoading = true
        const response = await this.fetchOptions()
        this.optionsCopy = response.map((option) => ({
          [this.valueProperty]: option[this.valueProperty],
          [this.labelProperty]: option[this.labelProperty]
        }))
      } catch (error) {
        console.error(error)
        this.hasError = true
      } finally {
        this.isLoading = false
      }
    }
  },
  methods: {
    async fetchOptions() {
      const response = await axios.get(this.endPoint)
      return response.data.data
    },
    emitSelectedValue() {
      this.$emit('selected-option', this.selectedValue)
    }
  },
  watch: {
    selectedValue() {
      this.emitSelectedValue()
    }
  }
}
</script>
