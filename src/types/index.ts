export type Language = "en" | "ar";
export type Theme = "light" | "dark";

export interface NavItem {
  id: string;
  href: string;
}

export interface ServiceItem {
  title: string;
  description: string;
}

export interface SkillItem {
  name: string;
  level: number;
  category: string;
}

export interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  summary: string;
  tech: string[];
}


export interface Certification {
  title: string;
  issuer: string;
}


export interface Platform {
  label:string,
  href:string,
  image:string,  
}
