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

export const getColumns = () => {
    return [
        { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 0, },
        { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 1, },
        { accessor: 'email', label: 'Email', priorityLevel: 3, position: 2, },
        { accessor: 'address', label: 'Address', priorityLevel: 4, position: 3, },
        { accessor: 'city', label: 'City', priorityLevel: 9, position: 4, },
        { accessor: 'state', label: 'State', priorityLevel: 6, position: 5, },
        { accessor: 'country', label: 'Country', priorityLevel: 8, position: 6, },
        { accessor: 'zipCode', label: 'Zip Code', priorityLevel: 7, position: 7, },
        { accessor: 'bio', label: 'Bio', priorityLevel: 5, position: 8, },
    ]
};
