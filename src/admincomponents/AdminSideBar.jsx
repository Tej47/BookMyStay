
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EditHotel from './EditHotel';


function AdminSideBar() {
     const navigate = useNavigate();
        const handleClick = () => {
    
            navigate('/addnewhotel');
    
        };
        const handleLogout = () => {
            localStorage.removeItem("token");
            toast.success("Logged out.");
            setTimeout(() => {
                navigate('/adminsignin');
            }, 2000);
        }
        const navigatebookings = ()=>{
            navigate('/bookings');
        }
        const navigateedit = () =>{
            navigate('/edithotel');
        }
        const navigatedelete = () =>{
            navigate('/deletehotel')
        }
        // const navigatedashboard =() =>{
        //     navigate("/adminpage")
        // }
    return (
        <div class="bg-white h-screen w-80 border-r border-gray-300 ">
            <h2 className="text-2xl font-bold p-5 border-b border-gray-300">Hospitable</h2>
            <ul class="px-10 pt-4 space-y-2 text-gray-700 font-medium">
                <li class="hover:bg-blue-100 hover:pl-6 rounded px-2 py-2 cursor-pointer transition-all duration-200" onClick={()=>navigate("/adminpage")}>Dashboard</li>
                <li class="hover:bg-blue-100 hover:pl-6 rounded px-2 py-2 cursor-pointer transition-all duration-200"><button onClick={handleClick}>Add Hotel</button></li>
                <li class="hover:bg-blue-100 hover:pl-6 rounded px-2 py-2 cursor-pointer transition-all duration-200"><button onClick={navigateedit}>Edit Hotel</button></li>
                <li class="hover:bg-blue-100 hover:pl-6 rounded px-2 py-2 cursor-pointer transition-all duration-200"><button onClick={navigatebookings}>Bookings</button></li>
                <li class="hover:bg-blue-100 hover:pl-6 rounded px-2 py-2 cursor-pointer transition-all duration-200"><button onClick={navigatedelete}>Delete Hotel</button></li>
            </ul>
            <div className='bg-white mt-74 h-30 w-70 '>
                <ul className='px-10 pt-4 space-y-2 text-gray-700 font-medium'>
                    <li class="hover:bg-blue-100 rounded px-5 py-2 cursor-pointer">Settings</li>
                    <li class="hover:bg-blue-100  rounded px-5 py-2 cursor-pointer"><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>
            <ToastContainer toastClassName="text-sm font-semibold text-black" position="top-right" autoClose={3000} />
        </div>
    )
}
export default AdminSideBar;
