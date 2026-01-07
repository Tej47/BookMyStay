import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function ProtectedRoute({ children }) {
    const navigate = useNavigate();
    const [token] = useState(localStorage.getItem("token") || '');
    // if(!token || token==''){
    //     navigate("/signin");
    // }
    // return children;
    useEffect(() => {
        if (!token || token == '') {
            navigate("/adminsignin");
        }
    }, [token, navigate]);
    return token ? children : null;
}

export default ProtectedRoute;