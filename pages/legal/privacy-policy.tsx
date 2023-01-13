import Head from "next/head";
import React from "react";
import Ghostity from "@logo/Ghostity.svg";
import Footer from "../../components/General/Footer";

export default function PrivatePolicy() {
  return (
    <>
      <Head>
        <title>vGhostity | Privacy Policy</title>
      </Head>
      <div className="">
        <div className="dark:bg-secondary-dark dark:text-text-primary-dark bg-gray-100 h-64 flex flex-col justify-center items-center">
          <div className="bg-primary w-20 h-20 p-4 rounded-full">
            <Ghostity />
          </div>
          <h1 className="text-2xl font-semibold">Privacy Policy</h1>
          <div className="text-sm">Last Updated: July 1, 2022</div>
        </div>
        <main className="dark:text-text-primary-dark flex justify-center py-16">
          <div className="max-w-[75ch] text-sm flex flex-col items-center gap-10 px-4">
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">Privacy Policy</h2>
              <p>
                vGhostity website is owned by ghostity, which is a data
                controller of your personal data.
              </p>
              <p>
                We have adopted this Privacy Policy, which determines how we are
                processing the information collected by ghostity, which also
                provides the reasons why we must collect certain personal data
                about you. Therefore, you must read this Privacy Policy before
                using the website.
              </p>
              <p>
                vGhostity also uses <strong>YouTube API Services</strong>,{" "}
                <strong>Twitch API</strong>, and <strong>IGDB API</strong>,
                which all adopt a different Privacy Policy. Therefore, you must
                read their respective Privacy Policy as well, before using the
                website.
              </p>
              <p>
                A link to Google&apos;s Privacy Policy can be found{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline"
                >
                  here
                </a>
                .
              </p>
              <p>
                A link to Twitch&apos;s and IGDB&apos;s Privacy Policy can be
                found{" "}
                <a
                  href="https://www.twitch.tv/p/en/legal/privacy-notice/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold underline"
                >
                  here
                </a>
                .
              </p>
              <p>
                We take care of your personal data and undertake to guarantee
                its confidentiality and security.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">
                Personal information we collect:
              </h2>
              <p>
                When you visit the vGhostity, we automatically collect certain
                information about your device, including information about your
                web browser, time zone, and some of the installed
                cookies on your device. Additionally, as you browse the Site, we
                collect information about the individual web pages or products
                you view, what websites or search terms referred you to the
                Site, and how you interact with the Site. We refer to this
                automatically-collected information as “Device Information.”
                Moreover, we might collect the personal data you provide to us
                (including but not limited to Name, Surname, Address, payment
                information, etc.) during registration to be able to fulfill the
                agreement.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">
                Why do we process your data?
              </h2>
              <p>
                Our top priority is customer data security, and, as such, we may
                process only minimal user data, only as much as it is absolutely
                necessary to maintain the website. Information collected
                automatically is used only to identify potential cases of abuse
                and establish statistical information regarding website usage.
                This statistical information is not otherwise aggregated in such
                a way that it would identify any particular user of the system.
              </p>
              <p>
                You can visit the website without telling us who you are or
                revealing any information, by which someone could identify you
                as a specific, identifiable individual. If, however, you wish to
                use some of the website’s features, or you wish to receive our
                newsletter or provide other details by filling a form, you may
                provide personal data to us, such as your email, first name,
                last name, city of residence, organization, telephone number.
                You can choose not to provide us with your personal data, but
                then you may not be able to take advantage of some of the
                website’s features. For example, you won’t be able to receive
                our Newsletter or contact us directly from the website. Users
                who are uncertain about what information is mandatory are
                welcome to contact us via jylx@ghostity.com.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">Your rights:</h2>
              <div>
                <p>
                  If you are a European resident, you have the following rights
                  related to your personal data:
                </p>
                <ul className="list-disc px-10 mt-1">
                  <li>The right to be informed.</li>
                  <li>The right of access.</li>
                  <li>The right to rectification.</li>
                  <li>The right to erasure.</li>
                  <li>The right to restrict processing.</li>
                  <li>The right to data portability.</li>
                  <li>The right to object.</li>
                  <li>
                    Rights in relation to automated decision-making and
                    profiling.
                  </li>
                </ul>
              </div>
              <p>
                If you would like to exercise this right, please contact us
                through the contact information below.
              </p>
              <p>
                Additionally, if you are a European resident, we note that we
                are processing your information in order to fulfill contracts we
                might have with you (for example, if you make an order through
                the Site), or otherwise to pursue our legitimate business
                interests listed above. Additionally, please note that your
                information might be transferred outside of Europe, including
                Canada and the United States.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">Links to other websites:</h2>
              <p>
                Our website may contain links to other websites that are not
                owned or controlled by us. Please be aware that we are not
                responsible for such other websites or third parties&apos;
                privacy practices. We encourage you to be aware when you leave
                our website and read the privacy statements of each website that
                may collect personal information.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">Information security:</h2>
              <p>
                We secure information you provide on computer servers in a
                controlled, secure environment, protected from unauthorized
                access, use, or disclosure. We keep reasonable administrative,
                technical, and physical safeguards to protect against
                unauthorized access, use, modification, and personal data
                disclosure in its control and custody. However, no data
                transmission over the Internet or wireless network can be
                guaranteed.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">Legal disclosure:</h2>
              <p>
                We will disclose any information we collect, use or receive if
                required or permitted by law, such as to comply with a subpoena
                or similar legal process, and when we believe in good faith that
                disclosure is necessary to protect our rights, protect your
                safety or the safety of others, investigate fraud, or respond to
                a government request.
              </p>
            </section>
            <section className="flex flex-col gap-4">
              <h2 className="text-base font-bold">Contact information:</h2>
              <p>
                If you would like to contact us to understand more about this
                Policy or wish to contact us concerning any matter relating to
                individual rights and your Personal Information, you may send an
                email to jylx@ghostity.com.
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
