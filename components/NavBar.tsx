import NavItem from "@/components/NavItem";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


const NavBar = async () => {
    const client = createClient();
    
    const {
      data: { user },
    } = await client.auth.getUser();
  
    const signOut = async () => {
      "use server";
      const client = createClient();
      await client.auth.signOut();
      return redirect("/");
    };

    return (
        <>
        <nav className="px-9 py-2 bg-sky-200">
            <div className="flex justify-between item-center w-full overflow-x-auto px-5">
                <NavItem title="Home" to="/" dir=""/>
                <NavItem title="Lyric Game" to="/lyric_game" dir="lyric_game"/>
                <NavItem title="Booking" to="/booking" dir="booking"/>
                <NavItem title="Test" to="/test" dir="test"/>
                {user ? (
                <form action={signOut} className="flex flex-col cursor-pointer group w-15">
                <button className="px-2 border-2 rounded-lg border-gray-800 bg-gray-100 font-semibold opacity-60 group-hover:opacity-100 mb-1">Logout</button>
                </form>
                ) : (
                <NavItem title="Login" to="/auth/login" />
                )}
            </div>
        </nav>   
        </>
    )
}

export default NavBar;

/*

*/