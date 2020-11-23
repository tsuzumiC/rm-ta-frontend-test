import React, { useEffect, useState } from "react";
import { getData, getResourceId } from "./components/getData/getData";
import {
  EResourceTypes,
  ICards,
  IFilms,
  IGetList,
  IPerson,
  IPlanets,
  ISpecies,
  IStarships,
  IVehicles,
  EHasResourceNames,
  CPerson,
  CFilm,
  CPlanet,
  CSpecie,
  CStarship,
  CVehicle,
  CNamedResource,
} from "./components/resourcesTypes/resourcesTypes";
import DisplayData from "./components/displayData/displayData";

import "./App.css";

const App = () => {
  const defaultValues = {
    people: [] as CPerson[],
    planets: [] as CPlanet[],
    films: [] as CFilm[],
    species: [] as CSpecie[],
    starships: [] as CStarship[],
    vehicles: [] as CVehicle[],
    resourceToShow: EResourceTypes.People,
    getList: [] as IGetList[],
    searchInput: "",
    searchFor: "",
  };
  const [values, setValues] = useState(defaultValues),
    {
      people,
      planets,
      films,
      species,
      starships,
      vehicles,
      getList,
      searchInput,
      searchFor,
    } = values;

  useEffect(() => {
    getData<IPerson>(EResourceTypes.People).then((data) => {
      let classList = [] as CPerson[];
      data.forEach((value) => {
        classList.push(new CPerson(value));
      });
      setValues({
        ...values,
        people: classList,
      });
    });
  }, []);

  useEffect(() => {
    if (getList.length > 0) {
      handleGetList();
    }
  }, [getList]);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, searchInput: event.target.value });
  };
  const searchClicked = () => {
    if (searchInput.length > 0) {
      setValues({ ...values, searchFor: searchInput });
    }
  };
  const resetClicked = () => {
    setValues({ ...values, searchInput: "", searchFor: "" });
  };

  const getResourceList = {
    people: () => {
      return people;
    },
    planets: () => {
      return planets;
    },
    films: () => {
      return films;
    },
    species: () => {
      return species;
    },
    starships: () => {
      return starships;
    },
    vehicles: () => {
      return vehicles;
    },
  };
  /* This function opens and closes resource cards and checks if they need more resources to display properly */
  const updateCardIsOpen = (
    event: React.MouseEvent,
    resource: EResourceTypes,
    id: number
  ) => {
    const tempList = getResourceList[resource]();
    const indexOfResource = tempList.findIndex((value: ICards) => {
      return value.id === id;
    });
    tempList[indexOfResource].cardOpen = !tempList[indexOfResource].cardOpen;

    if (
      tempList[indexOfResource].hasResourceNames === EHasResourceNames.false
    ) {
      const result = makeGetNamedResourcesList(resource, indexOfResource, id);
      tempList[indexOfResource].hasResourceNames = result.hasResourceNames;
      if (result.getList === undefined) {
        setValues({ ...values, [resource]: tempList });
      } else {
        setValues({ ...values, [resource]: tempList, getList: result.getList });
      }
    } else {
      setValues({ ...values, [resource]: tempList });
    }
  };
  /* This function looks at a resource and see if all resources it needs to display properly exists locally in the browser or needs to be called for through axios */
  const makeGetNamedResourcesList = (
    resource: EResourceTypes,
    indexOfResource: number,
    id: number
  ): {
    hasResourceNames: EHasResourceNames;
    getList?: IGetList[];
  } => {
    let getNamedResourceList = [] as IGetList[];

    const populateGetNamedResourceList = {
      undefined: () => {},
      people: () => {
        let needNames = people[indexOfResource];
        const homeworldId = getResourceId(needNames.homeworld);
        // debugger;
        if (
          planets.find((value) => {
            return value.id === homeworldId;
          }) === undefined
        ) {
          getNamedResourceList.push({
            resource: EResourceTypes.Planets,
            id: homeworldId,
            done: false,
            target: {
              resource: resource,
              id: id,
            },
          });
        } else {
          const tempPlanet = planets.find((value) => {
            return value.id === homeworldId;
          })!;
          needNames.homeworldObj = new CNamedResource(
            tempPlanet.name,
            tempPlanet.url,
            homeworldId,
            EResourceTypes.Planets
          );
        }

        needNames.films.forEach((value) => {
          const filmId = getResourceId(value);
          if (
            films.find((value) => {
              return value.id === filmId;
            }) === undefined
          ) {
            getNamedResourceList.push({
              resource: EResourceTypes.Films,
              id: filmId,
              done: false,
              target: {
                resource: resource,
                id: id,
              },
            });
          } else {
            const tempFilm = films.find((value) => {
              return value.id === filmId;
            })!;
            needNames.filmsList.push(
              new CNamedResource(
                tempFilm.title,
                tempFilm.url,
                filmId,
                EResourceTypes.Films
              )
            );
          }
        });
        needNames.species.forEach((value) => {
          const speciesId = getResourceId(value);
          if (
            species.find((value) => {
              return value.id === speciesId;
            }) === undefined
          ) {
            getNamedResourceList.push({
              resource: EResourceTypes.Species,
              id: speciesId,
              done: false,
              target: {
                resource: resource,
                id: id,
              },
            });
          } else {
            const tempSpecies = species.find((value) => {
              return value.id === speciesId;
            })!;
            needNames.speciesList.push(
              new CNamedResource(
                tempSpecies.name,
                tempSpecies.url,
                speciesId,
                EResourceTypes.Species
              )
            );
          }
        });
        needNames.starships.forEach((value) => {
          const starshipsId = getResourceId(value);
          if (
            starships.find((value) => {
              return value.id === starshipsId;
            }) === undefined
          ) {
            getNamedResourceList.push({
              resource: EResourceTypes.Starships,
              id: starshipsId,
              done: false,
              target: {
                resource: resource,
                id: id,
              },
            });
          } else {
            const tempStarship = starships.find((value) => {
              return value.id === starshipsId;
            })!;
            needNames.starshipsList.push(
              new CNamedResource(
                tempStarship.name,
                tempStarship.url,
                starshipsId,
                EResourceTypes.Starships
              )
            );
          }
        });
        needNames.vehicles.forEach((value) => {
          const vehiclesId = getResourceId(value);
          if (
            vehicles.find((value) => {
              return value.id === vehiclesId;
            }) === undefined
          ) {
            getNamedResourceList.push({
              resource: EResourceTypes.Vehicles,
              id: vehiclesId,
              done: false,
              target: {
                resource: resource,
                id: id,
              },
            });
          } else {
            const tempVehicle = vehicles.find((value) => {
              return value.id === vehiclesId;
            })!;
            needNames.vehiclesList.push(
              new CNamedResource(
                tempVehicle.name,
                tempVehicle.url,
                vehiclesId,
                EResourceTypes.Vehicles
              )
            );
          }
        });
      },
      planets: () => {},
      films: () => {},
      species: () => {},
      starships: () => {},
      vehicles: () => {},
    };
    populateGetNamedResourceList[resource]();

    if (getNamedResourceList.length === 0) {
      return { hasResourceNames: EHasResourceNames.true };
    } else {
      getNamedResourceList.push({
        resource: resource,
        id: id,
        done: true,
      });
      return {
        hasResourceNames: EHasResourceNames.loading,
        getList: [...getNamedResourceList],
      };
    }
  };

  const handleGetList = () => {
    let tempPeopleList = [...people],
      tempPlanetsList = [...planets],
      tempFilmsList = [...films],
      tempSpeciesList = [...species],
      tempStarshipsList = [...starships],
      tempVehiclesList = [...vehicles],
      tempGetList = [...getList];

    const getTempList = {
      people: () => {
        return tempPeopleList;
      },
      planets: () => {
        return tempPlanetsList;
      },
      films: () => {
        return tempFilmsList;
      },
      species: () => {
        return tempSpeciesList;
      },
      starships: () => {
        return tempStarshipsList;
      },
      vehicles: () => {
        return tempVehiclesList;
      },
    };

    const updateValues = () => {
      tempGetList.shift();
      setValues({
        ...values,
        people: tempPeopleList,
        planets: tempPlanetsList,
        films: tempFilmsList,
        species: tempSpeciesList,
        starships: tempStarshipsList,
        vehicles: tempVehiclesList,
        getList: tempGetList,
      });
    };

    const getResourcesFromGetList = {
      undefined: () => {},
      people: () => {
        if (tempGetList[0].done) {
          const indexOfResource = tempPeopleList.findIndex((value) => {
            return value.id === tempGetList[0].id;
          });
          tempPeopleList[indexOfResource].hasResourceNames =
            EHasResourceNames.true;
          updateValues();
        } else {
          getData<IPerson>(EResourceTypes.People, tempGetList[0].id).then(
            (data) => {
              const classPerson = new CPerson(data);
              const indexOfTarget = getTempList[
                tempGetList[0].target!.resource
              ]().findIndex((value: ICards) => {
                return value.id === tempGetList[0].target?.id;
              });
              const namedResource = new CNamedResource(
                classPerson.name,
                classPerson.url,
                getResourceId(classPerson.url),
                EResourceTypes.People
              );
              if (tempGetList[0].target?.resource === EResourceTypes.Films) {
                tempFilmsList[indexOfTarget].charactersList.push(namedResource);
              } else if (
                tempGetList[0].target?.resource ===
                (EResourceTypes.Starships || EResourceTypes.Vehicles)
              ) {
                getTempList[tempGetList[0].target.resource]()[
                  indexOfTarget
                ].pilotsList.push(namedResource);
              } else if (
                tempGetList[0].target?.resource === EResourceTypes.Species
              ) {
                tempSpeciesList[indexOfTarget].peopleList.push(namedResource);
              } else if (
                tempGetList[0].target?.resource === EResourceTypes.Planets
              ) {
                tempPlanetsList[indexOfTarget].residentsList.push(
                  namedResource
                );
              }
              tempPeopleList.push(classPerson);
              tempGetList.shift();
              getResourcesFromGetList[tempGetList[0].resource]();
            }
          );
        }
      },
      planets: () => {
        if (tempGetList[0].done) {
          const indexOfResource = tempPlanetsList.findIndex((value) => {
            return value.id === tempGetList[0].id;
          });
          tempPlanetsList[indexOfResource].hasResourceNames =
            EHasResourceNames.true;
          updateValues();
        } else {
          getData<IPlanets>(EResourceTypes.Planets, tempGetList[0].id).then(
            (data) => {
              const classPlanet = new CPlanet(data);
              const indexOfTarget = getTempList[
                tempGetList[0].target!.resource
              ]().findIndex((value: ICards) => {
                return value.id === tempGetList[0].target?.id;
              });
              if (
                tempGetList[0].target?.resource ===
                (EResourceTypes.People || EResourceTypes.Species)
              ) {
                getTempList[tempGetList[0].target.resource]()[
                  indexOfTarget
                ].homeworldObj = new CNamedResource(
                  classPlanet.name,
                  classPlanet.url,
                  getResourceId(classPlanet.url),
                  EResourceTypes.Planets
                );
              } else if (
                tempGetList[0].target?.resource === EResourceTypes.Films
              ) {
                tempFilmsList[indexOfTarget].planetsList.push(
                  new CNamedResource(
                    classPlanet.name,
                    classPlanet.url,
                    getResourceId(classPlanet.url),
                    EResourceTypes.Planets
                  )
                );
              }
              tempPlanetsList.push(classPlanet);
              tempGetList.shift();
              getResourcesFromGetList[tempGetList[0].resource]();
            }
          );
        }
      },
      films: () => {
        if (tempGetList[0].done) {
          const indexOfResource = tempFilmsList.findIndex((value) => {
            return value.id === tempGetList[0].id;
          });
          tempFilmsList[indexOfResource].hasResourceNames =
            EHasResourceNames.true;
          updateValues();
        } else {
          getData<IFilms>(EResourceTypes.Films, tempGetList[0].id).then(
            (data) => {
              const classFilm = new CFilm(data);
              const indexOfTarget = getTempList[
                tempGetList[0].target!.resource
              ]().findIndex((value: ICards) => {
                return value.id === tempGetList[0].target?.id;
              });
              if (tempGetList[0].target?.resource !== EResourceTypes.Films) {
                getTempList[tempGetList[0].target!.resource]()[
                  indexOfTarget
                ].filmsList.push(
                  new CNamedResource(
                    classFilm.title,
                    classFilm.url,
                    getResourceId(classFilm.url),
                    EResourceTypes.Films
                  )
                );
              }
              tempFilmsList.push(classFilm);
              tempGetList.shift();
              getResourcesFromGetList[tempGetList[0].resource]();
            }
          );
        }
      },
      species: () => {
        if (tempGetList[0].done) {
          const indexOfResource = tempSpeciesList.findIndex((value) => {
            return value.id === tempGetList[0].id;
          });
          tempSpeciesList[indexOfResource].hasResourceNames =
            EHasResourceNames.true;
          updateValues();
        } else {
          getData<ISpecies>(EResourceTypes.Species, tempGetList[0].id).then(
            (data) => {
              const classSpecie = new CSpecie(data);
              const indexOfTarget = getTempList[
                tempGetList[0].target!.resource
              ]().findIndex((value: ICards) => {
                return value.id === tempGetList[0].target?.id;
              });
              if (
                tempGetList[0].target?.resource ===
                (EResourceTypes.People || EResourceTypes.Films)
              ) {
                getTempList[tempGetList[0].target.resource]()[
                  indexOfTarget
                ].speciesList.push(
                  new CNamedResource(
                    classSpecie.name,
                    classSpecie.url,
                    getResourceId(classSpecie.url),
                    EResourceTypes.Species
                  )
                );
              }
              tempSpeciesList.push(classSpecie);
              tempGetList.shift();
              getResourcesFromGetList[tempGetList[0].resource]();
            }
          );
        }
      },
      starships: () => {
        if (tempGetList[0].done) {
          const indexOfResource = tempStarshipsList.findIndex((value) => {
            return value.id === tempGetList[0].id;
          });
          tempStarshipsList[indexOfResource].hasResourceNames =
            EHasResourceNames.true;
          updateValues();
        } else {
          getData<IStarships>(EResourceTypes.Starships, tempGetList[0].id).then(
            (data) => {
              const classStarship = new CStarship(data);
              const indexOfTarget = getTempList[
                tempGetList[0].target!.resource
              ]().findIndex((value: ICards) => {
                return value.id === tempGetList[0].target?.id;
              });
              if (
                tempGetList[0].target?.resource ===
                (EResourceTypes.People || EResourceTypes.Films)
              ) {
                getTempList[tempGetList[0].target.resource]()[
                  indexOfTarget
                ].starshipsList.push(
                  new CNamedResource(
                    classStarship.name,
                    classStarship.url,
                    getResourceId(classStarship.url),
                    EResourceTypes.Starships
                  )
                );
              }
              tempStarshipsList.push(classStarship);
              tempGetList.shift();
              getResourcesFromGetList[tempGetList[0].resource]();
            }
          );
        }
      },
      vehicles: () => {
        if (tempGetList[0].done) {
          const indexOfResource = tempVehiclesList.findIndex((value) => {
            return value.id === tempGetList[0].id;
          });
          tempVehiclesList[indexOfResource].hasResourceNames =
            EHasResourceNames.true;
          updateValues();
        } else {
          getData<IVehicles>(EResourceTypes.Vehicles, tempGetList[0].id).then(
            (data) => {
              const classVehicle = new CVehicle(data);
              const indexOfTarget = getTempList[
                tempGetList[0].target!.resource
              ]().findIndex((value: ICards) => {
                return value.id === tempGetList[0].target?.id;
              });
              if (
                tempGetList[0].target?.resource ===
                (EResourceTypes.People || EResourceTypes.Films)
              ) {
                getTempList[tempGetList[0].target.resource]()[
                  indexOfTarget
                ].vehiclesList.push(
                  new CNamedResource(
                    classVehicle.name,
                    classVehicle.url,
                    getResourceId(classVehicle.url),
                    EResourceTypes.Vehicles
                  )
                );
              }
              tempVehiclesList.push(classVehicle);
              tempGetList.shift();
              getResourcesFromGetList[tempGetList[0].resource]();
            }
          );
        }
      },
    };
    getResourcesFromGetList[tempGetList[0].resource]();
  };

  return (
    <div>
      <DisplayData
        data={values}
        updateIsOpen={updateCardIsOpen}
        searchValue={searchInput}
        onSearchChange={onSearchChange}
        searchFor={searchFor}
        searchClicked={searchClicked}
        resetClicked={resetClicked}
      />
    </div>
  );
};

export default App;
