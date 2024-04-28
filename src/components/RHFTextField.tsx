import { MUITextField } from "@/styles/CustomMUI/custom";
import { Fade, TextFieldProps, Typography } from "@mui/material";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Props = TextFieldProps & {
  name: string;
};

const RHFTextField = ({ name, ...other }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <MUITextField
          {...field}
          fullWidth
          error={!!error}
          helperText={
            error && (
              <Fade {...(!!error ? { timeout: 1000 } : {})} in={!!error}>
                <Typography
                  sx={{ fontSize: 12, fontWeight: 600, fontStyle: "italic" }}
                >
                  {error.message}
                </Typography>
              </Fade>
            )
          }
          value={
            typeof field.value === "number" && field.value === 0
              ? ""
              : field.value
          }
          InputProps={{
            sx: {
              borderRadius: 4,
              color: "primary.main",
              fontWeight: "bold",
              fontStyle: "italic",
            },
          }}
          {...other}
        />
      )}
    />
  );
};

export default RHFTextField;
