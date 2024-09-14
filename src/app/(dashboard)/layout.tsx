import AdminPanelLayout from "@/components/shared/layout/admin-panel-layout";
import {ContentLayout} from "@/components/shared/layout/content-layout";

export default function DashboardLayout({
                                     children
                                   }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminPanelLayout>
        <ContentLayout>
          {children}
        </ContentLayout>
      </AdminPanelLayout>
    </>
  );
}
