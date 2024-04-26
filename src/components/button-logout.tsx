import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { logoutAccount } from "@/services/auth";
import { removeCookie } from "@/lib/cookie";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

function ButtonLogout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutAccount();
    removeCookie("token");
    removeCookie("permission");
    navigate("/login", { replace: true });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"destructive"} className="w-24 rounded-xl">
          Logout
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogDescription>Are you sure you want to logout?</DialogDescription>

        <DialogFooter className="flex">
          <DialogClose asChild>
            <Button variant={"outline"} className="w-1/2">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant={"destructive"}
            className={"w-1/2"}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ButtonLogout;
