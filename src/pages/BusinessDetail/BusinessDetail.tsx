import { useLazyQuery } from '@apollo/client';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_DETAIL } from '../../graphql/queries';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import OpenHours from '../../components/OpenHours/OpenHours';
import Reviews from '../../components/Reviews/Reviews';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { Business } from '../../types/Business';
import eyeIcon from '../../assets/eye.png';


const BusinessDetail = () => {

  const params = useParams();
	const [getSearch, { loading, error, data }] = useLazyQuery(GET_BUSINESS_DETAIL, {
		variables: {
			id: params.businessId,
      testObject: params.testObect
		}
	});

	const dispatch = useDispatch()
	const { visitBusiness } = bindActionCreators(actionCreators, dispatch)
	const visitedBusinessList = useSelector((state: State) => state.visitBusiness);
  
  useEffect(() => {
    console.log('use effect')
    // visitedBusinessList.map((business: Business) => {
    //   console.log(business.hasBeenSeen);
    // })
    // aqui voy a psar el objeto con hasbeenseen modificado
    visitBusiness( {
      id: "12345678910",
      photos: "string",
      name: "Tacos el chaparro",
      location: {},
      review_count: 100,
      display_phone: "string",
      hasBeenSeen: true
    });

    // getSearch();
    if (data) {
      // visitBusiness(data.business);
      // console.log(visitBusiness);
    }
  }, [])
  
  if(loading) return <p>Loading...</p>
  if(error) return <p>Error...</p>
  
  // const checkSeen = visitedBusinessList.find((business: Business) => {
  //   if (business.id === params.businessId) return true
  //   return false
  // })
  const test = (status: boolean | undefined) => {
    if (status) return <p>it has been seen</p>
    return <p>it is new</p>
  }
  return (
    <>
        <div>
          <p>Aca esta lo bueno</p>
          {visitedBusinessList.map((business: Business) => {
            return <div key={business.id}>
              <p>{business.name}</p>
              <p>{business.hasBeenSeen}</p>
              {test(business.hasBeenSeen)}
            </div>
          })}
        </div>
        {/* <BusinessCard {...data.business} />
        <p>Business hours</p>
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
