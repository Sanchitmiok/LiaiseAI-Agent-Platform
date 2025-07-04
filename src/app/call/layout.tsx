
import React from "react";
interface Props {
  children: React.ReactNode;
}
function Layout({ children }: Props) {
  return (
      <main className="h-screen bg-black" >
        {children}
      </main>
  );
}

export default Layout;
