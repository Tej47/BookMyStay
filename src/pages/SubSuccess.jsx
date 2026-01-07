import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

function SubSuccess() {
    return (
        <div className="h-screen w-screen bg-white flex flex-col items-center justify-center bg-cover bg-center">
            <FontAwesomeIcon icon={faCircleCheck} size="5x" style={{ color: "#74C0FC" }} />
            <h1 className="text-5xl font-bold text-black mt-8">
                Subscribed successfully
            </h1>
        </div>
    );
}

export default SubSuccess;
