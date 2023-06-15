import Image from "next/image";
import logo from "../public/images/logo.png";
import {
  BsFacebook,
  BsTwitter,
  BsYoutube,
  BsLinkedin,
  BsGithub,
  BsInstagram,
} from "react-icons/bs";
import { AiOutlineCopyrightCircle } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="w-full py-10 bg-bgColor text-primaryColor/80 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 justify-center items-center md:justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a href="/">
            <Image src={logo} width={80} height={80} alt="logo" />
          </a>
          <p className="flex items-center text-sm font-titleFont gap-1">
            <AiOutlineCopyrightCircle className="mt-[1px]" />
            Techvellum | all rights reserved
          </p>
        </div>

        <div className="flex gap-6">
          <a href="https://www.youtube.com/@Perrypearl">
            <BsYoutube className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
          <a href="https://www.instagram.com/magret.joy_/?igshid=MmJiY2I4NDBkZg%3D%3D">
            <BsInstagram className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
          <a href="https://github.com/Magretjoy">
            <BsGithub className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
          <a href="https://www.linkedin.com/in/magret-joy-988411228/">
            <BsLinkedin className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
          <a href="https://twitter.com/magretjoy_?s=21&t=qgc1pKUFlXMcOz54GeGkiQ">
            <BsTwitter className="w-6 h-6 text-white/50 hover:text-white duration-300 cursor-pointer" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
