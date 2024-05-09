"use client";
import RHFTextField from "@/components/RHFTextField";
import { validationMessages } from "@/constants/text";
import { MUIButton } from "@/styles/CustomMUI/custom";
import { TService } from "@/types/Models";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grow, Modal, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { number, object, string } from "yup";

type Props = {
  open?: boolean;
  onSubmit: (data: TService) => void;
  onClose: () => void;
  data?: TService;
};

const ServiceModal = (props: Props) => {
  const serviceSchema = object().shape({
    name: string().required(validationMessages.required),
    duration: number()
      .min(1, "Duration Should be At Least 1 Minute")
      .required(validationMessages.required),
    price: number()
      .min(1, "Price Should be At Least 1")
      .required(validationMessages.required),
    description: string().required(validationMessages.required),
  });

  const methods = useForm<TService>({
    resolver: yupResolver(serviceSchema),
    defaultValues: {
      description: "",
      duration: 0,
      name: "",
      price: 0,
    },
  });

  useEffect(() => {
    if (props.data) {
      methods.setValue("description", props.data.description);
      methods.setValue("duration", props.data.duration);
      methods.setValue("name", props.data.name);
      methods.setValue("price", props.data.price);
    }

    return () => methods.reset();
  }, [props.data]);

  return (
    <Modal
      sx={{
        backgroundColor: "transparent",
        ".css-i9fmh8-MuiBackdrop-root-MuiModal-backdrop": {
          backgroundColor: "transparent",
        },
        borderRadius: 2,
      }}
      open={props.open || false}
      onClose={() => {
        methods.reset();
        props.onClose();
      }}
      className="justify-center backdrop-blur-xl items-center h-full flex flex-col"
    >
      <Grow in={props.open}>
        <div className="shadow-lg shadow-black-100 bg-gradient-to-b from-secondary/50 to-primary/45 rounded-2xl from-blue-10 backdrop-blur-xl p-7 flex flex-col space-y-3 w-2/5">
          <Typography
            textAlign="center"
            className="font-bold text-2xl py-2 text-white"
          >
            Create a Service
          </Typography>
          <FormProvider {...methods}>
            <form
              className="flex flex-col gap-3"
              onSubmit={methods.handleSubmit((data) =>
                props.onSubmit({ ...data, id: props.data && props.data.id })
              )}
            >
              <RHFTextField name="name" label="Service Name" />
              <RHFTextField type="number" name="price" label="Price" />
              <RHFTextField
                type="number"
                name="duration"
                label="Duration (Mins)"
              />
              <RHFTextField
                name="description"
                multiline
                rows={3}
                label="Description"
              />
              <div className="flex justify-end">
                <MUIButton type="submit" variant="contained">
                  {props?.data ? "Update" : "Create"}
                </MUIButton>
              </div>
            </form>
          </FormProvider>
        </div>
      </Grow>
    </Modal>
  );
};

export default ServiceModal;
