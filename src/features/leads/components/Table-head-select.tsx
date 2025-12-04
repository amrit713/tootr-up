import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SelectTrigger } from "@radix-ui/react-select";

type Props = {
  columnIndex: number;
  selectedColumns: Record<string, string | null>;
  onChange: (columnIndex: number, value: string | null) => void;
  header: string;
};

const options = [
  "number",
  "studentName",
  "parentName",
  "email",
  "age",
  "gender",
  "schoolName",
  "address",
  "status",
  "source",
  "branchName",
  "due_date",
  "remark",
  "createdAt",
];

export const TableHeadSelect = ({
  columnIndex,
  selectedColumns,
  header,
  onChange,
}: Props) => {
  const currentSelection = selectedColumns[`column_${columnIndex}`];

  return (
    <Select
      value={header}
      onValueChange={(value) => onChange(columnIndex, value)}
    >
      <SelectTrigger
        className={cn(
          "focus:ring-offset-0 focus:ring-transparent outline-none boder-nonebg-transparent capitalize text-muted-foreground ",
          currentSelection && "text-blue-500"
        )}
      >
        <SelectValue placeholder="Skip" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="skip">Skip</SelectItem>
        {options.map((option, index) => {
          const disabled =
            Object.values(selectedColumns).includes(option) &&
            selectedColumns[`column_${columnIndex}`] !== option;
          return (
            <SelectItem
              key={index}
              value={option}
              disabled={disabled}
              className="capitalized"
            >
              {option}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};
