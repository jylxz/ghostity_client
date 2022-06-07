import axios from "axios";
import { useEffect, useState } from "react";

interface Admin {
  uid: string;
  admin: boolean;
}

export default function useAdminCheck(UID: string | undefined) {
  const [admin, setAdmin] = useState<boolean>(false);

  const checkAdmin = async () => {
    if (UID) {
      const adminCheck: Admin = await axios
        .get(`https://api.ghostity.com/admin?uid=${UID}`)
        .then((res) => res.data);

      if (adminCheck.admin) {
        setAdmin(true);
      } else {
        setAdmin(false);
      }
      
    } else {
      setAdmin(false);
    }
  };

  useEffect(() => {
    checkAdmin();
  }, [UID]);

  return [admin] as const;
}
