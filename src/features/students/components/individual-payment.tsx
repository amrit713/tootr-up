import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn, currencyFormatter } from "@/lib/utils";
import { PaymentType } from "@/types";
import { BadgeDollarSign } from "lucide-react";
import { PaymentTable } from "./payment-table";
import { paymentColumns } from "./payment-column";
import { useModal } from "@/hooks/use-modal-store";
import { UpdatePaymentModal } from "@/features/payments/components/update-payment-modal";

export const IndividualPayment = ({
  payments,
}: {
  payments: PaymentType[];
}) => {
  const latestPayment = payments[0];

  const { onOpen } = useModal();

  const onUpdateHandler = () => {
    onOpen("updatePayment");
  };

  const onCreateHandler = () => {
    onOpen("createPayment");
  };
  return (
    <div className="py-4">
      {latestPayment.dueAmount > 0 && (
        <UpdatePaymentModal
          dueAmount={latestPayment.dueAmount}
          id={latestPayment.id}
        />
      )}
      <Card className="shadow-none border-none w-full  ">
        <CardHeader className="px-0 flex justify-between items-center">
          <CardTitle className="font-space text-lg">
            {" "}
            Latest Payment Summary
          </CardTitle>
          {latestPayment.dueAmount > 0 ? (
            <Button onClick={onUpdateHandler}>
              <BadgeDollarSign />
              {latestPayment.dueAmount > 0 &&
                `Pay (${currencyFormatter(latestPayment.dueAmount)})`}
            </Button>
          ) : (
            <Button onClick={onCreateHandler}>
              <BadgeDollarSign />
              Pay
            </Button>
          )}
        </CardHeader>

        <div className="flex flex-col md:flex-row gap-6">
          <div className=" font-space flex flex-col w-full">
            <div className="flex justify-between font-bold items-center ">
              <p className="  ">Total Fee:</p>
              <p className="">{currencyFormatter(latestPayment.totalFee)}</p>
            </div>
            <div className="flex justify-between items-center ">
              <p className="">
                Discount Price(
                {(latestPayment.discountPrice * 100) / latestPayment.totalFee}
                %):
              </p>
              <p
                className={cn(
                  latestPayment.dueAmount > 0 && "text-emerald-600"
                )}
              >
                -{currencyFormatter(latestPayment.discountPrice)}
              </p>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center  font-bold  ">
              <p className="font-lg">Total Fee After Discount:</p>
              <p>{currencyFormatter(latestPayment.totalFeeAfterDiscount)}</p>
            </div>

            <div className="flex justify-between items-center  ">
              <p className="font-lg">Taxable Amount:</p>
              <p>{currencyFormatter(latestPayment.taxableAmount)}</p>
            </div>

            <div className="flex justify-between items-center  ">
              <p className="">VAT(13%):</p>
              <p className="text-rose-500">
                +{currencyFormatter(latestPayment.vatAmount)}
              </p>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center  font-bold  ">
              <p className="">Total Amount:</p>
              <p>
                {currencyFormatter(
                  latestPayment.taxableAmount + latestPayment.vatAmount
                )}
              </p>
            </div>

            <div className="flex justify-between items-center  ">
              <p className="">
                Paid Cash (
                {(
                  (latestPayment.paidAmount * 100) /
                  latestPayment.totalFeeAfterDiscount
                ).toFixed(2)}
                % ):
              </p>
              <p
                className={cn(
                  latestPayment.paidAmount > 0 && "text-emerald-600"
                )}
              >
                {" "}
                -{currencyFormatter(latestPayment.paidAmount)}
              </p>
            </div>

            <Separator className="my-2" />

            <div className="flex justify-between items-center font-bold   ">
              <p className="">
                Remaining Cash(
                {(
                  (latestPayment.dueAmount * 100) /
                  latestPayment.totalFeeAfterDiscount
                ).toFixed(2)}
                % ):
              </p>
              <p className="">{currencyFormatter(latestPayment.dueAmount)}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-4">
            <p className="font-space text-lg   font-bold ">Payment History</p>

            <PaymentTable
              total={payments.length}
              columns={paymentColumns}
              data={payments}
            />
          </div>
        </div>
      </Card>
    </div>
  );
};
