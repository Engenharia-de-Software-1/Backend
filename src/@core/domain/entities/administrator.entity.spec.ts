import { Administrator } from './administrator.entity';

describe('Administrator entity test', () => {
  let admin: Administrator;
  beforeAll(() => {
    admin = Administrator.create({
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '12345678',
    });
  });

  it('should create a valid administrator', () => {
    expect(admin).toEqual({
      id: expect.any(String),
      name: 'John Doe',
      email: 'johndoe@test.com',
      password: '12345678',
    });
  });

  it("should update administrator's name", () => {
    admin.updateName('John Doe 2');
    expect(admin.name).toBe('John Doe 2');
  });

  it("should update administrator's email", () => {
    admin.updateEmail('john@doe.com');
    expect(admin.email).toBe('john@doe.com');
  });

  it("should update administrator's password", () => {
    admin.updatePassword('123456789');
    expect(admin.password).toBe('123456789');
  });

  it("should validate administrator's email", () => {
    expect(() => admin.validateEmail()).not.toThrow();
    admin.updateEmail('johndoe.com');
    expect(() => admin.validateEmail()).toThrow('Invalid email');
  });

  it("should validate administrator's password", () => {
    expect(() => admin.validatePassword()).not.toThrow();
    admin.updatePassword('123');
    expect(() => admin.validatePassword()).toThrow('Invalid password');
  });

  it('should validate if password match', () => {
    admin.updatePassword('123456789');
    expect(() => admin.validateIfPasswordMatch('123456789')).not.toThrow();
  });
});
