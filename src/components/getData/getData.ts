import axios from "axios";
import {
  EResourceTypes,
  ICards,
  ISwapiGetAll,
  EHasResourceNames,
} from "../resourcesTypes/resourcesTypes";

export const keyRegx = /\/[a-z]+\/[0-9]+\//g,
  idRegx = /[0-9]+/g;
export const getResourceId = (resourceLink: string): number => {
  return parseInt(resourceLink.match(keyRegx)![0].match(idRegx)![0]);
};
const baseUrl = "https://swapi.dev/api/";

export async function getData<T extends ICards>(
  resource: EResourceTypes
): Promise<T[]>;
export async function getData<T extends ICards>(
  resource: EResourceTypes,
  id: number
): Promise<T>;
export async function getData<T extends ICards>(
  resource: EResourceTypes,
  id?: number
): Promise<any> {
  if (id) {
    try {
      let { data } = await axios.get<T>(`${baseUrl}${resource}/${id}/`);
      data.id = getResourceId(data.url);
      data.hasResourceNames = EHasResourceNames.false;
      return data;
    } catch (err) {
      console.log(err);
    }
  } else {
    try {
      const { data } = await axios.get<ISwapiGetAll<T>>(
        `${baseUrl}${resource}/`
      );

      let tempResult = data.results,
        nextPage = data.next;

      for (
        let i = tempResult.length;
        i < data.count - 1;
        i = tempResult.length
      ) {
        if (nextPage) {
          const fixedNextPage = nextPage.slice(0, 4) + "s" + nextPage.slice(4);
          const { data: newData } = await axios.get<ISwapiGetAll<T>>(
            fixedNextPage
          );
          tempResult = [...tempResult, ...newData.results];
          nextPage = newData.next;
        }
      }
      for (let i = 0; i < tempResult.length; i++) {
        tempResult[i].id = getResourceId(tempResult[i].url);
        tempResult[i].hasResourceNames = EHasResourceNames.false;
      }

      return tempResult;
    } catch (err) {
      console.log(err);
    }
  }
}
