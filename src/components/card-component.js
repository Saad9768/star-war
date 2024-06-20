import React, { useEffect, useState } from 'react';
import { fetchAssets } from '../services/asset-service';
import { useNavigate, useLocation } from "react-router-dom";
import { mapKeyForUrl } from '../mapping';
import { API_URL } from '../const';

function CardComponent() {

  const location = useLocation();
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [detailsKeys, setDetailsKeys] = useState([]);
  const [isObject, setIsObject] = useState(false);

  useEffect(() => {
    setDetailsKeys(mapKeyForUrl(location.pathname))
    location.pathname && getData(location.pathname);
  }, [location.pathname]);

  const getData = async (url) => {
    try {
      setIsObject(false)
      setLoading(true);
      let data = await fetchAssets(url);
      if (data.results) {
        data = data.results
      } else {
        setIsObject(true)
      }
      setValues(data);
    } catch (err) {
      console.error(err)
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardClick = (value) => {
    navigate(value.url.replace(API_URL, ''))
  }

  const obj = (value) => {
    return (<div key={value.name} className="assets-card">
      <h2 onClick={
        () => cardClick(value)
      }>{value.name}</h2>
      {detailsKeys.map(({ key, val }) => (<p>{val}: {value[key]}</p>))}
    </div>)
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="assets-list">
      {
        isObject ? obj(values) : values.map(obj)
      }
    </div>
  );
}

export default CardComponent;
