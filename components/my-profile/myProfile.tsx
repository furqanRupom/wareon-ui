"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/ui/avatar";

import { updateMyProfile } from "@/services/auth/auth.service";
import { UserInfo } from "@/types/user.interface";

import { Loader2, Save, Camera } from "lucide-react";

interface Props {
  userInfo: UserInfo;
}

export default function MyProfile({ userInfo }: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await updateMyProfile(formData);

      if (res.success) {
        setSuccess(res.message);
        router.refresh();
      } else {
        setError(res.message);
      }
    });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">

      <Card>
        <CardContent className="flex flex-col md:flex-row items-center gap-6 p-6">
          
          <div className="relative">
            <Avatar className="w-28 h-28 border-4 border-primary/20">
              <AvatarImage src={userInfo.avatar} />
              <AvatarFallback className="text-2xl">
                {userInfo.name?.charAt(0)?.toUpperCase()}
              </AvatarFallback>
            </Avatar>

            <label className="absolute bottom-0 right-0 cursor-pointer">
              <input
                type="text"
                name="avatar"
                className="hidden"
              />
              <div className="bg-primary text-white p-2 rounded-full hover:scale-105 transition">
                <Camera className="w-4 h-4" />
              </div>
            </label>
          </div>

          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold">
              {userInfo.name}
            </h2>
            <p className="text-muted-foreground">
              {userInfo.email}
            </p>

            <span className="inline-block mt-2 text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
              {userInfo.role?.toUpperCase()}
            </span>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* Alerts */}
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            {success && (
              <p className="text-green-600 text-sm">{success}</p>
            )}

            {/* Basic Info */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Name</Label>
                <Input
                  name="name"
                  defaultValue={userInfo.name}
                  disabled={isPending}
                />
              </div>

              <div>
                <Label>Email</Label>
                <Input
                  value={userInfo.email}
                  disabled
                />
              </div>

              <div>
                <Label>Phone</Label>
                <Input
                  name="phone"
                  defaultValue={userInfo.phone}
                />
              </div>

            </div>

            {/* Address */}
            <div className="space-y-4">
              <h3 className="font-semibold">Address</h3>

              <Input
                name="addressLine"
                placeholder="Address Line"
                defaultValue={userInfo.addressLine}
              />

              <div className="grid md:grid-cols-3 gap-4">
                <Input
                  name="city"
                  placeholder="City"
                  defaultValue={userInfo.city}
                />
                <Input
                  name="state"
                  placeholder="State"
                  defaultValue={userInfo.state}
                />
                <Input
                  name="postalCode"
                  placeholder="Postal Code"
                  defaultValue={userInfo.postalCode}
                />
              </div>

              <Input
                name="country"
                placeholder="Country"
                defaultValue={userInfo.country}
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end ">
              <Button className="cursor-pointer" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 w-4 h-4" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>

          </CardContent>
        </Card>
      </form>
    </div>
  );
}
