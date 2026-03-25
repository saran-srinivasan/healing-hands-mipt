import Papa from "papaparse";

export interface Testimonial {
  id: string;
  date?: string;
  name: string;
  rating: number;
  review: string;
}

// No longer relying on object properties since we parse as an array to handle missing headers
type SheetRow = string[];

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!process.env.GOOGLE_SHEET_REVIEWS_CSV_URL) {
    console.warn("GOOGLE_SHEET_REVIEWS_CSV_URL is not defined");
    return [];
  }

  try {
    // Append a timestamp to perfectly bust Google's aggressive CDN cache
    const sheetUrl = new URL(process.env.GOOGLE_SHEET_REVIEWS_CSV_URL);
    sheetUrl.searchParams.append("t", Date.now().toString());

    const response = await fetch(sheetUrl.toString(), {
      cache: "no-store", // Fetches fresh data on every request so you can instantly see new reviews when testing!
    });

    if (!response.ok) {
      console.warn("Failed to fetch testimonials sheet");
      return [];
    }

    const csvText = await response.clone().text();

    const { data } = Papa.parse<SheetRow>(csvText, {
      header: false,
      skipEmptyLines: true,
    });

    const validTestimonials = data
      .map((row, index): Testimonial | null => {
        // If the row corresponds to the header (e.g. they added "Date", "Name", "Rating", "Review" headers)
        if (row[1]?.toLowerCase() === "name" || row[3]?.toLowerCase() === "review") {
          return null; // Skip header row
        }

        const date = row[0];
        const name = row[1];
        const ratingStr = row[2];
        const review = row[3];

        if (!name || !review) return null; // Basic validation

        let rating = parseInt(ratingStr, 10);
        if (isNaN(rating) || rating < 1 || rating > 5) {
          rating = 5;
        }

        return {
          id: `testimonial-${index}-${name.replace(/\s+/g, "").slice(0, 10)}`,
          date: date || undefined,
          name,
          rating,
          review,
        };
      })
      .filter((t): t is Testimonial => t !== null)

    return validTestimonials;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return [];
  }
}
