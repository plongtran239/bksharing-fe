"use client";

import {
  BriefcaseBusinessIcon,
  CodeXmlIcon,
  CogIcon,
  ComponentIcon,
  CreditCardIcon,
  Grid2X2Icon,
  HardDriveIcon,
  HeadsetIcon,
  LandmarkIcon,
  MusicIcon,
  PersonStandingIcon,
  PresentationIcon,
} from "lucide-react";
import Slider, { Settings } from "react-slick";

import { CategoryType } from "@/schemas";

const settings: Settings = {
  dots: true,
  arrows: false,
  centerMode: true,
  infinite: true,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: true,
  pauseOnHover: true,
};

const ICONS = {
  development: <CodeXmlIcon size={24} />,
  business: <BriefcaseBusinessIcon size={24} />,
  finance: <CreditCardIcon size={24} />,
  accounting: <LandmarkIcon size={24} />,
  productivity: <CogIcon size={24} />,
  personal: <PersonStandingIcon size={24} />,
  design: <ComponentIcon size={24} />,
  marketing: <HeadsetIcon size={24} />,
  music: <MusicIcon size={24} />,
  it: <HardDriveIcon size={24} />,
  office: <PresentationIcon size={24} />,
};

const CategoryList = ({ categories }: { categories: CategoryType[] }) => {
  return (
    <Slider {...settings}>
      {categories.map((category) => (
        <div
          key={category.name}
          className="rounded-lg border border-primary p-4 shadow"
        >
          <div className="flex-center text-primary">
            {ICONS[category.slug as keyof typeof ICONS] || (
              <Grid2X2Icon size={24} />
            )}
          </div>
          <p className="mt-2 text-center text-xs">{category.name}</p>
        </div>
      ))}
    </Slider>
  );
};
export default CategoryList;
