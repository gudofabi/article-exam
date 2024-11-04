// src/types/interfaces.ts

export interface Person {
    id: number;
    firstname: string;
    lastname: string;
    name: string;
  }
  
  export interface Company {
    id: number;
    name: string;
  }
  
  export interface Article {
    id: number;
    image: string;
    title: string;
    link: string;
    date: string; // Use 'string' for dates if not using a Date object
    content: string;
    status: "For Edit" | "Published"; // Limit status to specific strings
    writer: Person;
    editor: Person | null; // Editor can be null
    company: Company;
  }
  