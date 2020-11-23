import React from "react";
import { EResourceTypes } from "../resourcesTypes/resourcesTypes";
import { MakePeopleCard } from "../makeCards/makeCards";
import { IValues } from "../resourcesTypes/resourcesTypes";
import { keyRegx } from "../getData/getData";
import { Button, Field } from "../input/input";

const DisplayData = (props: {
  data: IValues;
  updateIsOpen: (
    event: React.MouseEvent,
    resource: EResourceTypes,
    id: number
  ) => void;
  searchValue: string;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchFor: string;
  searchClicked: () => void;
  resetClicked: () => void;
}) => {
  const pickedResourceType = {
    undefined: () => {
      return <p>Loading list of Star Wars characters from SWapi</p>;
    },
    people: () => {
      let cardList;
      if (props.searchFor.length > 0) {
        cardList = props.data.people.map((person) => {
          if (person.name.includes(props.searchFor)) {
            return (
              <MakePeopleCard
                key={person.url.match(keyRegx)![0]}
                resource={person}
                updateIsOpen={props.updateIsOpen}
              />
            );
          }
        });
      } else {
        cardList = props.data.people.map((person) => {
          return (
            <MakePeopleCard
              key={person.url.match(keyRegx)![0]}
              resource={person}
              updateIsOpen={props.updateIsOpen}
            />
          );
        });
      }

      return (
        <div>
          <div>List of Starwars characters (from SWapi)</div>
          <ul className="card-list">{cardList}</ul>
        </div>
      );
    },
    planets: () => {
      return <p>FPlanets not implemented yet.</p>;
    },
    films: () => {
      return <p>Films not implemented yet.</p>;
    },
    species: () => {
      return <p>Species not implemented yet.</p>;
    },
    starships: () => {
      return <p>Starships not implemented yet.</p>;
    },
    vehicles: () => {
      return <p>Vehicles not implemented yet.</p>;
    },
  };

  return (
    <div>
      <Field
        type="text"
        id="searchField"
        lable="Sort by name"
        value={props.searchValue}
        onChange={props.onSearchChange}
      />
      <Button
        type="button"
        id="searchButton"
        onClick={props.searchClicked}
        displayName="Search"
      />
      <Button
        type="button"
        id="resetButton"
        onClick={props.resetClicked}
        displayName="Reset"
      />
      {pickedResourceType[props.data.resourceToShow]()}
    </div>
  );
};

export default DisplayData;
