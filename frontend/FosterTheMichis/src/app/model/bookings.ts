export interface Bookings {
  id?: number; // Opcional, ya que el backend lo genera
  date: string;
  peopleNumber: number;
  comments: string | null;
  user: {
    id: number;
  };
}