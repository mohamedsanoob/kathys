const subCategories = [
  {
    id: 1,
    name: "Subcategory 1",
  },
  {
    id: 2,
    name: "Subcategory 2",
  },
  {
    id: 3,
    name: "Subcategory 3",
  },
];

const priceRange = [
  {
    id: 1,
    name: "Price Range 1",
  },
  {
    id: 2,
    name: "Price Range 2",
  },
  {
    id: 3,
    name: "Price Range 3",
  },
];

const FilterSection = () => {
  return (
    <div className="border border-gray-200 rounded-md p-4">
      <div className="flex justify-between">
        <p className="">Filters</p>
        <p className="text-sm text-red-500 cursor-pointer">Clear All</p>
      </div>
      <div className="py-4 border-y border-gray-200 my-4">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Subcategories</p>
          {subCategories.map((subCategory) => (
            <div key={subCategory.id} className="flex items-center gap-2">
              <input type="checkbox" style={{ accentColor: "black" }} />
              <p className="text-sm">{subCategory.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium">Price Range</p>
          {priceRange.map((range) => (
            <div key={range.id} className="flex items-center gap-2">
              <input type="checkbox" style={{ accentColor: "black" }} />
              <p className="text-sm">{range.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
