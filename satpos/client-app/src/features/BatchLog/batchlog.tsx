import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponents';
import { batchlog } from '../../app/models/batchlog';

export default observer(function Batchlog() {

    const [batchlogs, setBatchlogs] = useState<batchlog[]>();
  
    useEffect(() => {
        agent.batchlogs.list().then(batchlogs => {
            batchlogs.length > 0 && setBatchlogs(batchlogs);
        })
    },[])  
  
    if(!batchlogs) return <LoadingComponent />

    return(
        <Container>
            
            <Link to={`/websitesettingcreate`}>
                <h3 >Create</h3>
            </Link>
            
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