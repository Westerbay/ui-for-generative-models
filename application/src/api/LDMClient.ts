import { ProgressManager } from "./ProgressManager";


export class LDMClient {
  
	private urls: string[];
	private running: boolean;
	private progress: ProgressManager;

	constructor() {
		this.urls = [];
		this.running = false;
		this.progress = new ProgressManager(1000);
	}

	async start(batchSize: number = 1) {
		this.progress.reset();
		const res = await fetch(`/api/start?batch_size=${batchSize}`);
		if (!res.ok) throw new Error("Failed to start, please verify that a ldm api is running");
		this.running = true;

		while (this.running) {
			const urls = await this.step();
			if (!urls) break;
			this.urls = urls;
		}
		this.running = false;
	}

	async step(): Promise<string[] | null> {
		const res = await fetch(`/api/step`);
		if (!res.ok) throw new Error("Step failed");

		const data = await res.json();

		if ("message" in data) {
			this.running = false;
			return null;
		}

		this.progress.increment();
		return data.images.map(
			(b64: string) => `data:image/png;base64,${b64}`
		);
	}

	getUrls() {
		return this.urls;
	}

	getProgress() {
		return this.progress;
	}

	isRunning() {
		return this.running;
	}

	stop() {
		this.running = false;
	}

}
