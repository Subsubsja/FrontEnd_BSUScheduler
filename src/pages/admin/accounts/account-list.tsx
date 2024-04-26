import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteAccount, getAccounts } from "@/services/api/admin";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { queryClient } from "@/App";
import { ScrollArea } from "@/components/ui/scroll-area";
function AccountList() {
  const { toast } = useToast();

  const { data } = useQuery({
    queryKey: ["account-list"],
    queryFn: getAccounts,
  });

  const mutation = useMutation({
    mutationFn: deleteAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["account-list"] });
      toast({
        variant: "success",
        description: "Account successfully deleted.",
      });
    },
  });

  return (
    <ScrollArea className="h-full w-full">
      <h1 className="text-lg font-bold">Account List</h1>
      <hr />

      <div className="flex-1">
        {data &&
          data.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between rounded p-2 hover:bg-slate-200"
            >
              <p className="text-lg">{account.username}</p>

              <Button
                variant={"destructive"}
                onClick={() => mutation.mutate(account.id)}
              >
                <Trash />
              </Button>
            </div>
          ))}
      </div>
    </ScrollArea>
  );
}

export default AccountList;
