import { Link } from "react-router-dom";

export default function LockerLabel({ lockerId, lockerName, lockerAddress }) {
 
    return (
        <div key={lockerId}>
            <Link 
                to={`${lockerId}`}
            >
                <h4>{lockerName}</h4>
            </Link>
            <p><em>{lockerAddress}</em></p>
        </div>
    );
}