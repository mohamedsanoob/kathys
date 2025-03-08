import { create } from "zustand";

interface ShippingDetails {
  name: string;
  mobile: string;
  email: string;
  address: string;
  locality: string;
  landmark?: string;
  pincode: string;
  city: string;
  state: string;
}

interface ShippingStore {
  shippingDetails: ShippingDetails | null;
  setShippingDetails: (details: ShippingDetails) => void;
  clearShippingDetails: () => void;
}

export const useShippingStore = create<ShippingStore>((set) => ({
  shippingDetails: null,
  setShippingDetails: (details) => set({ shippingDetails: details }),
  clearShippingDetails: () => set({ shippingDetails: null }),
}));
