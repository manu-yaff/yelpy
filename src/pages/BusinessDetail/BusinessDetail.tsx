import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_DETAIL } from '../../graphql/queries';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import OpenHours from '../../components/OpenHours/OpenHours';
import Reviews from '../../components/Reviews/Reviews';

const BusinessDetail = () => {
  const params = useParams();
	const [getSearch, { loading, error, data }] = useLazyQuery(GET_BUSINESS_DETAIL, {
		variables: {
			// id: params.businessId,
      id: "SGRmnarrNuVEsAjYdEoA0w"
		}
	});

  useEffect(() => {
    getSearch();
    if (data) {
      console.log(data);
    }
  }, [])

  if(loading) return <p>Loading...</p>
  if(error) return <p>Error...</p>
  console.log(data)

  return (
    <>
      {data && <div>
        <BusinessCard {...data.business} />
        <p>Business hours</p>
        <p>{data.business.name}</p>
        { data.business.is_closed && <p style={{ color: 'red'}}>Closed</p>}
        <p style={{ color: 'green'}}>Open</p>
        <p style={ data.business.is_closed ? { color: 'red'} : { color: 'green' }}></p>
        <OpenHours hours={data.business.hours[0]} />
        <Reviews reviews={data.business.reviews} />
      </div>        
      }
    </>
  )
};

export default BusinessDetail;