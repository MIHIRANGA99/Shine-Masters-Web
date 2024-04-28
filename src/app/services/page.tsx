"use client";
import { database } from "@/firebase/config";
import useCurrentUser from "@/hooks/useCurrentUser";
import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
  Fade,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { DashboardTableCell, MUIButton } from "@/styles/CustomMUI/custom";
import ServiceModal from "@/components/ServiceModal";
import { TService } from "@/types/Models";
import { DeleteRounded, EditRounded } from "@mui/icons-material";

const ServicesView = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const [services, setServices] = useState<DocumentData[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<TService | null>(null);

  const HEADERS = ["Name", "Duration", "Price", "Description", "Actions"];

  useEffect(() => {
    console.log(user);
    if (user?.uid) {
      const servicesRef = collection(
        database,
        "locations",
        user.uid,
        "services"
      );
      onSnapshot(
        servicesRef,
        (querySnapshot) => {
          const services = querySnapshot.docs.map((doc) => {
            return {
              ...doc.data(),
              id: doc.id,
            };
          });
          setServices(services);
        },
        (e) => {
          console.error(e.message);
        }
      );
    }
  }, [router, user]);

  const onSubmit = (data: TService) => {
    if (user?.uid) {
      if (data.id) {
        updateDoc(
          doc(database, "locations", user.uid, "services", data.id),
          data
        )
          .then((res) => {
            console.log("res", res);
            setOpen(false);
          })
          .catch((e) => {
            console.error(e.message);
          });
      } else {
        delete data.id;
        setDoc(
          doc(collection(database, "locations", user.uid, "services")),
          data
        )
          .then((res) => {
            console.log("res", res);
            setOpen(false);
          })
          .catch((e) => {
            console.error(e.message);
          });
      }
    } else {
      console.error("User not found");
      router.replace("/auth/login");
    }
  };

  const onDelete = (id: string) => {
    if (user?.uid) {
      deleteDoc(doc(database, "locations", user.uid, "services", id))
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <>
      <div className="p-4">
        <Typography
          sx={{
            fontWeight: 600,
            fontSize: 24,
            fontStyle: "italic",
            color: "primary.main",
            textAlign: "center",
            paddingY: 4,
          }}
        >
          Manage Services
        </Typography>
        <div className="flex justify-end">
          <MUIButton
            className="bg-gradient-to-br from-primary to-secondary"
            variant="contained"
            onClick={() => setOpen(true)}
            sx={{ marginY: 2 }}
          >
            Add Service
          </MUIButton>
        </div>
        <Table sx={{ borderRadius: 2, overflow: "hidden" }}>
          <TableHead sx={{ backgroundColor: "primary.main" }}>
            <TableRow>
              {HEADERS.map((header, index) => (
                <TableCell
                  key={index}
                  sx={{ color: "white", textAlign: "center", fontWeight: 600 }}
                >
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {services.map((service, index) => (
              <Fade in timeout={500 + (index + 1) * 500}>
                <TableRow sx={{ ":hover": { backgroundColor: "ButtonFace" } }}>
                  <DashboardTableCell>{service.name}</DashboardTableCell>
                  <DashboardTableCell>{service.duration}</DashboardTableCell>
                  <DashboardTableCell>{service.price}</DashboardTableCell>
                  <DashboardTableCell>{service.description}</DashboardTableCell>
                  <DashboardTableCell>
                    <div className="flex flex-row justify-center space-x-2">
                      <MUIButton
                        onClick={() => {
                          setData({
                            id: service.id,
                            description: service.description,
                            price: service.price,
                            duration: service.duration,
                            name: service.name,
                          });
                          setOpen(true);
                        }}
                        sx={{ boxShadow: 7 }}
                        size="small"
                        variant="contained"
                        color="warning"
                      >
                        <EditRounded />
                      </MUIButton>
                      <MUIButton
                        onClick={() => onDelete(service.id)}
                        sx={{ boxShadow: 7 }}
                        size="small"
                        variant="contained"
                        color="error"
                      >
                        <DeleteRounded />
                      </MUIButton>
                    </div>
                  </DashboardTableCell>
                </TableRow>
              </Fade>
            ))}
          </TableBody>
        </Table>
      </div>
      <ServiceModal
        onClose={() => {
          setData(null);
          setOpen(false);
        }}
        onSubmit={onSubmit}
        open={open}
        {...(!!data ? { data: data } : {})}
      />
    </>
  );
};

export default ServicesView;
