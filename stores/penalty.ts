import { defineStore } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'
import { HttpPaginationResponseI } from '~/types/http'
import { PenaltyI } from '../types/penalty'

// eslint-disable-next-line import/prefer-default-export
export const usePenaltyStore = defineStore('penalty', {
  state: () => ({}),
  actions: {
    storePenalty (penalty: PenaltyI) {
      return new Promise((resolve) => {
        useFetchApi('/penalties', {
          method: 'post',
          body: penalty
        }).then(({ status, data }) => {
          if (status.value === 'success') {
            const snackbarStore = useSnackbarStore()
            const { showSuccessSnackbar } = snackbarStore
            showSuccessSnackbar('Penalité ajouté avec succès')

            resolve(data.value)
          }
        })
      })
    },
    // eslint-disable-next-line max-len
    fetchPenaltyWithPagination ({ page, limit }: { page: number, limit: number }): Promise<HttpPaginationResponseI<PenaltyI[]>> {
      return new Promise((resolve) => {
        useFetchApi('/penalties', {
          method: 'get',
          params: {
            page,
            limit
          }
        }).then(({ data }) => {
          if (data.value) {
            resolve(data.value)
          }
        })
      })
    },
    updatePenalty (payload: PenaltyI) {
      return new Promise((resolve) => {
        useFetchApi(`/penalties/${payload.id}`, {
          method: 'put',
          body: payload
        }).then(({ status, data }) => {
          if (status.value === 'success') {
            const snackbarStore = useSnackbarStore()
            const { showSuccessSnackbar } = snackbarStore
            showSuccessSnackbar('Penalité modifié avec succès')

            resolve(data.value)
          }
        })
      })
    },
    deletePenalty (penaltyId: number) {
      return new Promise((resolve) => {
        useFetchApi(`/penalties/${penaltyId}`, {
          method: 'delete'
        }).then(({ status }) => {
          if (status.value === 'success') {
            const snackbarStore = useSnackbarStore()
            const { showSuccessSnackbar } = snackbarStore
            showSuccessSnackbar('Penalité supprimé avec succès')

            resolve(null)
          }
        })
      })
    }
  }
})
