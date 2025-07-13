export default function NavButton({ children, onClick }) {

    return (
        <button 
            className="button"
            onClick={onClick}
        >
            {children}
        </button>
    );
}