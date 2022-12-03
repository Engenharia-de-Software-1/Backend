import { HttpException } from "@nestjs/common";
import { IProjectRepository } from "src/@core/domain/repositories/IProjectRepository";

export class ProjectSetViewsUseCase {
    constructor(private projectRepository: IProjectRepository) {}
    
    async execute(id: string): Promise<void> {
        const project = await this.projectRepository.findById(id, true);
        if (!project) throw new HttpException("Project not found", 400);
    
        this.projectRepository.view(project.id);
    }
}