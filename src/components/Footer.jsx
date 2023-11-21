import { useLocation } from 'react-router-dom';
import {
  TwitterIcon,
  DiscordIcon,
  TelegramIcon,
  YoutubeIcon,
  TikTokIcon,
  RedditIcon,
  InstagramIcon,
} from "./Icons";

const Footer = () => {
  const location = useLocation();
  const isDefaultRoute = ["/", "/admin/productList", "/admin/userList", "/admin/categoryList", "/admin/orderList", "/admin/logs"].includes(location.pathname);

  const Links = {
    "Cookie Preferences": "/",
    "Privacy Policy": "/",
    "Terms of Use": "/",
  };

  const iconProps = {
    size: "28",
  };

  const Socials = {
    Twitter: {
      logo: <TwitterIcon {...iconProps} />,
      link: "/",
    },
    Discord: {
      logo: <DiscordIcon {...iconProps} />,
      link: "/",
    },
    Telegram: {
      logo: <TelegramIcon {...iconProps} />,
      link: "/",
    },
    Youtube: {
      logo: <YoutubeIcon {...iconProps} />,
      link: "/",
    },
    Tiktok: {
      logo: <TikTokIcon {...iconProps} />,
      link: "/",
    },
    Reddit: {
      logo: <RedditIcon {...iconProps} />,
      link: "/",
    },
    Instagram: {
      logo: <InstagramIcon {...iconProps} />,
      link: "/",
    },
  };

  return (
    <div className={`bg-black ${!isDefaultRoute ? 'mt-96' : ''}`}>
      <footer className="w-full h-auto md:h-16 flex flex-col md:flex-row items-center justify-between mt-4 md:mt-12 mb-4 md:mb-16 px-4 md:px-12">
        {/* div links */}
        <div className="flex flex-row justify-center items-center gap-2 md:gap-4 my-2 md:my-0">
          {/* {Object.keys(Links).map((key) => (
            <a
              href={Links[key]}
              key={key}
              className="text-[#bdbdc0] text-xs md:text-sm font-medium hover:text-white"
            >
              {key}
            </a>
          ))} */}
        </div>

        {/* div company name */}
        <div className="text-[#bdbdc0] flex flex-row justify-center items-center gap-2 md:gap-4 text-xs md:text-sm font-medium my-2 md:my-0">
          © 2023 All Rights Reserved
        </div>

        {/* div socials */}
        <div className="flex flex-row justify-center items-center gap-4 md:gap-6 my-2 md:my-0">
          {/* {Object.keys(Socials).map((key) => (
            <a
              href={Socials[key].link}
              key={key}
              className="text-[#bdbdc0] hover:text-white transition duration-200"
            >
              {Socials[key].logo}
            </a>
          ))} */}
        </div>
      </footer>
    </div>
  );
};

export default Footer;
