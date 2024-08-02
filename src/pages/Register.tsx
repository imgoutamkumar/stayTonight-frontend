import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient= useQueryClient();
  const navigate = useNavigate();
  const {showToast}=useAppContext()

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async() => {
      showToast({message:"Registration success!",type:"SUCCESS"})
      await queryClient.invalidateQueries("")
      navigate("/");
    },
    onError: (error:Error) => {
      showToast({message:error.message,type:"ERROR"})
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
    console.log(data);
  });

  return (
    <form className="flex flex-col gap-5" onSubmit={onSubmit}>
      <h2 className="text-3xl font-bold">Create an Acoount</h2>
      <div className="flex flex-col md:flex-row gap-5">
        <label className=" text-gray-700 text-sm font-bold flex-1">
          Firstname
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="text"
            placeholder="enter firstname"
            {...register("firstName", { required: "This field is required" })}
          />
          {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )}
        </label>
        <label className=" text-gray-700 text-sm font-bold flex-1">
          Lastname
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="text"
            placeholder="enter lastname"
            {...register("lastName", { required: "This field is required" })}
          />
          {errors.lastName && (
            <span className="text-red-500">{errors.lastName.message}</span>
          )}
        </label>
      </div>
      <label className=" text-gray-700 text-sm font-bold">
        Email
        <input
          className="rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
          type="text"
          placeholder="enter email"
          {...register("email", { required: "This field is required" })}
        />
        {errors.email && (
          <span className="text-red-500">{errors.email.message}</span>
        )}
      </label>
      <label className=" text-gray-700 text-sm font-bold">
        Password
        <input
          className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
          type="password"
          placeholder="enter password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password should be atleast of 8 character",
            },
          })}
        />
        {errors.password && (
          <span className="text-red-500">{errors.password.message}</span>
        )}
      </label>
      <label className=" text-gray-700 text-sm font-bold">
        Confirm Password
        <input
          className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
          type="password"
          placeholder="enter confirm password"
          {...register("confirmPassword", {
            validate: (val) => {
              if (!val) {
                return "This field is required";
              } else if (watch("password") != val) {
                return "Password does not match";
              }
            },
          })}
        />
        {errors.confirmPassword && (
          <span className="text-red-500">{errors.confirmPassword.message}</span>
        )}
      </label>
      <span>
        <button
          type="submit"
          className="bg-black border-2 text-white p-2 font-bold hover:bg-white hover:text-black"
        >
          Sign Up
        </button>
      </span>
    </form>
  );
};

export default Register;
