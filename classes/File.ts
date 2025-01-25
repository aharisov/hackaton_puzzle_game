import { Level } from "./Level";

export class File {
    public static async load(file: string): Promise<Level> {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error reading ${file}: ${error}`);
            return {};
        }
    }
}