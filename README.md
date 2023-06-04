# Shopping-List-Assistant-With-Expo &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo/README.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo/pulls) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

This repository consists of a modified version of a mobile i made during my final year at University Centre Rotherham (UCR), it was created as part of a mobile application unit.

As part of the README file it will describe and explain the following sections:

- Purpose
- Core features
- Application dependencies used
- Getting started
- Contributing
- Project information

## Purpose

The overall purpose of this React-native mobile application is to allow users to maintain and shopping list and be alerted when they are near a foods store.

When a user is near a store they will be alerted via local application notifications, this will prompt them to go to the shopping lists screen where they can then get there list and update whilst they are shopping.

## Getting started

- Clone the project to your development environment by using `git clone https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo`

- [Install Node.JS](https://nodejs.org/en/)

- [Install Expo Mobile App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_GB)

* Dependency installation

  - Issue `npm install -g expo-cli` or `yarn install -g expo-cli` to install the expo-cli tools required to run the mobile app

  - Issue `yarn allDependencies` to install all the core dependencies (See Technologies used section)

* Running the development environment:

  - Go to the cloned repositories location in the terminal

  - Run `expo start` (This will take a long time on the initial build, but the second time around it will take seconds)

  - The project and Expo dev tools will then load. You have successfully setup the mobile development environment

## Contributing

### Reporting issues

If you find any problems while using the API, report them [here](https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo/issues), and I will address them as quick as I can.

### Feature requests

If you would like to request features for future versions of the application again, please post them [here](https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo/issues). When posting ideas ensure the functionality is explained to provide any developers contributing to the project know what to implement.

### Task list

- [x] Add basic routing via React-Navigation
- [x] Create shopping lists
- [x] Delete shopping lists (When viewing a single shopping list and via the settings screen)
- [x] Edit shopping list names
- [x] Add items to shopping list
- [x] Add user-friendly modals to perform various operations like editing shopping list names or adding new items
- [x] Show error, loading, success states
- [x] Geo-location tracking via expo-location module
- [x] Integrate React-Native-Maps for now, a better solution will if more than a few hundred markers are spawned in.
- [x] Add Push notification support via expo-notifications module
- [ ] Integrate Geo-Clustering engine to handle the marker spawning and updating, currently not possible with react-native-maps as it can only handle a few hundred at a time.
- [ ] Remove the hardcoded locations and leverage google map apis instead (FUTURE IMPROVEMENT as the StoreLocator screen would need a massive overhaul and external api's would be needed).
- [ ] Improve error handling when users don't have permissions or certain pieces of functionality available e.g. gps is not enabled, permission is denied or no space on the internal storage of the device.
- [x] Add basic UX and UI improvements e.g. notifications via SnackBar from react-native-paper
- [x] Add a dark and light theme mode, this will be configured via the Settings screen
- [x] Add data persistance e.g. storing user themes or shopping lists in the devices internal storage
- [ ] Fix any issues related to the map component, sometimes it misbehaves e.g. [here](https://github.com/react-native-maps/react-native-maps/issues/3026#issuecomment-641192209)
- [ ] Test more edge case scenarios e.g. users manually changing locations in the devices settings, how does this affect the amp functionality or if the device can't persist the data
- [ ] Add background location tracking via the expo modules (THIS MAY OR MAY NOT HAPPEN, it seems overkill for now but would be nice.)
- [x] Integrate TanStack/react-query for handling some of the asynchronous actions e.f. fetching profiles, updating shopping lists etc
- [x] Integrate with expo-router v1 to get all the lovely benefits of file based routing and later type safe routing.
- [ ] Integrate Typescript for a better development experience
- [ ] Prepare the project for Expo EAS, setup permissions add any additional configuration etc

# Project Information

### Author information

Alex Machin

If you want to connect with me on my professional social network platforms feel free to use the links located below, but please don't abuse them.

- [LinkedIn](https://www.linkedin.com/in/alex-machin/)
- [Twitter](https://twitter.com/AlexMachin97)

### Mobile app version

The application is currently at version 2.0, with each feature added it will increment based on these [guidelines](https://docs.npmjs.com/about-semantic-versioning)

### Project Licence information

This project is licensed under the MIT License, for more details about the API refer to the LICENCE.md file located within the project.
