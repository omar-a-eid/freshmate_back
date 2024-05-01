export function mapStatus(status) {
  const statusMapping = {
    pending: { en: "pending", ar: "معلق" },
    accepted: { en: "accepted", ar: "مقبول" },
    rejected: { en: "rejected", ar: "مرفوض" },
    معلق: { en: "pending", ar: "معلق" },
    مقبول: { en: "accepted", ar: "مقبول" },
    مرفوض: { en: "rejected", ar: "مرفوض" },
  };
  return statusMapping[status.toLowerCase()];
}
