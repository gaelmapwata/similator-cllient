<template>
  <div>
    <p class="text-center mb-2">
      ~Filtres~
    </p>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="4" class="d-flex align-center">
        <CommonDateRangePicker v-model="filter.date" />
      </v-col>
      <v-col cols="12" class="text-center">
        <v-btn
          color="primary"
          elevation="0"
          width="150"
          rounded="xl"
          append-icon="mdi-tune-variant"
          class="mx-1 mb-2"
          @click="handleFilter()"
        >
          <span class="text-none">Filter</span>
        </v-btn>

        <v-btn
          elevation="0"
          width="150"
          rounded="xl"
          class="mx-1 mb-2"
          variant="tonal"
          append-icon="mdi-refresh"
          @click="resetFilter()"
        >
          <span class="text-none">Réinitialiser</span>
        </v-btn>
      </v-col>
    </v-row>
  </div>
</template>
<script lang="ts" setup>
const props = defineProps({
  modelValue: { type: Object, required: true },
  showSuccessFilter: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'filter'])

const filter = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})

function resetFilter () {
  filter.value = {}
  emit('filter', filter.value)
}

function handleFilter () {
  if (filter.value.date) {
    [filter.value.startDate, filter.value.endDate] = filter.value.date
    filter.value.endDate = filter.value.endDate ?? filter.value.startDate
  } else {
    delete filter.value.startDate
    delete filter.value.endDate
  }

  emit('filter', filter.value)
}
</script>
