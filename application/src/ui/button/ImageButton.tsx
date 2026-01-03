import "./Button.css"

type ImageButtonProps = {
    src: string;
    alt: string;
    onClick: () => void;
};

export default function ImageButton({ src, alt, onClick }: ImageButtonProps) {
    return (
        <button onClick={onClick}>
            <img src={src} alt={alt} />
        </button>
    );
}
