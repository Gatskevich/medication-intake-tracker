export interface IMedication {
  id: string;
  name: string;
  description: string;
  count: number;
  destinationCount: number;
  notes?: string[];
  updatedAt: number;
}
