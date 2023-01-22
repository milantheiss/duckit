import { defineStore } from "pinia";

export const useDataStore = defineStore('dateStore', {
  state: () => ({
    ticketCodes: [],
    buyer: {
      firstname: '',
      lastname: '',
      email: ''
    },
  })
})