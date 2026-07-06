export interface Project {
  id: string;
  title: string;
  category: string;
  year: string;
  client: string;
  role: string;
  description: string;
  summary: string;
  accentColor: string;
  textColor: string;
  image: string;
  tags: string[];
  details: {
    problem: string;
    solution: string;
    features: string[];
    concept?: string;
  };
  interactiveType?: 'typography' | 'color' | 'layout';
}

export interface JourneyEvent {
  id: string;
  type: 'education' | 'internship' | 'club';
  title: string;
  organization: string;
  period: string;
  location: string;
  description: string[];
  skills?: string[];
}
