import { Button } from "@/components/ui/button";
import { HeaderMainPage } from "@/components/ui/Header/HeaderMainPage";
import Image from "next/image";

const BannersBottom = () => {
  return (
    <section className="px-10  py-10">
      <HeaderMainPage title="Don't Miss" />
      <Image
        src={
          "https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/h_1712,c_limit/d2b21dbe-76f8-49b2-b20c-181448b1aa69/nike-just-do-it.jpg"
        }
        alt="/"
        width={1000}
        height={1000}
        className="w-full h-[100vh] mb-5 object-cover"
      />
      <div className="flex  justify-center items-center   w-full">
        <div className="flex flex-col space-y-8 justify-center items-center  max-w-4xl ">
          <p className="text-[20px]  font-semibold ">lorem Ipsum</p>
          <h3 className="font-bebas text-[70px] leading-none font-bold">
            Lorem Ipsum Collaboration
          </h3>
          <p className="text-xl">
            Lorem ipsum lorem ipsum lorem ipsum lorem ipsum
          </p>
          <Button className="rounded-full">Shop</Button>
        </div>
      </div>
    </section>
  );
};

export default BannersBottom;
