//Allows us to fake data
import faker from 'faker';

export const generateFakeData = () => {
    let data = [];
    for(let i = 0; i < 1000; i++) {
        data.push(
            {
                firstName: faker.name.firstName(),
                lastName: faker.name.lastName(),
                email: faker.internet.email(),
                address: faker.address.streetAddress(),
                city: faker.address.city(),
                state: faker.address.state(),
                country: faker.address.country(),
                zipCode: faker.address.zipCode(),
                bio: faker.lorem.sentence(),
                isOpen: false,
            }
        )
    }

    return data
};
