<template>
  <div class="page-container">
    <div class="d-flex mb-4 justify-end">
      <v-btn
        v-if="userHasOneOfPermissions(['PENALTY:ADD'])"
        prepend-icon="mdi-plus"
        color="primary"
        rounded="xl"
        @click="onAddPenalty()"
      >
        <span class="text-none">Ajouter</span>
      </v-btn>
      <v-btn
        v-if="userHasOneOfPermissions(['PENALTY:EDIT'])"
        :disabled="!selectedPenalty"
        prepend-icon="mdi-pencil"
        color="white"
        rounded="xl"
        class="ml-2"
        @click="onEditPenalty()"
      >
        <span class="text-none">Modifier</span>
      </v-btn>
      <v-btn
        v-if="userHasOneOfPermissions(['PENALTY:DELETE'])"
        :disabled="!selectedPenalty || deletionInLoading"
        :loading="deletionInLoading"
        prepend-icon="mdi-delete"
        color="white"
        rounded="xl"
        class="ml-2"
        @click="onDeletePenalty()"
      >
        <span class="text-none">Supprimer</span>
      </v-btn>
    </div>
    <v-card rounded="xl" elevation="0">
      <template #text>
        <v-data-table-server
          v-model="selectedPenalties"
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :items-length="totalItems"
          :headers="(headers as any)"
          :items="penalties"
          :loading="penaltiesLoading"
          items-per-page-text="Items par page"
          item-value="id"
          select-strategy="single"
          show-select
          return-object
          @update:options="loadPenalties"
        >
          <template #[`item.index`]="{ index }">
            {{ (itemsPerPage * (page - 1)) + index + 1 }}
          </template>
          <template #[`item.amount`]="{ item }">
            {{ item.amount }}
          </template>
          <template #[`item.amountHalf`]="{ item }">
            {{ item.amount/2 }}
          </template>
          <template #[`item.amountQuarter`]="{ item }">
            {{ item.amount/4 }}
          </template>
          <template #[`item.amountSix`]="{ item }">
            {{ item.amount/6 }}
          </template>
          <template #[`item.amountPercent2`]="{ item }">
            {{ (item.amount/6)*50/100 }}
          </template>
        </v-data-table-server>
      </template>
    </v-card>
    <h5 class="mt-3">
      Tableau de 75%
    </h5>
    <v-card rounded="xl" elevation="0">
      <template #text>
        <v-data-table-server
          v-model="selectedPenalties"
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :items-length="totalItems"
          :headers="(headers as any)"
          :items="penalties"
          :loading="penaltiesLoading"
          items-per-page-text="Items par page"
          item-value="id"
          select-strategy="single"
          return-object
          @update:options="loadPenalties"
        >
          <template #[`item.index`]="{ index }">
            {{ (itemsPerPage * (page - 1)) + index + 1 }}
          </template>
          <template #[`item.amount`]="{ item }">
            {{ (item.amount*75/100) }}
          </template>
          <template #[`item.amountHalf`]="{ item }">
            {{ (item.amount*75/100)/2 }}
          </template>
          <template #[`item.amountQuarter`]="{ item }">
            {{ (item.amount*75/100)/4 }}
          </template>
          <template #[`item.amountSix`]="{ item }">
            {{ (item.amount*75/100)/6 }}
          </template>
          <template #[`item.amountPercent2`]="{ item }">
            {{ (item.amount*75/100)*50/100 }}
          </template>
        </v-data-table-server>
      </template>
    </v-card>
    <h5 class="mt-3">
      Tableau de 50%
    </h5>
    <v-card rounded="xl" elevation="0">
      <template #text>
        <v-data-table-server
          v-model="selectedPenalties"
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :items-length="totalItems"
          :headers="(headers as any)"
          :items="penalties"
          :loading="penaltiesLoading"
          items-per-page-text="Items par page"
          item-value="id"
          select-strategy="single"
          return-object
          @update:options="loadPenalties"
        >
          <template #[`item.index`]="{ index }">
            {{ (itemsPerPage * (page - 1)) + index + 1 }}
          </template>
          <template #[`item.amount`]="{ item }">
            {{ (item.amount*50/100) }}
          </template>
          <template #[`item.amountHalf`]="{ item }">
            {{ (item.amount*50/100)/2 }}
          </template>
          <template #[`item.amountQuarter`]="{ item }">
            {{ (item.amount*50/100)/4 }}
          </template>
          <template #[`item.amountSix`]="{ item }">
            {{ (item.amount*50/100)/6 }}
          </template>
          <template #[`item.amountPercent2`]="{ item }">
            {{ (item.amount*50/100)*50/100 }}
          </template>
        </v-data-table-server>
      </template>
    </v-card>
    <h5 class="mt-3">
      Tableau de 25%
    </h5>
    <v-card rounded="xl" elevation="0">
      <template #text>
        <v-data-table-server
          v-model="selectedPenalties"
          v-model:items-per-page="itemsPerPage"
          v-model:page="page"
          :items-length="totalItems"
          :headers="(headers as any)"
          :items="penalties"
          :loading="penaltiesLoading"
          items-per-page-text="Items par page"
          item-value="id"
          select-strategy="single"
          return-object
          @update:options="loadPenalties"
        >
          <template #[`item.index`]="{ index }">
            {{ (itemsPerPage * (page - 1)) + index + 1 }}
          </template>
          <template #[`item.amount`]="{ item }">
            {{ (item.amount*25/100) }}
          </template>
          <template #[`item.amountHalf`]="{ item }">
            {{ (item.amount*25/100)/2 }}
          </template>
          <template #[`item.amountQuarter`]="{ item }">
            {{ (item.amount*25/100)/4 }}
          </template>
          <template #[`item.amountSix`]="{ item }">
            {{ (item.amount*25/100)/6 }}
          </template>
          <template #[`item.amountPercent2`]="{ item }">
            {{ (item.amount*25/100)*50/100 }}
          </template>
        </v-data-table-server>
      </template>
    </v-card>
    <PenaltyFormDialog
      v-model="penaltyFormDialogVisible"
      :action="penaltyFormDialogAction"
      :entity="selectedPenalty || undefined"
      @created="refreshPenalties()"
      @updated="refreshPenalties()"
    />
    <CommonConfirmDialog
      v-model="confirmDialogVisible"
      :text="textConfirmDeletion"
      @confirm="onConfirmDeletion"
    />
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
  () => `Voulez-vous vraiment supprimer cette pénalité <strong>"${selectedPenalty.value?.company}"</strong> ?`
)

