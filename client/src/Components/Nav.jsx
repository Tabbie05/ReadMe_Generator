import { FaMoon } from "react-icons/fa";
import { MdOutlineFileDownload } from "react-icons/md";

function Nav () {
    return(
        <Nav className="h-20 w-full">
            <div className="bg-black ">
                <div>#</div>
                <div>
                    <div><FaMoon /></div>
                    <div><button><MdOutlineFileDownload />Download</button></div>
                </div>
            </div>
        </Nav>
    )
}
export default Nav;
