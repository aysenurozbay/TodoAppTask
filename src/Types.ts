export type TodoType = {
  id: string;
  title: string;
  status: 'Done' | 'Pending' | 'Waiting';
  category: 'Home' | 'School' | 'Hobby' | 'Other';
  detail: string;
};
