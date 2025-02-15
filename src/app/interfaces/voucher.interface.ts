import { IEvents } from "./event.interface"

export interface IVoucher{
    id: string
    name: string
    totalValue: number
    startFrom: string
    validUntil: string
    events: {
        event: IEvents            
    }[]
}