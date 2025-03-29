import { useEffect, useState } from "react";
import Loading from "../../utils/Loading/Loading";
import AltHeader from "../../Components/Header/AltHeader";

const Privacy = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(true);
    }, 1500);
  }, []);

  return (
    <>
      {isLoading ? (
        <main className="m-auto max-w-[1536px] flex flex-col gap-8 dark:text-white text-black xs:text-base md:text-lg dark:bg-black bg-platinum xs:py-10 md:py-16 xs:px-8 md:px-20 font-montserrat">
          <AltHeader />

          <h1 className="head dark:text-white text-black xs:text-4xl md:text-5xl font-trap font-black text-center mt-10 mb-5">
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
              By using our website or services, you agree to the collection and
              use of information in accordance with this Privacy Policy.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              1. INFORMATION WE COLLECT
            </h3>
            <p className=" mb-5">
              We collect different types of information to provide and improve
              our services.
            </p>

            <h4 className="font-bold text-xl mb-2">1.1 Personal Information</h4>
            <p className=" mb-5">
              When you interact with our website, we may collect the following
              personal details:
            </p>
            <ul className="list-disc pl-8 leading-8 mb-5">
              <li>Name</li>
              <li>Email address</li>
              <li>Billing address</li>
              <li>
                Payment information (processed securely via third-party payment
                providers)
              </li>
              <li>
                Modifications to the beat structure or composition are not
                allowed.
              </li>
              <li>Account login credentials</li>
            </ul>

            <h4 className="font-bold text-xl mb-2">
              1.2 Non-Personal Information
            </h4>

            <p className=" mb-5">
              We may also collect non-identifiable data, including:
            </p>
            <ul className="list-disc pl-8 leading-8 mb-5">
              <li>IP address</li>
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
            </ul>

            <h4 className="font-bold text-xl mb-2">
              1.3 Cookies and Tracking Technologies
            </h4>
            <p className=" mb-5">
              We use cookies, web beacons, and similar tracking technologies to
              enhance user experience, analyze site traffic, and improve
              functionality. You can adjust your browser settings to refuse
              cookies, but this may affect certain features of our website.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              2. HOW WE USE YOUR INFORMATION
            </h3>
            <p className="mb-5">
              We use the collected data for the following purposes:
            </p>

            <ul className="list-disc pl-8 leading-8 mb-5">
              <li>To process transactions and deliver digital products</li>
              <li>To manage customer support requests and inquiries</li>
              <li>
                To personalize user experience and improve website functionality
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
              We do not sell or rent your personal information to third parties.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              3. HOW WE SHARE YOUR INFORMATION
            </h3>
            <p className="mb-5">
              We may share your information in the following cases:
            </p>

            <ul className="list-disc pl-8 leading-8 mb-5">
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
                If our business is acquired or merged with another entity, your
                information may be transferred as part of that transaction.
              </li>
            </ul>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              4. DATA SECURITY
            </h3>

            <p className="mb-5">
              We implement industry-standard security measures to protect your
              personal information from unauthorized access, alteration,
              disclosure, or destruction. However, no method of online
              transmission or storage is 100% secure. While we strive to protect
              your data, we cannot guarantee absolute security.
            </p>

            <p>
              If you suspect unauthorized access to your information, please
              contact us immediately at{" "}
              <span className="font-semibold hover:underline text-perfectBlue cursor-pointer">
                trapeloi@gmail.com
              </span>
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              5. YOUR RIGHTS AND CHOICES
            </h3>
            <p>
              Depending on your location, you may have certain rights regarding
              your personal data:
            </p>

            <ul className="list-disc pl-8 leading-8 mb-5">
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
                You can manage cookie preferences through your browser settings.
              </li>
            </ul>
            <p>
              To exercise any of these rights, contact us at{" "}
              <span className="font-semibold hover:underline text-perfectBlue cursor-pointer">
                trapeloi@gmail.com
              </span>
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              6. THIRD-PARTY LINKS AND SERVICES
            </h3>

            <p>
              Our website may contain links to third-party websites or services.
              We are not responsible for the privacy practices of those third
              parties. We encourage users to review the privacy policies of any
              external websites they visit.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              7. CHILDREN'S PRIVACY
            </h3>

            <p>
              Our services are not directed to individuals under the age of 13
              (or the applicable age of digital consent in your region). We do
              not knowingly collect personal data from children. If you believe
              a child has provided us with personal information, please contact
              us, and we will take appropriate action to remove the data.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              8. CHANGES TO THIS PRIVACY POLICY
            </h3>

            <p>
              We may update this Privacy Policy periodically to reflect changes
              in our practices or legal requirements. Any modifications will be
              posted on this page with an updated "Last Updated" date. Your
              continued use of our services after updates signifies acceptance
              of the revised policy.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              10. CONTACT INFORMATION
            </h3>

            <p>
              For any questions, concerns, or requests regarding this Privacy
              Policy, please contact us at:
              <span className="font-semibold hover:underline text-perfectBlue cursor-pointer">
                trapeloi@gmail.com
              </span>
            </p>
          </div>
        </main>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default Privacy;
