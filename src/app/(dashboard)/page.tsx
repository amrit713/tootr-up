import { ButtonLoader } from "@/components/global/button-loader";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <Button>
        <ButtonLoader label="Click" loadingText="Clicking" isLoading={true} />
      </Button>
    </div>
  );
}
