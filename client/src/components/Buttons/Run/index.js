import { Button } from "@material-ui/core";
import axios from 'axios';


const pingEndpoint = async (endpoint) => {
    try {
        const response = await axios.get("http://localhost:5000".concat(`${endpoint}`));
        const jsonResponse = await response.data;
        console.log(jsonResponse);
        return jsonResponse;
    }
    catch (error) {
        console.log(error);
    }
}

const Run = (props) => {

    return (
        <Button style={props.styles} onClick={() => {pingEndpoint(props.endpoint)}}>RUN SCRIPT</Button>
    )
}

export default Run;