"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import Spinner from "../../../components/Spinner";
import OauthComponent from '../OauthComponent'

const Login = () => {
  // Access routing functionality
  const router = useRouter();
  // Initialize Supabase client
  const supabase = createClientComponentClient();

  // State to manage form inputs and their validation statuses
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Function to handle input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to validate form inputs
  const validateForm = () => {
    const errors = {};

    // Validate username
    if (!email.trim()) {
      errors.email = "email is required";
    }

    // Validate password
    if (!password.trim()) {
      errors.password = "Password is required";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form and check if it's valid
    const isValid = validateForm();

    if (!isValid) {
      return; // Don't proceed if validation fails
    }

    // Set loading state and start login process with supabase
    setLoading(true);
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      // Update loading state and handle response
      setLoading(false);

      if (error) {
        alert(error.message);
      } else if (user.length !== 0) {
        router.push("/auth/dashboard");
      }
    } catch (error) {
      // Handle unexpected errors
      alert("catch error: " + error.message);
    }
  };

  return (
    <div>
        {/* loading animation */}
        {loading && <Spinner/>}
        <div className="lg:flex">
        <div
          className="lg:w-[720px] h-[100vh]"
          style={{
            background: `linear-gradient(141deg, #F5F0FF 0%, #EFF6FE 50.36%, #EDFAF5 100%)`,
          }}
        >
        <h1 className="text-[#17181A] text-[35px] ps-[1rem] font-[700] leading-[64px] font-Poppins">
          MailBlink
        </h1>
        <div
           className="lg:w-[720px] lg:ps-[190px] lg:pr-[109px] xs:ps-[10px] pt-[190px]"
          >
            <h3 className="text-[#17181A] text-[48px] font-[700] leading-[64px] font-Poppins">
              Welcome back <br /> to MailBlink
            </h3>
            <Image
              src="/assets/images/Group 2936.svg"
              className="flex justify-end ms-[6rem]"
              width="172"
              height="23"
            />
          </div>
       </div>
        <div className="lg:w-[720px] bg-[#fff] lg:ps-[109px] xs:ps-[10px] lg:pt-[90px] xs:pt-[100px]  xs:px-[0.85rem] md:px-[0.85rem]">
          <h3 className="text-[#17181A] text-[24px] font-[600] leading-[32px] font-Poppins lg:ms-[9rem] xs:ms-[9rem] md:ms-[20rem]">
            Login
          </h3>
          <form className="mt-[16px]" onSubmit={handleSubmit}>
            <label className="text-[#515458] text-[12px] font-[500] font-Poppins mt-[22px]">
              user name
            </label>
            <input
              type="text"
              placeholder="enter user name"
              className="text-[#575757] bg-[#fff] border-[#B7BFC7] border-[1px] border-solid rounded-[8px] text-[16px] font-[400] leading-[24px] font-Poppins outline-none lg:w-[364px] xs:w-[100%] md:w-[600px] login-input-text mt-[-1rem]"
              style={{ padding: "12px 0px 12px 12px", height: "48px" }}
              value={email}
              onChange={handleEmailChange}
            />
            {errors.email && <p className="text-red-500">{errors.email}</p>}{" "}
            {/* Display error message */}
            <label className="text-[#515458] text-[12px] font-[500] font-Poppins">
              password
            </label>{" "}
            <input
              type="password"
              placeholder="enter password"
              className="text-[#575757] bg-[#fff] border-[#B7BFC7] border-[1px] border-solid rounded-[8px] text-[16px] font-[400] font-Poppins outline-none lg:w-[364px] xs:w-[100%] md:w-[600px] mt-[-1rem]"
              style={{ padding: "12px 0px 12px 12px", height: "48px" }}
              value={password}
              onChange={handlePasswordChange}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}{" "}
            {/* Display error message */}
            <p className="mt-[5px]">
              <Link
                 href="/auth/reset"
                className="text-[#1F284F] text-[14px] font-[600] leading-[18px] font-Poppins"
              >
                Forgot password?
              </Link>
            </p>
            <button
              type="submit"
              style={{
                background: `rgba(0, 112, 240, 0.90)`,
                border: `1px solid rgba(0, 112, 240, 0.90))`,
                borderRadius: "30px",
                padding: "12px 24px",
              }}
              className="text-[16px] font-[600] leading-[24px] flex justify-center items-center font-Poppins text-[#fff]  lg:w-[364px] xs:w-[100%] md:w-[600px] hover:bg-white duration-200"
            >
              Sign In
            </button>
            <OauthComponent className='mt-[-8rem]'/>
            <p className="text-[#575757] text-center text-[14px] font-Poppins font-[400] leading-[18px] lg:ms-[-12rem] md:ms-[-8rem]">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-[#1F284F] font-[600]">
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default Login;
