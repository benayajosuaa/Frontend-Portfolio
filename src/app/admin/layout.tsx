// // src/app/admin/layout.tsx
// import Link from "next/link";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div style={{ display: "flex", minHeight: "100vh" }}>
//       <aside
//         style={{
//           width: 200,
//           padding: 16,
//           borderRight: "1px solid #ddd",
//         }}
//       >
//         <h3>Admin Panel</h3>
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           <li><Link href="/admin">Dashboard</Link></li>
//           <li><Link href="/admin/journey">Journey</Link></li>
//           <li><Link href="/admin/work">Work</Link></li>
//           <li><Link href="/admin/contact">Contact</Link></li>
//         </ul>
//       </aside>

//       <main style={{ padding: 24, flex: 1 }}>
//         {children}
//       </main>
//     </div>
//   );
// }


import Link from "next/link";
import { Montserrat } from "next/font/google"


const montserratFont = Montserrat({
    subsets :["latin"],
    weight : "500",
})



export default function AdminLayout(){
  return (
    <div className="p-10">
        <div className="flex flex-row gap-4">
            <div className="w-32 h-32 bg-gray-200">1</div>
            <div className="w-32 h-32 bg-gray-300">2</div>
        </div>
    </div>
  );
}

