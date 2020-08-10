import React,{useEffect} from 'react'
import axios from 'axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "@fortawesome/free-solid-svg-icons";
const MainTable = (props) => {


    useEffect(() => {
          
            axios.get("http://localhost:3002/get-file").then((res)=>{
                console.log(res.data,"response")
                props.colletRes(res.data.data.arrFinal)
    
            }).catch((err)=>{
                console.log(err,"ERROR")
            })  
    
      },[]);

      const findEmp =()=>{
            // axios.get("http://localhost:3002/find-emp").then((res)=>{
            //     props.collectFinalRes(res.data.data.twoEmployeesArr)
               
            // }).catch((err)=>{
            //     console.log(err,"ERROR")
            // })
            props.toResultsTable()
        }
        const clearTable = () =>{
            props.clear()
            props.toChooseFile()
           
        }
        return (
            <section className="table-main">
            <div className="info-holder">
                <p className="info">Find the 2 employees assigned on same project for longest amount of time.</p>
            </div>
            <div className="clear-table-holder">
                <span onClick={clearTable}>clear table <FontAwesomeIcon
                        icon="trash-alt"
                        className="delete"
                        /></span>
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
                        props.data?
                           props.data.map((el, index)=>(
                            <tr key={index}>
                                    <td>
                                        {el.empId}
                                    </td>
                                    <td>
                                        {el.projectId}
                                    </td>
                                    <td>
                                        {el.dateFrom}
                                    </td>
                                    <td>
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
                    <button className="controller btn-black" onClick={findEmp}>Find
                    <span>
                        <FontAwesomeIcon
                        icon="search"
                        className="search"
                        />
                    </span>
                    </button> 
                </div>
                 
            </section>
        )
    }


export default MainTable 