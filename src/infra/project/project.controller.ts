import { Admin } from './../../@core/domain/decorators/admin.decorator';
import { IUserOutputRelations } from './../../@core/domain/dtos/UserDTO';
import { User } from './../../@core/domain/decorators/user.decorator';
import { ProjectSetViewsUseCase } from './../../@core/application/ProjectUseCases/projectViewsUseCase';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CreateProjectUseCase } from '../../@core/application/ProjectUseCases/createProjectUseCase';
import { DeleteProjectUseCase } from '../../@core/application/ProjectUseCases/deleteProjectUseCase';
import { GetProjectUseCase } from '../../@core/application/ProjectUseCases/getProjectUseCse';
import { ListProjectsByUserUseCase } from '../../@core/application/ProjectUseCases/listProjectsByUserUseCase';
import { ListProjectsUseCase } from '../../@core/application/ProjectUseCases/listProjectsUseCase';
import { UpdateProjectUseCase } from '../../@core/application/ProjectUseCases/updateProjectUseCase';
import {
  IProjectInputDTO,
  IUpdateProjectDTO,
} from '../../@core/domain/dtos/ProjectDTO';

@Controller('project')
export class ProjectController {
  constructor(
    private readonly createProjectUseCase: CreateProjectUseCase,
    private readonly getProjectUseCase: GetProjectUseCase,
    private readonly updateProjectUseCase: UpdateProjectUseCase,
    private readonly deleteProjectUseCase: DeleteProjectUseCase,
    private readonly listProjectsUseCase: ListProjectsUseCase,
    private readonly listProjectByUserUseCase: ListProjectsByUserUseCase,
    private readonly projectSetViewsUseCase: ProjectSetViewsUseCase,
  ) {}

  @Post()
  async create(@Body() createProjectDto: IProjectInputDTO) {
    return await this.createProjectUseCase.execute(createProjectDto);
  }

  @Get(':id')
  async getOne(
    @Admin() admin: any,
    @User() user: IUserOutputRelations,
    @Param('id') id: string,
  ) {
    const project = await this.getProjectUseCase.execute(id);
    if (!admin && project.userId !== user.id) {
      await this.projectSetViewsUseCase.execute(id);
    }
    return project;
  }

  @Get('')
  async list() {
    return await this.listProjectsUseCase.execute();
  }

  @Get('user/:userId')
  async GetMy(@Param('userId') userId: string) {
    return await this.listProjectByUserUseCase.execute(userId);
  }

  @Put(':userId/:id')
  async update(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Body() updateProjectDto: IUpdateProjectDTO,
  ) {
    return await this.updateProjectUseCase.execute(
      userId,
      id,
      updateProjectDto,
    );
  }

  @Delete(':userId/:id')
  async delete(@Param('id') id: string, @Param('userId') userId: string) {
    return await this.deleteProjectUseCase.execute(userId, id);
  }
}
