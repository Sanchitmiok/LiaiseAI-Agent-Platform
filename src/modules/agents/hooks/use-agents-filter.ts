import { DEFAULT_PAGE } from "@/constants";
import {parseAsInteger , parseAsString  , useQueryStates} from "nuqs";

export const useAgentsFilter = () => {
  // useQeryStates is a custom hook that manages query parameters in the URL
  // It allows us to keep track of filters like search term and pagination
  return useQueryStates({
    search : parseAsString.withDefault("").withOptions({clearOnDefault : true}),
    page : parseAsInteger.withDefault(DEFAULT_PAGE).withOptions({clearOnDefault : true}),
  })
}