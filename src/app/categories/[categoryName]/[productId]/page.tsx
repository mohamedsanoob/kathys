import ProductDetails from "@/app/product/_components/ProductDetails"

const page = async ({ params }: { params: Promise<{ productId: string }> }) => {
  const { productId } = await params;
  return (
    <div>
      <ProductDetails productId={productId} />
    </div>
  );
};

export default page
