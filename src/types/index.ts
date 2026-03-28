export interface Tutorial {
  title: string;
  category: string;
  steps: string;
  video: string;
}

export interface Recipe {
  name: string;
  ingredients: string;
  steps: string;
  image: string;
}

export interface ShiftTask {
  task: string;
  order: string;
}

export interface Announcement {
  message: string;
  date: string;
}

export interface Schedule {
  image_url: string;
}
