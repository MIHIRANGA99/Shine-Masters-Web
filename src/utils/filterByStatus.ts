import STATUS from "@/enums/status";
import { DocumentData } from "firebase/firestore";

const filterByStatus = (data: DocumentData[], status: STATUS) => {
    console.log(data.filter((data) => data.status === "pending"), status)
    return data.filter((data) => data.status === status)
}

export default filterByStatus;