import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_DETAIL } from '../../graphql/queries';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
// import OpenHours from '../../components/OpenHours/OpenHours';
// import Reviews from '../../components/Reviews/Reviews';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Business } from '../../types/Business';

const BusinessDetail = () => {

  const params = useParams();
	const businessList = useSelector((state: State) => state.saveBusinessList.currentSearch);
  const [currentBusiness, setCurrentBusiness] = useState<Business>();
  const dispatch = useDispatch()
  const { visitBusiness } = bindActionCreators(actionCreators, dispatch)

	const [getBusinessDetail, { loading, error }] = useLazyQuery(GET_BUSINESS_DETAIL, {
		variables: {
			id: params.businessId,
		},
    onCompleted: data => {
      visitBusiness({ ...data.business }, businessList);
      setCurrentBusiness({ ...data.business, hasBeenSeen: true });
    }
	});

  useEffect(() => {
    getBusinessDetail()
  }, [getBusinessDetail])
  
  
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error...</p>
  
  return (
    <>
        {currentBusiness && <BusinessCard {...currentBusiness} />}
        {/* <p>Business hours</p>
        <p>{data.business.name}</p>
        { data.business.is_closed && <p style={{ color: 'red'}}>Closed</p>}
        <p style={{ color: 'green'}}>Open</p>
        <p style={ data.business.is_closed ? { color: 'red'} : { color: 'green' }}></p>
        <OpenHours hours={data.business.hours[0]} />
        <Reviews reviews={data.business.reviews} /> */}
    </>
  )
};

export default BusinessDetail;
