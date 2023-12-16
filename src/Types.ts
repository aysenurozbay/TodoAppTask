export type TodoType = {
  id: string;
  title: string;
  status: 'Done' | 'Pending' | 'Waiting';
  category: 'Home' | 'School' | 'Hobby' | 'Other';
  detail: string;
};

export type AppParams = {
  Waiting: {
    status: string;
  };
  Done: {
    status: string;
  };
  Pending: {
    status: string;
  };
};
export interface GeneralNavigationParamList extends Record<string, any> {
  [key: string]: Record<string, any>;
}
