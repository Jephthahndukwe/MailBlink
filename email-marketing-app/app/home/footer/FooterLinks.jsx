<<<<<<< HEAD
import { footerLinks } from "@/constants";
import Link from "next/link";
=======
import Link from "next/link";
import { footerLinks } from "./data/index";
>>>>>>> 03691fac21fe7c9d1cbc741974d76de17d85be51

const FooterLink = () => {
  return (
    <div className="grid grid-cols-3">
      {footerLinks.map((item) => (
        <div className="col-span-1" key={item.id}>
          <h3 className="text-primaryBlack2 text-base md:text-lg font-semibold font-Roboto mb-6">
            {item.title}
          </h3>
          {item.links.map(({ id, href, link }) => (
            <div className="py-2" key={id}>
              <Link
                href={href}
                className="text-primaryBlack font-medium text-xs md:text-sm hover:text-navyBlue"
              >
                {link}
              </Link>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FooterLink;
