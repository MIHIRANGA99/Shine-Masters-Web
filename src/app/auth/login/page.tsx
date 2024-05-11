"use client";
import RHFTextField from "@/components/RHFTextField";
import { validationMessages } from "@/constants/text";
import { loginUser } from "@/firebase/utils";
import { MUIButton, MUITextField } from "@/styles/CustomMUI/custom";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import Lottie from "lottie-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { object, string } from "yup";

type Props = {};

type TLogin = {
  email: string;
  password: string;
};

const Login = (props: Props) => {
  const router = useRouter();
  const loginSchema = object().shape({
    email: string()
      .email(validationMessages.emailValidate)
      .required(validationMessages.required)
      .min(1)
      .max(50),
    password: string().required(validationMessages.required).min(1).max(50),
  });

  const methods = useForm<TLogin>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = (data: TLogin) => {
    setLoading(true);
    loginUser(
      data.email,
      data.password,
      () => {
        router.replace("/dashboard");
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setLoading(false);
      }
    );
  };

  return (
    <div className="justify-center items-center h-full flex flex-col">
      <div className="shadow-2xl shadow-primary bg-gradient-to-b from-blue-50 p-7 rounded-3xl flex flex-col space-y-3 w-2/5 h-full -mb-36">
        <Typography
          textAlign="center"
          className="font-bold text-2xl py-2 text-blue-500"
        >
          Login Admin
        </Typography>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <RHFTextField type="email" label="E-mail Address" name="email" />
            <RHFTextField type="password" label="Password" name="password" />
            <div className="flex justify-end">
              <MUIButton disabled = {loading} type="submit" variant="contained">
                <span className="h-8 flex justify-center items-center">
                  {loading? <Lottie
                    className="w-24"
                    animationData={require("@/lotties/loader.json")}
                  />: 'Login'}
                </span>
              </MUIButton>
            </div>
          </form>
        </FormProvider>
      </div>
      <Typography noWrap sx={{ textAlign: "center", paddingX: 6 }}>
        Already have an account?{" "}
        <span
          className="text-primary italic font-bold flex-nowrap cursor-pointer"
          onClick={() => router.replace(`/auth/register`)}
        >
          Register Now
        </span>
      </Typography>
    </div>
  );
};

export default Login;
