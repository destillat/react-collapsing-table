# Contributing

To suggest a feature, create an issue if it does not already exist. If you would like to help develop a suggested feature follow these steps:

- Fork this repo
- Install dependencies with `npm i`
- Run `npm link` if testing with another project
  - This will provide a global symlink and allow other local projects to get immediate updates as you chance code in the src folder
- Create the required build folder and see a storybook instance running by running ` npm start`
  - That will build and watch the components and provide a local storybook instance so that you can view the application by going to `localhost:6006`.
- Implement your changes to files in the `src/` directory
- Submit PR for review when the feature is complete