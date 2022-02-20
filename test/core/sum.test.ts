import { sum } from '../../src/core/sum';

test('adds two given numbers', ()=>{
	expect(sum(1, 2)).toBe(3)
})

/*
class User{
	private password:string;
	constructor(readonly name:string, readonly surname:string) {}

	updatePassword(password:string){
		this.password = password;
	}
};

interface UserRepository{
	findUsersByName: (name:string)=> User[];
	findUsersBySurname: (surname:string)=> User[];
	save:(user:User) => void;
};

class UserService{
	constructor(private repository: UserRepository) {}

	updatePassword(user:User, password:string){
		user.updatePassword(password);
		this.repository.save(user);
	}
}



class Repository implements UserRepository{
	findUsersByName(name: string): User[] {
		return [];
	}

	findUsersBySurname(surname: string): User[] {
		return [];
	}

	save(user: User): void {
	}
}

class RepositorySpy implements UserRepository{
	constructor(private stubListOfUsersByName: User[]) {}

	findUsersByName(name: string): User[] {
		return this.stubListOfUsersByName;
	}

	findUsersBySurname(surname: string): User[] {
		return this.stubListOfUsersByName;
	}

	save(user: User): void {
	}
}

describe('The user finder', ()=>{
	it('searchs user by name first', ()=>{
		const aName = 'irrelevant-name';
		const aUser = new User(aName, '');
		const repository = new Repository();
		repository.findUsersBySurname = (name:string)=>[aUser];
		const userFinder = new UserFinder(repository);

		const result = userFinder.findUsers(aName);

		expect(result.length).toBe(1);
		expect(result[0]).toEqual(aUser);
	});

	it('searchs user by surname when nothing is found by name', ()=>{
		const aSurname = 'irrelevant-name';
		const aUser = new User(null as any, aSurname);
		const repository = new Repository();
		repository.findUsersBySurname = (name:string)=>[aUser];
		const userFinder = new UserFinder(repository);

		const result = userFinder.findUsers(aSurname);

		expect(result.length).toBe(1);
		expect(result[0]).toEqual(aUser);
	});
})
*/


