import { useEffect, useState } from "react";
import { ProgressManager } from "../../api/ProgressManager";
import "./ProgressBar.css";

type ProgressBarProps = {
    manager: ProgressManager;
};

export default function ProgressBar({ manager }: ProgressBarProps) {
    const [percent, setPercent] = useState(manager.getPercentage());

    useEffect(() => {
        const interval = setInterval(() => {
            setPercent(manager.getPercentage());
        }, 100);

        return () => clearInterval(interval);
    }, [manager]);

    return (
        <div className="progress-track">
            <div 
                className="progress-fill"
                style={{ width: `${percent}%` }}
            ></div>
            <span>{percent}%</span>
        </div>
    )
}