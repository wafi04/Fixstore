import { cn } from "@/lib/utils";

const colorMap: { [key: string]: string } = {
  // Warna tunggal
  Black: "#000000",
  White: "#FFFFFF",

  // Warna campuran
  "Black/Cement Grey": "linear-gradient(45deg, #000000 50%, #8C8C8C 50%)",
  "White/White": "#FFFFFF", // Atau gradient putih
  "Sail/Light Orewood Brown/White/Black":
    "linear-gradient(45deg, #F5F5F5 25%, #D2B48C 25% 50%, #FFFFFF 50% 75%, #000000 75%)",
};
function getColorDisplay(colorString: string) {
  // Coba cocokkan dengan peta warna persis
  if (colorMap[colorString]) {
    return colorMap[colorString];
  }

  // Jika tidak cocok, gunakan warna pertama
  const colors = colorString.split("/");
  return colorMap[colors[0]] || "#CCCCCC";
}

// Dalam komponen
export const ColorDisplay = ({
  color,
  className,
}: {
  color: string;
  className: string;
}) => {
  const bgColor = getColorDisplay(color);

  return (
    <div
      className={cn(`w-6 h-6 rounded-full border`, className)}
      style={{
        background: bgColor,
        backgroundClip: bgColor.includes("gradient")
          ? "content-box"
          : "border-box",
        border: "2px solid transparent",
      }}
    />
  );
};
