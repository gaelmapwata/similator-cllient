<template>
  <div class="page-container">
    <div class="d-flex mb-4 justify-end">
      <v-btn
        v-if="userHasOneOfPermissions(['USER:ADD'])"
        prepend-icon="mdi-plus"
        color="primary"
        rounded="xl"
        @click="onAddPenalty()"
      >
        <span class="text-none">Ajouter</span>
      </v-btn>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { usePenaltyStore } from '@/stores/penalty'
import { shouldHaveOneOfPermissions, userHasOneOfPermissions } from '@/utilities/auth.util'
import { PenaltyI } from '~/types/penalty'

definePageMeta({
  layout: 'admin',
  middleware: [(_, __, next) => shouldHaveOneOfPermissions({ next, permissions: ['PENALTY:READ'] })]

})

useAdminBreadcrumb('mdi-account-group', [{
  title: 'Pénalités',
  href: '/admin/penalty'
}])

const penaltyStore = usePenaltyStore()
const { fetchPenaltyWithPagination, deletePenalty } = penaltyStore

const itemsPerPage = ref(10)
const page = ref(1)
const selectedPenalties = ref([])
const penalties = ref<PenaltyI[]>([])
const totalItems = ref(0)
const penaltyFormDialogVisible = ref(false)
const penaltyFormDialogAction = ref<string | undefined>(undefined)
const confirmDialogVisible = ref(false)
const deletionInLoading = ref(false)
const penaltiesLoading = ref(false)

const textConfirmDeletion = computed(
  () => `Voulez-vous vraiment supprimer cette pénalité <strong>"${selectedPenalties.value?.company}"</strong> ?`
)

const selectedPenalties = computed<PenaltyI | null>(
  () => (selectedPenalties.value.length > 0 ? selectedPenalties.value[0] : null)
)

const headers = [
  {
    title: '#',
    align: 'start',
    sortable: false,
    key: 'index'
  },
  {
    title: 'Entreprise',
    key: 'company'
  },
  {
    title: 'amount',
    key: 'amount'
  },
  {
    title: 'amount',
    key: 'amount'
  }
]
</script>
