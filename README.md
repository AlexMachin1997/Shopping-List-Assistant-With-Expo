# Shopping-List-Assistant-With-Expo &middot; [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo/README.md) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo/pulls) [![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

This repository consists of a modfied version of a mobile I made during my final year at University Centre Rotherham (UCR), it was created as part of a mobile application unit.

As part of the README file it will describe and explain the following sections:

- Purpose
- Core features
- Technologies used
- Getting started
- Contributing
- Project information

## Purpose

The overall purpose of this React-native mobile application is to allow users to add a nd track items in relatime through GPS tracking.

To enable tracking items will need to be added to the shopping list, once items are present background tracking will be enabled. With an item being present in a shopping list it will now be tracked, once an item is present in a shopping list it will be tracked. Now when an item is found you will be alerted through the use of a push notification.

For a full breakdown of the mobile application features checkout the core features breakdown below.

## Getting started

- Clone the project to your development environment by using `git clone https://github.com/AlexMachin1997/Shopping-List-Assistant-With-Expo`

- [Install Node.JS](https://nodejs.org/en/)

- [Install Expo Mobile App](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_GB)

* Dependency installation

  - Issue `npm install -g expo-cli` to install the expo-cli tools required to run the mobile app

  - Issue `npm install` to install all the core dependencies (See Technologies used section)

  - Issue 'yarn install' to install all dependencies with yarn (Requires yarn to be configured)

* Running the development enviroment:
  - Go to the cloned repositories location in the terminal
  - Run `expo start` (This will take a long time on the inital build, but the second time around it will take seconds)
  - The project and Expo dev tolls will then load. You have successfully setup the mobile development enviroment

## Technologies used:

- [Expo](https://docs.expo.io/versions/v32.0.0/)
- [Expo-Location](https://docs.expo.io/versions/latest/sdk/location/)
- [Expo-permissions](https://docs.expo.io/versions/latest/sdk/permissions/)
- [Expo-secure-store](https://docs.expo.io/versions/latest/sdk/securestore/)
- [MomentJS](https://github.com/moment/moment/)
- [Proptypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
- [React](https://reactjs.org/)
- [React-Native](https://facebook.github.io/react-native/)
- [React-Native-Maps](https://github.com/react-native-community/react-native-maps)
- [React-native-onboarding-swiper](react-native-onboarding-swiper)
- [React-native-paper](https://github.com/callstack/react-native-paper)
- [React Navigation](https://reactnavigation.org/)
- [React-navigation-material-bottom-tabs](https://github.com/react-navigation/react-navigation-material-bottom-tabs)
- [ShortID](https://github.com/dylang/shortid)
- [Styled-components](https://github.com/styled-components/styled-components)

## Contributing

### Reporting issues

If you find any problems while using the API, report them [here](https://github.com/AlexMachin1997/Food-Allergy-Mobile-Application/issues), and I will address them as quick as I can.

### Feature requests

If you would like to request features for future versions of the application again, please post them [here](https://github.com/AlexMachin1997/Food-Allergy-Mobile-Application/issues). When posting ideas ensure the functionality is explained to provide any developers contributing to the project know what to implement.

## Todo list

### Features Todo list

- [x] Create shopping lists
- [x] Delete shopping lists
- [x] Edit shopping list names
- [x] Add items to shopping list
- [x] Add user-friendly modals to show error, success and loading state
- [x] Show error, loading, success states
- [x] Geo-location tracking via either RN or Expo modules
- [x] Integrate React-Native-Maps
- [x] Add basic routing via React-Navigation
- [x] Add Push notification support
- [ ] Integrate Geo-Clustering engine to allow more than 100 markers to spawn
- [ ] Remove the hardcoded locations from the JSON and integrate google maps to extract all common food items

### Code Maintenance

- [x] Upgrade to React 16.8.3
- [ ] Add hooks support
- [x] Update the SDK from v32 to v33
- [x] Update SDK from v33 to v35
- [x] Refactor setState, remove the nasty await as it doesnt return a promise and use the callback approach
- [ ] Update React-Navigation (PAIN IN THE ASS PART)
- [x] Extract storage handling into reusable modules
- [ ] Extract permissions into reusable modules
- [ ] Extract time generation into it's own reusable module
- [ ] Improve error handling for permissions, specifically the GPS and push notifications

# Project Information

### Author information

Alex Machin

If you want to connect with me on my professional social network platforms feel free to use the links located below, but please don't abuse them.

- [LinkedIn](https://www.linkedin.com/in/alex-machin/)
- [Twitter](https://twitter.com/AlexMachin97)

### Mobile app version

The application is currently at version 1.1, with each feature added it will increment based on these [guidelines](https://docs.npmjs.com/about-semantic-versioning)

### Project Licence information

This project is licensed under the MIT License, for more details about the API refer to the LICENCE.md file located within the project.
