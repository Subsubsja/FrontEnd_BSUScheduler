import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type ModalType = "update" | "delete" | null;

interface ModalProps {
  title: string;
  action: ModalType;
  content: React.ReactNode;
  callback: () => void;
  closeModal: () => void;
  isOpen: boolean;
}

function CustomModal({
  closeModal,
  title,
  action,
  content,
  callback,
  isOpen,
}: ModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={closeModal}>
      {action && (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title} </DialogTitle>
          </DialogHeader>
          <DialogDescription className="flex flex-col gap-2">
            {content}
          </DialogDescription>

          <DialogFooter>
            <DialogClose asChild>
              <Button className="w-1/2" variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="w-1/2 capitalize"
              onClick={callback}
              variant={action === "delete" ? "destructive" : "default"}
            >
              {action}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
}

export default CustomModal;
