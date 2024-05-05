import { Timestamp } from "./timestamp";

type Dream = {
  id: string;
  name: string;
  date: Timestamp;
  description: string;
  cover?: string;
  characters?: string[];
  tags?: string[];
};

export type { Dream };
