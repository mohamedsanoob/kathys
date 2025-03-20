import ProductDetails from "./_components/ProductDetails";


const page = async ({
  params,
}: {
  params: Promise<{ productId: string; categoryName: string }>;
}) => {
  const { productId,categoryName } = await params;
  return (
    <div>
      <ProductDetails productId={productId} categoryName={categoryName} />
    </div>
  );
};

export default page;
