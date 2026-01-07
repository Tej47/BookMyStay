import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function BookingSuccess() {
    return (
        <div className="h-screen w-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center text-center px-4 md:px-10">
            {/* Icon */}
            <FontAwesomeIcon 
                icon={faCircleCheck} 
                size="6x" 
                className="text-green-500 animate-bounce"
            />
            
        
            <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mt-6">
                Booking Confirmed!
            </h1>


            <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-xl">
                Thank you for your booking. A confirmation email with all the details has been sent to your inbox.
            </p>
            <p className="text-md text-gray-500 mt-2 max-w-xl mx-auto">
                Please check your spam folder if you don’t see it within a few minutes.
            </p>
        </div>
    );
}

export default BookingSuccess;
