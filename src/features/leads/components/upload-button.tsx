import { Button } from "@/components/ui/button";
import { UploadIcon, Variable } from "lucide-react";
import { useCSVReader } from "react-papaparse";

type Props = {
  onUpload: (result: any) => void;
};

export const UploadButton = ({ onUpload }: Props) => {
  const { CSVReader } = useCSVReader();
  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button className="shadow-none" {...getRootProps()} variant={"outline"}>
          <UploadIcon className="size-4 mr-2" />
          Upload
        </Button>
      )}
    </CSVReader>
  );
};
