import React ,{useEffect,useState}from 'react'
import axios from 'axios'
const  ResultsTable = (props) =>{
    const[data,setData] = useState(null)
    const goToMainTable = () =>{
        props.toMaintable();
        setData(null)
        props.clear()
    }
 
    useEffect(() => {
        setData(null)
        axios.get("http://localhost:3002/find-emp").then((res)=>{

            setData(res.data.data.twoEmployeesArr)

        }).catch((err)=>{
            console.log(err,"ERROR")
        })

  },[]);
    return (
        <section className="table-main">
            <div className="info-holder">
                <h1>Results</h1>
            </div>
                <table>
                    <tbody>
                        <tr>
                            <th>EmppId</th>
                            <th className="highlight">ProjectID</th> 
                            <th>DateFrom</th>
                            <th>DateTo</th>
                        </tr>
                        {
                        data?
                           data.map((el, index)=>(
                            <tr key={index}>
                                    <td className="success">
                                        {el.empId}
                                    </td>
                                    <td className="success">
                                        {el.projectId}
                                    </td>
                                    <td className="success">
                                        {el.dateFrom}
                                    </td>
                                    <td className="success">
                                        {el.dateTo}
                                    </td>
                                </tr>
                            ) 
                           ):null
                   
                        }
                        <tr>

                        </tr>
                    </tbody>
                </table>
                <div className="controllers-holder">
                    <button className="controller btn-black" onClick={goToMainTable}>Back</button> 
                </div>
                 
            </section> 
    )
}

export default ResultsTable
