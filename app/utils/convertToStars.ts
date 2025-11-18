export function convertToStars(rating: number | string | null): number {
  try {
    if (rating == null) return 0.5;
    const num = typeof rating === "string" ? parseFloat(rating) : rating; // Checking if string instead of number and converting
    const stars = ((num - 1) / 9) * 4.5 + 0.5; // Conversion to 0.5-5 scale
    return Math.round(stars * 100) / 100;
  } catch (error) {
    console.error('Conversion:', error);
    throw new Error('Failed to convert rating to 5 point scale.');
  }
}