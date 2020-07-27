import React, { useState, Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import SpinnerComponent from '../General/SpinnerComponent';

import axios from 'axios';
import { API_URL } from '../../Utils/Urls';
import { EventHandler } from '../../Utils/EventHandler';
import EventListComponent from './EventListComponent';

const AgencyEventListContainer = props => {
  const { agencyId } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState(false);
  const [targetAgency, setTargetAgency] = useState({});
  const [agencyEvents, setAgencyEvents] = useState([]);

  useEffect(() => {
    if (agencyId) {
      getAgencyEvents(agencyId);
    }
  }, [agencyId]);

  const getAgencyEvents = async id => {
    setLoading(true);
    try {
      const resp = await axios.get(`${API_URL.AGENCY_EVENTS}/${id}`);
      const {
        data: { agency },
      } = resp;
      setTargetAgency(agency);
      setAgencyEvents(EventHandler([agency]));
      setLoading(false);
    } catch (e) {
      setErrors(true);
    }
  };

  return (
    <Fragment>
      {loading && <SpinnerComponent />}
      {error && <h1>Something went wrong</h1>}
      {!loading && targetAgency && (
        <div>
          <h1>targetAgency.nickname</h1>
        </div>
      )}
      {!loading && agencyEvents && (
        <div className="gray-bg">
          <div className="container pt-150 pb-150">
            <EventListComponent events={agencyEvents} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default AgencyEventListContainer;
