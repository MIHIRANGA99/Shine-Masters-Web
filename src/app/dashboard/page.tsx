"use client";
import CountCard from "@/components/CountCard";
import Status from "@/components/Status";
import STATUS from "@/enums/status";
import { database } from "@/firebase/config";
import { getDataFromCollection } from "@/firebase/utils";
import useCurrentUser from "@/hooks/useCurrentUser";
import { DashboardTableCell } from "@/styles/CustomMUI/custom";
import filterByStatus from "@/utils/filterByStatus";
import { getReference } from "@/utils/getReference";
import {
  Box,
  Fade,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  DocumentData,
  collection,
  collectionGroup,
  doc,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import Lottie from "lottie-react";
import React, { useEffect, useState } from "react";

type Props = {};

const Page = (props: Props) => {
  const HEADERS = ["Slot", "Number Plate", "Wash Type", "Duration", "Status"];
  const user = useCurrentUser();

  const [bookings, setBookings] = useState<DocumentData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      const q = query(
        collectionGroup(database, "bookings"),
        where("isActive", "==", true),
        where("location", "==", user.uid)
        // orderBy("status", 'asc')
      );

      const qServices = query(
        collection(database, "locations", user.uid, "services")
      );

      onSnapshot(
        q,
        (snapshot) => {
          getDocs(qServices)
            .then((res) => {
              setBookings(
                snapshot.docs.map((doc) => {
                  setLoading(false);
                  return {
                    ...doc.data(),
                    service: res.docs
                      .filter(
                        (service) => service.id === doc.data().serviceType
                      )[0]
                      .data(),
                  };
                })
              );
            })
            .catch((err) => {
              setLoading(false);
              console.error(err);
            });
        },
        (err) => {
          setLoading(false);
          console.error(err);
        }
      );
    }
  }, [user]);

  return (
    <div className="h-full flex flex-col space-y-4 p-4">
      <div className="flex flex-row justify-around space-x-6 h-1/3">
        <CountCard
          loading={loading}
          count={bookings.length}
          outOf={12}
          label="Total Bookings"
        />
        <CountCard
          loading={loading}
          count={filterByStatus(bookings, STATUS.pending).length}
          label="Pending Bookings"
        />
        <CountCard
          loading={loading}
          count={filterByStatus(bookings, STATUS.missed).length}
          label="Missed Bookings"
        />
        <CountCard
          loading={loading}
          count={filterByStatus(bookings, STATUS.completed).length}
          label="Completed Bookings"
        />
      </div>
      <div className="w-full h-2/3">
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
          {!loading ? (
            <TableBody>
              {bookings.map((booking, index) => (
                <Fade in timeout={1000 + 1000 * index}>
                  <TableRow
                    className={
                      booking.status === STATUS.active
                        ? "bg-gradient-to-tr from-primary to-secondary duration-1000 transition-all"
                        : "duration-1000"
                    }
                  >
                    <DashboardTableCell
                      sx={{
                        color:
                          booking.status === STATUS.active
                            ? "white"
                            : "primary",
                      }}
                    >{`Slot ${booking.slotNumber}`}</DashboardTableCell>
                    <DashboardTableCell
                      sx={{
                        color:
                          booking.status === STATUS.active
                            ? "white"
                            : "primary",
                      }}
                    >
                      {booking.vehicleNumber}
                    </DashboardTableCell>
                    <DashboardTableCell
                      sx={{
                        color:
                          booking.status === STATUS.active
                            ? "white"
                            : "primary",
                      }}
                    >
                      {booking.service.name}
                    </DashboardTableCell>
                    <DashboardTableCell
                      sx={{
                        color:
                          booking.status === STATUS.active
                            ? "white"
                            : "primary",
                      }}
                    >{`${booking.service.duration}M`}</DashboardTableCell>
                    <DashboardTableCell
                      sx={{
                        color:
                          booking.status === STATUS.active
                            ? "white"
                            : "primary",
                        justifyContent: "center",
                      }}
                    >
                      <Status status={booking.status} />
                    </DashboardTableCell>
                  </TableRow>
                </Fade>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan={5}>
                  <Lottie
                    className="h-56"
                    animationData={require("@/lotties/loader.json")}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
    </div>
  );
};

export default Page;
