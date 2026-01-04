import { useState, useEffect } from "react";
import { LDMClient } from "../../api/LDMClient";
import "./ImageLayer.css"


type ImageLayerProps = {
    client: LDMClient;
};

export default function ImageLayer({ client }: ImageLayerProps) {

    const [images, setImages] = useState<string[]>(["./template.png"]);
    
        useEffect(() => {
            const interval = setInterval(() => {
                const urls = client.getUrls();
                if (urls.length != 0) setImages(urls);
            }, 100);
    
            return () => clearInterval(interval);
        }, [client]);

    return (
        <aside className="image-layer">
            {images.map((src, i) => (
                <img
                    key={i}
                    src={src}
                    alt={`generated-${i}`}
                />
            ))}
        </aside>
    );
};