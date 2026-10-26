import {Link,Outlet} from "react-router-dom"
function Layout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <aside className="h-screen w-64 shrink-0">
        <Sidebar />
      </aside>

      <main className="h-screen min-w-0 flex-1 overflow-y-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}