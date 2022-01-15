import React, { useState, useEffect } from 'react';
import './List.css'

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
        <div className="container">
            <h2 className="heading">List of Repositories</h2>
            {loading ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <div>
                    {repos.map((repo) => (
                        <div className="card" key={repo.id}>
                            <img src={repo.owner.avatar_url} alt="avatar" />
                            <div>
                                <span className="name">{repo.name}</span>
                                <span className="description">{repo.description}</span>
                                <p className="stars">Stars: {repo.stargazers_count}</p>
                                <p className="issues">Issues: {repo.open_issues_count}</p>
                                <p className="time-interval">Submitted 20 days ago by {repo.owner.login}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default List;
