<!-- eslint-disable max-len -->
<template>
  <div>
    <div class="mb-6">
      Active picker: <code>{{ activePicker || 'null' }}</code>
    </div>
    <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      transition="scale-transition"
      offset-y
      min-width="auto"
    >
      <template #activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Birthday date"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        />
      </template>
      <v-date-picker
        v-model="date"
        v-model:active-picker="activePicker"
        :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10)"
        min="1950-01-01"
        @change="save"
      />
    </v-menu>
  </div>
</template>
<script>
import { ref, watch, nextTick } from 'vue'

export default {
  setup () {
    const activePicker = ref(null)
    const date = ref(null)
    const menu = ref(false)

    watch(menu, (val) => {
      if (val) {
        setTimeout(() => {
          activePicker.value = 'YEAR'
        })
      }
    })

    const save = (dateInput) => {
      if (menu.value) {
        nextTick(() => {
          this.$refs.menu.save(dateInput)
        })
      }
    }

    return {
      activePicker,
      date,
      menu,
      save
    }
  }
}
</script>
