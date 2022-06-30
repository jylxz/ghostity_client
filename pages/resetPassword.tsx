// Libraries
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { TextField } from "@mui/material";
import { confirmPasswordReset, verifyPasswordResetCode } from "firebase/auth";
import { auth } from "../firebase/ghostityFirebase";

// Components
import AnimatedButton from "../components/general/AnimatedButton";
import Footer from "../components/general/Footer";
import LoadingButton from "../components/general/LoadingButton";
import useValidatePassword from "../hooks/useValidatePassword";
import GhostityLogo from "../public/images/Ghostity-svg.svg";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await verifyPasswordResetCode(
    auth,
    context.query.oobCode as string
  )
    .then((email) => ({
      props: {
        email,
      },
    }))
    .catch((error) => {
      console.log(error)
      return ({
      redirect: {
        permanent: false,
        destination: "/",
      },
    })})

  return props;
};

export default function ResetPassword({ email }: { email: string }) {
  const router = useRouter();
  const { query } = router;
  const actionCode = query.oobCode;

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [validatePassword, valid, validateError] = useValidatePassword(
    newPassword,
    confirmNewPassword
  );

  const handleResetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validatePassword()) {
      setLoading(true);
      confirmPasswordReset(auth, actionCode as string, newPassword)
        .then(() => router.push("/?resetPassword=true", "/"))
        .catch(() => setLoading(false));
    }
  };

  return (
    <>
      <Head>
        <title>Ghostity | Reset Password</title>
      </Head>
      <div className="h-screen flex flex-col font-medium">
        <div className="flex-1 w-96 mx-auto flex flex-col justify-center gap-8">
          <div className="w-16 h-16 bg-primary rounded-full p-4 mx-auto">
            <GhostityLogo />
          </div>
          <h1 className="text-center">{`Reset password for ${email}`}</h1>
          <form className="flex flex-col gap-4" onSubmit={(e) => handleResetPassword(e)}>
            <input autoComplete="username email" defaultValue={email} hidden />
            <TextField
              label="New Password"
              size="small"
              type="password"
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              error={!valid}
              helperText={validateError}
              className="w-full"
            />
            <TextField
              label="Confirm New Password"
              size="small"
              type="password"
              autoComplete="new-password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              error={!valid}
              className="w-full"
            />
          <div className="mx-auto">
            {!loading ? (
              <AnimatedButton
                type="submit"
                className="bg-primary px-2 py-1 rounded"
              >
                Reset Password
              </AnimatedButton>
            ) : (
              <LoadingButton />
            )}
          </div>
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
