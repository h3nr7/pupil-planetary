import { useEffect, useState } from 'react';
import Axios from 'axios';
const URL = 'https://images-api.nasa.gov';

export function useInfoData(keyword) {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    useEffect(() => {
        async function getData() {
            const data = await Axios.get(`${URL}/search?q=${keyword}&media_type=image`)
                .then(res => {
                    try {
                        return res.data.collection.items.map(item => {
                            return item
                        });
                    } catch(e) {
                        throw new Error('Data fetch error');
                    }
                })
                .catch((e) => setError(e));

            setData(data);
        }

        getData();
    }, [keyword]);

    return {data, error};
}