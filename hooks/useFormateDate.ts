import { useState, useEffect } from "react";
import dateformat from "dateformat";

const useFormattedDate = (date: string | undefined | null) => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(
    () =>
      setFormattedDate(
        dateformat(date ? date : "2023-11-05T17:31:17.108+00:00", "d-mmm-yyyy")
      ),
    []
  );

  return formattedDate;
};

export default useFormattedDate;
