import { Timestamp } from './timestamp';

type DreamFormData = {
  name: string;
  description: string;
  cover?: string;
  characters?: string[];
  labels?: string[];
  date: Date;
};

type DreamFormErros = {
  name?: string;
  description?: string;
  cover?: string;
} | null;

type Dream = {
  id: string;
  name: string;
  date: Timestamp;
  description: string;
  cover?: string;
  characters?: string[];
  labels?: string[];
};

export type { Dream, DreamFormData, DreamFormErros };
