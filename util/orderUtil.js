
import orderModel from "../models/orderModel.js";



export function mapStatus(status) {
    const statusMapping = {
      pending: { en: "pending", ar: "معلق" },
      accepted: { en: "accepted", ar: "مقيول " },
      rejected: { en: "rejected", ar: "مرفوض " },
      معلق: { en: "pending", ar: "معلق" },
      مقيول: { en: "accepted", ar: "مقيول" },
      مرفوض: { en: "rejected", ar: "مرفوض" },
    };
    return statusMapping[status.toLowerCase()];
  }
  