const selectedPenalty = computed<PenaltyI | null>(
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
    title: 'amount/2',
    key: 'amountHalf'
  },
  {
    title: 'amount/4',
    key: 'amountQuarter'
  },
  {
    title: 'amount/6',
    key: 'amountSix'
  },
  {
    title: 'amount/50%',
    key: 'amountPercent2'
  },
  {
    title: 'Date enregistrement',
    key: 'datePenalty'
  }
]
function onEditPenalty () {
  penaltyFormDialogAction.value = 'update'
  penaltyFormDialogVisible.value = true
}

function onAddPenalty () {
  penaltyFormDialogAction.value = 'create'
  penaltyFormDialogVisible.value = true
}

function onDeletePenalty () {
  confirmDialogVisible.value = true
}

async function onConfirmDeletion () {
  if (selectedPenalty.value) {
    deletionInLoading.value = true
    await deletePenalty(selectedPenalty.value.id)
    refreshPenalties()
    deletionInLoading.value = false
  }
}
function refreshPenalties () {
  loadPenalties({
    page: page.value,
    itemsPerPage: itemsPerPage.value
  })
}

async function loadPenalties (payload: { page: number, itemsPerPage: number }) {
  penaltiesLoading.value = true
  const { data, total } = await fetchPenaltyWithPagination(
    { page: payload.page, limit: payload.itemsPerPage }
  )
  penalties.value = data
  totalItems.value = total
  penaltiesLoading.value = false
}
</script>
