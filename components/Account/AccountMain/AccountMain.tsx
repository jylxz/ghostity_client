import { User } from 'firebase/auth';
import React from 'react'

import AccountMainDisplayName from './DisplayName/AccountMainDisplayName';
import AccountMainEmail from './Email/AccountMainEmail';
import AccountMainGoogleNotice from './GoogleNotice/AccountMainGoogleNotice';
import AccountMainPassword from './Password/AccountMainPassword';
import AccountMainResendVerification from './ResendVerification/AccountMainResendVerification';

export default function AccountMain({user}: {user: User}) {
  return (
    <div className="my-12 w-4/5 md:w-1/2 self-center flex flex-col gap-8">
      {!user?.emailVerified &&
      user?.providerData[0].providerId !== "google.com" ? (
        <AccountMainResendVerification />
      ) : null}
      <div className="flex flex-col gap-4">
        <h1 className="dark:text-text-primary-dark text-2xl">Profile</h1>
        <div className="px-8 flex items-center">
          <AccountMainDisplayName />
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <h1 className="dark:text-text-primary-dark text-2xl">
          Account Information
        </h1>
        {user?.providerData[0].providerId === "google.com" ? (
          <AccountMainGoogleNotice />
        ) : null}
        <div className="flex flex-col gap-4">
          <div className="px-8 flex flex-col gap-3">
            <AccountMainEmail />
            <AccountMainPassword />
          </div>
        </div>
      </div>
    </div>
  );
}
