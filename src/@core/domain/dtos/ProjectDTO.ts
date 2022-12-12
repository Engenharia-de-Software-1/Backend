export interface IUpdateProjectDTO {
  title?: string;
  problem?: string;
  solution?: string;
  situation?: 'approved' | 'pending' | 'rejected';
}

export interface IProjectOutputDTO {
  id?: string;
  title: string;
  problem: string;
  solution: string;
  userId: string;
  situation?: 'approved' | 'pending' | 'rejected';
  createdAt?: Date;
  updatedAt?: Date;
  views?: number;
}

export interface IProjectInputDTO {
  title: string;
  problem: string;
  solution: string;
  userId: string;
}
