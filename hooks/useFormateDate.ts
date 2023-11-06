import { useState, useEffect } from "react";
import dateformat from "dateformat";

const useFormattedDate = (date: string) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => setFormattedDate(dateformat(date, "d-mmm-yyyy")), []);

  return formattedDate;
};

export default useFormattedDate;
