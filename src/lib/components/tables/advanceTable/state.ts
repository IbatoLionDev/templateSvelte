import {type State } from '@vincjo/datatables/remote'
import { loadDataTable } from "$lib/utilities/table";
import {dataTableComplete,} from "./tableComponents/tableUtilities";

export async function onChangeHandler(state : State) {
    let response = await  loadDataTable(state);
    if (!response) return null
    dataTableComplete.set(JSON.parse(JSON.stringify(response)))
  
    return response
    

}
