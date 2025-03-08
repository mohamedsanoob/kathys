import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShippingDetails {
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

interface ShippingState {
  shippingDetails: ShippingDetails | null;
}

const initialState: ShippingState = {
  shippingDetails: null,
};

export const shippingSlice = createSlice({
  name: "shipping",
  initialState,
  reducers: {
    setShippingDetails: (state, action: PayloadAction<ShippingDetails>) => {
      state.shippingDetails = action.payload;
    },
    clearShippingDetails: (state) => {
      state.shippingDetails = null;
    },
  },
});

export const { setShippingDetails, clearShippingDetails } =
  shippingSlice.actions;

export default shippingSlice.reducer;
