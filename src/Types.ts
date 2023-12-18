export type TodoType = {
  id: string;
  title: string;
  status: 'Done' | 'Waiting';
  category: 'Home' | 'School' | 'Hobby' | 'Other';
  detail: string;
};

export type AppParams = {
  Waiting: {
    statusType: string;
  };
  Done: {
    statusType: string;
  };
};
