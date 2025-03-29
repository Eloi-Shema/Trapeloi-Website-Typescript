import { useEffect, useState } from "react";
import Loading from "../../utils/Loading/Loading";
import AltNavbar from "../../Components/Header/AltHeader";

const About = () => {
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
          <AltNavbar />

          <h1 className="head dark:text-white text-black xs:text-4xl md:text-5xl font-trap font-black text-center mt-10 mb-5">
            About Trapeloi
          </h1>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              Our Vision
            </h3>

            <p>
              At Trapeloi, we are dedicated to providing high-quality,
              industry-standard beats for artists, producers, and content
              creators worldwide. Our goal is to help musicians bring their
              creative visions to life with professionally crafted HipHop/Pop
              instrumentals.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              Who We Are
            </h3>

            <p>
              Founded by Eloi Shema, Trapeloi was built on a passion for music
              production and sound innovation. With years of experience in
              beat-making, sound design, and music licensing, we offer a
              carefully curated selection of beats designed for professional and
              independent artists alike.
            </p>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              What We Offer
            </h3>

            <ul className="list-disc pl-8 leading-8 mb-5">
              <li>
                <span className="font-bold font-montserrat">
                  Exclusive & Non-Exclusive Beats -
                </span>{" "}
                Whether you're looking for a unique sound or an affordable (even
                free) license, we have flexible options.
              </li>
              <li>
                <span className="font-bold font-montserrat">
                  High-Quality Sound -
                </span>{" "}
                Every beat is professionally mixed and mastered to industry
                standards.
              </li>
              <li>
                <span className="font-bold font-montserrat">
                  Custom Production -
                </span>{" "}
                Need a tailored instrumental? We offer custom beat production to
                fit your creative needs.
              </li>
              <li>
                <span className="font-bold font-montserrat">
                  Seamless Licensing & Secure Payments -
                </span>{" "}
                Our straightforward licensing system ensures a smooth experience
                with instant downloads.
              </li>
            </ul>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              Why Choose Us?
            </h3>

            <ul className="list-disc pl-8 leading-8 mb-5">
              <li>
                <span className="font-bold font-montserrat">
                  Industry-Standard Quality -
                </span>{" "}
                Crafted using cutting-edge production techniques.
              </li>
              <li>
                <span className="font-bold font-montserrat">
                  Easy & Secure Transactions -
                </span>{" "}
                Instant delivery and secure payment options.
              </li>
              <li>
                <span className="font-bold font-montserrat">
                  Artist-Centered Approach -
                </span>{" "}
                We prioritize customer satisfaction and provide full support for
                licensing and beat selection.
              </li>
              <li>
                <span className="font-bold font-montserrat">
                  Seamless Licensing & Secure Payments -
                </span>{" "}
                Our straightforward licensing system ensures a smooth experience
                with instant downloads.
              </li>
            </ul>
          </div>

          <div>
            <h3 className=" xs:text-xl md:text-2xl mb-5 font-bold font-montserrat">
              Join Our Community
            </h3>

            <p className="mb-5">
              We believe that music is more than just sound, it's a movement.
              Whether you're an independent artist, a label, or a content
              creator, we invite you to explore our beat catalog and bring your
              next project to hits.
            </p>

            <p>
              <a
                href="https://youtube.com/@montbitz?si=alkpyf7prIwloq9A"
                className="hover:underline cursor-pointer"
              >
                Visit us on our YouTube channel
              </a>
            </p>

            <p>
              <a className="hover:underline cursor-pointer">
                Visit us on our Instagram page
              </a>
            </p>

            <p className="mt-2">
              For direct inquiries, custom requests, or collaborations, feel
              free to contact us at:&nbsp;
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

export default About;
