"use client";
import { increment } from "@/lib/store/features/counter/counterSlice";
import { AppStore, makeStore } from "@/lib/store/store";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";

const StoreProvider = ({ children }) => {
    const storeRef = useRef;
    if (!storeRef.current) {
      // Create the store instance the first time this renders
      storeRef.current = makeStore();

      storeRef.current.dispatch(increment())
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
};

export default StoreProvider;
