"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Trash2, Loader2 } from "lucide-react";
import { deleteMyAccount } from "@/services/user/user.service";
import { useRouter } from "next/navigation";

const DeleteAccount = () => {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    startTransition(async () => {
      const res = await deleteMyAccount();

      if (res?.success) {
        setOpen(false);
        router.push("/sign-in");
      }
    });
  };

  return (
    <div className="rounded-lg border border-destructive/40 bg-card p-5 flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-foreground flex items-center gap-2">
          <Trash2 className="h-4 w-4 text-destructive" />
          Delete Account
        </p>
        <p className="text-xs text-muted-foreground">
          Permanently remove your account and all data
        </p>
      </div>

      <AlertDialog  open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button className="cursor-pointer" variant="destructive">Delete</Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. Your account will be permanently deleted.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel className="cursor-pointer" disabled={isPending}>
              Cancel
            </AlertDialogCancel>

            <Button
              className="cursor-pointer"
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteAccount;
