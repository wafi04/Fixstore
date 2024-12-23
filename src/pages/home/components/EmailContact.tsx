"use client";
import { ButtonHighlight } from "@/components/ui/button/ButtonHighlight";
import { MoveRight } from "lucide-react";

const EmailContact = () => {
  return (
    <div className="bg-black text-white w-full py-8 my-10">
      <div className="container flex md:flex-row flex-col md:space-y-0  space-y-8 justify-between items-center w-full">
        <h3 className="font-bebas text-center md:text-start text-[6vw] md:text-[4vw] leading-none max-w-xl">
          Daftarkan Email anda untuk mendapatkan info dan penawaran spesial
        </h3>
        <div>
          <ButtonHighlight className="font-bebas text-xl">
            <p>Sign up For Free</p>
            <MoveRight />
          </ButtonHighlight>
        </div>
      </div>
    </div>
  );
};

export default EmailContact;
