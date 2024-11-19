import { Outlet } from "react-router-dom";
import Navigation from "../components/navigation";

export default function Root() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <main className="flex-1 p-4 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
}


// import { Outlet } from "react-router-dom";
// import Navigation from "../components/navigation";

// const Root = () => {
//   return (
//     <>
//       <div className="flex h-screen">
//         <Navigation />

//         <div className="w-3/4 p-6">
//           <Outlet />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Root;