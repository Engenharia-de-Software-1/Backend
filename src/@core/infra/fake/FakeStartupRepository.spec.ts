import { IStartupOutput } from '../../domain/dtos/StartupDTO';
import { Startup } from '../../domain/entities/startup.entity';
import { createUUID } from '../../domain/utils/createUUID';
import { FakeStartupRepository } from './FakeStartupRepository';

describe('Fake Startup Repository Test', () => {
  const id = createUUID();
  const startupProps: IStartupOutput = {
    id,
    userId: 'userId',
    startupName: 'startupName',
    cnpj: 'cnpj',
    employees: 3,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create a startup', async () => {
    const fakeRepoRepository = new FakeStartupRepository();
    fakeRepoRepository.insert(startupProps);
    expect(fakeRepoRepository.startups).toStrictEqual([startupProps]);
  });

  it('should find a startup by userId', async () => {
    const fakeRepoRepository = new FakeStartupRepository();
    fakeRepoRepository.insert(startupProps);
    const startup = await fakeRepoRepository.findByUserId(startupProps.userId);
    expect(startup).toStrictEqual(startupProps);
  });

  it('should return null if startup not found by userId', async () => {
    const fakeRepoRepository = new FakeStartupRepository();
    const startup = await fakeRepoRepository.findByUserId(
      'user_inexistente',
      true,
    );
    expect(startup).toBeNull();
  });

  it('should throw an error if startup not found by userId', async () => {
    const fakeRepoRepository = new FakeStartupRepository();
    expect(() =>
      fakeRepoRepository.findByUserId('user_inexistente'),
    ).rejects.toThrow('Startup not found');
  });

  it('should delete a startup', async () => {
    const fakeRepoRepository = new FakeStartupRepository();
    fakeRepoRepository.insert(startupProps);
    await fakeRepoRepository.delete(id);
    expect(fakeRepoRepository.startups).toStrictEqual([]);
  });

  it('should update a startup', async () => {
    const fakeRepoRepository = new FakeStartupRepository();
    fakeRepoRepository.insert(startupProps);
    const startup = Startup.create(startupProps);
    startup.updateCnpj('cnpj2');
    await fakeRepoRepository.update(id, startup);
    expect(fakeRepoRepository.startups).toStrictEqual([
      {
        ...startupProps,
        cnpj: 'cnpj2',
      },
    ]);
  });
});
