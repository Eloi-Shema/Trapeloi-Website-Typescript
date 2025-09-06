import { useEffect, useState } from "react";
import Loading from "../../utils/Loading/Loading";
import AltHeader from "../../Components/Header/AltHeader";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useAudioPlayer } from "../../contexts/PlayerContext/PlayerContext";

const Privacy = () => {
  const { isPlaying, currentBeat } = useAudioPlayer();

  useDocumentTitle(
    `${
      isPlaying ? "Now Playing • " + currentBeat?.title : "Privacy • Trapeloi"
    }`
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <main className="m-auto max-w-[1536px] h-screen dark:text-white text-black xs:text-base md:text-lg dark:bg-black bg-platinum font-montserrat">
          <AltHeader />

          <div className="flex flex-col gap-5 xs:pb-10 md:pb-16 xs:px-8 md:px-20">
            <h1 className="mt-5 font-black text-center text-black head dark:text-white xs:text-4xl md:text-5xl font-trap">
              Privacy Policy
            </h1>

            <div>
              <p className="mb-5">
                Trapeloi ("we," "us," or "our") respects your privacy and is
                committed to protecting the personal information you provide to
                us. This Privacy Policy explains how we collect, use, and
                safeguard your information when you visit our website, purchase
                beats, or interact with our services.
              </p>

              <p className="mb-5 font-semibold">
                By using our website or services, you agree to the collection
                and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                1. INFORMATION WE COLLECT
              </h3>
              <p className="mb-5 ">
                We collect different types of information to provide and improve
                our services.
              </p>

              <h4 className="mb-2 text-xl font-bold">
                1.1 Personal Information
              </h4>
              <p className="mb-5 ">
                When you interact with our website, we may collect the following
                personal details:
              </p>
              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>Name</li>
                <li>Email address</li>
                <li>Billing address</li>
                <li>
                  Payment information (processed securely via third-party
                  payment providers)
                </li>
                <li>
                  Modifications to the beat structure or composition are not
                  allowed.
                </li>
                <li>Account login credentials</li>
              </ul>

              <h4 className="mb-2 text-xl font-bold">
                1.2 Non-Personal Information
              </h4>

              <p className="mb-5 ">
                We may also collect non-identifiable data, including:
              </p>
              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>IP address</li>
                <li>Browser type and version</li>
                <li>Device type and operating system</li>
                <li>Pages visited and time spent on our website</li>
                <li>Referring website or source</li>
              </ul>

              <h4 className="mb-2 text-xl font-bold">
                1.3 Cookies and Tracking Technologies
              </h4>
              <p className="mb-5 ">
                We use cookies, web beacons, and similar tracking technologies
                to enhance user experience, analyze site traffic, and improve
                functionality. You can adjust your browser settings to refuse
                cookies, but this may affect certain features of our website.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                2. HOW WE USE YOUR INFORMATION
              </h3>
              <p className="mb-5">
                We use the collected data for the following purposes:
              </p>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>To process transactions and deliver digital products</li>
                <li>To manage customer support requests and inquiries</li>
                <li>
                  To personalize user experience and improve website
                  functionality
                </li>
                <li>
                  To send important account-related notifications (e.g., order
                  confirmations, security alerts)
                </li>
                <li>
                  To analyze website traffic and optimize marketing strategies
                </li>
                <li>
                  To prevent fraud, security breaches, and unauthorized access
                </li>
              </ul>
              <p>
                We do not sell or rent your personal information to third
                parties.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                3. HOW WE SHARE YOUR INFORMATION
              </h3>
              <p className="mb-5">
                We may share your information in the following cases:
              </p>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  <span className="font-bold font-montserrat">
                    Service Providers:
                  </span>{" "}
                  We may share data with third-party service providers (e.g.,
                  payment processors, analytics providers) that help us operate
                  our business.
                </li>
                <li>
                  <span className="font-bold font-montserrat">
                    Legal Compliance:
                  </span>{" "}
                  We may disclose information if required by law, legal process,
                  or government request.
                </li>
                <li>
                  <span className="font-bold font-montserrat">
                    Business Transfers:
                  </span>{" "}
                  If our business is acquired or merged with another entity,
                  your information may be transferred as part of that
                  transaction.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                4. DATA SECURITY
              </h3>

              <p className="mb-5">
                We implement industry-standard security measures to protect your
                personal information from unauthorized access, alteration,
                disclosure, or destruction. However, no method of online
                transmission or storage is 100% secure. While we strive to
                protect your data, we cannot guarantee absolute security.
              </p>

              <p>
                If you suspect unauthorized access to your information, please
                contact us immediately at{" "}
                <span className="font-semibold cursor-pointer hover:underline text-perfectBlue">
                  trapeloi@gmail.com
                </span>
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                5. YOUR RIGHTS AND CHOICES
              </h3>
              <p>
                Depending on your location, you may have certain rights
                regarding your personal data:
              </p>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  <span className="font-bold font-montserrat">
                    Access & Correction:
                  </span>{" "}
                  You can request a copy of your personal data and correct any
                  inaccuracies.
                </li>
                <li>
                  <span className="font-bold font-montserrat">
                    Data Deletion:
                  </span>{" "}
                  You can request that we delete your personal data, subject to
                  legal and contractual obligations.
                </li>
                <li>
                  <span className="font-bold font-montserrat">
                    Opt-Out of Marketing:
                  </span>{" "}
                  You may unsubscribe from marketing emails at any time by
                  clicking the "unsubscribe" link in our emails.
                </li>
                <li>
                  <span className="font-bold font-montserrat">
                    Cookies & Tracking:
                  </span>{" "}
                  You can manage cookie preferences through your browser
                  settings.
                </li>
              </ul>
              <p>
                To exercise any of these rights, contact us at{" "}
                <span className="font-semibold cursor-pointer hover:underline text-perfectBlue">
                  trapeloi@gmail.com
                </span>
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                6. THIRD-PARTY LINKS AND SERVICES
              </h3>

              <p>
                Our website may contain links to third-party websites or
                services. We are not responsible for the privacy practices of
                those third parties. We encourage users to review the privacy
                policies of any external websites they visit.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                7. CHILDREN'S PRIVACY
              </h3>

              <p>
                Our services are not directed to individuals under the age of 13
                (or the applicable age of digital consent in your region). We do
                not knowingly collect personal data from children. If you
                believe a child has provided us with personal information,
                please contact us, and we will take appropriate action to remove
                the data.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                8. CHANGES TO THIS PRIVACY POLICY
              </h3>

              <p>
                We may update this Privacy Policy periodically to reflect
                changes in our practices or legal requirements. Any
                modifications will be posted on this page with an updated "Last
                Updated" date. Your continued use of our services after updates
                signifies acceptance of the revised policy.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-bold xs:text-xl md:text-2xl font-montserrat">
                10. CONTACT INFORMATION
              </h3>

              <p>
                For any questions, concerns, or requests regarding this Privacy
                Policy, please contact us at:
                <span className="font-semibold cursor-pointer hover:underline text-perfectBlue">
                  trapeloi@gmail.com
                </span>
              </p>
            </div>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Privacy;
