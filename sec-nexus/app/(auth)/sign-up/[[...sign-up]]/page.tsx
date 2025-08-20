import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (

    // added the same desgin as from layout.tsx to overwrite because something isn't working
    <div className="flex items-center justify-center min-h-screen bg-[#cde6f8] bg-dotted-pattern bg-cover bg-fixed bg-center">
    <SignUp />
    </div>
  );
}