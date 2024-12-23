import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "../button";
interface ButtonLoadingProps extends ButtonProps {
  isLoading: boolean;
  textLoading: string;
  textNotLoading: string;
}

export function ButtonLoading({
  isLoading,
  textLoading,
  textNotLoading,
  onClick,
}: ButtonLoadingProps) {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={isLoading}
      aria-label={isLoading ? textLoading : textNotLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          {textLoading}
        </>
      ) : (
        textNotLoading
      )}
    </Button>
  );
}
