import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponents';
import { batchlog } from '../../app/models/batchlog';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';

export default observer(function Batchlog() {

    const [batchlogs, setBatchlogs] = useState<batchlog[]>();
  
    useEffect(() => {
        agent.batchlogs.list().then(batchlogs => {
            batchlogs.length > 0 && setBatchlogs(batchlogs);
        })
    },[])  
  

    async function UpdateActiveSatData() {
        await agent.batchlogs.getactivesatapi();
        toast.info('Updated');
    }


    if(!batchlogs) return <LoadingComponent />

    return(
        <Container>
            
            <Formik
                enableReinitialize 
                initialValues={{}}
                onSubmit={values => UpdateActiveSatData()}>
                {({ handleSubmit, isValid, isSubmitting }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <button disabled={!isValid || isSubmitting } type = 'submit' className='btn btn-primary'>
                            {isSubmitting ? "Processing" : "Run Batch"}
                        </button>
                    </Form>
                )}
            </Formik>

            <hr />



            <table className="table">
                <thead>
                    <tr>
                        <th>
                            No.
                        </th>
                        <th>
                            Title
                        </th>
                        <th>
                            Memo
                        </th>
                        <th>
                            Edit
                        </th>
                    </tr>
                </thead>
                <tbody>
                {                                
                    batchlogs && batchlogs?.map((x,index)=>(                        

                        <tr key={x.id}>
                            <td>{index+1}</td>
                            <td>{x.id}</td>
                            <td>{x.batchdate}</td>
                            <td>{x.batchdate}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </Container>

        
    )
})