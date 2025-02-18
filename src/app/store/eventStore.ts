import { create } from "zustand";
import { IEvents } from "../interfaces/event.interface";
import axiosInstance from "../utils/axios.helper";
import { IAttendees } from "../interfaces/attendee.interface";
import { ITransaction } from "../interfaces/tx.interface";
import axios from "axios";

interface EventStore {
  events: IEvents[] | [];
  attendees: IAttendees[] | [];
  transactions: ITransaction[] | [];
  totalTicketSold: number;
  totalAttendee: number;
  totalTransaction: number;
  loading: boolean;
  event: IEvents | null;
  userEvents: IEvents[] | [];
  getEvents: () => Promise<void>;
  getEventsUser: () => Promise<void>;
  getEventsByParams: (param: string) => Promise<void>;
  getEventBySlug: (slug: string) => Promise<void>;
  getEventBySlugUser: (slug: string) => Promise<void>;
  getAttendeeListByParams: (slug: string) => Promise<void>;
  getTransactions: () => Promise<void>;
  calculateTotals: () => void;
}

export const useEventStore = create<EventStore>((set, get) => ({
  events: [],
  attendees: [],
  transactions: [],
  event: null,
  totalTicketSold: 0,
  totalAttendee: 0,
  loading: false,
  totalTransaction: 0,
  userEvents: [],

  getEvents: async () => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/organizer/events");
      set({ events: res.data.data });
      get().calculateTotals();
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  getEventsUser: async () => {
    set({ loading: true });
    try {
      const res = await axios.get("http://localhost:8080/events");
      set({ events: res.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  getEventBySlug: async (slug) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get(`/organizer/events/${slug}`);
      set({ event: res.data.data });
    } catch (error) {
      console.log(error);
      set({ event: null });
    } finally {
      set({ loading: false });
    }
  },

  getEventBySlugUser: async (slug) => {
    set({ loading: true });
    try {
      const res = await axios.get(`/events/${slug}`);
      set({ event: res.data.data });
    } catch (error) {
      console.log(error);
      set({ event: null });
    } finally {
      set({ loading: false });
    }
  },

  // localhost:8080/events/?name=java+jazz&category=MUSIC&location=Prambanan

  getEventsByParams: async (param) => {
    set({ loading: true });
    try {
      const url = `http://localhost:8080/events/?${param}`;
      const res = await axios.get(url);
      set({ events: res.data.data });
    } catch (error) {
      console.log(error);
    } finally {
      set({ loading: false });
    }
  },

  getAttendeeListByParams: async (slug: string) => {
    set({ loading: true });
    try {
      const res = await axiosInstance.get("/organizer/events/attendee", {
        params: {
          event: slug,
        },
      });
      set({ attendees: res.data.data });
    } catch (error) {
      console.log(error);
      set({ attendees: [] });
    } finally {
      set({ loading: false });
    }
  },

  getTransactions: async () => {
    try {
      const res = await axiosInstance.get("/tx");
      set({ transactions: res.data.data });
    } catch (error) {
      console.log(error);
      set({ transactions: [] });
    }
  },

  calculateTotals: () => {
    const events = get().events;
    const transactions = get().transactions;
    const totalTx = transactions.length;
    const totalSold = events.reduce(
      (sum, curr) => Number(sum) + Number(curr.ticketSold),
      0
    );
    const totalAttendee = events.reduce(
      (sum, curr) => Number(sum) + Number(curr.totalAttendee),
      0
    );
    set({
      totalTicketSold: totalSold,
      totalAttendee: totalAttendee,
      totalTransaction: totalTx,
    });
  },
}));
