import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GET_BUSINESS_DETAIL } from '../../graphql/queries';
import { bindActionCreators } from 'redux';
import { actionCreators, State } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { BusinessDetail } from '../../types/Business';
import styles from './BusinessDetail.module.scss';
import BusinessCard from '../../components/BusinessCard/BusinessCard';
import OpenHours from '../../components/OpenHours/OpenHours';
import Toast from '../../components/Toast/Toast';
import Reviews from '../../components/Reviews/Reviews';

const BusinessDetailPage = () => {

  const params = useParams();
	const businessList = useSelector((state: State) => state.saveBusinessList.currentSearch);
  const [currentBusiness, setCurrentBusiness] = useState<BusinessDetail>();
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
  
  
	if(loading) {
		return <Toast content="Loading..." textColor="white" backgroundColor="#5d8cb0" />
	}

	if (error) {
		return <Toast content={`Error: ${error}`} textColor="white" backgroundColor="#FF3B30" />
	}
  
  return (
    <div className={styles['business-detail']}>
        {currentBusiness &&
				<div>
					<BusinessCard {...currentBusiness} />
					<div>
						{
							currentBusiness.isClosed ?
							<p className={styles['business-closed']}>Closed</p> :
							<p className={styles['business-open']}>Open</p>
						}
					</div>
					<OpenHours hours={currentBusiness.hours} />
					<Reviews reviews={currentBusiness.reviews} />
				</div>
				}
    </div>
  )
};

export default BusinessDetailPage;
