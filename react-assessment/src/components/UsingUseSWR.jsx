import axios from "axios";
import useSWR from "swr"

const fetcher = (url) => {
    return axios.get(url).then(response => response.data);
}

export default function UsingUseSWR() {
    const { data, error, isLoading } = useSWR("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0", fetcher);

    if (isLoading && !error) {
        return (
            <div>There is data being loaded</div>
        )
    }

    if (!isLoading && error) {
        return (
            <div>There was an error</div>
        )
    }

    // console.log(data)

    return (
        <div>
            {data ?
                data.results.map((item) => (
                    <div>{item.name}</div>
                ))
                :
                null
            }
        </div>
    )

}