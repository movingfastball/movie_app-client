import axios from 'axios';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react'

const search = () => {
    const router = useRouter();

    const {query: searchQuery} = router.query;
    console.log(searchQuery)

    useEffect(() => {
        const fetchMedia = async() => {
            try {
                const response = await axios.get(`api/searchMedia?searchQuery=${searchQuery}`)
            } catch(err) {
                console.log(err);
            }
        }

        fetchMedia()

    },[searchQuery])



  return (
    <div>search</div>
  )
}

export default search