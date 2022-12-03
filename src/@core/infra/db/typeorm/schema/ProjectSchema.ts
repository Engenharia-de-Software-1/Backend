import { EntitySchema } from 'typeorm';
import { Project } from '../../../../domain/entities/project.entity';

export const ProjectSchema = new EntitySchema({
  name: 'Project',
  target: Project,
  columns: {
    id: {
      type: 'uuid',
      primary: true,
    },
    title: {
      type: String,
      nullable: false,
    },
    problem: {
      type: String,
      nullable: false,
    },
    solution: {
      type: String,
      nullable: false,
    },
    userId: {
      type: String,
      nullable: false,
    },
    situation: {
      type: String,
      nullable: false,
    },
    createdAt: {
      type: String,
      nullable: false,
    },
    updatedAt: {
      type: String,
      nullable: false,
    },
    viewsOnProject: {
      type: Number,
      nullable: false,
    },
  },
});
