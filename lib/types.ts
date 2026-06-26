export type Lesson = {
  slug: string;
  number: number;
  title: string;
  description: string;
  lessonId: string;
  status: string;
  readingTime?: string;
  content?: string;
  mainContent?: string;
  assignmentContent?: string;
  mentalModel?: string;
  mentorNote?: string;
  available: boolean;
};

export type Course = {
  slug: string;
  courseId: string;
  title: string;
  subtitle: string;
  purpose: string;
  status: string;
  lessons: Lesson[];
};

export type DocumentContent = {
  title: string;
  eyebrow?: string;
  motto?: string;
  description?: string;
  content: string;
};
