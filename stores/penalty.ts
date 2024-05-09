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

    fetchPenaltyWithPagination ({ page, limit, filter }:
      {
        page: number,
         limit: number,
         filter?: { [key: string]: string | number | boolean }
        }): Promise<HttpPaginationResponseI<PenaltyI[]>> {
      return new Promise((resolve) => {
        useFetchApi('/penalties', {
          method: 'get',
          params: {
            page,
            limit,
            ...(filter || {})
          }
        }).then(({ data }) => {
          if (data.value) {
            resolve(data.value)
          }
        })
      })
    },
    exportPenalties (filter?: {
      [key: string]: string | number | boolean
    }): void {
      useFetchApi('/penalties/download-csv', {
        method: 'get',
        params: {
          ...(filter || {})
        }
      }).then(({ data }) => {
        if (data.value) {
          const fileUrl = URL.createObjectURL(data.value)
          window.open(fileUrl, '_blank')
        }
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
