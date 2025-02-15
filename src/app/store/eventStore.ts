import {create} from "zustand"
import { IEvents } from "../interfaces/event.interface"
import axiosInstance from "../utils/axios.helper"
import { IAttendees } from "../interfaces/attendee.interface"
import { ITransaction } from "../interfaces/tx.interface"
import axios from "axios"
import { IVoucher } from "../interfaces/voucher.interface"

interface EventStore {
    events: IEvents[] | []
    attendees: IAttendees[] | []
    transactions: ITransaction[] | []
    totalTicketSold: number
    totalAttendee: number
    totalTransaction: number
    loading: boolean
    event: IEvents | null
    vouchers: IVoucher[] | []
    transactionsHistory: ITransaction[] | [],
    getEvents: (name?:string) => Promise<void>
    getVouchers: () => Promise<void>
    getEventBySlug: (slug: string) => Promise<void>
    getAttendeeListByParams: (slug: string) => Promise<void>
    getTransactions: (name?: string) => Promise<void>
    getTransactionsHistory: (name?: string) => Promise<void>
    calculateTotals: () => void
}

export const useEventStore = create<EventStore>((set, get) => ({
    events: [],
    attendees: [],
    transactions: [],
    vouchers: [],
    transactionsHistory: [],
    event: null,
    totalTicketSold: 0,
    totalAttendee: 0,
    loading: false,
    totalTransaction: 0,

    getEvents: async(name?: string) => {
        set({loading: true})
        try {
            const res = await axiosInstance.get("/organizer/events", {params: {name}})
            set({events: res.data.data})
            get().calculateTotals()
            
        } catch (error) {
            console.log(error)
        }finally{
            set({loading:false})
        }
    },
    getEventsUser: async() => {
        set({loading: true})
        try {

            const res = await axios.get("/organizer/events")
            set({events: res.data.data})
            get().calculateTotals()
            
        } catch (error) {
            console.log(error)
        }finally{
            set({loading:false})
        }
    },

    getEventBySlug: async(slug: string) => {
        set({loading: true})
        try{
            const res = await axiosInstance.get(`/organizer/events/${slug}`);
            set({event: res.data.data})
        } catch (error) {
            console.log(error)
            set({event: null})
        } finally {
            set({loading: false})
        }
    },

    getAttendeeListByParams: async(slug: string) => {
        set({loading: true})
        try{
            const res = await axiosInstance.get("/organizer/events/attendee", {
                params: {
                  event: slug,
                },
              });
            set({attendees: res.data.data})
        } catch (error) {
            console.log(error)
            set({attendees: []})
        } finally {
            set({loading: false})
        }
    },

    getTransactions: async(name?: string) => {
        set({loading: true})
        try {
            
            // base_url/tx?name=dangdut
            const res = await axiosInstance.get("/tx?", {params: {
                name
            }});
            const transactions = name? res.data.filteredData : res.data.data
            set({transactions})
        
        } catch (error) {
            console.log(error)
            set({transactions: []})
        }finally{
            set({loading: false})
        }
    },

    getTransactionsHistory: async(name?: string) => {
        set({loading: true})
        try {
            
            // base_url/tx?name=dangdut
            const res = await axiosInstance.get("/tx/history?", {params: {
                name
            }});
            const transactions = name? res.data.filteredData : res.data.data
            console.log(res.data)
            set({transactionsHistory: transactions})
        
        } catch (error) {
            console.log(error)
            set({transactionsHistory: []})
        }finally{
            set({loading: false})
        }
    },

    getVouchers: async() => {
        set({loading: true})
        try {
            const res = await axiosInstance.get('/organizer/vouchers')
            console.log(res.data)
            set({vouchers: res.data.data})
            
        } catch (error) {
            console.log(error)
        }finally{
            set({loading: false})
        }
    },
    

    calculateTotals: ()=> {
        const events = get().events
        const transactions = get().transactions
        const totalTx = transactions.length 
        const totalSold = events.reduce((sum, curr) => Number(sum) + Number(curr.ticketSold), 0)
        const totalAttendee = events.reduce((sum, curr) => Number(sum) + Number(curr.totalAttendee), 0)
        set({ totalTicketSold: totalSold, totalAttendee: totalAttendee, totalTransaction: totalTx })
    }
}))