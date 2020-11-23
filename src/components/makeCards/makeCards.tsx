import React from "react";
import { CPerson, EResourceTypes } from "../resourcesTypes/resourcesTypes";

import "./makeCards.css";

interface IMakeCard<T> {
  resource: T;
  updateIsOpen: (
    event: React.MouseEvent,
    resource: EResourceTypes,
    id: number
  ) => void;
}
export const MakePeopleCard = (props: IMakeCard<CPerson>) => {
  const hasResourceNames = {
    false: () => {
      return <div>Getting details</div>;
    },
    true: () => {
      return (
        <div>
          <div>{`Homeworld: ${props.resource.homeworldObj.name}`}</div>
          <div>{`Species: ${
            props.resource.speciesList.length > 0
              ? props.resource.speciesList[0].name
              : "Human"
          }`}</div>
          <div>
            <p>Films: </p>
            <ul>
              {props.resource.filmsList.map((film) => {
                return <li>{film.name}</li>;
              })}
            </ul>
          </div>
        </div>
      );
    },
    loading: () => {
      return <div>Loading details</div>;
    },
  };

  const details =
    props.resource.cardOpen &&
    hasResourceNames[props.resource.hasResourceNames]();

  return (
    <li
      onClick={(event) => {
        props.updateIsOpen(event, EResourceTypes.People, props.resource.id);
      }}
    >
      <div className="card">
        <div className="name">{props.resource.name}</div>
        {details}
      </div>
    </li>
  );
};

/* export const MakePlanetCard = (props: IMakeCard<IPlanets>) => {
    return (
        <li key={planet.url}>
            <p>{planet.name}</p>
        </li>
    );
}; */
