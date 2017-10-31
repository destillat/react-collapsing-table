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
        { accessor: 'firstName', label: 'First Name', priorityLevel: 1, position: 1, minWidth: 100, },
        { accessor: 'lastName', label: 'Last Name', priorityLevel: 2, position: 2, minWidth: 100, },
        { accessor: 'email', label: 'Email', priorityLevel: 3, position: 3, minWidth: 100, },
        { accessor: 'address', label: 'Address', priorityLevel: 4, position: 4, minWidth: 100, },
        { accessor: 'city', label: 'City', priorityLevel: 9, position: 5, minWidth: 100, },
        { accessor: 'state', label: 'State', priorityLevel: 6, position: 6, minWidth: 100, },
        { accessor: 'country', label: 'Country', priorityLevel: 8, position: 7, minWidth: 100, },
        { accessor: 'zipCode', label: 'Zip Code', priorityLevel: 7, position: 8, minWidth: 100, },
        { accessor: 'bio', label: 'Bio', priorityLevel: 5, position: 9, minWidth: 100, },
    ]
};
