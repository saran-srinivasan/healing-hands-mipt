import Papa from "papaparse";

// TODO: Replace with the actual published Google Sheet CSV URL

export interface Notification {
    id: string;
    message: string;
    link?: string;
    startDate?: string;
    endDate?: string;
}

interface SheetRow {
    Message: string;
    Link?: string;
    Active?: string;
    StartDate?: string;
    EndDate?: string;
}

export async function getNotifications(): Promise<Notification[]> {
    if (!process.env.GOOGLE_SHEET_CSV_URL) {
        console.warn("GOOGLE_SHEET_CSV_URL is not defined");
        return [];
    }
    try {
        // console.log("Fetching notifications...", GOOGLE_SHEET_CSV_URL);

        // In a real scenario, you probably want to cache this request for a short time (e.g. 60s)
        // using Next.js 'next: { revalidate: 60 }' if using fetch directly.
        // Since we are parsing CSV, we fetch text first.
        const response = await fetch(process.env.GOOGLE_SHEET_CSV_URL, {
            next: { revalidate: 60 }, // Cache for 1 minute
            cache: "force-cache",
        });

        // console.log("Notifications response:", response);

        if (!response.ok) {
            console.warn("Failed to fetch notifications sheet");
            // console.log("Notifications response:", response);
            return [];
        }

        const csvText = await response.text();


        const { data } = Papa.parse<SheetRow>(csvText, {
            header: true,
            skipEmptyLines: true,
        });

        const now = new Date();
        const currentDateStr = now.toISOString().split("T")[0]; // YYYY-MM-DD for simple comparison

        const validNotifications = data
            .filter((row) => {
                // 1. Must be Active
                const isActive = row.Active?.toLowerCase() === "true" || row.Active === "1" || row.Active?.toLowerCase() === "yes";
                if (!isActive) return false;

                // 2. Start Date Check
                if (row.StartDate) {
                    const startDate = new Date(row.StartDate);
                    if (startDate > now) return false; // Future notification
                }

                // 3. End Date Check
                if (row.EndDate) {
                    const endDate = new Date(row.EndDate);
                    // Set end date to end of day for fair comparison
                    endDate.setHours(23, 59, 59, 999);
                    if (endDate < now) return false; // Expired
                }

                return true;
            })
            .map((row, index) => ({
                // Use a simple hash/string of the message for stable ID to allow reliable dismissal tracking
                id: `note-${index}-${row.Message.replace(/\s+/g, '').slice(0, 20)}`,
                message: row.Message,
                link: row.Link,
                startDate: row.StartDate,
                endDate: row.EndDate,
            }))
            // Sort: Newest Start Date first (if available), then order in sheet
            .sort((a, b) => {
                if (!a.startDate && !b.startDate) return 0;
                if (!a.startDate) return 1;
                if (!b.startDate) return -1;
                return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
            })
            .slice(0, 3); // Top 3

        return validNotifications;
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return [];
    }
}
