"use client";
import HomeCart from "@/components/HomeCart";
import HomeCollections from "@/components/HomeCollections";
import HomeItems from "@/components/HomeItems";
import { increment } from "@/lib/store/features/counter/counterSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export default function Home() {
  const dispatch = useAppDispatch();
  const count = useAppSelector((state) => state.counter);
  console.log(count.value, "==count");

  return (
    <div
      className="lg:px-20 grid grid-cols-[1fr_2fr_1fr]"
      onClick={() => dispatch(increment())}
    >
      <HomeItems />
      <HomeCollections />
      <HomeCart />
    </div>
  );
}
