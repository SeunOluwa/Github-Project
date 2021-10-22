import React, { useState, useEffect } from 'react';
import "./List.css";

// API
import { getRepos } from '../api';

const List = () => {
    const [repos, setRepos] = useState([]);
    console.log(repos);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchRepos = async () => {
            setLoading(true);
            try {
                const res = await getRepos;

                const data = await res.json();
                console.log(data);

                setRepos(data.items);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
                setError("Some error occured");
            }
        };
        
        fetchRepos();
    }, []);

    return (
        <div>
            <h2>List</h2>
        </div>
    )
}

export default List;
