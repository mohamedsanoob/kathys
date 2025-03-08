import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setShippingDetails,
  clearShippingDetails,
  ShippingDetails,
} from "../features/shipping/shippingSlice";

export const useShipping = () => {
  const dispatch = useDispatch();
  const shippingDetails = useSelector(
    (state: RootState) => state.shipping.shippingDetails
  );

  return {
    shippingDetails,
    setShippingDetails: (details: ShippingDetails) =>
      dispatch(setShippingDetails(details)),
    clearShippingDetails: () => dispatch(clearShippingDetails()),
  };
};
