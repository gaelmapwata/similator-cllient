<template>
  <CommonDialog
    v-model="dialog"
    :title="dialogTitle"
    :submit="onSubmit"
    :action-loading="actionLoading"
    width="400"
    action-text="Confirmer"
  >
    <Form
      ref="form"
      :validation-schema="formSchema"
      :initial-values="initialValues"
      @submit="onSubmit"
    >
      <DynamicFields :fields="fields" />
    </Form>
  </CommonDialog>
</template>

<script lang="ts" setup>
import { object, string, number } from 'yup'
import { Form } from 'vee-validate'
import { useSnackbarStore } from '@/stores/snackbar'
import { usePenaltyStore } from '@/stores/penalty'
// import { storeToRefs } from 'pinia'
import { PenaltyI } from '~/types/penalty'

const snackbarStore = useSnackbarStore()
const penaltyStore = usePenaltyStore()

const props = defineProps({
  modelValue: Boolean,
  action: { type: String, default: '' },
  entity: { type: Object as PropType<PenaltyI>, default: () => ({}) }
})
const emit = defineEmits(['update:modelValue', 'created', 'updated'])

const { showErrorSnackbar } = snackbarStore
const { updatePenalty, storePenalty } = penaltyStore

const form = ref<typeof Form>()
const actionLoading = ref(false)

const dialogTitle = computed(() => (props.action === 'create' ? 'Création d\'une pénalité' : 'Modifier la pénalité'))
const dialog = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})
const initialValues = computed(() => {
  if (props.action === 'update') {
    return props.entity || {}
  }
  return {}
})

const fields = computed(() => [
  { name: 'company', placeholder: 'Veuillez entre l\' entreprise', label: 'Entreprise', type: 'text' },
  { name: 'amount', placeholder: 'Veuillez entre le montant', label: 'Montant', type: 'number' },
  { name: 'datePenalty', placeholder: 'Veuillez entre la date de la pénalité', label: 'Date penalité', type: 'date' }
])

const formSchema = object({
  company: string()
    .max(255)
    .required('Veuillez renseigner l\'entreprise'),
  amount: number()
    .required('Veuillez renseigner le montant'),
  datePenalty: string()
})

async function onSubmit () {
  if (form.value) {
    const { valid } = await form.value.validate()
    if (valid) {
      actionLoading.value = true
      if (props.action === 'create') {
        await storePenalty(form.value.getValues())
        emit('created')
      } else if (props.action === 'update') {
        await updatePenalty(form.value.getValues())
        emit('updated')
      }
      actionLoading.value = false
      form.value.resetForm()
      dialog.value = false
    } else {
      showErrorSnackbar('Formulaire incorrect')
    }
  }
}

// fetchUsers()
</script>
