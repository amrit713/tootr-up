import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  headers: string[];
  body: string[][];
  selectedColumns: Record<string, string | null>;
  onTableHeadSelectedChange: (
    columnIndex: number,
    value: string | null
  ) => void;
};

export const ImportTable = ({
  headers,
  body,
  selectedColumns,
  onTableHeadSelectedChange,
}: Props) => {
  return (
    <div className="">
      <Table className="min-w-full ">
        <TableHeader>
          <TableRow
            className={
              "!border-x-1 !border-y-1  shadow-none bg-background py-1 rounded-lg flex items-center justify-between mb-2"
            }
          >
            {headers.map((item, index) => {
              return (
                <TableHead
                  key={index}
                  className=" font-semibold flex items-center justify-start"
                  style={{ width: `${200}px` }}
                >
                  {item}
                </TableHead>
              );
            })}
          </TableRow>
        </TableHeader>
        <TableBody className="space-y-2">
          {body.map((row: string[], index) => (
            <TableRow
              key={index}
              className="cursor-pointer !border-x-1 !border-y-1  shadow-none bg-background p-1 rounded-lg flex"
            >
              {row.map((cell, index) => (
                <TableCell
                  key={index}
                  className="  whitespace-normal break-words px-2 py-1"
                  style={{ width: `${200}px` }}
                >
                  {cell ? (
                    cell
                  ) : (
                    <p className="text-muted-foreground">not provider</p>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
