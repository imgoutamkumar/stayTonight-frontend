import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

export type SignInFormData = {
    
    email: string;
    password: string;
   
  };

const SignIn = () => {
  const queryClient= useQueryClient();
  const navigate = useNavigate();

  const {showToast}=useAppContext()
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<SignInFormData>();

    const mutation = useMutation(apiClient.signIn, {
      onSuccess: async() => {
        showToast({message:"Login success!",type:"SUCCESS"})
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
        <h2 className="text-3xl font-bold">Sign In</h2>
       
        <label className=" text-gray-700 text-sm font-bold">
          Email
          <input
            className=" rounded w-full py-1 px-2 font-normal h-10 border-2 border-gray-400"
            type="email"
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
        <span>
          <span>Not registered? <Link to="/">Create account</Link> </span>
          <button
            type="submit"
            className="bg-black border-2 text-white p-2 font-bold hover:bg-white hover:text-black"
          >
            Sign In
          </button>
        </span>
      </form>
    );
  };
  
  export default SignIn;