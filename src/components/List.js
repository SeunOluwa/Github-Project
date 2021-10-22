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
            {loading ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <div>
                    {repos.map((repo) => (
                        <div key={repo.id}>
                            <h1>{repo.name}</h1>
                            <p>{repo.description}</p>
                            <span>Stars: {repo.stargazers_count}</span>
                            <span>Issues: {repo.open_issues_count}</span>
                            <p>Submitted 20 days ago by <span>{repo.owner.login}</span></p>
                            <img src={repo.owner.avatar_url} alt="owner" />
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default List;
