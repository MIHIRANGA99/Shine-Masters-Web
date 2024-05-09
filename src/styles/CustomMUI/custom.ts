"use client";
import {
  Button,
  TableCell,
  TextField,
  Typography,
  styled,
} from "@mui/material";

export const MUIButton = styled(Button)({
  fontStyle: "italic",
  fontWeight: "bold",
  fontSize: "1rem",
  color: "white",
  backgroundColor: "primary.main",
  borderRadius: 12,
});

export const MUITextField = styled(TextField)({});

export const DashboardTableCell = styled(TableCell)({
  textAlign: "center",
  fontWeight: 600,
  justifyContent: "center",
  alignItems: "center",
});

export const StatusTypo = styled(Typography)({
  color: "primary.main",
  fontWeight: "bold",
  fontSize: "1rem",
  fontStyle: "italic",
});
