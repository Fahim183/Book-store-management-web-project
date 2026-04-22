import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import { getUser } from '../utils/auth';

const PrivateRoute = ({ children }) => {
    const userEmail = getUser()
    const location = useLocation()

    if (!userEmail) {
        return <Navigate to="/login" state={{ from: location }} />
    }


    return children;
};

PrivateRoute.propTypes = {
    children: PropTypes.node
};

export default PrivateRoute;