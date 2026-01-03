import ProgressBar from "../progress/ProgressBar";
import Button from "../button/Button";
import ImageButton from "../button/ImageButton";
import "./GenerateLayer.css";
import type { LDMClient } from "../../api/LDMClient";
import { useState, useEffect } from "react";


type GenerateLayerProps = {
    client: LDMClient;
};

function downloadAllImages(
    images: string[],
    prefix = "image"
) {
    images.forEach((src, index) => {
        const a = document.createElement("a");
        a.href = src;
        a.download = `${prefix}_${index + 1}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });
}


export default function GenerateLayer({ client }: GenerateLayerProps) {
        
    const [running, setRunning] = useState(client.isRunning());

    useEffect(() => {
        const interval = setInterval(() => {
            setRunning(client.isRunning());
        }, 100);

        return () => clearInterval(interval);
    }, [client]);
    
    return (
        <aside className="generate-layer">
            <ProgressBar manager={client.getProgress()} />
            <Button 
                label={running ? "Stop" : "Generate"}
                onClick={running ? 
                    () => {client.stop()} : 
                    () => {client.start(1)}
                }
            />
            <ImageButton 
                src="dl.png"
                alt="Download"
                onClick={() => {downloadAllImages(client.getUrls())}}
            />
        </aside>
    );
};