import { ChangeEvent, useEffect, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponent';
import { v4 as uuid} from 'uuid';
import { Formik } from 'formik';


export default observer(function ActivityForm() {

    const {activityStore} = useStore();
    const {selectedActivity, 
        loading, loadActivity, loadingInitial} = activityStore;
    
        const {id} = useParams();
    //const navigate = useNavigate();

    const initialState = selectedActivity ?? {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
    }

    const [activity, setActivity] = useState(initialState);

    /*const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        date: '',
        description: '',
        category: '',
        city: '',
        venue: ''
    });*/

    useEffect(() => {
        if(id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    // function handleSubmit(){
    //     if(!activity.id){
    //         activity.id = uuid();
    //         createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    //     } else {
    //         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
    //     }
    // }

    // function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    //     const {name, value} = event.target;
    //     setActivity({...activity, [name]: value});
    // }

    //function handleCancel(event: )

    if(loadingInitial) return <LoadingComponent content='Loading Content...' />

    return (
        <Segment clearing>
            <Formik enableReinitialize initialValues={activity} onSubmit={values => console.log(values)}>
                {({values: activity, handleChange, handleSubmit}) => (
                <Form onSubmit={handleSubmit} autoComplete='off'>
                <Form.Input placeholder='Title' value={activity.title} name='title' onChange={handleChange} />
                <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={handleChange} />
                <Form.Input placeholder='Category'  value={activity.category} name='category' onChange={handleChange} />
                <Form.Input type='date' placeholder='Date'  value={activity.date} name='date' onChange={handleChange} />
                <Form.Input placeholder='City'  value={activity.city} name='city' onChange={handleChange} />
                <Form.Input placeholder='Venue'  value={activity.venue} name='venue' onChange={handleChange} />
                <Button loading={loading} floated='right' positive type='submit' content='Submit' />
                <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
            </Form>

                )}
            </Formik>
        </Segment>
    )
})