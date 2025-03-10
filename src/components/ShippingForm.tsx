"use client";
import { TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useShippingStore } from "@/store/store";
import { ChevronDown } from "lucide-react";
import { useMemo } from "react";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  address: yup.string().required("Address is required"),
  locality: yup.string().required("Locality is required"),
  landmark: yup.string(),
  pincode: yup
    .string()
    .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
    .required("Pincode is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
});

interface FormData {
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

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
];

const commonTextFieldStyles = {
  "& .MuiInputBase-root": {
    height: "3rem",
    fontFamily: "Poppins",
    fontSize: "14px",
  },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
  "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#000",
  },
};

const ShippingForm = () => {
  const router = useRouter();
  const { setShippingDetails } = useShippingStore();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      address: "",
      locality: "",
      landmark: "",
      pincode: "",
      city: "",
      state: "",
    },
  });

  const onSubmit = (data: FormData) => {
    setShippingDetails(data);
    router.push("/cart?page=payment-mode");
  };

  const renderTextField = useMemo(() => {
    const MemoizedTextField = (
      name: keyof FormData,
      placeholder: string,
      options = {}
    ) => (
      <TextField
        {...register(name)}
        placeholder={placeholder}
        error={!!errors[name]}
        helperText={errors[name]?.message}
        fullWidth
        {...options}
        sx={commonTextFieldStyles}
      />
    );
    MemoizedTextField.displayName = "MemoizedTextField";
    return MemoizedTextField;
  }, [register, errors]);

  return (
    <div className="mx-auto w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semi-bold">Shipping address</h1>
        <p className="text-sm text-black cursor-pointer border border-black px-2 py-1 rounded-md hover:bg-gray-200">
          Already a user? Sign in
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Name</label>
          {renderTextField("name", "Enter your name")}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Mobile</label>
            {renderTextField("mobile", "Enter mobile number", {
              InputProps: {
                startAdornment: <span className="mr-2">+91</span>,
              },
            })}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Email</label>
            {renderTextField("email", "Enter email")}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Address</label>
          {renderTextField("address", "Enter address", { multiline: true })}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Locality</label>
            {renderTextField("locality", "Enter locality")}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Landmark</label>
            {renderTextField("landmark", "Enter landmark (optional)")}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">Pincode</label>
            {renderTextField("pincode", "Enter pincode")}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm text-gray-600">City</label>
            {renderTextField("city", "Enter city")}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">State</label>
          <Controller
            name="state"
            control={control}
            render={({ field: { onChange, value } }) => (
              <TextField
                select
                value={value || ""}
                onChange={onChange}
                error={!!errors.state}
                helperText={errors.state?.message}
                placeholder="Select state"
                fullWidth
                SelectProps={{
                  IconComponent: ChevronDown,
                  displayEmpty: true,
                  renderValue: (selected: unknown) =>
                    selected ? (selected as string) : <span className="text-gray-500">Select state</span>,
                  MenuProps: {
                    PaperProps: {
                      style: {
                        maxHeight: 600,
                      },
                    },
                  },
                }}
                sx={{
                  ...commonTextFieldStyles,
                  "& .MuiMenuItem-root": {
                    height: "4rem",
                  },
                }}
              >
                {indianStates.map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </div>

        <button
          type="submit"
          className="w-full mt-6 bg-black text-white px-6 py-3 rounded-lg font-mediumtransition-colors"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
