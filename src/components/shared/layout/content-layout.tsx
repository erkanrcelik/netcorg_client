import {Navbar} from "@/components/shared/layout/navbar";

interface ContentLayoutProps {
  children: React.ReactNode;
}

export function ContentLayout({children}: ContentLayoutProps) {
  return (
    <div>
      <Navbar/>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
