"use client";
import RHFTextField from "@/components/RHFTextField";
import { validationMessages } from "@/constants/text";
import { createData, registerUser } from "@/firebase/utils";
import { MUIButton, MUITextField } from "@/styles/CustomMUI/custom";
import TRegister from "@/types/TRegister";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, string } from "yup";

type Props = {};

const Register = (props: Props) => {
  const router = useRouter();

  const registerSchema = object().shape({
    locationName: string().required(validationMessages.required),
    regNum: string().required(validationMessages.required),
    email: string()
      .email(validationMessages.emailValidate)
      .required(validationMessages.required)
      .min(1)
      .max(50),
    address: string().required(validationMessages.required),
    slots: number().required(validationMessages.required),
    lat: number().required(validationMessages.required),
    lng: number().required(validationMessages.required),
    password: string().required(validationMessages.required).min(1).max(50),
    confirmPassword: string()
      .required(validationMessages.required)
      .test(
        "password-matcher",
        "Passwords are not matching",
        (value, context) => {
          return value === context.parent.password;
        }
      )
      .min(1)
      .max(50),
  });

  const methods = useForm<TRegister>({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      address: "",
      confirmPassword: "",
      email: "",
      lat: 0,
      lng: 0,
      slots: 0,
      password: "",
      regNum: "",
      locationName: "",
    },
  });

  const onSubmit = (data: TRegister) => {
    registerUser(
      data.email,
      data.password,
      data.locationName,
      (res) => {
        createData(
          "locations",
          {
            address: data.address,
            email: data.email,
            slots: data.slots,
            lat: data.lat,
            lng: data.lng,
            locationName: data.locationName,
            regNum: data.regNum,
          },
          res.user.uid,
          () => {
            console.log("Location Created");
            router.replace("/dashboard");
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );
  };

  const { handleSubmit } = methods;

  return (
    <div className="justify-center items-center h-full flex flex-col overflow-hidden">
      <div className="shadow-2xl shadow-primary bg-gradient-to-b from-blue-50 p-7 rounded-3xl flex flex-col space-y-3 w-2/5 h-full -mb-36">
        <Typography
          textAlign="center"
          className="font-bold text-2xl py-2 text-blue-500"
        >
          Register Admin
        </Typography>
        <FormProvider {...methods}>
          <form
            className="flex flex-col gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <RHFTextField name="regNum" label="Registration Number" />
            <RHFTextField name="locationName" label="Location Name" />
            <RHFTextField name="email" label="E-Mail Address" />
            <RHFTextField name="address" label="Address" />
            <RHFTextField type="number" name="slots" label="Number of Slots" />
            <div className="flex flex-row gap-3">
              <RHFTextField type="number" name="lat" label="Latitude" />
              <RHFTextField type="number" name="lng" label="Longitude" />
            </div>
            <RHFTextField type="password" name="password" label="Password" />
            <RHFTextField
              type="password"
              name="confirmPassword"
              label="Confirm Password"
            />
            <div className="flex justify-end">
              <MUIButton type="submit" variant="contained">
                Register
              </MUIButton>
            </div>
          </form>
        </FormProvider>
      </div>
      <Typography noWrap sx={{ textAlign: "center", paddingX: 6 }}>
        Already have an account?{" "}
        <span
          className="text-primary italic font-bold flex-nowrap cursor-pointer"
          onClick={() => router.replace(`/auth/login`)}
        >
          Login
        </span>
      </Typography>
    </div>
  );
};

export default Register;
