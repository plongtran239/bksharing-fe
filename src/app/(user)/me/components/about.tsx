"use client";

import { PencilIcon } from "lucide-react";
import { useState } from "react";

import Modal from "@/app/(user)/me/components/modal";

const About = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  return (
    <div className="mt-5">
      <div className="flex-between">
        <h2 className="text-2xl font-semibold text-primary">About</h2>
        <button onClick={handleOpenModal} className="hover:text-primary">
          <PencilIcon size={20} />
        </button>
      </div>
      <p className="mt-5">Hello, i am Long Tran, i am a developer</p>

      <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
export default About;
