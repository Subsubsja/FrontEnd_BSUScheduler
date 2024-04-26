import { Button } from "@/components/ui/button";

function ButtonPrint() {
  return (
    <Button variant={"secondary"} onClick={() => print()} className="w-24">
      Print
    </Button>
  );
}

export default ButtonPrint;
