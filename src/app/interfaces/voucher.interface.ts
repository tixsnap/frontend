import { IEvents } from "./event.interface"

export interface IVoucher{
    id: string
    name: string
    totalValue: number
    startFrom: string
    validUntil: string
    isExpired: boolean
    events: {
        event: IEvents            
    }[]
}