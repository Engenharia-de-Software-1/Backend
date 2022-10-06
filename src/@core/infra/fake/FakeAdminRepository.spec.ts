import { IAdministratorOutput } from '../../domain/dtos/AdministratorDTO';
import { FakeAdminRepository } from './FakeAdminRepository';
import { createUUID } from '../../domain/utils/createUUID';

describe('Admin In Memory Repository tests', () => {
  const id = createUUID();
  const adminProps: IAdministratorOutput = {
    id,
    email: 'yuribaza@test.jest.com',
    password: '1234567',
    name: '',
  };

  it('should insert a new Admin', async () => {
    const adminInMemoryRepository = new FakeAdminRepository();
    adminInMemoryRepository.insert(adminProps);
    expect(adminInMemoryRepository.admins).toStrictEqual([adminProps]);
  });

  it('should find a Admin by email', async () => {
    const adminInMemoryRepository = new FakeAdminRepository();
    adminInMemoryRepository.insert(adminProps);
    const admin = await adminInMemoryRepository.findByEmail(adminProps.email);
    expect(admin).toStrictEqual(adminProps);
  });

  it('should find a Admin by id', async () => {
    const adminInMemoryRepository = new FakeAdminRepository();
    adminInMemoryRepository.insert(adminProps);
    const admin = await adminInMemoryRepository.findById(id);
    expect(admin).toStrictEqual(adminProps);
  });

  it('should return null if Admin not found by email', async () => {
    const adminInMemoryRepository = new FakeAdminRepository();
    const admin = await adminInMemoryRepository.findByEmail(
      'email_inexistente',
      true,
    );
    expect(admin).toBeNull();
  });

  it('should return null if Admin not found by id', async () => {
    const adminInMemoryRepository = new FakeAdminRepository();
    const admin = await adminInMemoryRepository.findById(
      'id_inexistente',
      true,
    );
    expect(admin).toBeNull();
  });

  it('should throw an error if Admin not found by email', async () => {
    const adminInMemoryRepository = new FakeAdminRepository();
    expect(() =>
      adminInMemoryRepository.findByEmail('email_inexistente'),
    ).rejects.toThrow('Admin not found');
  });

  it('should throw an error if Admin not found by id', async () => {
    const adminInMemoryRepository = new FakeAdminRepository();
    expect(() =>
      adminInMemoryRepository.findById('id_inexistente'),
    ).rejects.toThrow('Admin not found');
  });
});
