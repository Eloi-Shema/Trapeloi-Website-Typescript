import { Link } from "react-router-dom";
import AltHeader from "../../Components/Header/AltHeader";
import { useEffect, useState } from "react";
import Loading from "../../utils/Loading/Loading";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useAudioPlayer } from "../../contexts/PlayerContext/PlayerContext";

const Terms = () => {
  const { isPlaying, currentBeat } = useAudioPlayer();

  useDocumentTitle(
    `${
      isPlaying
        ? "Now Playing • " + currentBeat?.title
        : "Licence terms • Trapeloi"
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
        <main className="mx-auto max-w-[1536px] h-screen dark:text-white text-black xs:text-base md:text-lg dark:bg-black bg-platinum ">
          <AltHeader />
          <div className="flex flex-col gap-5 xs:pb-10 md:pb-16 xs:px-8 md:px-20">
            <h1 className="my-5 font-black text-center text-black head dark:text-white xs:text-4xl md:text-5xl font-trap">
              Trapeloi's Terms and Conditions
            </h1>

            <div>
              <p className="mb-5">
                Welcome, and thank you for your interest in our services. These
                Terms of Service are a legally binding contract between you and
                Trapeloi regarding your use of the Service.
              </p>

              <h4 className="mb-5 font-extrabold text-center ">
                PLEASE READ THE FOLLOWING TERMS CAREFULLY:
              </h4>
              <p className="mb-5">
                <span className="font-semibold">
                  BY DOWNLOADING, OR OTHERWISE ACCESSING OR USING THE SERVICE,
                  YOU AGREE THAT YOU HAVE READ AND UNDERSTOOD, AND, AS A
                  CONDITION TO YOUR USE OF THE SERVICE
                </span>
                , YOU AGREE TO BE BOUND BY, THE FOLLOWING TERMS AND CONDITIONS,
                INCLUDING TRAPELOI&apos;S &nbsp;
                <Link
                  to={"/privacy"}
                  className="font-montserrat hover:underline text-perfectBlue"
                >
                  PRIVACY POLICY
                </Link>
                &nbsp; (TOGETHER, THESE “TERMS”). If you are not eligible, or do
                not agree to the Terms, then you do not have our permission to
                use the Service. YOUR USE OF THE SERVICE, AND TRAPELOI&apos;S
                PROVISION OF THE SERVICE TO YOU, CONSTITUTES AN AGREEMENT BY
                TRAPELOI AND BY YOU TO BE BOUND BY THESE TERMS.
              </p>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                1. LICENSE AGREEMENT
              </h3>
              <p className="mb-5 ">
                When you purchase a beat from Trapeloi, you are not purchasing
                ownership of the beat but a license to use it under specific
                terms. The following license types are offered:
              </p>

              <h4 className="mb-2 text-xl font-bold">
                1.1. Non-Exclusive (Free) License
              </h4>
              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  Allows use for commercial and non-commercial projects (e.g.,
                  streaming, performances, social media).
                </li>
                <li>
                  Included files: MP3, WAV, and STEM Tracks in MP3 format only.
                </li>
                <li>
                  Licensee may use the beat for commercial purposes, including
                  monetized streaming and promotional content.
                </li>
                <li>
                  Producer retains full ownership, and the beat will be used by
                  other artists.
                </li>
                <li>
                  Modifications to the beat structure or composition are not
                  allowed.
                </li>
                <li>Credit must be given as: "Produced by Trapeloi."</li>
                <li>Cannot be resold, remixed, or sublicensed.</li>
              </ul>

              <h4 className="mb-2 text-xl font-bold">
                1.2. Exclusive (Paid) License
              </h4>
              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  Grants full rights to use the beat commercially without
                  limits.
                </li>
                <li>
                  Included files: MP3, WAV, and full STEM tracks in WAV format.
                </li>
                <li>
                  The beat is removed from our store after purchase, preventing
                  others from buying it.
                </li>
                <li>Allows modifications and unlimited distribution.</li>
                <li>
                  Producer retains authorship, however credits are not a
                  requirement.
                </li>
                <li>
                  Cannot be resold, remixed, or sublicensed to third parties.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                2. PAYMENT AND PRICING
              </h3>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  All prices are listed in US dollars and may change without
                  notice.
                </li>
                <li>Payments are processed through PayPal, and bank cards.</li>
                <li>
                  For the Exclusive License, full payment must be made before
                  rights are granted.
                </li>
                <li>Taxes may be applied depending on your location.</li>
                <li>
                  We reserve the right to refuse or cancel any order for
                  suspected fraud or misuse.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                3. REFUNDS AND EXCHANGES
              </h3>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  All sales are final. Due to the digital nature of our
                  products, we do not offer refunds or exchanges.
                </li>
                <li>
                  If you experience a technical issue (e.g., file corruption),
                  contact "trapeloi@gmail.com" within 3 days for assistance.
                </li>
                <li>
                  Chargebacks or unauthorized payment disputes will result in
                  account suspension.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                4. USAGE RESTRICTIONS
              </h3>

              <h4 className="mb-2 text-xl font-bold">
                4.1. Prohibited Actions
              </h4>
              <p>Users may not:</p>
              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  Resell, sublicense, or redistribute the beat as standalone
                  file to third parties.
                </li>
                <li>Claim production credit unless agreed upon in writing.</li>
                <li>
                  Upload beats as-is to YouTube Content ID, Spotify, or similar
                  platforms without an appropriate license.
                </li>
                <li>
                  Use beats in projects promoting hate speech, violence, or
                  illegal activity.
                </li>
              </ul>

              <h4 className="mb-2 text-xl font-bold">
                4.2 Permitted Actions (With the Correct License)
              </h4>
              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  Use beats in songs, performances, videos, advertisements, and
                  other creative works.
                </li>
                <li>
                  Monetize content on streaming platforms (subject to license
                  terms).
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                5. COPYRIGHT AND OWNERSHIP
              </h3>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  All beats remain the intellectual property of Trapeloi, unless
                  ownership is explicitly transferred under an Exclusive
                  License.
                </li>
                <li>
                  Unauthorized use may result in copyright claims, takedowns, or
                  legal action.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                6. CREDITING THE PRODUCER
              </h3>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  If required by the license, credit must be given as: "Produced
                  by Trapeloi" in song descriptions, album credits, or video
                  captions.
                </li>
                <li>
                  Failure to provide credit may lead to a license violation and
                  possible legal action.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                7. TERMINATION OF LICENSE
              </h3>
              <p>A license will be automatically terminated if:</p>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>The user violates the terms of their license.</li>
                <li> A payment is reversed or disputed. </li>
                <li>
                  {" "}
                  The beat is used in prohibited ways, such as reselling or
                  unauthorized commercial use.
                </li>
              </ul>
              <p>
                {" "}
                Upon termination, the user must immediately stop using the beat
                and remove it from all platforms.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                8. LIMITATION OF LIABILITY
              </h3>
              <p>We are not responsible for:</p>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>Any profits or losses from using our beats.</li>
                <li> Copyright claims due to improper crediting or misuse.</li>
                <li>
                  Technical issues, platform removals, or third-party disputes.
                </li>
                <li>
                  Claims, damages, or liabilities arising from the Licensee's
                  use of the beat.
                </li>
              </ul>
              <p>All beats are provided "as is," without warranties.</p>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                9. MODIFICATIONS TO TERMS
              </h3>

              <ul className="pl-8 mb-5 leading-8 list-disc">
                <li>
                  We reserve the right to update these Terms and Conditions at
                  any time.
                </li>
                <li>
                  Continued use of our beats after updates constitutes
                  acceptance of the latest version.
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-5 font-extrabold xs:text-xl md:text-2xl">
                10. CONTACT INFORMATION
              </h3>

              <p>
                For any questions or concerns, contact us at:{" "}
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

export default Terms;
