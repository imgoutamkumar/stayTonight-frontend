import {Link} from "react-router-dom"
import { useAppContext } from "../contexts/AppContext"
import { SignOutButton } from "./SignOutButton"
import { Button } from "@mui/material"
const Header =()=>{
    const {isLoggedIn}=useAppContext()
    return(
        <div className="bg-black py-6 px-2">
            <div className="container mx-auto flex justify-between">
                <span className="text-3xl text-white font-bold tracking-tight">
                  <Link to="/">StayTonight</Link>
                 
                </span>
                <span className="flex space-x-2">
                    {isLoggedIn?<>
                    <Link className="text-white flex items-center px-3 font-bold" to="/my-bookings">My Bookings</Link>
                    <Link className="text-white flex items-center px-3 font-bold" to="/myHotels">My Hotels</Link>
                   <SignOutButton></SignOutButton>
                    </>:
                    <Link to="/signIn" className="flex items-center">
                    <Button variant="outlined">Sign In </Button>
                    </Link>
                    }
                    
                </span>
            </div>
        </div>
    )
}

export default Header