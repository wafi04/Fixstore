import { Button } from "@/components/ui/button";
import { DialogProfile } from "@/features/components/dialog/profile/DialogProfile";
import { HeaderDashboard } from "@/layouts/header/HeaderDashboard";
import { ProfileData } from "./ProfileData";
import { AddressPage } from "./address";

export function DashboardProfile() {
  return (
    <>
      <HeaderDashboard title="" subTitle="" className="py-2">
        <DialogProfile>
          <Button>Added Profile</Button>
        </DialogProfile>
      </HeaderDashboard>
      <section className="grid grid-cols-5 gap-4">
        <ProfileData />
        <AddressPage />
      </section>
    </>
  );
}
