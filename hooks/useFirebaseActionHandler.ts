import { applyActionCode, Auth } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function useFirebaseActionHandler(auth: Auth) {
  const router = useRouter();
  const { query } = router;

  const [actionCode, setActionCode] = useState(query.oobCode as string);
  const [success, setSuccess] = useState<any>();
  const [error, setError] = useState<any>();

  // const actionHandler = () =>
  //   applyActionCode(auth, actionCode)
  //     .then((res) => {
  //       setSuccess(res);
  //       console.log(res);
  //     })
  //     .catch((err) => {
  //       setError(err);
  //       console.log(err);
  //     });

  useEffect(() => {
    if (actionCode) {
      applyActionCode(auth, actionCode)
        .then((res) => {
          setSuccess(res);
          auth.currentUser?.reload();
        })
        .catch((err) => {
          setError(err);
        });
    }
  }, [actionCode, auth]);

  return [success, error] as const;
}
