export class ReadFile {
    static async readJson(file) {
        try {
            const response = await fetch(file);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        }
        catch (error) {
            console.error(`Error reading ${file}: ${error}`);
            return [];
        }
    }
}
