import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { applyActionCode } from "firebase/auth";
import { auth } from "../../services/Firebase";

export default function AuthUpdateEmail() {
  const router = useRouter();
  const { query } = router;

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (query.oobCode) {
      applyActionCode(auth, query.oobCode as string)
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [query.oobCode]);

  return !loading &&
    router.route === "/" &&
    query.mode === "verifyAndChangeEmail" ? (
    <div className="text-center bg-gray-500/50 text-white py-1 flex items-center justify-center gap-2">
      {!error ? (
        <>
          <AiOutlineCheckCircle />
          Email successfully changed!
        </>
      ) : (
        <>
          <ImCancelCircle />
          Invalid or expired link!
        </>
      )}
    </div>
  ) : null;
}
