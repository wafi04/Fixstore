import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "../button";

export function ButtonNext({ handleNext }: { handleNext: () => void }) {
  return (
    <Button
      type="button"
      onClick={handleNext}
      aria-label="Proceed to SEO information"
    >
      Next
      <ArrowRight className="w-4 h-4 ml-2" />
    </Button>
  );
}

export function ButtonBack({ handleBack }: { handleBack: () => void }) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleBack}
      aria-label="Go back to basic information"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      Back
    </Button>
  );
}
