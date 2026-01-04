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
    const [batchSize, setBatchSize] = useState<number>(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setRunning(client.isRunning());
        }, 100);

        return () => clearInterval(interval);
    }, [client]);
    
    return (
        <aside className="generate-layer">
            <ProgressBar manager={client.getProgress()} />
            <label htmlFor="batchSize">Batch size:</label>
            <input
                type="number"
                min={1}
                max={4}
                value={batchSize}
                onChange={e => 
                    setBatchSize(Math.min(4, Math.max(1, +e.target.value)))
                }
            />
            <Button 
                className={running ? "cancel" : "generate"}
                label={running ? "Cancel" : "Generate"}
                onClick={running ? 
                    () => {client.stop()} : 
                    () => {client.start(batchSize)}
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