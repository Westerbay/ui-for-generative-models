import "./Button.css"

type ButtonProps = {
    label: string;
    onClick: () => void;
    className?: string
};

export default function Button({ label, onClick, className }: ButtonProps) {
    return (
        <button onClick={onClick} className={className}>{label}</button>
    );
}
