"use client";
import { TextField, MenuItem } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useShippingStore } from "@/store/store";

// Move validation schema outside component to prevent recreation
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

// Define types for form data
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

// Define the field type to include all possible field names
interface FormField {
  name: keyof FormData;
  label: string;
  type: string;
  placeholder: string;
  multiline?: boolean;
  rows?: number;
  halfWidth?: boolean;
  fullWidth?: boolean;
  select?: boolean;
}

// Move states array outside component
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

// Move form fields configuration outside component
const formFields: FormField[] = [
  {
    name: "name",
    label: "Name",
    type: "text",
    placeholder: "Enter your name",
    fullWidth: true,
  },
  {
    name: "mobile",
    label: "Mobile",
    type: "tel",
    placeholder: "Enter your mobile number",
    halfWidth: true,
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    halfWidth: true,
  },
  {
    name: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter your address",
    multiline: true,
    rows: 3,
    fullWidth: true,
  },
  {
    name: "locality",
    label: "Locality",
    type: "text",
    placeholder: "Enter your locality",
    halfWidth: true,
  },
  {
    name: "landmark",
    label: "Landmark",
    type: "text",
    placeholder: "Enter landmark (optional)",
    halfWidth: true,
  },
  {
    name: "pincode",
    label: "Pincode",
    type: "text",
    placeholder: "Enter your pincode",
    halfWidth: true,
  },
  {
    name: "city",
    label: "City",
    type: "text",
    placeholder: "Enter your city",
    halfWidth: true,
  },
  {
    name: "state",
    label: "State",
    type: "text",
    placeholder: "Select your state",
    fullWidth: true,
    select: true,
  },
];

const defaultValues = {
  name: "",
  mobile: "",
  email: "",
  address: "",
  locality: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
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
    defaultValues,
  });

  const onSubmit = (data: FormData) => {
    setShippingDetails(data);
    router.push("/cart?page=payment-mode");
  };

  const renderTextField = (field: FormField) => {
    if (field.name === "state") {
      return (
        <Controller
          name={field.name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              select
              value={value || ""}
              onChange={onChange}
              error={!!errors[field.name]}
              helperText={errors[field.name]?.message}
              placeholder={field.placeholder}
              fullWidth
            >
              {indianStates.map((state) => (
                <MenuItem key={state} value={state}>
                  {state}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      );
    }

    return (
      <TextField
        {...register(field.name)}
        type={field.type}
        placeholder={field.placeholder}
        multiline={field.multiline}
        rows={field.rows}
        error={!!errors[field.name]}
        helperText={errors[field.name]?.message}
        fullWidth
      />
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Shipping</h1>
        <p className="text-blue-600 cursor-pointer hover:underline">
          Already a user? Sign in
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {formFields.map((field) => (
          <div
            key={field.name}
            className={`${field.halfWidth ? "grid grid-cols-2 gap-4" : ""}`}
          >
            <div className="flex flex-col gap-2">
              <label className="font-medium">{field.label}</label>
              {renderTextField(field)}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="w-full mt-6 bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
